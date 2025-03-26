const express = require("express");
const router = express.Router();
const Content = require("../models/content");
const authMiddleware = require("../middleware/authMiddleware");

// Get all content
router.get("/", async (req, res) => {
  try {
    const content = await Content.find().populate("author", "name");
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
