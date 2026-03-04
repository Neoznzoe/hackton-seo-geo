"use client";

import { useEffect } from "react";
import { trackToolView, trackExternalLink, trackClickCompare } from "@/lib/tracking";

interface ToolPageTrackerProps {
  toolSlug: string;
  toolName: string;
  websiteUrl: string;
  comparisons: { slug: string; otherToolName: string }[];
}

export default function ToolPageTracker({
  toolSlug,
  toolName,
  websiteUrl,
  comparisons,
}: ToolPageTrackerProps) {
  useEffect(() => {
    trackToolView(toolSlug);
  }, [toolSlug]);

  return (
    <>
      {/* External link tracker - replaces the static <a> */}
      <a
        href={websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
        onClick={() => trackExternalLink(toolName, websiteUrl)}
      >
        Visiter le site officiel &rarr;
      </a>
    </>
  );
}

export function CompareLink({
  href,
  toolName,
  otherToolName,
  children,
}: {
  href: string;
  toolName: string;
  otherToolName: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow text-sm font-medium text-blue-600 hover:text-blue-800"
      onClick={() => trackClickCompare(toolName, otherToolName)}
    >
      {children}
    </a>
  );
}
