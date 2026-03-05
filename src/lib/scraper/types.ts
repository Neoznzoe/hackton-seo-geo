export interface ScrapedToolData {
  name: string;
  source: string;
  scrapedAt: string;
  pricing: string | null;
  freeplan: boolean | null;
  openSource: boolean | null;
  selfHosted: boolean | null;
  gdprCompliant: boolean | null;
  cookieless: boolean | null;
}

export interface ScrapeLog {
  timestamp: string;
  target: string;
  robotsTxtChecked: boolean;
  robotsTxtAllowed: boolean;
  statusCode: number | null;
  duration: number;
  dataPoints: number;
  error: string | null;
}

export interface ScrapeResult {
  success: boolean;
  tools: ScrapedToolData[];
  logs: ScrapeLog[];
  metadata: {
    totalSources: number;
    successfulSources: number;
    totalDuration: number;
    scrapedAt: string;
  };
}

export interface RobotsTxtRule {
  allowed: boolean;
  crawlDelay: number | null;
}
