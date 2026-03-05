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
    name: "Cookiebot (Usercentrics)",
    category: "consent",
    cnilExempt: true,
    patterns: [
      /cookiebot\.com/i,
      /consent\.cookiebot/i,
    ],
  },
  {
    id: "usercentrics",
    name: "Usercentrics",
    category: "consent",
    cnilExempt: true,
    patterns: [
      /usercentrics/i,
      /app\.usercentrics\.eu/i,
      /settingsUrl.*usercentrics/i,
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
      /otSDKStub/i,
      /otAutoBlock/i,
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
    id: "quantcast",
    name: "Quantcast Choice",
    category: "consent",
    cnilExempt: true,
    patterns: [
      /quantcast\.mgr\.consensu/i,
      /quantcast\.com\/choice/i,
      /quantcast-choice/i,
    ],
  },
  {
    id: "iubenda",
    name: "Iubenda",
    category: "consent",
    cnilExempt: true,
    patterns: [
      /iubenda\.com/i,
      /iubenda_cs/i,
    ],
  },
  {
    id: "cookieyes",
    name: "CookieYes",
    category: "consent",
    cnilExempt: true,
    patterns: [
      /cookieyes\.com/i,
      /cookie-law-info/i,
    ],
  },
  {
    id: "complianz",
    name: "Complianz",
    category: "consent",
    cnilExempt: true,
    patterns: [
      /complianz/i,
      /cmplz/i,
    ],
  },
  {
    id: "sirdata",
    name: "Sirdata",
    category: "consent",
    cnilExempt: true,
    patterns: [
      /sirdata/i,
      /sddan\.com/i,
    ],
  },
  {
    id: "trustcommander",
    name: "TrustCommander (Commanders Act)",
    category: "consent",
    cnilExempt: true,
    patterns: [
      /trustcommander/i,
      /commander1\.com/i,
      /commandersact/i,
    ],
  },
  {
    id: "osano",
    name: "Osano",
    category: "consent",
    cnilExempt: true,
    patterns: [
      /osano\.com/i,
      /cmp\.osano/i,
    ],
  },
  {
    id: "cookiefirst",
    name: "CookieFirst",
    category: "consent",
    cnilExempt: true,
    patterns: [
      /cookiefirst\.com/i,
    ],
  },
  {
    id: "civic-cookie",
    name: "Civic Cookie Control",
    category: "consent",
    cnilExempt: true,
    patterns: [
      /civiccomputing\.com/i,
      /CookieControl/i,
    ],
  },
  {
    id: "cookie-script",
    name: "Cookie Script",
    category: "consent",
    cnilExempt: true,
    patterns: [
      /cookie-script\.com/i,
      /cookiescript/i,
    ],
  },
  {
    id: "hubspot-cookie",
    name: "HubSpot Cookie Banner",
    category: "consent",
    cnilExempt: true,
    patterns: [
      /hs-banner-/i,
      /hubspot.*cookie-?banner/i,
      /__hs_cookie_cat_pref/i,
    ],
  },
  {
    id: "tcf-iab",
    name: "Bandeau CMP (TCF/IAB)",
    category: "consent",
    cnilExempt: true,
    patterns: [
      /__tcfapi/i,
      /__cmpLocator/i,
      /consensu\.org/i,
    ],
  },
  {
    id: "generic-consent",
    name: "Bandeau de consentement",
    category: "consent",
    cnilExempt: true,
    patterns: [
      /cookie[_-]?consent/i,
      /cookie[_-]?banner/i,
      /cookie[_-]?notice/i,
      /cookie[_-]?modal/i,
      /gdpr[_-]?banner/i,
      /gdpr[_-]?consent/i,
      /gdpr[_-]?modal/i,
      /cc-window/i,
      /cc-banner/i,
      /js-cookie-consent/i,
      /cookie-law-popup/i,
      /accept[_-]?cookies/i,
      /data-cookie-consent/i,
      /data-gdpr/i,
    ],
  },
];
