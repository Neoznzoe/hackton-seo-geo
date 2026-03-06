"use client";

import { useState } from "react";
import { PageDetail } from "@/lib/scanner/types";
import { useTranslation } from "@/lib/i18n/LanguageProvider";

interface PageDetailsCardProps {
  pageDetails: PageDetail[];
  pagesScanned: number;
}

type Filter = "all" | "issues" | "clean";

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
  const [filter, setFilter] = useState<Filter>("all");

  const pagesWithIssues = pageDetails.filter((p) => p.issues.length > 0);
  const pagesClean = pageDetails.filter((p) => p.issues.length === 0);

  const filtered = filter === "all"
    ? pageDetails
    : filter === "issues"
      ? pagesWithIssues
      : pagesClean;

  if (pageDetails.length === 0) return null;

  const filters: { key: Filter; labelKey: "pageDetails.filterAll" | "pageDetails.filterIssues" | "pageDetails.filterClean"; count: number }[] = [
    { key: "all", labelKey: "pageDetails.filterAll", count: pageDetails.length },
    { key: "issues", labelKey: "pageDetails.filterIssues", count: pagesWithIssues.length },
    { key: "clean", labelKey: "pageDetails.filterClean", count: pagesClean.length },
  ];

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
        {t("pageDetails.title")}
        <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
          {pagesScanned} {t("pageDetails.pagesScanned")}
        </span>
      </h2>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 w-fit">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              filter === f.key
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            {t(f.labelKey)}
            <span className={`ml-1.5 text-xs ${
              filter === f.key
                ? f.key === "issues" && f.count > 0
                  ? "text-red-600 dark:text-red-400"
                  : f.key === "clean"
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-500 dark:text-gray-400"
                : "text-gray-400 dark:text-gray-500"
            }`}>
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* Pages list */}
      <div className="space-y-2">
        {filtered.map((page) => (
          <div
            key={page.url}
            className={`border rounded-lg p-4 ${
              page.issues.length > 0
                ? "border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/30"
                : "border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/30"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                {page.issues.length > 0 ? (
                  <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                <code className="text-sm font-mono text-gray-700 dark:text-gray-300 truncate">
                  {page.path === "/" ? `/ ${t("pageDetails.homepage")}` : page.path}
                </code>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {page.toolsFound.length > 0 && (
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {page.toolsFound.length} tool{page.toolsFound.length > 1 ? "s" : ""}
                  </span>
                )}
                {page.issues.length > 0 ? (
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300">
                    {page.issues.length} {page.issues.length > 1 ? t("pageDetails.issues") : t("pageDetails.issue")}
                  </span>
                ) : (
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                    OK
                  </span>
                )}
              </div>
            </div>

            {page.issues.length > 0 && (
              <ul className="mt-3 space-y-1.5 pl-6">
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
              <div className={`flex flex-wrap gap-1.5 ${page.issues.length > 0 ? "mt-2 pl-6" : "mt-2 pl-6"}`}>
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
    </div>
  );
}
