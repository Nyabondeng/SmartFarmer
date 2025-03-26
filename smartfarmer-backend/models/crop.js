const mongoose = require("mongoose");

const CropSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  growthTime: { type: String, required: true },
  description: { type: String },
  imageURL: { type: String },
  climateRequirements: { type: String },
  soilType: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
}, { timestamps: true });

module.exports = mongoose.model("Crop", CropSchema);
