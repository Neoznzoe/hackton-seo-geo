"use client";

import { ConsentEffectiveness } from "@/lib/scanner/types";
import { useTranslation } from "@/lib/i18n/LanguageProvider";

interface ConsentEffectivenessCardProps {
  effectiveness: ConsentEffectiveness;
  hasConsentBanner: boolean;
}

export default function ConsentEffectivenessCard({ effectiveness, hasConsentBanner }: ConsentEffectivenessCardProps) {
  const { t } = useTranslation();

  if (!hasConsentBanner) return null;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-9 h-9 ${effectiveness.scriptsBlocked ? "bg-green-50 dark:bg-green-950" : "bg-amber-50 dark:bg-amber-950"} rounded-lg flex items-center justify-center shrink-0`}>
          <svg
            className={`w-5 h-5 ${effectiveness.scriptsBlocked ? "text-green-600" : "text-amber-600"}`}
            fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{t("consentEff.title")}</h3>
          <p className={`text-xs ${effectiveness.scriptsBlocked ? "text-green-600" : "text-amber-600"}`}>
            {effectiveness.scriptsBlocked
              ? t("consentEff.blocked")
              : t("consentEff.notBlocked")}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {effectiveness.details.map((detail) => (
          <div key={detail} className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0 text-gray-400 dark:text-gray-500 text-xs">&#8226;</span>
            <p className="text-xs text-gray-700 dark:text-gray-300">{detail}</p>
          </div>
        ))}
      </div>

      {!effectiveness.scriptsBlocked && (
        <div className="mt-3 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-700 rounded-lg p-3">
          <p className="text-xs text-amber-800">
            {t("consentEff.warning")}
          </p>
        </div>
      )}
    </div>
  );
}
