import { DetectedTool } from "./types";

interface Pattern {
  id: string;
  name: string;
  category: DetectedTool["category"];
  cnilExempt: boolean;
  patterns: RegExp[];
}

export const DETECTION_PATTERNS: Pattern[] = [
  // Analytics
  {
    id: "ga4",
    name: "Google Analytics 4",
    category: "analytics",
    cnilExempt: false,
    patterns: [
      /gtag\s*\(\s*['"]config['"]\s*,\s*['"]G-/i,
      /googletagmanager\.com\/gtag/i,
      /google-analytics\.com/i,
      /['"]G-[A-Z0-9]{6,}['"]/i,
      /data-gdpr-src=["'][^"']*google-analytics/i,
      /data-gdpr-src=["'][^"']*gtag/i,
    ],
  },
  {
    id: "matomo",
    name: "Matomo",
    category: "analytics",
    cnilExempt: true,
    patterns: [
      /matomo\.js/i,
      /matomo\.php/i,
      /piwik\.js/i,
      /piwik\.php/i,
      /_paq\.push/i,
    ],
  },
  {
    id: "plausible",
    name: "Plausible",
    category: "analytics",
    cnilExempt: true,
    patterns: [
      /plausible\.io\/js/i,
      /plausible\.io\/api\/event/i,
    ],
  },
  {
    id: "piwik-pro",
    name: "Piwik PRO",
    category: "analytics",
    cnilExempt: true,
    patterns: [
      /containers\.piwik\.pro/i,
      /piwik\.pro\/ppms\.php/i,
      /PiwikPROProvider/i,
    ],
  },
  {
    id: "fathom",
    name: "Fathom",
    category: "analytics",
    cnilExempt: true,
    patterns: [
      /cdn\.usefathom\.com/i,
      /usefathom\.com\/script\.js/i,
    ],
  },
  {
    id: "simple-analytics",
    name: "Simple Analytics",
    category: "analytics",
    cnilExempt: true,
    patterns: [
      /scripts\.simpleanalyticscdn\.com/i,
      /simpleanalytics\.com\/hello/i,
    ],
  },
  {
    id: "adobe-analytics",
    name: "Adobe Analytics",
    category: "analytics",
    cnilExempt: false,
    patterns: [
      /omniture\.com/i,
      /sc\.omtrdc\.net/i,
      /adobedtm\.com/i,
      /AppMeasurement\.js/i,
      /s_code\.js/i,
    ],
  },
  {
    id: "umami",
    name: "Umami",
    category: "analytics",
    cnilExempt: true,
    patterns: [
      /umami\.js/i,
      /analytics\.umami\.is/i,
      /umami\.cloud/i,
    ],
  },
  {
    id: "at-internet",
    name: "AT Internet (Piano Analytics)",
    category: "analytics",
    cnilExempt: false,
    patterns: [
      /xtcore\.js/i,
      /tag\.aticdn\.net/i,
      /piano\.io\/xts/i,
      /smarttag\.atinternet/i,
    ],
  },

  // Tracking Pixels
  {
    id: "meta-pixel",
    name: "Meta Pixel (Facebook)",
    category: "pixel",
    cnilExempt: false,
    patterns: [
      /connect\.facebook\.net\/.*\/fbevents\.js/i,
      /fbq\s*\(\s*['"]init['"]/i,
      /facebook\.com\/tr\?/i,
      /data-gdpr-src=["'][^"']*fbevents/i,
    ],
  },
  {
    id: "linkedin-insight",
    name: "LinkedIn Insight Tag",
    category: "pixel",
    cnilExempt: false,
    patterns: [
      /snap\.licdn\.com\/li\.lms-analytics/i,
      /linkedin\.com\/px/i,
      /_linkedin_partner_id/i,
    ],
  },
  {
    id: "tiktok-pixel",
    name: "TikTok Pixel",
    category: "pixel",
    cnilExempt: false,
    patterns: [
      /analytics\.tiktok\.com/i,
      /ttq\.load/i,
    ],
  },
  {
    id: "twitter-pixel",
    name: "Twitter/X Pixel",
    category: "pixel",
    cnilExempt: false,
    patterns: [
      /static\.ads-twitter\.com/i,
      /t\.co\/i\/adsct/i,
      /twq\s*\(\s*['"]init['"]/i,
    ],
  },
  {
    id: "hotjar",
    name: "Hotjar",
    category: "pixel",
    cnilExempt: false,
    patterns: [
      /static\.hotjar\.com/i,
      /hotjar\.com\/c\/hotjar/i,
      /hj\s*\(\s*['"]init['"]/i,
    ],
  },
  {
    id: "criteo",
    name: "Criteo",
    category: "pixel",
    cnilExempt: false,
    patterns: [
      /static\.criteo\.net/i,
      /criteo\.com\/js/i,
      /criteo\.net\/js/i,
    ],
  },

  // Tag Managers
  {
    id: "gtm",
    name: "Google Tag Manager",
    category: "tag-manager",
    cnilExempt: false,
    patterns: [
      /googletagmanager\.com\/gtm\.js/i,
      /googletagmanager\.com\/ns\.html/i,
      /GTM-[A-Z0-9]{4,}/i,
      /data-gdpr-src=["'][^"']*googletagmanager/i,
    ],
  },

  // Consent Banners — ordered by specificity (most specific first)
  {
    id: "tarteaucitron",
    name: "Tarteaucitron",
    category: "consent",
    cnilExempt: true,
    patterns: [
      /tarteaucitron/i,
    ],
  },
  {
    id: "axeptio",
    name: "Axeptio",
    category: "consent",
    cnilExempt: true,
    patterns: [
      /axeptio/i,
      /static\.axept\.io/i,
    ],
  },
  {
    id: "cookiebot",
    name: "Cookiebot",
    category: "consent",
    cnilExempt: true,
    patterns: [
      /cookiebot\.com/i,
    ],
  },
  {
    id: "didomi",
    name: "Didomi",
    category: "consent",
    cnilExempt: true,
    patterns: [
      /didomi/i,
      /sdk\.privacy-center/i,
    ],
  },
  {
    id: "onetrust",
    name: "OneTrust",
    category: "consent",
    cnilExempt: true,
    patterns: [
      /onetrust/i,
      /cookielaw\.org/i,
      /optanon/i,
    ],
  },
  {
    id: "consentmanager",
    name: "Consent Manager",
    category: "consent",
    cnilExempt: true,
    patterns: [
      /consentmanager\.net/i,
      /consentmanager\.mgr\.consensu/i,
    ],
  },
  {
    id: "tcf-iab",
    name: "Bandeau CMP (TCF/IAB)",
    category: "consent",
    cnilExempt: true,
    patterns: [
      /__tcfapi/i,
      /gdprApplies/i,
      /__cmpLocator/i,
    ],
  },
];
