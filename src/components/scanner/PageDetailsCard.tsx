"use client";

import { useState } from "react";
import { PageDetail } from "@/lib/scanner/types";
import { useTranslation } from "@/lib/i18n/LanguageProvider";

interface PageDetailsCardProps {
  pageDetails: PageDetail[];
  pagesScanned: number;
}

const SEVERITY_STYLES = {
  high: "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300",
  medium: "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300",
  low: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
};

const SEVERITY_KEYS: Record<string, "pageDetails.severityHigh" | "pageDetails.severityMedium" | "pageDetails.severityLow"> = {
  high: "pageDetails.severityHigh",
  medium: "pageDetails.severityMedium",
  low: "pageDetails.severityLow",
};

function translateLabel(label: string, t: (key: "pageDetails.consentMissing" | "pageDetails.nonExempt") => string): string {
  if (label === "__consent_missing__") return t("pageDetails.consentMissing");
  return label.replace("(__non_exempt__)", `(${t("pageDetails.nonExempt")})`);
}

export default function PageDetailsCard({ pageDetails, pagesScanned }: PageDetailsCardProps) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  const pagesWithIssues = pageDetails.filter((p) => p.issues.length > 0);
  const pagesClean = pagesScanned - pagesWithIssues.length;

  if (pageDetails.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between text-left"
      >
        <div>
          <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg">
            {t("pageDetails.title")}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {pagesWithIssues.length > 0 ? (
              <>
                <span className="text-red-600 dark:text-red-400 font-semibold">
                  {pagesWithIssues.length}
                </span>{" "}
                {pagesWithIssues.length > 1
                  ? t("pageDetails.pagesWithIssuesPlural")
                  : t("pageDetails.pagesWithIssues")}
                {pagesClean > 0 && (
                  <span className="text-green-600 dark:text-green-400">
                    {" "}&middot; {pagesClean} {t("pageDetails.clean")}
                  </span>
                )}
              </>
            ) : (
              <span className="text-green-600 dark:text-green-400">
                {t("pageDetails.noIssues")}
              </span>
            )}
          </p>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${expanded ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {expanded && (
        <div className="mt-4 space-y-3">
          {pageDetails.map((page) => (
            <div
              key={page.url}
              className={`border rounded-lg p-4 ${
                page.issues.length > 0
                  ? "border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/30"
                  : "border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/30"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <code className="text-sm font-mono text-gray-700 dark:text-gray-300 truncate">
                  {page.path}
                </code>
                {page.issues.length > 0 ? (
                  <span className="shrink-0 text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300">
                    {page.issues.length} {page.issues.length > 1 ? t("pageDetails.issues") : t("pageDetails.issue")}
                  </span>
                ) : (
                  <span className="shrink-0 text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                    OK
                  </span>
                )}
              </div>

              {page.issues.length > 0 && (
                <ul className="space-y-1.5">
                  {page.issues.map((issue, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <span className={`inline-block px-1.5 py-0.5 rounded text-xs font-medium ${SEVERITY_STYLES[issue.severity]}`}>
                        {t(SEVERITY_KEYS[issue.severity])}
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">{translateLabel(issue.label, t)}</span>
                    </li>
                  ))}
                </ul>
              )}

              {page.toolsFound.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {page.toolsFound.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
