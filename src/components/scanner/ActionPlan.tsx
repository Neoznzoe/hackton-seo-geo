"use client";

import Link from "next/link";
import { Recommendation } from "@/lib/scanner/types";
import { trackScanRecommendationClick } from "@/lib/tracking";
import { useTranslation } from "@/lib/i18n/LanguageProvider";

interface ActionPlanProps {
  recommendations: Recommendation[];
}

export default function ActionPlan({ recommendations }: ActionPlanProps) {
  const { t } = useTranslation();

  if (recommendations.length === 0) return null;

  const highCount = recommendations.filter((r) => r.priority === "high").length;
  const mediumCount = recommendations.filter((r) => r.priority === "medium").length;

  const priorityConfig = {
    high: {
      label: t("scanner.urgent"),
      dotColor: "bg-red-500",
      borderColor: "border-l-red-500",
    },
    medium: {
      label: t("scanner.recommended"),
      dotColor: "bg-amber-500",
      borderColor: "border-l-amber-500",
    },
    low: {
      label: t("scanner.optional"),
      dotColor: "bg-green-500",
      borderColor: "border-l-green-500",
    },
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{t("scanner.actionPlan")}</h2>
        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
          {highCount > 0 && (
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              {highCount} {t("scanner.urgent").toLowerCase()}{highCount > 1 ? "s" : ""}
            </span>
          )}
          {mediumCount > 0 && (
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              {mediumCount} {t("scanner.recommended").toLowerCase()}{mediumCount > 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec, i) => {
          const config = priorityConfig[rec.priority];
          return (
            <div
              key={rec.title}
              className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 ${config.borderColor} border-l-4 rounded-lg p-4 shadow-sm`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-7 h-7 ${config.dotColor} text-white rounded-full flex items-center justify-center shrink-0 text-xs font-bold`}>
                  {i + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{rec.title}</h3>
                    <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide shrink-0">
                      {config.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 leading-relaxed">{rec.description}</p>
                  <Link
                    href={rec.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackScanRecommendationClick(rec.link)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition-colors"
                  >
                    {rec.linkLabel}
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
