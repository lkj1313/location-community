// src/store/authStore.ts
import { create } from "zustand";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase"; // Firebase 인증 가져오기

interface AuthState {
  user: any | null;
  login: (user: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null, // 초기 상태는 null로 설정
  login: (user) => set({ user }), // 로그인 시 상태 업데이트
  logout: () => set({ user: null }), // 로그아웃 시 상태 초기화
}));

// Firebase 인증 상태를 Zustand와 동기화
if (typeof window !== "undefined") {
  // 클라이언트 환경에서만 onAuthStateChanged 사용
  onAuthStateChanged(auth, (user) => {
    const store = useAuthStore.getState();
    if (user) {
      store.login(user); // Firebase 인증 정보로 상태 업데이트
    } else {
      store.logout(); // 인증되지 않은 상태로 설정
    }
  });
}
