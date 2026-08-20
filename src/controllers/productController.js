import mongoose from "mongoose";
import Product from "../models/Product.js";

export async function listProducts(req, res) {
  const filter = {};

  if (req.query.category) {
    filter.category = req.query.category;
  }

  if (req.query.featured !== undefined) {
    filter.featured = req.query.featured === "true";
  }

  const products = await Product.find(filter).sort({ createdAt: -1 });
  res.json(products);
}

export async function getProductById(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).json({ error: "Product not found" });
  }

  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
}

export async function createProduct(req, res) {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function updateProduct(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).json({ error: "Product not found" });
  }

  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function deleteProduct(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).json({ error: "Product not found" });
  }

  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.status(204).end();
}
