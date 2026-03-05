import { RiskLevel } from "@/lib/scanner/types";

interface GlobalScoreCardProps {
  score: number;
  level: RiskLevel;
  url: string;
}

const LEVEL_CONFIG = {
  faible: {
    label: "Excellent",
    subtitle: "Votre site est bien configure",
    color: "text-green-700",
    bg: "bg-gradient-to-br from-green-50 to-emerald-50",
    border: "border-green-300",
    ring: "stroke-green-500",
    trackColor: "stroke-green-200",
  },
  moyen: {
    label: "A ameliorer",
    subtitle: "Des points d'attention ont ete detectes",
    color: "text-amber-700",
    bg: "bg-gradient-to-br from-amber-50 to-orange-50",
    border: "border-amber-300",
    ring: "stroke-amber-500",
    trackColor: "stroke-amber-200",
  },
  eleve: {
    label: "Non conforme",
    subtitle: "Des risques importants ont ete identifies",
    color: "text-red-700",
    bg: "bg-gradient-to-br from-red-50 to-rose-50",
    border: "border-red-300",
    ring: "stroke-red-500",
    trackColor: "stroke-red-200",
  },
};

export default function GlobalScoreCard({ score, level, url }: GlobalScoreCardProps) {
  const config = LEVEL_CONFIG[level];
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className={`${config.bg} ${config.border} border rounded-2xl p-8 shadow-sm`}>
      <div className="flex flex-col sm:flex-row items-center gap-8">
        {/* Big score circle */}
        <div className="relative w-40 h-40 shrink-0">
          <svg className="w-40 h-40 -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" strokeWidth="10" className={config.trackColor} />
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              strokeWidth="10"
              strokeLinecap="round"
              className={config.ring}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-5xl font-bold ${config.color}`}>{score}</span>
            <span className="text-sm font-medium text-gray-500">/100</span>
          </div>
        </div>

        {/* Info */}
        <div className="text-center sm:text-left">
          <p className="text-sm text-gray-500 mb-1 truncate max-w-xs">{url}</p>
          <h2 className={`text-2xl font-bold ${config.color} mb-1`}>
            {config.label}
          </h2>
          <p className="text-gray-700">
            {config.subtitle}
          </p>
          <p className="text-xs text-gray-400 mt-3">
            Score global base sur la conformite RGPD, le consentement, les trackers et les bonnes pratiques.
          </p>
        </div>
      </div>
    </div>
  );
}
