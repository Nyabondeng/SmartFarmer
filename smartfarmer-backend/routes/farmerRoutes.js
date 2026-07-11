const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const farmerController = require("../controllers/farmerController");

router.get("/profile", auth, farmerController.getProfile);

module.exports = router;
