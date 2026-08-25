import mongoose from "mongoose";

// A "Subtype" is what shows up as a product's `badge` — scoped to one type,
// which is itself scoped to one category: category -> type -> subtype (badge).
const subtypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    type: { type: String, required: true },
  },
  { timestamps: true }
);

subtypeSchema.index({ name: 1, type: 1, category: 1 }, { unique: true });

export default mongoose.model("Subtype", subtypeSchema);
