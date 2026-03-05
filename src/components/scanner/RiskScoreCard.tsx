import { RiskLevel } from "@/lib/scanner/types";

interface RiskScoreCardProps {
  score: number;
  level: RiskLevel;
  details: string[];
}

const LEVEL_CONFIG = {
  faible: {
    label: "Excellent",
    subtitle: "Votre site semble conforme",
    color: "text-green-800",
    bg: "bg-green-50",
    border: "border-green-300",
    ring: "stroke-green-500",
    trackColor: "stroke-green-200",
    badgeBg: "bg-green-100 text-green-800",
  },
  moyen: {
    label: "A ameliorer",
    subtitle: "Des points d'attention ont ete detectes",
    color: "text-amber-800",
    bg: "bg-amber-50",
    border: "border-amber-300",
    ring: "stroke-amber-500",
    trackColor: "stroke-amber-200",
    badgeBg: "bg-amber-100 text-amber-800",
  },
  eleve: {
    label: "Non conforme",
    subtitle: "Des risques importants ont ete identifies",
    color: "text-red-800",
    bg: "bg-red-50",
    border: "border-red-300",
    ring: "stroke-red-500",
    trackColor: "stroke-red-200",
    badgeBg: "bg-red-100 text-red-800",
  },
};

export default function RiskScoreCard({ score, level, details }: RiskScoreCardProps) {
  const config = LEVEL_CONFIG[level];
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className={`${config.bg} ${config.border} border rounded-xl p-6 shadow-sm`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Score de conformite RGPD</h2>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${config.badgeBg}`}>
          {config.label}
        </span>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Score circle */}
        <div className="relative w-32 h-32 shrink-0">
          <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" strokeWidth="8" className={config.trackColor} />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              className={config.ring}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-bold ${config.color}`}>{score}</span>
            <span className="text-xs font-medium text-gray-500">/100</span>
          </div>
        </div>

        {/* Details */}
        <div className="flex-1">
          <p className={`text-sm font-medium ${config.color} mb-3`}>{config.subtitle}</p>
          <ul className="space-y-2">
            {details.map((detail) => (
              <li key={detail} className="text-sm text-gray-800 flex items-start gap-2">
                <span className="mt-0.5 shrink-0 text-gray-400">&#8226;</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
