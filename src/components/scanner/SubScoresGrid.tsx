"use client";

import { useState } from "react";
import { SubScore, RiskLevel } from "@/lib/scanner/types";
import { useTranslation } from "@/lib/i18n/LanguageProvider";

interface SubScoresGridProps {
  subScores: {
    rgpd: SubScore;
    consent: SubScore;
    trackers: SubScore;
    legal: SubScore;
    bestPractices: SubScore;
    security?: SubScore;
    thirdParty?: SubScore;
  };
}

const ICONS: Record<string, string> = {
  rgpd: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
  consent: "M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3",
  trackers: "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  legal: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
  bestPractices: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z",
};

const LEVEL_COLORS: Record<RiskLevel, { bar: string; text: string; bg: string }> = {
  faible: { bar: "bg-green-500", text: "text-green-700", bg: "bg-green-50" },
  moyen: { bar: "bg-amber-500", text: "text-amber-700", bg: "bg-amber-50" },
  eleve: { bar: "bg-red-500", text: "text-red-700", bg: "bg-red-50" },
};

const NEGATIVE_KEYWORDS = [
  "manquant", "manquante", "manquantes",
  "missing",
  "sans consentement", "sans gestion",
  "without consent", "no consent",
  "non exempté", "non-exempté", "non-conforme",
  "non-exempt", "non-compliant",
  "Très peu", "en clair",
  "very few", "in plain",
  "simultanés", "optimisable",
  "simultaneous", "optimizable",
  "transfert de données", "collecte de données",
  "data transfer", "data collection",
  "Transfert d'", "transfère",
  "dépose", "déposent",
  "sets cookie", "drops cookie",
  "risque d", "risque de",
  "risk of",
  "quasi-complètes", "almost complete",
  "Aucun mécanisme", "Aucun blocage",
  "No mechanism", "No blocking",
];

function isNegativeDetail(detail: string): boolean {
  const lower = detail.toLowerCase();
  return NEGATIVE_KEYWORDS.some((kw) => lower.includes(kw.toLowerCase()));
}

function SubScoreCard({ id, sub }: { id: string; sub: SubScore }) {
  const [open, setOpen] = useState(false);
  const colors = LEVEL_COLORS[sub.level];
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-9 h-9 ${colors.bg} rounded-lg flex items-center justify-center shrink-0`}>
          <svg className={`w-5 h-5 ${colors.text}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d={ICONS[id]} />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{sub.label}</p>
        </div>
        <span className={`text-lg font-bold ${colors.text}`}>{sub.score}</span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 mb-3">
        <div
          className={`${colors.bar} h-2 rounded-full transition-all`}
          style={{ width: `${sub.score}%` }}
        />
      </div>

      {/* Toggle details */}
      <button
        onClick={() => setOpen(!open)}
        className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1"
      >
        {open ? t("scanner.hideDetail") : t("scanner.showDetail")}
        <svg
          className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul className="mt-3 space-y-1.5 border-t border-gray-100 dark:border-gray-800 pt-3">
          {sub.details.map((d) => {
            const negative = isNegativeDetail(d);
            return (
              <li key={d} className={`text-xs flex items-start gap-1.5 ${negative ? "text-red-700" : "text-green-700"}`}>
                {negative ? (
                  <svg className="w-3.5 h-3.5 mt-0.5 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5 mt-0.5 shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                )}
                <span>{d}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function SubScoresGrid({ subScores }: SubScoresGridProps) {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">{t("scanner.detailByCategory")}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SubScoreCard id="rgpd" sub={subScores.rgpd} />
        <SubScoreCard id="consent" sub={subScores.consent} />
        <SubScoreCard id="trackers" sub={subScores.trackers} />
        <SubScoreCard id="legal" sub={subScores.legal} />
        <SubScoreCard id="bestPractices" sub={subScores.bestPractices} />
      </div>
    </div>
  );
}
