import express from "express";
import { User } from "models";
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    return res.send(res.body);
  } catch (err) {
    console.log(err);
  }
});

router.post("/register", async (req, res) => {
  try {
    await User.create(req.body);
    return res.send({ message: "User registered successfully..." });
  } catch (err) {
    return res.send(err);
  }
});

export default router;
