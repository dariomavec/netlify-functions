const axios = require('axios');
const { google } = require('googleapis');

// Replace with the path to the JSON key file
const GOOG_API = process.env.GOOG_API;

async function scrapeData() {
    // Replace with the URL of the website you want to scrape
    const url = 'https://lakederbyfloatingsauna.as.me/api/scheduling/v1/availability/times?owner=45aadd5c&appointmentTypeId=14920908&calendarId=4082433&startDate=2023-05-15&timezone=Australia%2FHobart';
  
    // Send a GET request to the URL
    const response = await axios.get(url);
    return([123, JSON.stringify(response.data)]);
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
    
    //google.auth.fromAPIKey(GOOG_API);

    // Get the ID of the sheet
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/1GjQyOleFrp8vaKjUEbED6SBzEvbKR0u4BxSyF5Uzy0s/edit#gid=0';
    const sheetId = sheetUrl.match(/\/d\/(.+)\//)[1];

    // Replace with the range where you want to write the data
    const range = 'Data!A1:B2';

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
    //console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

exports.handler = async (event, context) => {
  try {
    // Replace with the scraped data you want to write to the sheet
    const data = await scrapeData();
    console.log(data)

    // Write the data to the sheet
    writeToSheet(data);
    return {
      statusCode: 200,
      body: 'Data saved successfully'
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: 'Error occurred'
    };
  }
};