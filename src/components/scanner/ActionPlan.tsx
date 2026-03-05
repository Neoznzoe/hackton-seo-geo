import Link from "next/link";
import { Recommendation } from "@/lib/scanner/types";
import { trackEvent } from "@/lib/tracking";

interface ActionPlanProps {
  recommendations: Recommendation[];
}

const PRIORITY_CONFIG = {
  high: {
    label: "Urgent",
    dotColor: "bg-red-500",
    borderColor: "border-l-red-500",
  },
  medium: {
    label: "Recommande",
    dotColor: "bg-amber-500",
    borderColor: "border-l-amber-500",
  },
  low: {
    label: "Optionnel",
    dotColor: "bg-green-500",
    borderColor: "border-l-green-500",
  },
};

export default function ActionPlan({ recommendations }: ActionPlanProps) {
  if (recommendations.length === 0) return null;

  const highCount = recommendations.filter((r) => r.priority === "high").length;
  const mediumCount = recommendations.filter((r) => r.priority === "medium").length;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Plan d&apos;action</h2>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          {highCount > 0 && (
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              {highCount} urgent{highCount > 1 ? "s" : ""}
            </span>
          )}
          {mediumCount > 0 && (
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              {mediumCount} recommande{mediumCount > 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec, i) => {
          const config = PRIORITY_CONFIG[rec.priority];
          return (
            <div
              key={rec.title}
              className={`bg-white border border-gray-200 ${config.borderColor} border-l-4 rounded-lg p-4 shadow-sm`}
            >
              <div className="flex items-start gap-3">
                {/* Step number */}
                <div className={`w-7 h-7 ${config.dotColor} text-white rounded-full flex items-center justify-center shrink-0 text-xs font-bold`}>
                  {i + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 text-sm">{rec.title}</h3>
                    <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wide shrink-0">
                      {config.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2 leading-relaxed">{rec.description}</p>
                  <Link
                    href={rec.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("scanner", "action_plan_click", rec.link)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900 transition-colors"
                  >
                    {rec.linkLabel}
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
