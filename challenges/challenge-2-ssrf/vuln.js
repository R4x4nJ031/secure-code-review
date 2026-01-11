const express = require('express'); //loads express framework
const axios = require('axios'); //loads axios http client

const app = express(); // creates web server

app.get('/profile', (req, res) => { //when user goes to /profile run this function
    console.log('Received request for /profile');

    // Simulated profile data
    const profileData = {
        name: 'John Doe',
        role: 'Developer'
    };
    
    res.json(profileData); //response
    console.log('Sent profile data response');
});

app.get('/fetch-data', async (req, res) => {//uesr when goes to /fetch-data
    const url = req.query.url;//its the url like (/fetch-data?=<url>)
    console.log(`Received request for /fetch-data with URL: ${url}`);//log
    
    try {
        const response = await axios.get(url); //network connection to the address stored in url and fetch data from it
        res.send(response.data);
        console.log(`Data fetched and sent for URL: ${url}`);
    } catch (error) {
        console.error(`Error fetching data from URL: ${url}`, error);
        res.status(500).send('Error fetching data');
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
