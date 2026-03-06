"use client";

import { AnalyticsTool } from "@/lib/types";
import { useLocalized } from "@/lib/i18n/useLocalized";

interface VsSummaryBoxProps {
  tool1: AnalyticsTool;
  tool2: AnalyticsTool;
}

export default function VsSummaryBox({ tool1, tool2 }: VsSummaryBoxProps) {
  const { l } = useLocalized();
  const t1Free = tool1.pricing.some((p) => p.price === "0 €");
  const t2Free = tool2.pricing.some((p) => p.price === "0 €");

  return (
    <aside className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
      <p className="text-sm font-semibold text-blue-800 uppercase tracking-wide mb-3">
        En resume
      </p>
      <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
        <li>
          <strong>{tool1.name}</strong> : {l(tool1.shortDescription)}
          {t1Free ? " Offre gratuite disponible." : ` A partir de ${tool1.pricing[0]?.price}${tool1.pricing[0]?.period ? l(tool1.pricing[0].period) : ""}.`}
        </li>
        <li>
          <strong>{tool2.name}</strong> : {l(tool2.shortDescription)}
          {t2Free ? " Offre gratuite disponible." : ` A partir de ${tool2.pricing[0]?.price}${tool2.pricing[0]?.period ? l(tool2.pricing[0].period) : ""}.`}
        </li>
        <li>
          <strong>RGPD</strong> : {tool1.name} {tool1.compliance.gdprCompliant ? "conforme" : "non conforme"} / {tool2.name} {tool2.compliance.gdprCompliant ? "conforme" : "non conforme"}.
          {tool1.compliance.cnilExempt && tool2.compliance.cnilExempt
            ? " Les deux sont exemptes de consentement CNIL."
            : tool1.compliance.cnilExempt
              ? ` ${tool1.name} est exempte de consentement CNIL.`
              : tool2.compliance.cnilExempt
                ? ` ${tool2.name} est exempte de consentement CNIL.`
                : " Aucun n'est exempte de consentement CNIL."}
        </li>
        <li>
          <strong>Donnees</strong> : {tool1.name} ({l(tool1.compliance.dataLocation)}) vs {tool2.name} ({l(tool2.compliance.dataLocation)}).
        </li>
      </ul>
    </aside>
  );
}
