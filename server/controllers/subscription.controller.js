import User from "../models/user.model.js";
import Subscription from "../models/subscription.model.js";

// subscribe
export const subscribe = async (req, res) => {
  try {
    const { subscriber, email, acceptance } = req.body;

    // Add validation for required fields
    if (!subscriber || !email || !acceptance) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const subscription = await Subscription.create({
      subscriber,
      email,
      acceptance,
    });

    res.status(201).json({
      success: true,
      subscription,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// unsubscribe
export const unsubscribe = async (req, res) => {};

// get all subscribers
export const getAllSubscribers = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role !== "architect") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to view messages",
      });
    }
    const messages = await Contact.find({}).sort({ createdAt: -1 });
    const totalMessages = await Contact.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate(),
    );
    const lastMonthMessages = await Contact.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      success: true,
      message: "Messages fetched successfully",
      messages,
      totalMessages,
      lastMonthMessages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
