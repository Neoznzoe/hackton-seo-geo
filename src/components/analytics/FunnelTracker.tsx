"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  trackUserSegment,
  trackEntryPoint,
  trackPageLanding,
  trackTimeOnPage,
} from "@/lib/tracking";

function getPageType(pathname: string): string {
  if (pathname === "/") return "homepage";
  if (pathname.startsWith("/outils/")) return "tool";
  if (pathname.startsWith("/comparer/")) return "comparison";
  if (pathname === "/comparer") return "compare_index";
  if (pathname === "/scanner") return "scanner";
  if (pathname === "/glossaire") return "glossary";
  if (pathname.startsWith("/categorie/")) return "category";
  if (pathname.startsWith("/guide/")) return "guide";
  if (pathname.startsWith("/ressources/")) return "resource";
  return "other";
}

export default function FunnelTracker() {
  const pathname = usePathname();
  const segmentTracked = useRef(false);
  const pageEntryTime = useRef<number>(Date.now());

  // Track user segment + entry source once per session
  useEffect(() => {
    if (segmentTracked.current) return;
    segmentTracked.current = true;

    trackUserSegment();
    trackEntryPoint(document.referrer);
  }, []);

  // Track page landing + time on page
  useEffect(() => {
    const pageType = getPageType(pathname);
    const slug = pathname.split("/").pop() || "";
    trackPageLanding(pageType, slug);
    pageEntryTime.current = Date.now();

    return () => {
      const seconds = Math.round((Date.now() - pageEntryTime.current) / 1000);
      if (seconds >= 5) {
        trackTimeOnPage(seconds, pageType);
      }
    };
  }, [pathname]);

  return null;
}
