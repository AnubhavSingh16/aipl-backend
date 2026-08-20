import mongoose from "mongoose";

const enquiryItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String },
    quantity: { type: Number, default: 1 },
  },
  { _id: false }
);

const enquirySchema = new mongoose.Schema(
  {
    source: { type: String, enum: ["contact", "cart"], default: "contact" },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    topic: { type: String, default: "General enquiry" },
    message: { type: String, required: true },
    items: { type: [enquiryItemSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Enquiry", enquirySchema);
