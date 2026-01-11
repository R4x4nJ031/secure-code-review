const express = require('express');
const axios = require('axios');

const app = express();

app.get('/profile', (req, res) => {
    const profileData = {
        name: 'John Doe',
        role: 'Developer'
    };

    res.json(profileData);
});

app.get('/fetch-data', async (req, res) => {
    const urlParam = req.query.url;

    if (!urlParam) {
        return res.status(400).send('Missing url parameter');
    }

    // Allows only letters and digits
    if (!/^[a-z0-9]+$/i.test(urlParam)) {
        return res.status(400).send('Invalid input');
    }


    const safeParam = urlParam

    // Server-controlled destination
    const fullUrl = `https://internal-app/${SafeParam}`;

    try {
        const response = await axios.get(fullUrl, {
            timeout: 3000,
            maxRedirects: 0
        });

        res.send(response.data);
    } catch (error) {
        console.error(`Error fetching data from URL: ${fullUrl}`, error);
        res.status(500).send('Error fetching data');
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
