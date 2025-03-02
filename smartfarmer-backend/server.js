const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/smartfarmer', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

// Sample Schema for Crop Data
const cropSchema = new mongoose.Schema({
  cropName: String,
  cropStatus: String,
  timestamp: { type: Date, default: Date.now }
});

const Crop = mongoose.model('Crop', cropSchema);

// Route to add crop status
app.post('/api/crop', async (req, res) => {
  try {
    const { cropName, cropStatus } = req.body;

    // Create a new crop entry
    const newCrop = new Crop({
      cropName,
      cropStatus
    });

    // Save to the database
    await newCrop.save();
    res.status(201).json({ message: 'Crop status added successfully', crop: newCrop });
  } catch (err) {
    res.status(500).json({ message: 'Error adding crop status', error: err });
  }
});

// Route to get all crop statuses
app.get('/api/crops', async (req, res) => {
  try {
    const crops = await Crop.find();
    res.status(200).json(crops);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching crop data', error: err });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
