"use client";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { useSignUp } from "@/hooks/auth/useSignup";
import Link from "next/link";

export default function SignUpPage() {
  const { form, loading, handleChange, handleSubmit } = useSignUp();

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/logo.png"
            alt="로고"
            width={50}
            height={50}
            className="mb-4"
          />
          <div>
            이미 회원이신가요?{" "}
            <Link href="/login">
              <span className="text-blue-400 underline">로그인 하기</span>
            </Link>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center mb-2">회원가입</h1>

        <Input
          type="email"
          name="email"
          id="email"
          placeholder="이메일"
          defaultValue={form.email}
          onChange={handleChange}
          label="이메일"
          required
        />
        <Input
          type="text"
          name="name"
          id="name"
          placeholder="이름"
          defaultValue={form.name}
          onChange={handleChange}
          label="이름"
          required
        />
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="비밀번호"
          defaultValue={form.password}
          onChange={handleChange}
          label="비밀번호"
          required
        />

        <Button type="submit" disabled={loading}>
          {loading ? "가입 중..." : "가입하기"}
        </Button>
      </form>
    </main>
  );
}
