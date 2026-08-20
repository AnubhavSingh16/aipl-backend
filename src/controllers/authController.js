import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const emailMatches = email === process.env.ADMIN_EMAIL;
  const passwordMatches =
    emailMatches &&
    (await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH));

  if (!emailMatches || !passwordMatches) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.json({ token });
}
