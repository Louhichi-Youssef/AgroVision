const express = require('express');
const router = express.Router();
const axios = require('axios');

// Get weather for a specific location (Tunis by default)
router.get('/', async (req, res) => {
    const { lat = 36.8065, lon = 10.1815 } = req.query; // Default to Tunis

    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&timezone=auto`;

        console.log(`-> Fetching weather from: ${url}`);
        const response = await axios.get(url);

        res.json(response.data);
    } catch (error) {
        console.error('Weather API error:', error.message);
        if (error.response) {
            console.error('Data:', error.response.data);
        }
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

module.exports = router;
