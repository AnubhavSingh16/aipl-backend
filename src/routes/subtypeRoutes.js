import { Router } from "express";
import {
  createSubtype,
  deleteSubtype,
  listSubtypes,
} from "../controllers/subtypeController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", listSubtypes);
router.post("/", requireAuth, createSubtype);
router.delete("/:id", requireAuth, deleteSubtype);

export default router;
