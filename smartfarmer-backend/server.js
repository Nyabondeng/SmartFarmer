require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const cropRoutes = require("./routes/cropRoutes");
const contentRoutes = require("./routes/contentRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const User = require("./models/user");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

// Middleware
app.use(cors({
  origin: 'http://127.0.0.1:5500/',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/crops", cropRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/feedback", feedbackRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/smartfarmer")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("DB Connection Error:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
