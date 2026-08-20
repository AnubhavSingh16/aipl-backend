import { Router } from "express";
import { createEnquiry, listEnquiries } from "../controllers/enquiryController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/", createEnquiry);
router.get("/", requireAuth, listEnquiries);

export default router;
