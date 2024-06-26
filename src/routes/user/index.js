import express from "express";
const router = express.Router();
import { User } from "../../db/models/index.js";

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({
      where: { userId: req.params.id },
    });
    delete user.dataValues.password;
    delete user.dataValues.createdAt;
    delete user.dataValues.updatedAt;
    delete user.dataValues.userId;
    return res.send({ user });
  } catch (err) {
    res.send({ hasError: true, userNotFound: true });
  }
});
export default router;
