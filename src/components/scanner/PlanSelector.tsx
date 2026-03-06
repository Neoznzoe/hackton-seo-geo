"use client";

import { ScanPlan } from "@/lib/scanner/types";
import { trackScanPlanSelect } from "@/lib/tracking";
import { useTranslation } from "@/lib/i18n/LanguageProvider";
import { TranslationKey } from "@/lib/i18n/translations";

interface PlanSelectorProps {
  selectedPlan: ScanPlan;
  onSelectPlan: (plan: ScanPlan) => void;
  isLoading: boolean;
}

const PLANS: { id: ScanPlan; nameKey: TranslationKey; pages: number; price: string; descKey: TranslationKey; ctaKey: TranslationKey }[] = [
  {
    id: "gratuit",
    nameKey: "plan.free",
    pages: 5,
    price: "0 \u20ac",
    descKey: "plan.freeDesc",
    ctaKey: "plan.analyze",
  },
  {
    id: "rapide",
    nameKey: "plan.fast",
    pages: 25,
    price: "9 \u20ac",
    descKey: "plan.fastDesc",
    ctaKey: "plan.unlock",
  },
  {
    id: "complet",
    nameKey: "plan.complete",
    pages: 50,
    price: "19 \u20ac",
    descKey: "plan.completeDesc",
    ctaKey: "plan.unlock",
  },
];

export default function PlanSelector({ selectedPlan, onSelectPlan, isLoading }: PlanSelectorProps) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl mx-auto">
      {PLANS.map((plan) => {
        const isSelected = selectedPlan === plan.id;
        return (
          <button
            key={plan.id}
            onClick={() => { trackScanPlanSelect(plan.id); onSelectPlan(plan.id); }}
            disabled={isLoading}
            className={`relative flex flex-col items-center p-4 rounded-xl border-2 transition-all text-left ${
              isSelected
                ? "border-emerald-700 bg-emerald-50 dark:bg-emerald-950 shadow-md"
                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm"
            } ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            {plan.id === "rapide" && (
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-emerald-700 text-white text-[10px] font-bold rounded-full uppercase tracking-wide">
                {t("plan.popular")}
              </span>
            )}
            <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{t(plan.nameKey)}</span>
            <span className="text-2xl font-bold text-emerald-800 mt-1">{plan.pages}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{t("plan.pagesMax")}</span>
            <span className="text-xs text-gray-400 dark:text-gray-500 mt-1 text-center">{t(plan.descKey)}</span>
            <span className={`mt-2 text-xs font-semibold px-3 py-1 rounded-full ${
              plan.id === "gratuit"
                ? "bg-green-100 dark:bg-green-950 text-green-700"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
            }`}>
              {plan.price}
            </span>
          </button>
        );
      })}
    </div>
  );
}
