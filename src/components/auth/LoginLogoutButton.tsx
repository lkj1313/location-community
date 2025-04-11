// src/components/LoginLogoutButton.tsx
"use client";

import Button from "@/components/ui/Button";
import { useLoginLogout } from "@/hooks/auth/useLoginLogout";

export default function LoginLogoutButton() {
  const { user, handleClick } = useLoginLogout();

  return (
    <Button
      variant={user ? "secondary" : "primary"}
      size="small"
      onClick={handleClick}
      className="text-base p-2 "
    >
      {user ? "로그아웃" : "로그인"}
    </Button>
  );
}
