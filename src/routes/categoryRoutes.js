import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  listCategories,
} from "../controllers/categoryController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", listCategories);
router.post("/", requireAuth, createCategory);
router.delete("/:id", requireAuth, deleteCategory);

export default router;
