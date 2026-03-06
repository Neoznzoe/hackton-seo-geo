import { AnalyticsTool, FaqItem } from "@/lib/types";
import { LocalizedString } from "@/lib/i18n/localize";

/** Extract the French string from a LocalizedString value. */
function fr(value: LocalizedString): string {
  return typeof value === "string" ? value : value.fr;
}

/** Extract the English string from a LocalizedString value. */
function en(value: LocalizedString): string {
  return typeof value === "string" ? value : value.en;
}

export function generateVsFaq(tool1: AnalyticsTool, tool2: AnalyticsTool): FaqItem[] {
  const t1Free = tool1.pricing.some((p) => p.price === "0 €");
  const t2Free = tool2.pricing.some((p) => p.price === "0 €");

  return [
    {
      question: {
        fr: `Quelle est la difference entre ${tool1.name} et ${tool2.name} ?`,
        en: `What is the difference between ${tool1.name} and ${tool2.name}?`,
      },
      answer: {
        fr: `${tool1.name} est ${fr(tool1.shortDescription).toLowerCase()} ${tool2.name} est ${fr(tool2.shortDescription).toLowerCase()} La principale difference reside dans ${tool1.compliance.gdprCompliant && !tool2.compliance.gdprCompliant ? "la conformite RGPD" : tool1.compliance.cookieless !== tool2.compliance.cookieless ? "l'utilisation des cookies" : "les fonctionnalites et le positionnement tarifaire"}.`,
        en: `${tool1.name} is ${en(tool1.shortDescription).toLowerCase()} ${tool2.name} is ${en(tool2.shortDescription).toLowerCase()} The main difference lies in ${tool1.compliance.gdprCompliant && !tool2.compliance.gdprCompliant ? "GDPR compliance" : tool1.compliance.cookieless !== tool2.compliance.cookieless ? "cookie usage" : "features and pricing"}.`,
      },
    },
    {
      question: {
        fr: `${tool1.name} ou ${tool2.name} : lequel est le plus conforme au RGPD ?`,
        en: `${tool1.name} or ${tool2.name}: which one is more GDPR compliant?`,
      },
      answer: {
        fr: `${tool1.compliance.gdprCompliant && tool1.compliance.cnilExempt ? `${tool1.name} est conforme au RGPD et exempte de consentement par la CNIL.` : tool1.compliance.gdprCompliant ? `${tool1.name} est conforme au RGPD mais necessite un bandeau de consentement.` : `${tool1.name} n'est pas considere conforme au RGPD par defaut.`} ${tool2.compliance.gdprCompliant && tool2.compliance.cnilExempt ? `${tool2.name} est egalement conforme au RGPD et exempte de consentement CNIL.` : tool2.compliance.gdprCompliant ? `${tool2.name} est conforme au RGPD mais necessite un consentement.` : `${tool2.name} n'est pas considere conforme au RGPD par defaut.`} Donnees : ${tool1.name} (${fr(tool1.compliance.dataLocation)}), ${tool2.name} (${fr(tool2.compliance.dataLocation)}).`,
        en: `${tool1.compliance.gdprCompliant && tool1.compliance.cnilExempt ? `${tool1.name} is GDPR compliant and exempt from consent by the CNIL.` : tool1.compliance.gdprCompliant ? `${tool1.name} is GDPR compliant but requires a consent banner.` : `${tool1.name} is not considered GDPR compliant by default.`} ${tool2.compliance.gdprCompliant && tool2.compliance.cnilExempt ? `${tool2.name} is also GDPR compliant and exempt from CNIL consent.` : tool2.compliance.gdprCompliant ? `${tool2.name} is GDPR compliant but requires consent.` : `${tool2.name} is not considered GDPR compliant by default.`} Data hosting: ${tool1.name} (${en(tool1.compliance.dataLocation)}), ${tool2.name} (${en(tool2.compliance.dataLocation)}).`,
      },
    },
    {
      question: {
        fr: `${tool1.name} vs ${tool2.name} : lequel est le moins cher ?`,
        en: `${tool1.name} vs ${tool2.name}: which one is cheaper?`,
      },
      answer: {
        fr: `${t1Free ? `${tool1.name} propose une offre gratuite.` : `${tool1.name} demarre a ${tool1.pricing[0]?.price}${tool1.pricing[0]?.period ? ` ${fr(tool1.pricing[0].period)}` : ""}.`} ${t2Free ? `${tool2.name} propose egalement une offre gratuite.` : `${tool2.name} demarre a ${tool2.pricing[0]?.price}${tool2.pricing[0]?.period ? ` ${fr(tool2.pricing[0].period)}` : ""}.`}`,
        en: `${t1Free ? `${tool1.name} offers a free plan.` : `${tool1.name} starts at ${tool1.pricing[0]?.price}${tool1.pricing[0]?.period ? ` ${en(tool1.pricing[0].period)}` : ""}.`} ${t2Free ? `${tool2.name} also offers a free plan.` : `${tool2.name} starts at ${tool2.pricing[0]?.price}${tool2.pricing[0]?.period ? ` ${en(tool2.pricing[0].period)}` : ""}.`}`,
      },
    },
    {
      question: {
        fr: `Peut-on migrer de ${tool1.name} vers ${tool2.name} ?`,
        en: `Can you migrate from ${tool1.name} to ${tool2.name}?`,
      },
      answer: {
        fr: `La migration de ${tool1.name} vers ${tool2.name} est possible. La plupart des outils analytics modernes permettent une periode de cohabitation pour comparer les donnees. ${tool1.slug === "google-analytics-4" || tool2.slug === "google-analytics-4" ? "Matomo et Plausible proposent des outils d'import depuis Google Analytics." : "Consultez la documentation officielle de chaque outil pour les options de migration."}`,
        en: `Migrating from ${tool1.name} to ${tool2.name} is possible. Most modern analytics tools allow a coexistence period to compare data. ${tool1.slug === "google-analytics-4" || tool2.slug === "google-analytics-4" ? "Matomo and Plausible offer import tools from Google Analytics." : "Check each tool's official documentation for migration options."}`,
      },
    },
  ];
}

export function generateVerdict(
  tool1: AnalyticsTool,
  tool2: AnalyticsTool
): { startup: LocalizedString; enterprise: LocalizedString; privacy: LocalizedString; budget: LocalizedString } {
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
      ? {
          fr: `${tool1.name} est ideal pour les startups grace a son offre gratuite et son code open source.`,
          en: `${tool1.name} is ideal for startups thanks to its free plan and open source code.`,
        }
      : t2Free && t2OpenSource
        ? {
            fr: `${tool2.name} est ideal pour les startups grace a son offre gratuite et son code open source.`,
            en: `${tool2.name} is ideal for startups thanks to its free plan and open source code.`,
          }
        : t1Free
          ? {
              fr: `${tool1.name} convient mieux aux startups avec son offre gratuite.`,
              en: `${tool1.name} is better suited for startups with its free plan.`,
            }
          : t2Free
            ? {
                fr: `${tool2.name} convient mieux aux startups avec son offre gratuite.`,
                en: `${tool2.name} is better suited for startups with its free plan.`,
              }
            : {
                fr: `Les deux outils sont payants. Comparez les fonctionnalites selon vos besoins specifiques de startup.`,
                en: `Both tools are paid. Compare features based on your specific startup needs.`,
              },

    enterprise: t1Enterprise && t2Enterprise
      ? {
          fr: `Les deux solutions conviennent aux entreprises. ${tool1.name} se distingue par ${fr(tool1.pros[0])?.toLowerCase()}, tandis que ${tool2.name} offre ${fr(tool2.pros[0])?.toLowerCase()}.`,
          en: `Both solutions are suitable for enterprises. ${tool1.name} stands out with ${en(tool1.pros[0])?.toLowerCase()}, while ${tool2.name} offers ${en(tool2.pros[0])?.toLowerCase()}.`,
        }
      : t1Enterprise
        ? {
            fr: `${tool1.name} est la solution entreprise avec des fonctionnalites avancees et un support dedie.`,
            en: `${tool1.name} is the enterprise solution with advanced features and dedicated support.`,
          }
        : t2Enterprise
          ? {
              fr: `${tool2.name} est la solution entreprise avec des fonctionnalites avancees et un support dedie.`,
              en: `${tool2.name} is the enterprise solution with advanced features and dedicated support.`,
            }
          : {
              fr: `Aucun des deux n'est specifiquement positionne entreprise. Pour les grandes organisations, considerez Adobe Analytics ou GA4 360.`,
              en: `Neither is specifically positioned for enterprises. For large organizations, consider Adobe Analytics or GA4 360.`,
            },

    privacy: t1Privacy && t2Privacy
      ? {
          fr: `Les deux outils sont conformes RGPD et exemptes de consentement CNIL. ${tool1.compliance.cookieless ? `${tool1.name} fonctionne sans cookies.` : ""} ${tool2.compliance.cookieless ? `${tool2.name} fonctionne sans cookies.` : ""}`,
          en: `Both tools are GDPR compliant and exempt from CNIL consent. ${tool1.compliance.cookieless ? `${tool1.name} works without cookies.` : ""} ${tool2.compliance.cookieless ? `${tool2.name} works without cookies.` : ""}`,
        }
      : t1Privacy
        ? {
            fr: `${tool1.name} est le meilleur choix pour la vie privee : conforme RGPD, exempte CNIL${tool1.compliance.cookieless ? ", sans cookies" : ""}.`,
            en: `${tool1.name} is the best choice for privacy: GDPR compliant, CNIL exempt${tool1.compliance.cookieless ? ", cookieless" : ""}.`,
          }
        : t2Privacy
          ? {
              fr: `${tool2.name} est le meilleur choix pour la vie privee : conforme RGPD, exempte CNIL${tool2.compliance.cookieless ? ", sans cookies" : ""}.`,
              en: `${tool2.name} is the best choice for privacy: GDPR compliant, CNIL exempt${tool2.compliance.cookieless ? ", cookieless" : ""}.`,
            }
          : {
              fr: `Aucun des deux n'est exempte de consentement CNIL. Considerez Matomo ou Plausible pour une conformite maximale.`,
              en: `Neither is exempt from CNIL consent. Consider Matomo or Plausible for maximum compliance.`,
            },

    budget: t1Free && t2Free
      ? {
          fr: `Les deux proposent une offre gratuite. ${tool1.name} (${fr(tool1.pricing[0]?.name)}) et ${tool2.name} (${fr(tool2.pricing[0]?.name)}) permettent de demarrer sans investissement.`,
          en: `Both offer a free plan. ${tool1.name} (${en(tool1.pricing[0]?.name)}) and ${tool2.name} (${en(tool2.pricing[0]?.name)}) allow you to get started with no investment.`,
        }
      : t1Free
        ? {
            fr: `${tool1.name} est le choix economique avec son offre gratuite. ${tool2.name} demarre a ${tool2.pricing[0]?.price}${tool2.pricing[0]?.period ? fr(tool2.pricing[0].period) : ""}.`,
            en: `${tool1.name} is the budget-friendly choice with its free plan. ${tool2.name} starts at ${tool2.pricing[0]?.price}${tool2.pricing[0]?.period ? en(tool2.pricing[0].period) : ""}.`,
          }
        : t2Free
          ? {
              fr: `${tool2.name} est le choix economique avec son offre gratuite. ${tool1.name} demarre a ${tool1.pricing[0]?.price}${tool1.pricing[0]?.period ? fr(tool1.pricing[0].period) : ""}.`,
              en: `${tool2.name} is the budget-friendly choice with its free plan. ${tool1.name} starts at ${tool1.pricing[0]?.price}${tool1.pricing[0]?.period ? en(tool1.pricing[0].period) : ""}.`,
            }
          : {
              fr: `Les deux sont payants. ${tool1.name} demarre a ${tool1.pricing[0]?.price}${tool1.pricing[0]?.period ? fr(tool1.pricing[0].period) : ""}, ${tool2.name} a ${tool2.pricing[0]?.price}${tool2.pricing[0]?.period ? fr(tool2.pricing[0].period) : ""}.`,
              en: `Both are paid. ${tool1.name} starts at ${tool1.pricing[0]?.price}${tool1.pricing[0]?.period ? en(tool1.pricing[0].period) : ""}, ${tool2.name} at ${tool2.pricing[0]?.price}${tool2.pricing[0]?.period ? en(tool2.pricing[0].period) : ""}.`,
            },
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
