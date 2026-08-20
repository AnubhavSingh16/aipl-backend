import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "../controllers/productController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", listProducts);
router.get("/:id", getProductById);
router.post("/", requireAuth, createProduct);
router.put("/:id", requireAuth, updateProduct);
router.delete("/:id", requireAuth, deleteProduct);

export default router;
