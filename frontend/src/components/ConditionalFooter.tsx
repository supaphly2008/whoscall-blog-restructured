"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();

  // Don't render the footer on Sanity Studio pages
  if (pathname.startsWith("/studio")) {
    return null;
  }

  return <Footer />;
}
