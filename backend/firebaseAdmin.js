// backend/firebase-admin.js
import admin from "firebase-admin";
import { readFileSync } from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// serviceAccountKey.json 경로
const serviceAccount = JSON.parse(
  readFileSync(path.resolve("firebase-service-account.json"))
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
