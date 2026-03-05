"use client";

import { ScanPlan } from "@/lib/scanner/types";
import { trackScanPlanSelect } from "@/lib/tracking";

interface PlanSelectorProps {
  selectedPlan: ScanPlan;
  onSelectPlan: (plan: ScanPlan) => void;
  isLoading: boolean;
}

const PLANS: { id: ScanPlan; name: string; pages: number; price: string; description: string; cta: string }[] = [
  {
    id: "gratuit",
    name: "Gratuit",
    pages: 5,
    price: "0 €",
    description: "Analyse rapide des pages principales",
    cta: "Analyser",
  },
  {
    id: "rapide",
    name: "Rapide",
    pages: 25,
    price: "9 €",
    description: "Couverture étendue du site",
    cta: "Débloquer",
  },
  {
    id: "complet",
    name: "Complet",
    pages: 50,
    price: "19 €",
    description: "Audit exhaustif de toutes les pages",
    cta: "Débloquer",
  },
];

export default function PlanSelector({ selectedPlan, onSelectPlan, isLoading }: PlanSelectorProps) {
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
                ? "border-blue-600 bg-blue-50 shadow-md"
                : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
            } ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            {plan.id === "rapide" && (
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wide">
                Populaire
              </span>
            )}
            <span className="text-sm font-bold text-gray-900">{plan.name}</span>
            <span className="text-2xl font-bold text-blue-700 mt-1">{plan.pages}</span>
            <span className="text-xs text-gray-500">pages max</span>
            <span className="text-xs text-gray-400 mt-1 text-center">{plan.description}</span>
            <span className={`mt-2 text-xs font-semibold px-3 py-1 rounded-full ${
              plan.id === "gratuit"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}>
              {plan.price}
            </span>
          </button>
        );
      })}
    </div>
  );
}
