"use client";

import { useState, useEffect } from "react";
import { ScanPlan, PLAN_LIMITS } from "@/lib/scanner/types";
import { useTranslation } from "@/lib/i18n/LanguageProvider";
import { TranslationKey } from "@/lib/i18n/translations";

interface ScannerLoadingProps {
  plan: ScanPlan;
}

const STEP_KEYS: TranslationKey[] = [
  "scanner.step.connecting",
  "scanner.step.homepage",
  "scanner.step.sitemap",
  "scanner.step.pages",
  "scanner.step.analytics",
  "scanner.step.pixels",
  "scanner.step.consent",
  "scanner.step.legal",
  "scanner.step.score",
];

export default function ScannerLoading({ plan }: ScannerLoadingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const pageLimit = PLAN_LIMITS[plan];
  const { t } = useTranslation();

  useEffect(() => {
    const intervalMs = plan === "gratuit" ? 600 : plan === "rapide" ? 800 : 1000;
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < STEP_KEYS.length - 1 ? prev + 1 : prev));
    }, intervalMs);
    return () => clearInterval(interval);
  }, [plan]);

  const planLabel = plan === "gratuit" ? t("plan.free") : plan === "rapide" ? t("plan.fast") : t("plan.complete");

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-8 shadow-sm">
        {/* Plan info */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Plan <span className="font-semibold text-gray-900 dark:text-gray-100">{planLabel}</span>
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {t("plan.upTo")} <span className="font-semibold text-emerald-800">{pageLimit} {t("plan.pages")}</span>
          </span>
        </div>

        <div className="space-y-4">
          {STEP_KEYS.map((key, i) => (
            <div key={key} className="flex items-center gap-3">
              {i < currentStep ? (
                <svg className="w-5 h-5 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              ) : i === currentStep ? (
                <div className="w-5 h-5 shrink-0 border-2 border-emerald-700 border-t-transparent rounded-full animate-spin" />
              ) : (
                <div className="w-5 h-5 shrink-0 rounded-full border-2 border-gray-300 dark:border-gray-600" />
              )}
              <span className={`text-sm ${i < currentStep ? "text-gray-900 dark:text-gray-100 font-medium" : i === currentStep ? "text-emerald-800 font-medium" : "text-gray-400 dark:text-gray-500"}`}>
                {t(key)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
