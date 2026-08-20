import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import Category from "./models/Category.js";
import { productCatalog } from "../../aipl-website/src/data/products.js";

await connectDB();

const categoryNames = [...new Set(productCatalog.map((product) => product.category))];

for (const name of categoryNames) {
  await Category.findOneAndUpdate({ name }, { name }, { upsert: true });
}

console.log(`Ensured ${categoryNames.length} categories exist.`);

await mongoose.disconnect();
