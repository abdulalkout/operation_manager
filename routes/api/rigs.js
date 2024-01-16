const express = require("express");
const router = express.Router();
const rigsCtrl = require("../../controllers/api/rigs");

// GET /api/items
router.get("/", rigsCtrl.getRigs);

module.exports = router;
