import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    rating: { type: Number, default: 0 },
    badge: { type: String },
    description: { type: String },
    image: { type: String },
    featured: { type: Boolean, default: false },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
