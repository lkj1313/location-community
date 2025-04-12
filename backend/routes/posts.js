// backend/routes/posts.js
import express from "express";
import admin from "../firebaseAdmin.js";
import Post from "../models/Post.js";

const router = express.Router();

//  글 작성
router.post("/", async (req, res) => {
  let decoded = null;
  let author = null;

  try {
    const idToken = req.headers.authorization?.split(" ")[1];
    if (!idToken) return res.status(401).json({ message: "토큰이 없습니다." });

    decoded = await admin.auth().verifyIdToken(idToken); // 🔐 토큰 검증

    const {
      title,
      content,
      region,
      category,
      tags,
      author: authorData,
    } = req.body;
    author = authorData;

    console.log("🔥 decoded.uid:", decoded.uid);
    console.log("🔥 author.uid :", author.uid);

    if (decoded.uid !== author.uid) {
      return res.status(403).json({ message: "작성자 정보 불일치" });
    }

    const post = await Post.create({
      title,
      content,
      region,
      category,
      tags,
      author,
    });

    res.status(201).json(post);
  } catch (err) {
    console.error("❌ 글 저장 오류:", err);
    if (decoded) console.log("🔥 decoded.uid:", decoded.uid);
    if (author) console.log("🔥 author.uid :", author.uid);
    res.status(500).json({ message: "글 저장 실패", error: err.message });
  }
});
// 글 목록 가져오기
router.get("/", async (req, res) => {
  try {
    const { region, category, page = 1, limit = 5 } = req.query;
    const filter = {};
    if (region) filter.region = region;
    if (category) filter.category = category;

    const posts = await Post.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json(posts);
  } catch (err) {
    console.error("❌ 게시글 목록 조회 실패:", err);
    res.status(500).json({ message: "게시글 목록 조회 실패" });
  }
});

// 게시글 상세 조회
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }

    res.json(post);
  } catch (err) {
    console.error("❌ 게시글 조회 실패:", err);
    res.status(500).json({ message: "서버 오류", error: err.message });
  }
});
// 게시글 삭제
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const idToken = req.headers.authorization?.split(" ")[1];
    if (!idToken) return res.status(401).json({ message: "토큰이 없습니다." });

    const decoded = await admin.auth().verifyIdToken(idToken);

    const post = await Post.findById(id);
    if (!post)
      return res.status(404).json({ message: "게시글이 존재하지 않습니다." });

    if (post.author.uid !== decoded.uid) {
      return res.status(403).json({ message: "작성자만 삭제할 수 있습니다." });
    }

    await post.deleteOne();
    res.status(200).json({ message: "게시글이 삭제되었습니다." });
  } catch (err) {
    console.error("❌ 게시글 삭제 실패:", err);
    res.status(500).json({ message: "서버 오류", error: err.message });
  }
});
export default router;
