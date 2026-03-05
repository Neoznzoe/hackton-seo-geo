import Link from "next/link";
import { Recommendation } from "@/lib/scanner/types";
import { trackEvent } from "@/lib/tracking";

interface RecommendationSectionProps {
  recommendations: Recommendation[];
}

const PRIORITY_STYLES = {
  high: "border-red-300 bg-red-50",
  medium: "border-amber-300 bg-amber-50",
  low: "border-green-300 bg-green-50",
};

const PRIORITY_LABELS = {
  high: { text: "Priorite haute", className: "bg-red-100 text-red-800 border border-red-300" },
  medium: { text: "Recommande", className: "bg-amber-100 text-amber-800 border border-amber-300" },
  low: { text: "Optionnel", className: "bg-green-100 text-green-800 border border-green-300" },
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
            <div key={rec.title} className={`border rounded-xl p-5 shadow-sm ${style}`}>
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-bold text-gray-900">{rec.title}</h3>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${badge.className}`}>
                  {badge.text}
                </span>
              </div>
              <p className="text-sm text-gray-800 mb-3 leading-relaxed">{rec.description}</p>
              <Link
                href={rec.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("scanner", "recommendation_click", rec.link)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors"
              >
                {rec.linkLabel}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
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
