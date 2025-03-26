const Crop = require("../models/crop");

exports.createCrop = async (req, res) => {
  try {
    const { name, type, growthTime, description } = req.body;
    const crop = new Crop({ name, type, growthTime, description });
    await crop.save();
    res.status(201).json({ message: "Crop added successfully", crop });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCrops = async (req, res) => {
  try {
    const crops = await Crop.find();
    res.json(crops);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
