import cors from "cors";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import productRoutes from "./routes/productRoutes.js";









const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/enquiries", enquiryRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

export default app;
