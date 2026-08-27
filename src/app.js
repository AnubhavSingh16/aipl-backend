import cors from "cors";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import bannerRoutes from "./routes/bannerRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import heroSlideRoutes from "./routes/heroSlideRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import subtypeRoutes from "./routes/subtypeRoutes.js";
import typeRoutes from "./routes/typeRoutes.js";



const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://aiipl-website.vercel.app",
  "https://www.anubhavinfo.in",
  "https://anubhavinfo.in",
];

app.use(
  cors({
    origin: allowedOrigins,
  })
);




app.use(express.json({ limit: "10mb" }));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/types", typeRoutes);
app.use("/api/subtypes", subtypeRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/hero-slides", heroSlideRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

export default app;
