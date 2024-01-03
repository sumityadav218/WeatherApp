const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const weatherRoutes = require('./routes/weather');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to Local MongoDB
mongoose.connect('mongodb://localhost:27017/weatherdb', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/weather', weatherRoutes);
app.use(express.static('public'));
// index.js

// ... (existing code)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  
  // ... (existing code)
  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
