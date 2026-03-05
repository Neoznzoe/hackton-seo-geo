import { DetectedTool } from "./types";
import { DETECTION_PATTERNS } from "./patterns";

export interface LegalPages {
  mentionsLegales: boolean;
  cgu: boolean;
  cgv: boolean;
  politiqueConfidentialite: boolean;
  politiqueCookies: boolean;
}

export function detectTools(html: string): {
  analytics: DetectedTool[];
  pixels: DetectedTool[];
  consentBanners: DetectedTool[];
  tagManagers: DetectedTool[];
} {
  const analytics: DetectedTool[] = [];
  const pixels: DetectedTool[] = [];
  const consentBanners: DetectedTool[] = [];
  const tagManagers: DetectedTool[] = [];

  for (const pattern of DETECTION_PATTERNS) {
    for (const regex of pattern.patterns) {
      const match = html.match(regex);
      if (match) {
        const tool: DetectedTool = {
          id: pattern.id,
          name: pattern.name,
          category: pattern.category,
          cnilExempt: pattern.cnilExempt,
          snippet: match[0].slice(0, 100),
        };

        switch (pattern.category) {
          case "analytics":
            if (!analytics.some((t) => t.id === tool.id)) analytics.push(tool);
            break;
          case "pixel":
            if (!pixels.some((t) => t.id === tool.id)) pixels.push(tool);
            break;
          case "consent":
            if (!consentBanners.some((t) => t.id === tool.id)) consentBanners.push(tool);
            break;
          case "tag-manager":
            if (!tagManagers.some((t) => t.id === tool.id)) tagManagers.push(tool);
            break;
        }
        break;
      }
    }
  }

  return { analytics, pixels, consentBanners, tagManagers };
}

export function detectLegalPages(html: string): LegalPages {
  // Normalize: lowercase for matching
  const lower = html.toLowerCase();

  return {
    mentionsLegales: /mentions[- _]?l[eé]gales/i.test(lower) ||
      /href=["'][^"']*mentions[_-]?legales/i.test(lower) ||
      /href=["'][^"']*legal[_-]?notice/i.test(lower),

    cgu: /conditions[- _]?g[eé]n[eé]rales[- _]?d['']?utilisation/i.test(lower) ||
      /href=["'][^"']*cgu/i.test(lower) ||
      /href=["'][^"']*conditions[_-]?utilisation/i.test(lower) ||
      />cgu<\//i.test(lower),

    cgv: /conditions[- _]?g[eé]n[eé]rales[- _]?de[- _]?vente/i.test(lower) ||
      /href=["'][^"']*cgv/i.test(lower) ||
      /href=["'][^"']*conditions[_-]?vente/i.test(lower) ||
      />cgv<\//i.test(lower),

    politiqueConfidentialite: /politique[- _]?de[- _]?confidentialit[eé]/i.test(lower) ||
      /href=["'][^"']*confidentialit/i.test(lower) ||
      /href=["'][^"']*privacy[_-]?policy/i.test(lower) ||
      /privacy[- _]?policy/i.test(lower) ||
      /donn[eé]es[- _]?personnelles/i.test(lower),

    politiqueCookies: /politique[- _]?(?:de[- _]?)?cookies/i.test(lower) ||
      /href=["'][^"']*cookie[s]?[_-]?polic/i.test(lower) ||
      /gestion[- _]?des[- _]?cookies/i.test(lower) ||
      /cookie[- _]?policy/i.test(lower),
  };
}
