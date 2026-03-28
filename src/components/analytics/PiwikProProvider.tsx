"use client";

import { useEffect, useRef } from "react";
import PiwikPro, { PageViews } from "@piwikpro/react-piwik-pro";
import { usePathname } from "next/navigation";
import { getConsent } from "./CookieConsent";

const PIWIK_ID = "63d0dcd9-adc4-4484-9a9b-5d278b1ca118";
const PIWIK_URL = "https://neoznzoe.containers.piwik.pro";

export default function PiwikProProvider() {
  const pathname = usePathname();
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    const consent = getConsent();

    // Always initialize Piwik Pro — cookieless mode for non-consented users
    PiwikPro.initialize(PIWIK_ID, PIWIK_URL);
    initialized.current = true;

    if (consent !== "accepted") {
      // Cookieless tracking: disable cookies and fingerprinting
      // This provides basic anonymous analytics without requiring consent (CNIL-exempt)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const _paq = ((window as any)._paq as unknown[][]) || [];
      _paq.push(["disableCookies"]);
      _paq.push(["setCustomDimension", 1, "cookieless"]);
    }
  }, []);

  useEffect(() => {
    if (!initialized.current) return;
    PageViews.trackPageView();
  }, [pathname]);

  return null;
}
