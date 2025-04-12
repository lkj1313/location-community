// layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import BodyWrapper from "@/components/layout/BodyWrapper";
import ConditionalHeader from "@/components/layout/ConditionalHeader";
import Head from "next/head";
import Footer from "@/components/layout/Footer";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

// 1. 폰트 객체 생성 (subset, variable 옵션 사용 가능)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Loca",
  description: "위치 기반 커뮤니티 앱",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${inter.className} `}>
      <body>
        <Head>
          <link rel="icon" href="/favicon.ico" /> {/* 파비콘 링크 추가 */}
        </Head>
        <ReactQueryProvider>
          <BodyWrapper>
            <ConditionalHeader />
            {children}
            <Footer />
          </BodyWrapper>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
