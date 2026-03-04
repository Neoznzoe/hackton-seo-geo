"use client";

import { useEffect } from "react";
import PiwikPro from "@piwikpro/react-piwik-pro";

export default function PiwikProProvider() {
  useEffect(() => {
    PiwikPro.initialize(
      "63d0dcd9-adc4-4484-9a9b-5d278b1ca118",
      "https://neoznzoe.containers.piwik.pro"
    );
  }, []);

  return null;
}
