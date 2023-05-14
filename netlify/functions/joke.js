const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

exports.handler = async (event, context) => {
  try {
    // Replace with the URL of the website you want to scrape
    const url = 'https://www.floatingsauna.com.au/';
  
    // Send a GET request to the URL
    const response = await axios.get(url);

    // Parse the HTML content using Cheerio
    const $ = cheerio.load(response.data);
    console.log($)

    // Replace with the CSS selector of the element you want to scrape
    const element = $('.h4');

    // Save the data to a file
    fs.writeFileSync('data.txt', element.text());

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