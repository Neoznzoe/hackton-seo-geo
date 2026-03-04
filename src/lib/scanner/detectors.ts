import { DetectedTool } from "./types";
import { DETECTION_PATTERNS } from "./patterns";

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
        break; // One match per pattern is enough
      }
    }
  }

  return { analytics, pixels, consentBanners, tagManagers };
}
