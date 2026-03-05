export type RiskLevel = "faible" | "moyen" | "eleve";

export interface DetectedTool {
  id: string;
  name: string;
  category: "analytics" | "pixel" | "consent" | "tag-manager";
  cnilExempt: boolean;
  snippet: string;
}

export interface LegalPages {
  mentionsLegales: boolean;
  cgu: boolean;
  cgv: boolean;
  politiqueConfidentialite: boolean;
  politiqueCookies: boolean;
}

export interface SubScore {
  label: string;
  score: number;
  level: RiskLevel;
  details: string[];
}

export interface Recommendation {
  title: string;
  description: string;
  link: string;
  linkLabel: string;
  priority: "high" | "medium" | "low";
}

export interface ScanResult {
  url: string;
  scannedAt: string;
  analytics: DetectedTool[];
  pixels: DetectedTool[];
  consentBanners: DetectedTool[];
  tagManagers: DetectedTool[];
  legalPages: LegalPages;
  globalScore: number;
  globalLevel: RiskLevel;
  subScores: {
    rgpd: SubScore;
    consent: SubScore;
    trackers: SubScore;
    legal: SubScore;
    bestPractices: SubScore;
  };
  recommendations: Recommendation[];
}
