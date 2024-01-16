const express = require("express");
const router = express.Router();
const wellsCtrl = require("../../controllers/api/wells");

// GET /Development
router.get("/development", wellsCtrl.getDevelopmentWells);
// GET /production
router.get("/production", wellsCtrl.getProductionWells);
// GET /api/wells/:id
router.get("/:id", wellsCtrl.showWell);
// GET /api/wells
router.get("/", wellsCtrl.getWells);

module.exports = router;
