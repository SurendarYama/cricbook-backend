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
  }
});

export default router;
