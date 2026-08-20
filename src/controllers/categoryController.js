import Category from "../models/Category.js";

export async function listCategories(req, res) {
  const categories = await Category.find().sort({ name: 1 });
  res.json(categories);
}

export async function createCategory(req, res) {
  const name = req.body.name?.trim();

  if (!name) {
    return res.status(400).json({ error: "Category name is required." });
  }

  try {
    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: "Category already exists." });
    }

    res.status(400).json({ error: error.message });
  }
}

export async function deleteCategory(req, res) {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    return res.status(404).json({ error: "Category not found" });
  }

  res.status(204).end();
}
