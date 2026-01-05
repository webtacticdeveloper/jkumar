"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Always scroll to top on route change
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
