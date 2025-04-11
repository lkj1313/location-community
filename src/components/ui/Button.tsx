// src/components/ui/Button.tsx
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "light"; // 스타일 옵션
  size?: "small" | "medium" | "large"; // 버튼 크기 옵션
  fullWidth?: boolean; // 버튼을 전체 너비로 할지 여부
  className?: string; // 추가적인 클래스명
}

export default function Button({
  children,
  variant = "primary", // 기본값은 "primary"
  size = "medium", // 기본값은 "medium"
  fullWidth = false, // 기본값은 false
  className = "", // 추가적인 클래스명
  ...props
}: ButtonProps) {
  // 버튼 크기 스타일
  const sizeClasses = {
    small: "p-0", // 작은 사이즈
    medium: "px-6 py-2 text-base",
    large: "px-4 py-3 text-lg",
  };

  // 버튼 색상 스타일
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    light: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };

  return (
    <button
      {...props}
      className={`rounded-lg flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer ${
        sizeClasses[size]
      } ${variantClasses[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {children}
    </button>
  );
}
