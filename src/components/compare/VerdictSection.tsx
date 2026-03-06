"use client";

import { LocalizedString } from "@/lib/i18n/localize";
import { useLocalized } from "@/lib/i18n/useLocalized";

interface VerdictSectionProps {
  verdict: {
    startup: LocalizedString;
    enterprise: LocalizedString;
    privacy: LocalizedString;
    budget: LocalizedString;
  };
}

const verdictLabels: { key: keyof VerdictSectionProps["verdict"]; label: LocalizedString; icon: string }[] = [
  { key: "startup", label: { fr: "Pour une startup", en: "For a startup" }, icon: "🚀" },
  { key: "enterprise", label: { fr: "Pour une entreprise", en: "For an enterprise" }, icon: "🏢" },
  { key: "privacy", label: { fr: "Pour la vie privee", en: "For privacy" }, icon: "🔒" },
  { key: "budget", label: { fr: "Pour un petit budget", en: "On a budget" }, icon: "💰" },
];

export default function VerdictSection({ verdict }: VerdictSectionProps) {
  const { l } = useLocalized();

  return (
    <section aria-labelledby="verdict" className="mb-12">
      <h2 id="verdict" className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        {l({ fr: "Notre verdict par cas d\u2019usage", en: "Our verdict by use case" })}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {verdictLabels.map(({ key, label, icon }) => (
          <div key={key} className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
            <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              <span aria-hidden="true" className="mr-2">{icon}</span>
              {l(label)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{l(verdict[key])}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
