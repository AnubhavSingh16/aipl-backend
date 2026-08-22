import { Router } from "express";
import {
  createEnquiry,
  deleteEnquiry,
  listEnquiries,
  updateEnquiry,
} from "../controllers/enquiryController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/", createEnquiry);
router.get("/", requireAuth, listEnquiries);
router.patch("/:id", requireAuth, updateEnquiry);
router.delete("/:id", requireAuth, deleteEnquiry);

export default router;
