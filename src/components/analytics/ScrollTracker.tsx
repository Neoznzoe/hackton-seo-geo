"use client";

import { useEffect, useRef } from "react";
import { trackScrollDepth } from "@/lib/tracking";

export default function ScrollTracker() {
  const tracked = useRef(new Set<number>());

  useEffect(() => {
    function handleScroll() {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const percent = Math.round((window.scrollY / scrollHeight) * 100);
      const thresholds = [25, 50, 75, 100];

      for (const t of thresholds) {
        if (percent >= t && !tracked.current.has(t)) {
          tracked.current.add(t);
          trackScrollDepth(t);
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
