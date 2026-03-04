"use client";

import { useEffect } from "react";
import { trackComparison } from "@/lib/tracking";

interface ComparisonPageTrackerProps {
  tool1Slug: string;
  tool2Slug: string;
}

export default function ComparisonPageTracker({
  tool1Slug,
  tool2Slug,
}: ComparisonPageTrackerProps) {
  useEffect(() => {
    trackComparison(tool1Slug, tool2Slug);
  }, [tool1Slug, tool2Slug]);

  return null;
}
