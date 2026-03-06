"use client";

import { PricingTier } from "@/lib/types";
import { useLocalized } from "@/lib/i18n/useLocalized";

interface PricingTableProps {
  tiers: PricingTier[];
}

export default function PricingTable({ tiers }: PricingTableProps) {
  const { l } = useLocalized();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {tiers.map((tier) => (
        <div
          key={l(tier.name)}
          className={`border rounded-lg p-6 ${
            tier.highlighted
              ? "border-emerald-700 ring-2 ring-emerald-100"
              : "border-gray-200"
          }`}
        >
          <h3 className="font-semibold text-gray-900 text-lg">{l(tier.name)}</h3>
          <p className="mt-2">
            <span className="text-3xl font-bold text-gray-900">
              {tier.price}
            </span>
            {tier.period && (
              <span className="text-sm text-gray-500 ml-1">{l(tier.period)}</span>
            )}
          </p>
          <ul className="mt-4 space-y-2">
            {tier.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <svg
                  className="w-4 h-4 text-green-500 mt-0.5 shrink-0"
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
                {l(feature)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
