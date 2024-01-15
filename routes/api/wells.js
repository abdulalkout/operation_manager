const express = require("express");
const router = express.Router();
const wellsCtrl = require("../../controllers/api/wells");

// GET /api/items
router.get("/", wellsCtrl.getWells);
// GET /api/wells/:id
router.get("/:id", wellsCtrl.show);
// GET /production
router.get("/production", wellsCtrl.getProductionWells);
// GET /Development
router.get("/development", wellsCtrl.getDevelopmentWells);

module.exports = router;
