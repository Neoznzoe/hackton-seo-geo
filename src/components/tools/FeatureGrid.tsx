"use client";

import { useLocalized } from "@/lib/i18n/useLocalized";
import { LocalizedString } from "@/lib/i18n/localize";

interface Feature {
  label: LocalizedString;
  available: boolean;
  detail?: LocalizedString;
}

interface FeatureGridProps {
  features: Feature[];
}

export default function FeatureGrid({ features }: FeatureGridProps) {
  const { l } = useLocalized();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {features.map((feature) => (
        <div
          key={l(feature.label)}
          className="flex items-start gap-2 p-3 border border-gray-100 dark:border-gray-800 rounded-lg"
        >
          {feature.available ? (
            <svg
              className="w-5 h-5 text-green-500 shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-red-400 shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
          <div>
            <span
              className={`text-sm font-medium ${
                feature.available ? "text-gray-900 dark:text-gray-100" : "text-gray-400 dark:text-gray-500"
              }`}
            >
              {l(feature.label)}
            </span>
            {feature.detail && (
              <span className="block text-xs text-gray-500 dark:text-gray-400">
                {l(feature.detail)}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
