import mongoose from "mongoose";

const typeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

// A type name only needs to be unique within its own category —
// "Enterprise" can exist under both "Hosting" and "Servers".
typeSchema.index({ name: 1, category: 1 }, { unique: true });

export default mongoose.model("Type", typeSchema);
