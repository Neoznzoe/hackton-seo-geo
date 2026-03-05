/**
 * Public sources for competitive intelligence on analytics tools.
 * Only scrapes publicly available pages (pricing, features).
 * No personal data is collected — only product/service information.
 */

export interface ScrapingSource {
  toolName: string;
  url: string;
  /** Path to check in robots.txt */
  path: string;
  /** CSS-like patterns to extract data from HTML */
  extractors: {
    pricing: RegExp[];
    features: RegExp[];
  };
}

export const SCRAPING_SOURCES: ScrapingSource[] = [
  {
    toolName: "Matomo",
    url: "https://matomo.org/pricing/",
    path: "/pricing/",
    extractors: {
      pricing: [
        /(?:€|EUR)\s*(\d+[\d,.]*)/gi,
        /(\d+[\d,.]*)\s*(?:€|EUR)/gi,
        /free/gi,
      ],
      features: [
        /100%\s*data\s*ownership/gi,
        /gdpr/gi,
        /self[- ]hosted/gi,
        /cloud/gi,
        /no\s*data\s*limit/gi,
      ],
    },
  },
  {
    toolName: "Plausible",
    url: "https://plausible.io/",
    path: "/",
    extractors: {
      pricing: [
        /\$(\d+[\d,.]*)\s*\/?\s*(?:mo|month)/gi,
        /(?:€|EUR)\s*(\d+[\d,.]*)/gi,
      ],
      features: [
        /cookie[- ]?free/gi,
        /no\s*cookies/gi,
        /gdpr/gi,
        /open[- ]?source/gi,
        /lightweight/gi,
        /privacy[- ]?friendly/gi,
      ],
    },
  },
  {
    toolName: "Fathom",
    url: "https://usefathom.com/",
    path: "/",
    extractors: {
      pricing: [
        /\$(\d+[\d,.]*)\s*\/?\s*(?:mo|month)/gi,
        /(?:€|EUR)\s*(\d+[\d,.]*)/gi,
      ],
      features: [
        /cookie[- ]?free/gi,
        /no\s*cookies/gi,
        /gdpr/gi,
        /privacy[- ]?first/gi,
        /eu\s*isolation/gi,
      ],
    },
  },
  {
    toolName: "Simple Analytics",
    url: "https://www.simpleanalytics.com/",
    path: "/",
    extractors: {
      pricing: [
        /\$(\d+[\d,.]*)\s*\/?\s*(?:mo|month)/gi,
        /(?:€|EUR)\s*(\d+[\d,.]*)/gi,
      ],
      features: [
        /no\s*cookies/gi,
        /gdpr/gi,
        /privacy/gi,
        /open[- ]?source/gi,
        /lightweight/gi,
      ],
    },
  },
  {
    toolName: "Umami",
    url: "https://umami.is/",
    path: "/",
    extractors: {
      pricing: [
        /free/gi,
        /\$(\d+[\d,.]*)\s*\/?\s*(?:mo|month)/gi,
        /open[- ]?source/gi,
      ],
      features: [
        /privacy/gi,
        /gdpr/gi,
        /no\s*cookies/gi,
        /self[- ]?hosted/gi,
        /open[- ]?source/gi,
      ],
    },
  },
  {
    toolName: "Piwik PRO",
    url: "https://piwikpro.com/",
    path: "/",
    extractors: {
      pricing: [
        /free/gi,
        /(?:€|EUR)\s*(\d+[\d,.]*)/gi,
        /\$(\d+[\d,.]*)/gi,
      ],
      features: [
        /gdpr/gi,
        /consent/gi,
        /tag\s*manager/gi,
        /customer\s*data\s*platform/gi,
        /privacy/gi,
      ],
    },
  },
];
