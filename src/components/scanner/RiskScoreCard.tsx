import { RiskLevel } from "@/lib/scanner/types";

interface RiskScoreCardProps {
  score: number;
  level: RiskLevel;
  details: string[];
}

const LEVEL_CONFIG = {
  faible: {
    label: "Faible",
    color: "text-green-700",
    bg: "bg-green-50",
    border: "border-green-200",
    ring: "stroke-green-500",
    trackColor: "stroke-green-100",
  },
  moyen: {
    label: "Moyen",
    color: "text-orange-700",
    bg: "bg-orange-50",
    border: "border-orange-200",
    ring: "stroke-orange-500",
    trackColor: "stroke-orange-100",
  },
  eleve: {
    label: "Eleve",
    color: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
    ring: "stroke-red-500",
    trackColor: "stroke-red-100",
  },
};

export default function RiskScoreCard({ score, level, details }: RiskScoreCardProps) {
  const config = LEVEL_CONFIG[level];
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className={`${config.bg} ${config.border} border rounded-lg p-6`}>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Score de risque RGPD</h2>
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
            <span className={`text-2xl font-bold ${config.color}`}>{score}</span>
            <span className={`text-xs font-medium ${config.color}`}>/100</span>
          </div>
        </div>

        {/* Details */}
        <div className="flex-1">
          <p className={`text-lg font-semibold ${config.color} mb-2`}>
            Risque {config.label}
          </p>
          <ul className="space-y-1">
            {details.map((detail) => (
              <li key={detail} className="text-sm text-gray-700 flex items-start gap-2">
                <span className="mt-1 shrink-0">&#8226;</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
