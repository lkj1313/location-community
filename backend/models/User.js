// backend/models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  email: { type: String },
  nickname: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", UserSchema);
