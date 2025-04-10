import { useState, useEffect } from "react";
import { create } from "zustand";

interface DarkModeState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const useDarkModeStore = create<DarkModeState>((set) => ({
  isDarkMode: false, // 초기값을 false로 설정하고 useEffect에서 localStorage 값을 읽어옵니다.
  toggleDarkMode: () =>
    set((state) => {
      const newMode = !state.isDarkMode;
      if (typeof window !== "undefined") {
        // 브라우저 환경에서만 localStorage를 사용합니다.
        localStorage.setItem("darkMode", JSON.stringify(newMode));
      }
      document.documentElement.classList.toggle("dark", newMode);
      return { isDarkMode: newMode };
    }),
}));

// 컴포넌트 내부에서 useEffect 훅을 사용하여 초기값을 설정합니다.
export function useDarkMode() {
  const { isDarkMode, toggleDarkMode } = useDarkModeStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // 브라우저 환경에서만 localStorage를 사용합니다.
      const storedDarkMode = JSON.parse(
        localStorage.getItem("darkMode") || "false"
      );
      if (storedDarkMode !== isDarkMode) {
        // Zustand 스토어의 상태를 업데이트합니다.
        useDarkModeStore.setState({ isDarkMode: storedDarkMode });
        document.documentElement.classList.toggle("dark", storedDarkMode);
      }
    }
  }, []);

  return { isDarkMode, toggleDarkMode };
}

export default useDarkMode;
