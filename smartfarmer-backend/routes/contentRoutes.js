const express = require("express");
const router = express.Router();
const Content = require("../models/content");
const authMiddleware = require("../middleware/authMiddleware");

// Create Content (Protected)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, category, description, content } = req.body;

    // Validate required fields
    if (!title || !category || !description || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newContent = new Content({ title, category, description, content });
    await newContent.save();

    res.status(201).json({ message: "Content created successfully", content: newContent });
  } catch (err) {
    res.status(500).json({ message: "Error creating content", error: err.message });
  }
});

// Get All Content
router.get("/", async (req, res) => {
  try {
    const contents = await Content.find();
    res.status(200).json(contents);
  } catch (err) {
    res.status(500).json({ message: "Error fetching content", error: err.message });
  }
});

// Get Content by ID
router.get("/:id", async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.status(200).json(content);
  } catch (err) {
    res.status(500).json({ message: "Error fetching content", error: err.message });
  }
});

// Update Content (Protected)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, category, description, content } = req.body;

    const updatedContent = await Content.findByIdAndUpdate(
      req.params.id,
      { title, category, description, content },
      { new: true, runValidators: true }
    );

    if (!updatedContent) {
      return res.status(404).json({ message: "Content not found" });
    }

    res.status(200).json({ message: "Content updated successfully", content: updatedContent });
  } catch (err) {
    res.status(500).json({ message: "Error updating content", error: err.message });
  }
});

// Delete Content (Protected)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedContent = await Content.findByIdAndDelete(req.params.id);

    if (!deletedContent) {
      return res.status(404).json({ message: "Content not found" });
    }

    res.status(200).json({ message: "Content deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting content", error: err.message });
  }
});

module.exports = router;
