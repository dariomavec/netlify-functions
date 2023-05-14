const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

exports.handler = async (event, context) => {
  try {
    // Replace with the URL of the website you want to scrape
    const url = 'https://lakederbyfloatingsauna.as.me/api/scheduling/v1/availability/times?owner=45aadd5c&appointmentTypeId=14920908&calendarId=4082433&startDate=2023-05-15&timezone=Australia%2FHobart';
  
    // Send a GET request to the URL
    const response = await axios.get(url);
    // Parse the HTML content using Cheerio
    const $ = cheerio.load(response.data);

    // Replace with the CSS selector of the element you want to scrape
    const element = $('.pre');
    console.log(element);

    return element;
    
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