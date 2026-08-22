import { Router } from "express";
import {
  createBanner,
  deleteBanner,
  getBannerById,
  listBanners,
  updateBanner,
} from "../controllers/bannerController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", listBanners);
router.get("/:id", getBannerById);
router.post("/", requireAuth, createBanner);
router.put("/:id", requireAuth, updateBanner);
router.delete("/:id", requireAuth, deleteBanner);

export default router;
