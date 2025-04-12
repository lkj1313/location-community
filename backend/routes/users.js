// backend/routes/users.js
import express from "express";
import admin from "../firebaseAdmin.js"; // firebase-admin 초기화 모듈
import User from "../models/User.js"; // 유저 스키마

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const idToken = req.headers.authorization?.split(" ")[1];
    if (!idToken) {
      return res.status(401).json({ message: "ID 토큰 누락됨" });
    }

    const decoded = await admin.auth().verifyIdToken(idToken); //  토큰 검증
    const { uid, email, nickname } = req.body;

    if (decoded.uid !== uid) {
      return res
        .status(403)
        .json({ message: "인증된 사용자 정보가 일치하지 않음" });
    }

    const existing = await User.findOne({ uid });
    if (existing) {
      return res
        .status(200)
        .json({ message: "이미 등록된 사용자입니다.", user: existing });
    }

    const newUser = await User.create({ uid, email, nickname });
    return res.status(201).json(newUser);
  } catch (err) {
    console.error("❌ 유저 저장 실패:", err);
    res.status(500).json({ message: "유저 저장 실패", error: err.message });
  }
});

export default router;
