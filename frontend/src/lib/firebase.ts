// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqJT7xcXNyptSX4wn9umiDuvPTzv079Cs",
  authDomain: "locatio-6d4bc.firebaseapp.com",
  projectId: "locatio-6d4bc",
  storageBucket: "locatio-6d4bc.firebasestorage.app",
  messagingSenderId: "266978474861",
  appId: "1:266978474861:web:95332e4fde4a8572d1b864",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
