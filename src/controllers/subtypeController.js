import Subtype from "../models/Subtype.js";

export async function listSubtypes(req, res) {
  const filter = {};

  if (req.query.category) {
    filter.category = req.query.category;
  }

  if (req.query.type) {
    filter.type = req.query.type;
  }

  const subtypes = await Subtype.find(filter).sort({ name: 1 });
  res.json(subtypes);
}

export async function createSubtype(req, res) {
  const name = req.body.name?.trim();
  const category = req.body.category?.trim();
  const type = req.body.type?.trim();

  if (!name || !category || !type) {
    return res
      .status(400)
      .json({ error: "Subtype name, category, and type are required." });
  }

  try {
    const subtype = await Subtype.create({ name, category, type });
    res.status(201).json(subtype);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: "This subtype already exists for that type." });
    }

    res.status(400).json({ error: error.message });
  }
}

export async function deleteSubtype(req, res) {
  const subtype = await Subtype.findByIdAndDelete(req.params.id);

  if (!subtype) {
    return res.status(404).json({ error: "Subtype not found" });
  }

  res.status(204).end();
}
