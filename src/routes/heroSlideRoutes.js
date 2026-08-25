import { Router } from "express";
import {
  createHeroSlide,
  deleteHeroSlide,
  getHeroSlideById,
  listHeroSlides,
  updateHeroSlide,
} from "../controllers/heroSlideController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", listHeroSlides);
router.get("/:id", getHeroSlideById);
router.post("/", requireAuth, createHeroSlide);
router.put("/:id", requireAuth, updateHeroSlide);
router.delete("/:id", requireAuth, deleteHeroSlide);

export default router;
