import { ThirdPartyResource } from "@/lib/scanner/types";

interface ThirdPartyCardProps {
  resources: ThirdPartyResource[];
}

const TYPE_LABELS: Record<ThirdPartyResource["type"], string> = {
  font: "Police",
  iframe: "Embed",
  cdn: "CDN",
  captcha: "Captcha",
};

export default function ThirdPartyCard({ resources }: ThirdPartyCardProps) {
  const risky = resources.filter((r) => r.gdprRisk);
  const safe = resources.filter((r) => !r.gdprRisk);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 bg-purple-50 rounded-lg flex items-center justify-center shrink-0">
          <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Ressources tierces</h3>
          <p className="text-xs text-gray-500">
            {resources.length === 0
              ? "Aucune ressource tierce détectée"
              : `${resources.length} détectée${resources.length > 1 ? "s" : ""}, ${risky.length} à risque`}
          </p>
        </div>
      </div>

      {resources.length === 0 ? (
        <p className="text-xs text-gray-400">Aucune ressource tierce externe identifiée.</p>
      ) : (
        <div className="space-y-2.5">
          {risky.map((r) => (
            <div key={r.name} className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-lg p-2.5">
              <svg className="w-4 h-4 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-red-800">
                  {r.name} <span className="font-normal text-red-500">({TYPE_LABELS[r.type]})</span>
                </p>
                <p className="text-xs text-red-600 mt-0.5">{r.detail.split(".")[0]}.</p>
              </div>
            </div>
          ))}
          {safe.map((r) => (
            <div key={r.name} className="flex items-start gap-2 bg-green-50 border border-green-100 rounded-lg p-2.5">
              <svg className="w-4 h-4 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-green-800">
                  {r.name} <span className="font-normal text-green-500">({TYPE_LABELS[r.type]})</span>
                </p>
                <p className="text-xs text-green-600 mt-0.5">Faible risque RGPD</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
