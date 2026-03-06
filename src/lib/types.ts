import { LocalizedString } from "@/lib/i18n/localize";

export type CategorySlug =
  | "privacy-first"
  | "open-source"
  | "gratuit"
  | "entreprise"
  | "sans-cookies"
  | "hebergement-local";

export interface PricingTier {
  name: LocalizedString;
  price: string;
  period?: LocalizedString;
  features: LocalizedString[];
  cta?: LocalizedString;
  highlighted?: boolean;
}

export interface FaqItem {
  question: LocalizedString;
  answer: LocalizedString;
}

export interface AnalyticsTool {
  slug: string;
  name: string;
  shortDescription: LocalizedString;
  description: LocalizedString;
  logoUrl: string;
  websiteUrl: string;
  categories: CategorySlug[];
  pricing: PricingTier[];
  features: {
    label: LocalizedString;
    available: boolean;
    detail?: LocalizedString;
  }[];
  compliance: {
    gdprCompliant: boolean;
    cnilExempt: boolean;
    cookieless: boolean;
    dataLocation: LocalizedString;
    details: LocalizedString;
  };
  pros: LocalizedString[];
  cons: LocalizedString[];
  faq: FaqItem[];
}

export interface Category {
  slug: CategorySlug;
  name: LocalizedString;
  description: LocalizedString;
  metaTitle: LocalizedString;
  metaDescription: LocalizedString;
}

export interface ToolComparison {
  tool1: AnalyticsTool;
  tool2: AnalyticsTool;
  slug: string;
  faq: FaqItem[];
  verdict: {
    startup: LocalizedString;
    enterprise: LocalizedString;
    privacy: LocalizedString;
    budget: LocalizedString;
  };
}

export interface GlossaryTerm {
  term: LocalizedString;
  slug: string;
  definition: LocalizedString;
  relatedTools?: string[];
}
