import mongoose from "mongoose";

const pageSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      unique: true,
    },

    aboutTitle: String,
    aboutContent: String,

    missionTitle: String,
    missionContent: String,

    lastUpdatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

const Page = mongoose.model("Page", pageSchema);
export default Page;
