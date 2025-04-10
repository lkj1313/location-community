"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function ConditionalHeader() {
  const pathname = usePathname();

  const hideHeaderRoutes = ["/signup", "/login"];
  const shouldHideHeader = hideHeaderRoutes.includes(pathname);

  if (shouldHideHeader) return null;

  return <Header />;
}
