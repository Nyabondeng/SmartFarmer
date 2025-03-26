const express = require("express");
const router = express.Router();
const Crop = require("../models/crop");
const authMiddleware = require("../middleware/authMiddleware");

// Create a crop
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, type, growthTime, description } = req.body;
    const crop = new Crop({ name, type, growthTime, description });
    await crop.save();
    res.status(201).json({ message: "Crop added successfully", crop });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all crops
router.get("/", async (req, res) => {
  try {
    const crops = await Crop.find();
    res.json(crops);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get crop by ID
router.get("/:id", async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (!crop) return res.status(404).json({ message: "Crop not found" });
    res.json(crop);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
