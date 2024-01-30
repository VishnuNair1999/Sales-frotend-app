const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/Unplugapps', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define MongoDB schemas and models
const HeaderModel = mongoose.model('Header', new mongoose.Schema({vr_no: String,
    vr_date: String,
    ac_name: String,
    ac_amt: String,
    status: String,}));
const DetailModel = mongoose.model('Detail', new mongoose.Schema({itemCode: String,
    itemName: String,
    quantities: {
      type: Number,
      min: 3, 
      max: 18 
  },
  prices: {
    type: Number,
    min: 2, 
    max: 999999999999999999n 
}}));

// Middleware to parse incoming JSON
app.use(bodyParser.json());

// Define API routes
app.post('/api/save-header', async (req, res) => {
  try {
    const headerData = req.body;
    const headerInstance = new HeaderModel(headerData);
    await headerInstance.save();
    res.status(200).json({ message: 'Header data saved successfully!' });
  } catch (error) {
    console.error('Error saving header data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/save-detail', async (req, res) => {
  try {
    const detailData = req.body;
    await DetailModel.insertMany(detailData);
    res.status(200).json({ message: 'Detail data saved successfully!' });
  } catch (error) {
    console.error('Error saving detail data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
