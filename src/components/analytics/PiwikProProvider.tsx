"use client";

import { useEffect, useRef } from "react";
import PiwikPro, { PageViews } from "@piwikpro/react-piwik-pro";
import { usePathname } from "next/navigation";
import { getConsent } from "./CookieConsent";

export default function PiwikProProvider() {
  const pathname = usePathname();
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    const consent = getConsent();
    if (consent !== "accepted") return;

    PiwikPro.initialize(
      "63d0dcd9-adc4-4484-9a9b-5d278b1ca118",
      "https://neoznzoe.containers.piwik.pro"
    );
    initialized.current = true;
  }, []);

  useEffect(() => {
    if (!initialized.current) return;

    PageViews.trackPageView();
  }, [pathname]);

  return null;
}
