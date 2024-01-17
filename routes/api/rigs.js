const express = require("express");
const router = express.Router();
const rigsCtrl = require("../../controllers/api/rigs");

//Get / rig by id
router.get("/:id", rigsCtrl.showRig);
// Post ? new well
router.post("/addRig", rigsCtrl.addRigs);
// Post - Add Rig Activity
router.put("/editrig/:id", rigsCtrl.addRigActivity);
// GET /all rigs
router.get("/", rigsCtrl.getRigs);

module.exports = router;
