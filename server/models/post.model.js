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
      default: () => Math.floor(Math.random() * (100 - 50 + 1)) + 50,
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
