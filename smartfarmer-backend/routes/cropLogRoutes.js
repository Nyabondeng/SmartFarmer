const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const cropLogController = require("../controllers/cropLogController");

router.post("/", auth, cropLogController.createLog);

router.get("/", auth, cropLogController.getLogs);

router.put("/:id", auth, cropLogController.updateLog);

router.delete("/:id", auth, cropLogController.deleteLog);

module.exports = router;
