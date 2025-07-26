const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");
const { auth, requireRole } = require("../middleware");

// ==================== GET SELLER PROFILE & PRODUCTS ====================
router.get("/:shopName", async (req, res) => {
  try {
    const shopName = decodeURIComponent(req.params.shopName);

    const seller = await User.findOne({ shopName, role: "seller" }).select("-password");
    if (!seller) return res.status(404).json({ message: "Seller not found" });

    const products = await Product.find({ shopName });

    res.json({ seller, products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ==================== CREATE A PRODUCT ====================
router.post("/products", auth, requireRole("seller"), async (req, res) => {
  try {
    const { name, category, price, stock, description, images } = req.body;

    const product = await Product.create({
      seller: req.user._id,
      shopName: req.user.shopName,
      name,
      category,
      price,
      stock,
      description,
      images
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ==================== UPDATE A PRODUCT ====================
router.put("/products/:id", auth, requireRole("seller"), async (req, res) => {
  try {
    const updated = await Product.findOneAndUpdate(
      { _id: req.params.id, seller: req.user._id },
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.json(updated);
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ==================== DELETE A PRODUCT ====================
router.delete("/products/:id", auth, requireRole("seller"), async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({
      _id: req.params.id,
      seller: req.user._id
    });

    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ==================== GET ORDERS FOR SELLER PRODUCTS ====================
router.get("/orders/list", auth, requireRole("seller"), async (req, res) => {
  try {
    const sellerProducts = await Product.find({ seller: req.user._id }).select("_id");
    const productIds = sellerProducts.map((p) => p._id);

    const orders = await Order.find({ "items.product": { $in: productIds } })
      .populate("buyer", "name email")
      .populate("items.product", "name price");

    res.json(orders);
  } catch (error) {
    console.error("Seller Orders Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
