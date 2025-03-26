const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true, trim: true }, // Add username field
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["farmer", "admin", "expert"], default: "farmer" },
  phoneNumber: { type: String },
  location: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
