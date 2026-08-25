import mongoose from "mongoose";

const heroSlideSchema = new mongoose.Schema(
  {
    eyebrow: { type: String },
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("HeroSlide", heroSlideSchema);
