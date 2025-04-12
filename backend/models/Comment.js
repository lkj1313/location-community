import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    content: { type: String, required: true },
    author: {
      uid: { type: String, required: true },
      nickname: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
