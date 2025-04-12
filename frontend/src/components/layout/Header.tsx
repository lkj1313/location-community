"use client";

import useDarkMode from "@/store/darkModeStroe";
import { Sun, Moon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";
import LoginLogoutButton from "../auth/LoginLogoutButton";
interface HeaderProps {
  children?: React.ReactNode;
}
export default function Header({ children }: HeaderProps) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className="w-screen  bg-gray-900 text-white shadow-md border-b border-green-100">
      <div className="w-full  flex  items-center justify-between sm:px-30 py-3">
        <Link href="/" className="flex items-center cursor-pointer">
          <Image
            src="/logo.png"
            alt="로고"
            width={50}
            height={50}
            className=""
          />{" "}
          <span className="select-none">Loca</span>
        </Link>
        {children}
        <div className="flex items-center gap-5 sm:gap-10">
          <LoginLogoutButton />
          <Button
            variant={isDarkMode ? "secondary" : "light"} // 다크 모드일 때 색상 변경
            size="small" // 버튼 크기
            onClick={toggleDarkMode}
            fullWidth={false} // 필요하면 fullWidth 사용
            className=""
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
