"use client";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/store/authStore";

export function useLoginLogout() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleClick = async () => {
    if (user) {
      try {
        await signOut(auth);
        logout();
        router.push("/login");
      } catch (err) {
        console.error("로그아웃 실패:", err);
      }
    } else {
      router.push("/login");
    }
  };

  return {
    user,
    handleClick,
  };
}
