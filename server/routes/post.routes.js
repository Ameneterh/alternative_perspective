import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  savePost,
  getPosts,
  sendComment,
  getWeeklySummary,
  getReportFieldsSummary,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/save-post", savePost);
router.get("/get-posts", getPosts);
router.put("/send-comment", sendComment);
router.get("/report-fields", getReportFieldsSummary);
// router.get("/generate-report", getWeeklySummary);
router.get("/summary", getWeeklySummary);

export default router;
