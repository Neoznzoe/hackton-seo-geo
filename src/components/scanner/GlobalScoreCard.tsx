import { RiskLevel, LetterGrade } from "@/lib/scanner/types";

interface GlobalScoreCardProps {
  score: number;
  level: RiskLevel;
  letterGrade: LetterGrade;
  url: string;
  pagesScanned?: number;
  sitemapFound?: boolean;
}

const GRADE_COLORS: Record<LetterGrade, string> = {
  "A+": "text-green-600 bg-green-100 border-green-300",
  "A": "text-green-600 bg-green-100 border-green-300",
  "B": "text-blue-600 bg-blue-100 border-blue-300",
  "C": "text-amber-600 bg-amber-100 border-amber-300",
  "D": "text-orange-600 bg-orange-100 border-orange-300",
  "E": "text-red-600 bg-red-100 border-red-300",
};

const LEVEL_CONFIG = {
  faible: {
    label: "Excellent",
    subtitle: "Votre site est bien configuré",
    color: "text-green-700",
    bg: "bg-gradient-to-br from-green-50 to-emerald-50",
    border: "border-green-300",
    ring: "stroke-green-500",
    trackColor: "stroke-green-200",
  },
  moyen: {
    label: "À améliorer",
    subtitle: "Des points d'attention ont été détectés",
    color: "text-amber-700",
    bg: "bg-gradient-to-br from-amber-50 to-orange-50",
    border: "border-amber-300",
    ring: "stroke-amber-500",
    trackColor: "stroke-amber-200",
  },
  eleve: {
    label: "Non conforme",
    subtitle: "Des risques importants ont été identifiés",
    color: "text-red-700",
    bg: "bg-gradient-to-br from-red-50 to-rose-50",
    border: "border-red-300",
    ring: "stroke-red-500",
    trackColor: "stroke-red-200",
  },
};

export default function GlobalScoreCard({ score, level, letterGrade, url, pagesScanned, sitemapFound }: GlobalScoreCardProps) {
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
            <span className={`text-4xl font-bold ${config.color}`}>{score}</span>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">/100</span>
          </div>
        </div>

        {/* Letter grade badge */}
        <div className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center shrink-0 ${GRADE_COLORS[letterGrade]}`}>
          <span className="text-2xl font-black">{letterGrade}</span>
        </div>

        {/* Info */}
        <div className="text-center sm:text-left">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 truncate max-w-xs">{url}</p>
          <h2 className={`text-2xl font-bold ${config.color} mb-1`}>
            {config.label}
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            {config.subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            {pagesScanned != null && pagesScanned > 0 && (
              <span className="inline-flex items-center gap-1 text-xs bg-white/60 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 rounded-full px-2.5 py-1 text-gray-600 dark:text-gray-400">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                {pagesScanned} page{pagesScanned > 1 ? "s" : ""} analysée{pagesScanned > 1 ? "s" : ""}
              </span>
            )}
            {sitemapFound != null && (
              <span className={`inline-flex items-center gap-1 text-xs rounded-full px-2.5 py-1 ${
                sitemapFound
                  ? "bg-green-100/60 text-green-700 border border-green-200"
                  : "bg-amber-100/60 text-amber-700 border border-amber-200"
              }`}>
                {sitemapFound ? "Sitemap trouvé" : "Pas de sitemap"}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            Score global basé sur la conformité RGPD, le consentement, les trackers et les bonnes pratiques.
          </p>
        </div>
      </div>
    </div>
  );
}
