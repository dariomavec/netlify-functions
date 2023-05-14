const axios = require('axios');
const { google } = require('googleapis');

// Replace with the URL of the Google Sheets document you want to write to
const sheetUrl = 'https://docs.google.com/spreadsheets/d/1GjQyOleFrp8vaKjUEbED6SBzEvbKR0u4BxSyF5Uzy0s/edit#gid=0';

// Replace with the path to the JSON key file
const GOOG_API = '';

// Set up the credentials
const auth = new google.auth.GoogleAuth({
  keyFile: GOOG_API,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

async function scrapeData(event, context) {
  try {
    // Replace with the URL of the website you want to scrape
    const url = 'https://lakederbyfloatingsauna.as.me/api/scheduling/v1/availability/times?owner=45aadd5c&appointmentTypeId=14920908&calendarId=4082433&startDate=2023-05-15&timezone=Australia%2FHobart';
  
    // Send a GET request to the URL
    const response = await axios.get(url);
    console.log(response.data);

    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
    
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: 'Error occurred'
    };
  }
};


// Write the data to the sheet
async function writeToSheet(data) {
  try {
    // Create a new instance of the Sheets API
    const sheets = google.sheets({ version: 'v4', auth });

    // Get the ID of the sheet
    const sheetId = sheetUrl.match(/\/d\/(.+)\//)[1];

    // Replace with the range where you want to write the data
    const range = 'Sheet1!A1:B2';

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
    const response = await sheets.spreadsheets.values.update(request);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

// Replace with the scraped data you want to write to the sheet
const data = [['Scraped data 1', 'Scraped data 2']];

// Write the data to the sheet
writeToSheet(data);
