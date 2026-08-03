import express from "express";
import {
  subscribe,
  unsubscribe,
  getAllSubscribers,
} from "../controllers/subscription.controller.js";

const router = express.Router();

router.post("/subscribe", subscribe);
router.post("/unsubscribe", unsubscribe);
router.post("/get-subscribers", getAllSubscribers);

export default router;
