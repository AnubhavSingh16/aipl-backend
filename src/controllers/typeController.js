import Subtype from "../models/Subtype.js";
import Type from "../models/Type.js";

export async function listTypes(req, res) {
  const filter = {};

  if (req.query.category) {
    filter.category = req.query.category;
  }

  const types = await Type.find(filter).sort({ name: 1 });
  res.json(types);
}

export async function createType(req, res) {
  const name = req.body.name?.trim();
  const category = req.body.category?.trim();

  if (!name || !category) {
    return res.status(400).json({ error: "Type name and category are required." });
  }

  try {
    const type = await Type.create({ name, category });
    res.status(201).json(type);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: "This type already exists in that category." });
    }

    res.status(400).json({ error: error.message });
  }
}

export async function deleteType(req, res) {
  const type = await Type.findByIdAndDelete(req.params.id);

  if (!type) {
    return res.status(404).json({ error: "Type not found" });
  }

  await Subtype.deleteMany({ type: type.name, category: type.category });

  res.status(204).end();
}
