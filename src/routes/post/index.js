import express from "express";
import { Post } from "../../db/models/index.js";
const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const post = await Post.create(req.body);
    console.log(post);
    return res.send({ message: "Post created successfully...", post });
  } catch (err) {
    return res.send({ error: err, hasError: true });
  }
});

export default router;
