const express = require("express");
const router = express.Router();
const rigsCtrl = require("../../controllers/api/rigs");

//Get / rig by id
router.get("/:id", rigsCtrl.showRig);
// GET /all rigs
router.get("/", rigsCtrl.getRigs);

module.exports = router;
