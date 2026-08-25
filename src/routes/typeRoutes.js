import { Router } from "express";
import { createType, deleteType, listTypes } from "../controllers/typeController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", listTypes);
router.post("/", requireAuth, createType);
router.delete("/:id", requireAuth, deleteType);

export default router;
