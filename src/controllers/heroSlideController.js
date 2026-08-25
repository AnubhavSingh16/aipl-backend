import mongoose from "mongoose";
import HeroSlide from "../models/HeroSlide.js";

export async function listHeroSlides(req, res) {
  const slides = await HeroSlide.find().sort({ createdAt: 1 });
  res.json(slides);
}

export async function getHeroSlideById(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).json({ error: "Hero slide not found" });
  }

  const slide = await HeroSlide.findById(req.params.id);

  if (!slide) {
    return res.status(404).json({ error: "Hero slide not found" });
  }

  res.json(slide);
}

export async function createHeroSlide(req, res) {
  try {
    const slide = await HeroSlide.create(req.body);
    res.status(201).json(slide);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function updateHeroSlide(req, res) {
  try {
    const slide = await HeroSlide.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!slide) {
      return res.status(404).json({ error: "Hero slide not found" });
    }

    res.json(slide);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function deleteHeroSlide(req, res) {
  const slide = await HeroSlide.findByIdAndDelete(req.params.id);

  if (!slide) {
    return res.status(404).json({ error: "Hero slide not found" });
  }

  res.status(204).end();
}
