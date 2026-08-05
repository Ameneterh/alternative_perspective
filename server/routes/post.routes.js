import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  savePost,
  editPost,
  getPosts,
  sendComment,
  incrementReads,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/save-post", savePost);
router.put("/read/:slug", incrementReads);
router.put("/edit-post/:postId", editPost);
router.get("/get-posts", getPosts);
router.put("/send-comment", sendComment);

export default router;
