const express = require('express');
const router = express.Router();
const axios = require('axios');
const WeatherData = require('../models/weatherdata'); // Create a WeatherData model


router.get('/', async (req, res) => {
    try {
        const apiKey = process.env.OPENWEATHERMAP_API_KEY;
        const city = req.query.city || 'London';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        const response = await axios.get(apiUrl);
  
      const weatherData = new WeatherData({
        city: response.data.name,
        temperature: response.data.main.temp,
        description: response.data.weather[0].description,
      });
      await weatherData.save();
  
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
