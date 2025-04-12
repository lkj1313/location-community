import express from "express";
import admin from "../firebaseAdmin.js";
import Comment from "../models/Comment.js";

const router = express.Router();

// 댓글목록 가져오기
router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "댓글 불러오기 실패", error: err.message });
  }
});

// 댓글생성
router.post("/", async (req, res) => {
  try {
    const idToken = req.headers.authorization?.split(" ")[1];
    if (!idToken) return res.status(401).json({ message: "토큰이 없습니다." });

    const decoded = await admin.auth().verifyIdToken(idToken);
    const { postId, content, author } = req.body;

    if (decoded.uid !== author.uid) {
      return res.status(403).json({ message: "작성자 정보 불일치" });
    }

    const comment = await Comment.create({ postId, content, author });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: "댓글 등록 실패", error: err.message });
  }
});

// 댓글 삭제
router.delete("/:id", async (req, res) => {
  try {
    const idToken = req.headers.authorization?.split(" ")[1];
    if (!idToken) return res.status(401).json({ message: "토큰이 없습니다." });

    const decoded = await admin.auth().verifyIdToken(idToken);

    const comment = await Comment.findById(req.params.id);
    if (!comment)
      return res.status(404).json({ message: "댓글이 존재하지 않습니다." });

    if (comment.author.uid !== decoded.uid) {
      return res.status(403).json({ message: "삭제 권한이 없습니다." });
    }

    await comment.deleteOne();
    res.status(200).json({ message: "댓글 삭제 완료" });
  } catch (err) {
    console.error("❌ 댓글 삭제 실패:", err);
    res
      .status(500)
      .json({ message: "댓글 삭제 중 오류 발생", error: err.message });
  }
});
export default router;
