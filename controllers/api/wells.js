const Well = require("../../models/well");

module.exports = {
  index,
  show,
  getWells,
  getProductionWells,
  getDevelopmentWells,
};

async function index(req, res) {
  try {
    const items = await Item.find({}).sort("name").populate("category").exec();
    // re-sort based upon the sortOrder of the categories
    items.sort((a, b) => a.category.sortOrder - b.category.sortOrder);
    res.status(200).json(items);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
}

async function show(req, res) {
  try {
    const item = await Item.findById(req.params.id);
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
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
}

async function getDevelopmentWells(req, res) {
  try {
    const developmentWells = await Well.find({ operation: "Development" }).sort(
      "name"
    );
    res.status(200).json(developmentWells);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
}
