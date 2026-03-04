import { AnalyticsTool, FaqItem } from "@/lib/types";

export function generateVsFaq(tool1: AnalyticsTool, tool2: AnalyticsTool): FaqItem[] {
  const t1Free = tool1.pricing.some((p) => p.price === "0 €");
  const t2Free = tool2.pricing.some((p) => p.price === "0 €");

  return [
    {
      question: `Quelle est la difference entre ${tool1.name} et ${tool2.name} ?`,
      answer: `${tool1.name} est ${tool1.shortDescription.toLowerCase()} ${tool2.name} est ${tool2.shortDescription.toLowerCase()} La principale difference reside dans ${tool1.compliance.gdprCompliant && !tool2.compliance.gdprCompliant ? "la conformite RGPD" : tool1.compliance.cookieless !== tool2.compliance.cookieless ? "l'utilisation des cookies" : "les fonctionnalites et le positionnement tarifaire"}.`,
    },
    {
      question: `${tool1.name} ou ${tool2.name} : lequel est le plus conforme au RGPD ?`,
      answer: `${tool1.compliance.gdprCompliant && tool1.compliance.cnilExempt ? `${tool1.name} est conforme au RGPD et exempte de consentement par la CNIL.` : tool1.compliance.gdprCompliant ? `${tool1.name} est conforme au RGPD mais necessite un bandeau de consentement.` : `${tool1.name} n'est pas considere conforme au RGPD par defaut.`} ${tool2.compliance.gdprCompliant && tool2.compliance.cnilExempt ? `${tool2.name} est egalement conforme au RGPD et exempte de consentement CNIL.` : tool2.compliance.gdprCompliant ? `${tool2.name} est conforme au RGPD mais necessite un consentement.` : `${tool2.name} n'est pas considere conforme au RGPD par defaut.`} Donnees : ${tool1.name} (${tool1.compliance.dataLocation}), ${tool2.name} (${tool2.compliance.dataLocation}).`,
    },
    {
      question: `${tool1.name} vs ${tool2.name} : lequel est le moins cher ?`,
      answer: `${t1Free ? `${tool1.name} propose une offre gratuite.` : `${tool1.name} demarre a ${tool1.pricing[0]?.price}${tool1.pricing[0]?.period ? ` ${tool1.pricing[0].period}` : ""}.`} ${t2Free ? `${tool2.name} propose egalement une offre gratuite.` : `${tool2.name} demarre a ${tool2.pricing[0]?.price}${tool2.pricing[0]?.period ? ` ${tool2.pricing[0].period}` : ""}.`}`,
    },
    {
      question: `Peut-on migrer de ${tool1.name} vers ${tool2.name} ?`,
      answer: `La migration de ${tool1.name} vers ${tool2.name} est possible. La plupart des outils analytics modernes permettent une periode de cohabitation pour comparer les donnees. ${tool1.slug === "google-analytics-4" || tool2.slug === "google-analytics-4" ? "Matomo et Plausible proposent des outils d'import depuis Google Analytics." : "Consultez la documentation officielle de chaque outil pour les options de migration."}`,
    },
  ];
}

export function generateVerdict(
  tool1: AnalyticsTool,
  tool2: AnalyticsTool
): { startup: string; enterprise: string; privacy: string; budget: string } {
  const t1Free = tool1.pricing.some((p) => p.price === "0 €");
  const t2Free = tool2.pricing.some((p) => p.price === "0 €");
  const t1Enterprise = tool1.categories.includes("entreprise");
  const t2Enterprise = tool2.categories.includes("entreprise");
  const t1Privacy = tool1.compliance.gdprCompliant && tool1.compliance.cnilExempt;
  const t2Privacy = tool2.compliance.gdprCompliant && tool2.compliance.cnilExempt;
  const t1OpenSource = tool1.categories.includes("open-source");
  const t2OpenSource = tool2.categories.includes("open-source");

  return {
    startup: t1Free && t1OpenSource
      ? `${tool1.name} est ideal pour les startups grace a son offre gratuite et son code open source.`
      : t2Free && t2OpenSource
        ? `${tool2.name} est ideal pour les startups grace a son offre gratuite et son code open source.`
        : t1Free
          ? `${tool1.name} convient mieux aux startups avec son offre gratuite.`
          : t2Free
            ? `${tool2.name} convient mieux aux startups avec son offre gratuite.`
            : `Les deux outils sont payants. Comparez les fonctionnalites selon vos besoins specifiques de startup.`,

    enterprise: t1Enterprise && t2Enterprise
      ? `Les deux solutions conviennent aux entreprises. ${tool1.name} se distingue par ${tool1.pros[0]?.toLowerCase()}, tandis que ${tool2.name} offre ${tool2.pros[0]?.toLowerCase()}.`
      : t1Enterprise
        ? `${tool1.name} est la solution entreprise avec des fonctionnalites avancees et un support dedie.`
        : t2Enterprise
          ? `${tool2.name} est la solution entreprise avec des fonctionnalites avancees et un support dedie.`
          : `Aucun des deux n'est specifiquement positionne entreprise. Pour les grandes organisations, considerez Adobe Analytics ou GA4 360.`,

    privacy: t1Privacy && t2Privacy
      ? `Les deux outils sont conformes RGPD et exemptes de consentement CNIL. ${tool1.compliance.cookieless ? `${tool1.name} fonctionne sans cookies.` : ""} ${tool2.compliance.cookieless ? `${tool2.name} fonctionne sans cookies.` : ""}`
      : t1Privacy
        ? `${tool1.name} est le meilleur choix pour la vie privee : conforme RGPD, exempte CNIL${tool1.compliance.cookieless ? ", sans cookies" : ""}.`
        : t2Privacy
          ? `${tool2.name} est le meilleur choix pour la vie privee : conforme RGPD, exempte CNIL${tool2.compliance.cookieless ? ", sans cookies" : ""}.`
          : `Aucun des deux n'est exempte de consentement CNIL. Considerez Matomo ou Plausible pour une conformite maximale.`,

    budget: t1Free && t2Free
      ? `Les deux proposent une offre gratuite. ${tool1.name} (${tool1.pricing[0]?.name}) et ${tool2.name} (${tool2.pricing[0]?.name}) permettent de demarrer sans investissement.`
      : t1Free
        ? `${tool1.name} est le choix economique avec son offre gratuite. ${tool2.name} demarre a ${tool2.pricing[0]?.price}${tool2.pricing[0]?.period || ""}.`
        : t2Free
          ? `${tool2.name} est le choix economique avec son offre gratuite. ${tool1.name} demarre a ${tool1.pricing[0]?.price}${tool1.pricing[0]?.period || ""}.`
          : `Les deux sont payants. ${tool1.name} demarre a ${tool1.pricing[0]?.price}${tool1.pricing[0]?.period || ""}, ${tool2.name} a ${tool2.pricing[0]?.price}${tool2.pricing[0]?.period || ""}.`,
  };
}

export function getRelatedComparisons(
  toolSlug: string,
  allSlugs: string[]
): string[] {
  return allSlugs.filter(
    (s) => s.includes(toolSlug) && s !== toolSlug
  );
}
