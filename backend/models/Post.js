// backend/models/Post.js
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    region: { type: String, required: true },
    category: { type: String, required: true },
    tags: [String],
    author: {
      uid: { type: String, required: true },
      nickname: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
