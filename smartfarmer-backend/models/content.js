const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String, // Detailed content for the topic
    required: true
  }
});

module.exports = mongoose.model("Content", contentSchema);
