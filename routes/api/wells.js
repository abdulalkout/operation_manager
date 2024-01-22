const express = require("express");
const router = express.Router();
const multer = require("multer");
const wellsCtrl = require("../../controllers/api/wells");
const upload = multer();

// adding files
// Change router.put("/addfiles/:id", ...) to handle a single file
router.put("/files/:id", upload.single("file"), wellsCtrl.addFiles);
// router.put("/files/:id", wellsCtrl.addFiles);
// GET /api/wells/production-data
router.get("/allproductiondata", wellsCtrl.getAllWellsProductionData);
// GET /Development
router.get("/development", wellsCtrl.getDevelopmentWells);
// GET /production
router.get("/production", wellsCtrl.getProductionWells);
// GET /api/wells/:id
router.get("/:id", wellsCtrl.showWell);
// Post ? new well
router.post("/addwell", wellsCtrl.addWells);
// Post ? edit well Activity
router.put("/activityedit/:id", wellsCtrl.ActivityEdit);
// Post ? edit well
router.put("/editwell/:id", wellsCtrl.editWell);

// GET /api/wells
router.delete("/delete/:id", wellsCtrl.deleteWell);
// GET /api/wells
router.get("/", wellsCtrl.getWells);

module.exports = router;
