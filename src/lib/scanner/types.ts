export type RiskLevel = "faible" | "moyen" | "eleve";

export type LetterGrade = "A+" | "A" | "B" | "C" | "D" | "E";

export type ScanPlan = "gratuit" | "essentiel" | "pro" | "expert";

export const PLAN_LIMITS: Record<ScanPlan, number> = {
  gratuit: 1,
  essentiel: 5,
  pro: 30,
  expert: 200,
};

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

export interface SecurityHeaders {
  https: boolean;
  hsts: boolean;
  contentSecurityPolicy: boolean;
  xFrameOptions: boolean;
  xContentTypeOptions: boolean;
  referrerPolicy: boolean;
}

export interface ThirdPartyResource {
  type: "font" | "iframe" | "cdn" | "captcha";
  name: string;
  domain: string;
  gdprRisk: boolean;
  detail: string;
}

export interface ConsentEffectiveness {
  scriptsBlocked: boolean;
  dataGdprSrc: boolean;
  typePlaintext: boolean;
  consentGating: boolean;
  details: string[];
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

export interface PageIssue {
  type: "analytics" | "pixel" | "consent" | "tag-manager" | "legal-missing" | "third-party";
  label: string;
  severity: "high" | "medium" | "low";
}

export interface PageDetail {
  url: string;
  path: string;
  issues: PageIssue[];
  toolsFound: string[];
}

export interface ScanResult {
  url: string;
  scannedAt: string;
  plan: ScanPlan;
  sitemapFound: boolean;
  sitemapUrl?: string;
  pagesScanned: number;
  totalPagesInSitemap: number;
  analytics: DetectedTool[];
  pixels: DetectedTool[];
  consentBanners: DetectedTool[];
  tagManagers: DetectedTool[];
  legalPages: LegalPages;
  securityHeaders: SecurityHeaders;
  thirdPartyResources: ThirdPartyResource[];
  consentEffectiveness: ConsentEffectiveness;
  globalScore: number;
  globalLevel: RiskLevel;
  letterGrade: LetterGrade;
  subScores: {
    rgpd: SubScore;
    consent: SubScore;
    trackers: SubScore;
    legal: SubScore;
    bestPractices: SubScore;
    security: SubScore;
    thirdParty: SubScore;
  };
  recommendations: Recommendation[];
  pageDetails: PageDetail[];
}

export function scoreToLetterGrade(score: number): LetterGrade {
  if (score >= 90) return "A+";
  if (score >= 75) return "A";
  if (score >= 60) return "B";
  if (score >= 45) return "C";
  if (score >= 30) return "D";
  return "E";
}
