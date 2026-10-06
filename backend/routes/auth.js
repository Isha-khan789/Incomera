import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Enter your email and password." });
  }

  const user = await User.findOne({ email: email.trim().toLowerCase(), role });
  const valid = user && (await bcrypt.compare(password, user.password));

  // Same message for both cases so attackers can't tell which part was wrong
  if (!valid) {
    return res.status(401).json({ message: "Invalid email or password. Try again." });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  res.json({
    token,
    user: { id: user._id, email: user.email, role: user.role, name: user.name },
  });
});

// Used to check that a saved token is still valid
router.get("/me", requireAuth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

export default router;