const Order = require("../../models/order");
const Rig = require("../../models/rig");
// const Item = require('../../models/item');

module.exports = {
  getRigs,
  showRig,
  addRigs,
  cart,
  addToCart,
  setItemQtyInCart,
  checkout,
  history,
};

// A cart is the unpaid order for a user
async function cart(req, res) {
  try {
    const cart = await Order.getCart(req.user._id);
    res.status(200).json(cart);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
}

// Add an item to the cart
async function addToCart(req, res) {
  try {
    const cart = await Order.getCart(req.user._id);
    await cart.addItemToCart(req.params.id);
    res.status(200).json(cart);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
}

// Updates an item's qty in the cart
async function setItemQtyInCart(req, res) {
  try {
    const cart = await Order.getCart(req.user._id);
    await cart.setItemQty(req.body.itemId, req.body.newQty);
    res.status(200).json(cart);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
}

// Update the cart's isPaid property to true
async function checkout(req, res) {
  try {
    const cart = await Order.getCart(req.user._id);
    cart.isPaid = true;
    await cart.save();
    res.status(200).json(cart);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
}

// Return the logged in user's paid order history
async function history(req, res) {
  // Sort most recent orders first
  try {
    const orders = await Order.find({ user: req.user._id, isPaid: true })
      .sort("-updatedAt")
      .exec();
    res.status(200).json(orders);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
}

async function getRigs(req, res) {
  try {
    const rigs = await Rig.find({}).sort("name");
    res.status(200).json(rigs);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
}

async function showRig(req, res) {
  try {
    const rig = await Rig.findById(req.params.id);
    res.status(200).json(rig);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
}

async function addRigs(req, res) {
  try {
    console.log("Received data:", req.body);

    const { name, status, type, well, operationActivities } = req.body;

    const activities = operationActivities || [];
    const wellAttached = well || "";
    const rig = await Rig.create({
      name,
      well: wellAttached,
      type,
      status,
      operationActivities: activities,
    });

    console.log("Rig added successfully:", rig);
    res.status(201).json(rig);
  } catch (e) {
    console.error("Error adding rig:", e.message);
    res.status(400).json({ msg: e.message });
  }
}
