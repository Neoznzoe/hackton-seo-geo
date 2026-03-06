"use client";

import { useTranslation } from "@/lib/i18n/LanguageProvider";

interface SummaryBoxProps {
  points: string[];
  conclusion?: string;
}

export default function SummaryBox({ points, conclusion }: SummaryBoxProps) {
  const { t } = useTranslation();

  return (
    <aside className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
      <p className="text-sm font-semibold text-blue-800 uppercase tracking-wide mb-3">
        {t("summary.title")}
      </p>
      <ul className="space-y-2 text-sm text-gray-700">
        {points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
      {conclusion && (
        <p className="mt-4 text-sm text-gray-800 font-medium border-t border-blue-200 pt-3">
          {conclusion}
        </p>
      )}
    </aside>
  );
}
