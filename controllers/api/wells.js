const Well = require("../../models/well");

module.exports = {
  showWell,
  getWells,
  getProductionWells,
  getDevelopmentWells,
  addWells,
  editWell,
  deleteWell,
  getAllWellsProductionData,
  getWellProductionData,
  ActivityEdit,
  addFiles,
};

async function showWell(req, res) {
  try {
    const item = await Well.findById(req.params.id);
    res.status(200).json(item);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
}

async function getWells(req, res) {
  try {
    const wells = await Well.find({}).sort("name");
    res.status(200).json(wells);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
}

async function getProductionWells(req, res) {
  try {
    const productionWells = await Well.find({ operation: "Production" }).sort(
      "name"
    );
    res.status(200).json(productionWells);
    console.log(productionWells);
  } catch (e) {
    res.status(400).json({ msg: e.message });
    console.log("did not get the data");
  }
}

// controllers/api/wells.js
async function getDevelopmentWells(req, res) {
  try {
    console.log("Request made to /development route");
    const developmentWells = await Well.find({ operation: "Development" }).sort(
      "name"
    );
    res.status(200).json(developmentWells);
  } catch (e) {
    console.error("Error fetching development wells:", e.message);
    res.status(400).json({ msg: e.message });
  }
}

//add new
async function addWells(req, res) {
  try {
    console.log("Received data:", req.body);

    const {
      name,
      field,
      latitude,
      longitude,
      status,
      operation,
      rig,
      operationActivities,
    } = req.body;

    const activities = operationActivities || [];
    const rigAttached = rig || "";
    const well = await Well.create({
      name,
      field,
      latitude,
      longitude,
      status,
      operation,
      rig: rigAttached,
      operationActivities: activities,
    });
    console.log("im in the controller");
    res.status(201).json(well);
  } catch (e) {
    console.log("im in the controller");
    console.error("Error adding well:", e.message);
    res.status(400).json({ msg: e.message });
  }
}

// Edit Well
async function editWell(req, res) {
  try {
    const wellId = req.params.id;
    const updatedWellData = req.body;

    // Check if the well exists
    const existingWell = await Well.findById(wellId);
    if (!existingWell) {
      return res.status(404).json({ message: "Well not found" });
    }

    // Update the well data
    const updatedWell = await Well.findByIdAndUpdate(wellId, updatedWellData, {
      new: true,
    });

    res.json(updatedWell);
  } catch (error) {
    console.error("Error editing well:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Edit Well Activity
// Edit Well Activity
async function ActivityEdit(req, res) {
  try {
    const wellId = req.params.id;
    const updatedActivityData = req.body;

    // Check if the well exists
    const existingWell = await Well.findById(wellId);
    if (!existingWell) {
      return res.status(404).json({ message: "Well not found" });
    }

    existingWell.operationActivities = updatedActivityData || [];

    // existingWell.operationActivities.forEach((activity, index) => {
    //   if (updatedActivityData[index]) {
    //     activity.status = updatedActivityData[index].status;
    //     activity.request = updatedActivityData[index].request;
    //     activity.operationText = updatedActivityData[index].operationText;
    //   }
    // });

    const updatedWell = await existingWell.save();

    res.json(updatedWell);
  } catch (error) {
    console.error("Error editing well activity Backend:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function deleteWell(req, res) {
  try {
    const wellId = req.params.id;
    await Well.findOneAndDelete(wellId);
    res.json({ message: "Well deleted successfully" });
  } catch (error) {
    console.error("Error deleting well:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Get production data for all wells
async function getAllWellsProductionData(req, res) {
  try {
    const wells = await Well.find({});
    const productionData = wells.map((well) => ({
      wellName: well.name,
      productionData: well.operationActivities.map((activity) => ({
        production: activity.production,
        createdAt: activity.createdAt,
      })),
    }));
    res.status(200).json(productionData);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
}

// Get production data for one well
async function getWellProductionData(req, res) {
  try {
    const wellId = req.params.id;
    const well = await Well.findById(wellId);
    const productionData = {
      productionData: well.operationActivities.map((activity) => ({
        production: activity.production,
      })),
      productionTime: well.operationActivities.map((activity) => ({
        createdAt: activity.createdAt,
      })),
    };
    res.status(200).json(productionData);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
}

async function addFiles(req, res) {
  console.log("we are in the controller", req);
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json("No file uploaded");
    }

    const wellId = req.params.id;
    const fileBuffer = req.file.buffer; // Use req.file to access the uploaded file

    const existingWell = await Well.findById(wellId);
    if (!existingWell) {
      return res.status(404).json({ message: "Well not found" });
    }

    // Add the file buffer to the existing well's files array
    // existingWell.files.push(fileBuffer);
    existingWell.files = fileBuffer;

    // Save the well document
    const updatedWell = await existingWell.save();

    res.json(updatedWell);
  } catch (error) {
    console.error("Error adding file:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
