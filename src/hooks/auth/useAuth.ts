"use client";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase"; // Firebase auth import
import { useAuthStore } from "@/store/authStore"; // Zustand store

export function useAuth() {
  const { login, logout } = useAuthStore(); // Zustand 상태 관리

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        login(user); // Firebase 인증 정보가 있으면 Zustand 상태 업데이트
      } else {
        logout(); // 인증되지 않은 경우 상태 초기화
      }
    });

    return () => unsubscribe(); // cleanup
  }, [login, logout]);

  return useAuthStore(); // Zustand 상태 반환
}
