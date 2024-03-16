import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();
import { User } from "../../db/models/index.js";

router.post("/login", async (req, res) => {
  try {
    const { loginId, password } = req.body;
    if (typeof loginId === "number") {
      const user = await User.findOne({
        where: { phone_number: loginId },
      });
      if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
          return res.send({ userId: user.user_id });
        } else {
          return res.send({
            hasError: true,
            message: "Password is wrong.",
          });
        }
      } else {
        return res.send({
          hasError: true,
          message: "Phone Number is not register",
        });
      }
    } else {
      const user = await User.findOne({
        where: { email: loginId },
      });
      if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
          return res.send({ userId: user.user_id });
        } else {
          return res.send({
            hasError: true,
            message: "Password is wrong.",
          });
        }
      } else {
        return res.send({ hasError: true, message: "Email is not register" });
      }
    }
  } catch (err) {
    return res.send(err);
  }
});

router.post("/register", async (req, res) => {
  try {
    const newUser = {
      ...req.body,
      password: bcrypt.hashSync(req.body.password, 10),
    };
    await User.create(newUser);
    return res.send({ message: "User registered successfully..." });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      const error = err.errors[0];
      error.message === "username must be unique" &&
        res.send({
          hasError: true,
          message: "Username is already taken.",
          feildName: "username",
        });
      error.message === "email must be unique" &&
        res.send({
          hasError: true,
          message: "Email is already registered.",
          feildName: "email",
        });
      error.message === "phone_number must be unique" &&
        res.send({
          hasError: true,
          message: "Phone Number is already registered.",
          feildName: "phoneNumber",
        });
    }
    err.name === "SequelizeDatabaseError" && res.send({ err: "DB error.." });
    return res.send({ error: err, hasError: true });
  }
});

export default router;
