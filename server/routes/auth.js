const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ error: "User already exists" });

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    passwordHash: hash,
  });

  const token = jwt.sign(
    { _id: user._id, email: user.email, name: user.name },
    process.env.JWT_SECRET
  );

  res.json({ token });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "Invalid email" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(400).json({ error: "Invalid password" });

  const token = jwt.sign(
    { _id: user._id, email: user.email, name: user.name },
    process.env.JWT_SECRET
  );

  res.json({ token });
});

module.exports = router;
