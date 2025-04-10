"use client";

import useDarkMode from "@/store/darkModeStroe";

export default function BodyWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {children}
    </div>
  );
}
