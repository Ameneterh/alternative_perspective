import User from "../models/user.model.js";
import { getDeadline, isSubmissionAllowed } from "../utils/reportDeadline.js";
import dayjs from "../utils/dayjs.js";
import { generateExcel } from "../utils/generateExcel.js";
import { generateWord } from "../utils/generateWord.js";
import Post from "../models/post.model.js";

// save post
export const savePost = async (req, res) => {
  try {
    const { postTitle, postContent, writer } = req.body;

    // Validate required fields
    if (!postTitle || !postContent || !writer) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing!",
      });
    }

    const slug = postTitle
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[()?!;.,]/g, "")
      .replace(/[^a-zA-Z0-9-]/g, "-");

    const post = await Post.create({
      postTitle,
      slug,
      postContent,
      writer,
    });

    res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// edit post
export const editPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const postExist = await Post.findById(postId);

    if (!postExist) {
      return res.status(404).json({
        success: false,
        message: "Post not found!",
      });
    }

    const updates = {};

    // Only update fields that were actually sent
    const allowedFields = ["postTitle", "postContent"];

    for (const field of allowedFields) {
      if (
        req.body[field] !== undefined &&
        String(req.body[field]) !== String(postExist[field] ?? "")
      ) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No changes detected",
      });
    }

    const editedPost = await Post.findByIdAndUpdate(
      postId,
      { $set: updates },
      {
        new: true,
        // runValidators: true,
      },
    );

    return res.status(200).json({
      success: true,
      message: "Post successfully edited",
      post: editedPost,
    });
  } catch (error) {
    console.error("Post Edit Error:", error);
    console.error(error.stack);

    return res.status(500).json({
      success: false,
      message: "Failed to edit post",
    });
  }
};

// comment logic
export const sendComment = async (req, res) => {
  try {
    const { comment, postId, commentBy } = req.body;

    // Add validation for required fields
    if (!comment || !postId || !commentBy) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing!",
      });
    }

    const postExists = await Post.findById(postId);

    if (!postExists) {
      return res.status(400).json({
        success: false,
        message: "Post not found!",
      });
    }

    const post = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: { commentBy, comment } } },
      {
        new: true,
      },
    );

    res.status(201).json({
      success: true,
      post: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all reports
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("writer")
      .populate("comments.commentBy")
      .sort({ createdAt: -1 });

    const totalPosts = await Post.countDocuments();

    res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// increment read count
export const incrementReads = async (req, res) => {
  try {
    const { slug } = req.params;

    const post = await Post.findOneAndUpdate(
      { slug },
      { $inc: { readCount: 1 } },
      { new: true },
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ readCount: post.readCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get one invoice
export const getInvoice = async (req, res) => {
  const invoiceId = req.params.invoiceId;

  try {
    const invoice = await Invoice.findById(invoiceId)
      .populate("client")
      .populate("company")
      .populate("createdBy");

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Invoice fetched successfully",
      invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get reports by fields
export const getReportFieldsSummary = async (req, res) => {
  try {
    const { startDate, endDate, fields } = req.query;

    if (!fields) {
      return res.status(400).json({
        success: false,
        message: "Fields are required",
      });
    }

    const fieldArray = fields.split(",");

    const allowedFields = Object.keys(Report.schema.paths).filter(
      (key) => Report.schema.paths[key].instance === "String",
    );

    const validFields = fieldArray.filter((f) => allowedFields.includes(f));

    if (validFields.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided",
      });
    }

    const now = new Date();

    let start = startDate ? new Date(startDate) : new Date(now);
    if (!startDate) {
      const day = now.getDay();
      start.setDate(now.getDate() - day);
    }
    start.setHours(0, 0, 0, 0);

    let end = endDate ? new Date(endDate) : new Date(now);
    end.setHours(23, 59, 59, 999);

    const reports = await Report.find({
      createdAt: {
        $gte: start,
        $lte: end,
      },
    })
      .select([...validFields, "workStation", "reporter", "createdAt"])
      .sort({ createdAt: -1 })
      .populate("reporter", "fullname");

    // Build response dynamically
    const result = {};

    validFields.forEach((field) => {
      result[field] = reports
        .map((r) => {
          const value = r[field];

          if (!isMeaningfulValue(value)) return null;

          return {
            value,
            workStation: r.workStation,
            createdAt: r.createdAt,
            reporter: r.reporter
              ? {
                  // id: r.reporter._id,
                  fullname: r.reporter.fullname,
                  // role: r.reporter.role,
                }
              : null,
          };
        })
        .filter(Boolean);
    });

    res.status(200).json({
      success: true,
      fields: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
