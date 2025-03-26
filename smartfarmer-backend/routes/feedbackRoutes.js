const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");
const authMiddleware = require("../middleware/authMiddleware");

// Submit feedback
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { message } = req.body;
    const feedback = new Feedback({ user: req.user.id, message });
    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
