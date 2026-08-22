import Enquiry from "../models/Enquiry.js";

export async function createEnquiry(req, res) {
  const { source, name, email, phone, address, topic, message, items } = req.body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res
      .status(400)
      .json({ error: "Name, email, and message are required." });
  }

  try {
    const enquiry = await Enquiry.create({
      source,
      name,
      email,
      phone,
      address,
      topic,
      message,
      items,
    });
    res.status(201).json(enquiry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function listEnquiries(req, res) {
  const enquiries = await Enquiry.find().sort({ createdAt: -1 });
  res.json(enquiries);
}

export async function updateEnquiry(req, res) {
  const { fulfilled, note } = req.body;
  const updates = {};

  if (fulfilled !== undefined) {
    updates.fulfilled = fulfilled;
  }

  if (note !== undefined) {
    updates.note = note;
  }

  try {
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!enquiry) {
      return res.status(404).json({ error: "Enquiry not found" });
    }

    res.json(enquiry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function deleteEnquiry(req, res) {
  const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

  if (!enquiry) {
    return res.status(404).json({ error: "Enquiry not found" });
  }

  res.status(204).end();
}
