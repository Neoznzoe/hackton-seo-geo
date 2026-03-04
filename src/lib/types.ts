export type CategorySlug =
  | "privacy-first"
  | "open-source"
  | "gratuit"
  | "entreprise"
  | "sans-cookies"
  | "hebergement-local";

export interface PricingTier {
  name: string;
  price: string;
  period?: string;
  features: string[];
  cta?: string;
  highlighted?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface AnalyticsTool {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  logoUrl: string;
  websiteUrl: string;
  categories: CategorySlug[];
  pricing: PricingTier[];
  features: {
    label: string;
    available: boolean;
    detail?: string;
  }[];
  compliance: {
    gdprCompliant: boolean;
    cnilExempt: boolean;
    cookieless: boolean;
    dataLocation: string;
    details: string;
  };
  pros: string[];
  cons: string[];
  faq: FaqItem[];
}

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
}

export interface ToolComparison {
  tool1: AnalyticsTool;
  tool2: AnalyticsTool;
  slug: string;
  faq: FaqItem[];
  verdict: {
    startup: string;
    enterprise: string;
    privacy: string;
    budget: string;
  };
}

export interface GlossaryTerm {
  term: string;
  slug: string;
  definition: string;
  relatedTools?: string[];
}
