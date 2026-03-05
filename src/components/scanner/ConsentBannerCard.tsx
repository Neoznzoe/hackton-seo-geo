import { DetectedTool } from "@/lib/scanner/types";

interface ConsentBannerCardProps {
  banners: DetectedTool[];
  needsConsent?: boolean;
}

export default function ConsentBannerCard({ banners, needsConsent = false }: ConsentBannerCardProps) {
  const hasBanner = banners.length > 0;
  const isOk = hasBanner || !needsConsent;

  return (
    <div className={`border rounded-xl p-6 shadow-sm ${isOk ? "bg-green-50 dark:bg-green-950 border-green-300 dark:border-green-700" : "bg-red-50 dark:bg-red-950 border-red-300 dark:border-red-700"}`}>
      <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3">Bandeau de consentement</h3>
      {hasBanner ? (
        <div>
          <p className="text-sm font-medium text-green-800 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Bandeau détecté
          </p>
          <div className="flex flex-wrap gap-2">
            {banners.map((banner) => (
              <span
                key={banner.id}
                className="inline-block text-sm font-medium px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-300 border border-green-300 dark:border-green-700"
              >
                {banner.name}
              </span>
            ))}
          </div>
        </div>
      ) : needsConsent ? (
        <p className="text-sm font-medium text-red-800 flex items-start gap-2">
          <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          Aucun bandeau de consentement détecté. Des outils non-exempts CNIL ont été détectés, un bandeau est obligatoire.
        </p>
      ) : (
        <p className="text-sm font-medium text-green-800 flex items-start gap-2">
          <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Aucun bandeau nécessaire : pas d&apos;outil non-exempt CNIL détecté sur votre site.
        </p>
      )}
    </div>
  );
}
