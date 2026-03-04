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
