import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import Category from "./models/Category.js";
import Product from "./models/Product.js";
import { productCatalog } from "../../aipl-website/src/data/products.js";

await connectDB();

const products = productCatalog.map(({ id, ...rest }) => ({
  ...rest,
  price: 0,
}));

await Product.deleteMany({});
await Product.insertMany(products);

console.log(`Seeded ${products.length} products.`);

const categoryNames = [...new Set(productCatalog.map((product) => product.category))];

await Category.deleteMany({});
await Category.insertMany(categoryNames.map((name) => ({ name })));

console.log(`Seeded ${categoryNames.length} categories.`);

await mongoose.disconnect();
