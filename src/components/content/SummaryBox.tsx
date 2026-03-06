"use client";

import { useTranslation } from "@/lib/i18n/LanguageProvider";

interface SummaryBoxProps {
  points: string[];
  conclusion?: string;
}

export default function SummaryBox({ points, conclusion }: SummaryBoxProps) {
  const { t } = useTranslation();

  return (
    <aside className="bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-lg p-6 mb-8">
      <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-300 uppercase tracking-wide mb-3">
        {t("summary.title")}
      </p>
      <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
        {points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
      {conclusion && (
        <p className="mt-4 text-sm text-gray-800 dark:text-gray-200 font-medium border-t border-emerald-200 dark:border-emerald-800 pt-3">
          {conclusion}
        </p>
      )}
    </aside>
  );
}
