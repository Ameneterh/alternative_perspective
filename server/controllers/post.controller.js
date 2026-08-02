import User from "../models/user.model.js";
import { getDeadline, isSubmissionAllowed } from "../utils/reportDeadline.js";
import dayjs from "../utils/dayjs.js";
import { generateExcel } from "../utils/generateExcel.js";
import { generateWord } from "../utils/generateWord.js";
import Post from "../models/post.model.js";

// save post
export const savePost = async (req, res) => {
  try {
    const { postTitle, postImage, category, subCategory, postContent, writer } =
      req.body;

    // Validate required fields
    if (
      !postTitle ||
      !postImage ||
      !category ||
      !subCategory ||
      !postContent ||
      !writer
    ) {
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
      postImage,
      category,
      subCategory,
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

// comment logic
export const sendComment = async (req, res) => {
  try {
    const { comment, reportId, commentBy } = req.body;

    // Add validation for required fields
    if (!comment || !reportId || !commentBy) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing!",
      });
    }

    const reportExists = await Report.findById(reportId);

    if (!reportExists) {
      return res.status(400).json({
        success: false,
        message: "Report not found!",
      });
    }

    const report = await Report.findByIdAndUpdate(
      reportId,
      { $push: { comments: { commentBy, comment } } },
      {
        new: true,
      },
    );

    res.status(201).json({
      success: true,
      report: report,
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

// generate reports summary
export const getWeeklySummary = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const reports = await Report.find({
      createdAt: {
        $gte: new Date(start),
        $lte: new Date(end),
      },
    }).populate("reporter");

    const summary = {};

    reports.forEach((report) => {
      const id = report.reporter._id;

      if (!summary[id]) {
        summary[id] = {
          name: report.reporter.fullname,

          totalReports: 0,

          interventions: 0,
        };
      }

      summary[id].totalReports++;

      if (
        report.interventions &&
        !/^(nil|nill|none|n\/a|na|no|no intervention|no interventions|not applicable|-|0)$/i.test(
          report.interventions.trim(),
        ) &&
        report.interventions.toLowerCase() //.includes("interventions")
      ) {
        summary[id].interventions++;
      }
    });

    const formatted = Object.values(summary);

    const excel = await generateExcel(formatted, startDate, endDate);

    // const word = await generateWord(formatted);

    res.status(200).json({
      message: "Summary generated successfully!",

      data: formatted,

      files: {
        excel,

        // word,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
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
