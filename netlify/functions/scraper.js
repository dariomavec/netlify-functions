const axios = require('axios');
const { google } = require('googleapis');
const { schedule } = require("@netlify/functions");

// Replace with the path to the JSON key file
const GOOG_API = process.env.GOOG_API;

function date_string(offset = 0) {
  let dte = new Date();
  dte.setDate(dte.getDate() + offset);
  let dd = dte.getDate();
  let mm = dte.getMonth() + 1;
  let yy = dte.getFullYear();

  return(yy + '-' + mm.toString().padStart(2, '0') + '-' + dd.toString().padStart(2, '0'))
}

async function scrapeData() {
    // Replace with the URL of the website you want to scrape
    let today = date_string(offset = 0);
    let query = date_string(offset = 2);
    const url = 'https://lakederbyfloatingsauna.as.me/api/scheduling/v1/availability/times?' + 
                'owner=45aadd5c&appointmentTypeId=14920908&calendarId=4082433&startDate=' +
                query + '&timezone=Australia%2FHobart';
    console.log(url);

    // Send a GET request to the URL
    const response = await axios.get(url);

    let slots_available = 0;
    response.data[query].forEach(
      val => slots_available += val['slotsAvailable']
    );
    return([[today, query, slots_available]]);
};


// Write the data to the sheet
async function writeToSheet(data) {
  try {
    const auth = new google.auth.GoogleAuth({
      //url to spreadsheets API
      scopes: "https://www.googleapis.com/auth/spreadsheets"
    });

    // Create a new instance of the Sheets API
    const sheets = google.sheets({ 
      version: 'v4',
      auth: auth.fromJSON(JSON.parse(GOOG_API))
    });

    // Get the ID of the sheet
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/1GjQyOleFrp8vaKjUEbED6SBzEvbKR0u4BxSyF5Uzy0s/edit#gid=0';
    const sheetId = sheetUrl.match(/\/d\/(.+)\//)[1];

    // Replace with the range where you want to write the data
    const range = 'Data!A1:C1';

    // Build the request body
    const request = {
      spreadsheetId: sheetId,
      range,
      valueInputOption: 'RAW',
      resource: {
        values: data,
      },
    };

    // Write the data to the sheet
    const response = await sheets.spreadsheets.values.append(request);
  } catch (error) {
    console.error(error);
  }
}

const handler = async (event, context) => {
  try {
    // Replace with the scraped data you want to write to the sheet
    const data = await scrapeData();
    console.log(data)

    // Write the data to the sheet
    writeToSheet(data);
  } catch (error) {
    console.error(error);
  }
};

exports.handler = schedule("0 12 * * *", handler);