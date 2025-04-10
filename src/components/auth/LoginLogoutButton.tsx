// src/components/LoginLogoutButton.tsx
"use client";

import Button from "@/components/ui/Button";
import { useLoginLogout } from "@/hooks/auth/useLoginLogout";

export default function LoginLogoutButton() {
  const { user, handleClick } = useLoginLogout();

  return (
    <Button
      variant={user ? "secondary" : "primary"}
      size="medium"
      onClick={handleClick}
    >
      {user ? "로그아웃" : "로그인"}
    </Button>
  );
}
