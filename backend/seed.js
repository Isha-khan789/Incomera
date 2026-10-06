import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "./models/User.js";

dotenv.config();

const users = [
  { email: "operator@incomera.com", role: "operator", name: "Operator", pass: process.env.SEED_OPERATOR_PASSWORD },
  { email: "team@incomera.com", role: "team", name: "Team", pass: process.env.SEED_TEAM_PASSWORD },
];

await mongoose.connect(process.env.MONGO_URI);

for (const u of users) {
  if (!u.pass) throw new Error("Set the seed passwords in .env first");
  const hashed = await bcrypt.hash(u.pass, 10);
  await User.findOneAndUpdate(
    { email: u.email },
    { email: u.email, role: u.role, name: u.name, password: hashed },
    { upsert: true }
  );
  console.log("Saved", u.email);
}

await mongoose.disconnect();