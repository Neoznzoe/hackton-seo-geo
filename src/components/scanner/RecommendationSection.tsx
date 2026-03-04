import Link from "next/link";
import { Recommendation } from "@/lib/scanner/types";
import { trackEvent } from "@/lib/tracking";

interface RecommendationSectionProps {
  recommendations: Recommendation[];
}

const PRIORITY_STYLES = {
  high: "border-red-200 bg-red-50",
  medium: "border-orange-200 bg-orange-50",
  low: "border-green-200 bg-green-50",
};

const PRIORITY_LABELS = {
  high: { text: "Priorite haute", className: "bg-red-100 text-red-700" },
  medium: { text: "Recommande", className: "bg-orange-100 text-orange-700" },
  low: { text: "Optionnel", className: "bg-green-100 text-green-700" },
};

export default function RecommendationSection({ recommendations }: RecommendationSectionProps) {
  if (recommendations.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Recommandations</h2>
      <div className="space-y-4">
        {recommendations.map((rec) => {
          const style = PRIORITY_STYLES[rec.priority];
          const badge = PRIORITY_LABELS[rec.priority];
          return (
            <div key={rec.title} className={`border rounded-lg p-5 ${style}`}>
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-semibold text-gray-900">{rec.title}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${badge.className}`}>
                  {badge.text}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-3">{rec.description}</p>
              <Link
                href={rec.link}
                onClick={() => trackEvent("scanner", "recommendation_click", rec.link)}
                className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                {rec.linkLabel}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
