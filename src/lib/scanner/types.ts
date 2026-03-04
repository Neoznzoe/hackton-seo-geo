export type RiskLevel = "faible" | "moyen" | "eleve";

export interface DetectedTool {
  id: string;
  name: string;
  category: "analytics" | "pixel" | "consent" | "tag-manager";
  cnilExempt: boolean;
  snippet: string;
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
  riskScore: number;
  riskLevel: RiskLevel;
  riskDetails: string[];
  recommendations: Recommendation[];
}
