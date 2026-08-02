import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    postTitle: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    postImage: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      enum: ["news", "editorials", "features", "columns"],
    },

    subCategory: {
      type: String,
      required: true,
      trim: true,
      enum: ["economy", "health", "politics", "security"],
    },

    postContent: {
      type: String,
      required: true,
    },

    comments: [
      {
        commentBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        comment: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    readCount: {
      type: Number,
      default: 50,
    },

    writer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

const Post = mongoose.model("Post", postSchema);

export default Post;
