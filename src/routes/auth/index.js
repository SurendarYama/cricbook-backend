import express from "express";
const router = express.Router();

router.post("/login", (req, res) => {
  console.log(req.body);
  return res.send(req.body);
});

router.post("/register", (req, res) => {
  return res.send(req.body);
});

export default router;
