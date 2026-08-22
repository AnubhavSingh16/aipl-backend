import mongoose from "mongoose";
import Banner from "../models/Banner.js";

export async function listBanners(req, res) {
  const banners = await Banner.find().sort({ createdAt: -1 });
  res.json(banners);
}

export async function getBannerById(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).json({ error: "Banner not found" });
  }

  const banner = await Banner.findById(req.params.id);

  if (!banner) {
    return res.status(404).json({ error: "Banner not found" });
  }

  res.json(banner);
}

export async function createBanner(req, res) {
  try {
    const banner = await Banner.create(req.body);
    res.status(201).json(banner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function updateBanner(req, res) {
  try {
    const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!banner) {
      return res.status(404).json({ error: "Banner not found" });
    }

    res.json(banner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function deleteBanner(req, res) {
  const banner = await Banner.findByIdAndDelete(req.params.id);

  if (!banner) {
    return res.status(404).json({ error: "Banner not found" });
  }

  res.status(204).end();
}
