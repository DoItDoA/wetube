import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  video: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Video" }, // mongoDB users에 있는 objectId로 참조하여 저장
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }, // mongoDB users에 있는 objectId로 참조하여 저장
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
