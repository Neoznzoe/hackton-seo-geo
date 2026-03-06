"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { ScanResult, ScanPlan } from "@/lib/scanner/types";
import {
  trackScan,
  trackScanResult,
  trackScanPlanSelect,
  trackScannerOpen,
} from "@/lib/tracking";
import { useTranslation } from "@/lib/i18n/LanguageProvider";
import ScannerHero from "./ScannerHero";
import ScannerLoading from "./ScannerLoading";
import PlanSelector from "./PlanSelector";
import SitemapAlert from "./SitemapAlert";
import GlobalScoreCard from "./GlobalScoreCard";
import SubScoresGrid from "./SubScoresGrid";
import DetectedToolsCard from "./DetectedToolsCard";
import ConsentBannerCard from "./ConsentBannerCard";
import ActionPlan from "./ActionPlan";
import LegalPagesCard from "./LegalPagesCard";
import SecurityHeadersCard from "./SecurityHeadersCard";
import ThirdPartyCard from "./ThirdPartyCard";
import ConsentEffectivenessCard from "./ConsentEffectivenessCard";
import ActionSection from "./ActionSection";
import PageDetailsCard from "./PageDetailsCard";

type ScanState = "idle" | "loading" | "success" | "error";

export default function ScannerClient() {
  const [state, setState] = useState<ScanState>("idle");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState("");
  const [plan, setPlan] = useState<ScanPlan>("gratuit");
  const { t, locale } = useTranslation();
  const searchParams = useSearchParams();
  const autoScanDone = useRef(false);

  // Track scanner page open
  useEffect(() => {
    trackScannerOpen();
  }, []);

  // Auto-scan if ?url= param is present (from homepage CTA)
  useEffect(() => {
    const urlParam = searchParams.get("url");
    if (urlParam && !autoScanDone.current) {
      autoScanDone.current = true;
      handleScan(urlParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  async function handleScan(url: string) {
    setState("loading");
    setError("");
    setResult(null);

    trackScan(url);

    try {
      const response = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, plan }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t("scanner.errorOccurred"));
      }

      setResult(data as ScanResult);
      setState("success");
      trackScanResult(data.globalLevel, data.globalScore);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("scanner.errorOccurred"));
      setState("error");
    }
  }

  return (
    <div>
      <ScannerHero onScan={handleScan} isLoading={state === "loading"} initialUrl={searchParams.get("url") || undefined} />

      {/* Plan selector - shown when idle or after results */}
      {state !== "loading" && (
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 -mt-6 mb-6">
          <PlanSelector selectedPlan={plan} onSelectPlan={setPlan} isLoading={false} />
        </div>
      )}

      {state === "loading" && <ScannerLoading plan={plan} />}

      {state === "error" && (
        <div className="mx-auto max-w-3xl px-4 py-8">
          <div className="bg-red-50 dark:bg-red-950 border border-red-300 dark:border-red-700 rounded-xl p-8 text-center shadow-sm">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <p className="text-red-800 dark:text-red-200 font-semibold text-lg mb-2">{t("scanner.error")}</p>

            <p className="text-red-700 dark:text-red-300 text-sm mb-4">{error}</p>
            <button
              onClick={() => setState("idle")}
              className="px-5 py-2.5 bg-white dark:bg-gray-800 text-emerald-800 dark:text-emerald-600 font-medium rounded-lg border border-emerald-200 dark:border-emerald-900 hover:bg-emerald-50 transition-colors text-sm"
            >
              {t("scanner.retry")}
            </button>
          </div>
        </div>
      )}

      {state === "success" && result && (
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          {/* Timestamp + pages info */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
            <p>
              {t("scanner.analysisDate")} {new Date(result.scannedAt).toLocaleString(locale === "fr" ? "fr-FR" : "en-US")}
            </p>
            <span className="hidden sm:inline">·</span>
            <p className="font-medium text-gray-700 dark:text-gray-300">
              {result.pagesScanned} {result.pagesScanned > 1 ? t("scanner.pagesAnalyzedPlural") : t("scanner.pagesAnalyzed")}
              {result.sitemapFound && result.totalPagesInSitemap > 0 && (
                <span className="text-gray-400 dark:text-gray-500 font-normal"> / {result.totalPagesInSitemap} {t("scanner.inSitemap")}</span>
              )}
            </p>
          </div>

          {/* Sitemap alert */}
          <SitemapAlert sitemapFound={result.sitemapFound} />

          {/* 1. Score global */}
          <GlobalScoreCard
            score={result.globalScore}
            level={result.globalLevel}
            letterGrade={result.letterGrade}
            url={result.url}
            pagesScanned={result.pagesScanned}
            sitemapFound={result.sitemapFound}
          />

          {/* 2. Sous-scores */}
          <SubScoresGrid subScores={result.subScores} />

          {/* 3. Détail des outils détectés */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">{t("scanner.detectedTools")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DetectedToolsCard
                tools={result.analytics}
                title="Analytics"
                emptyMessage={t("scanner.noAnalytics")}
              />
              <DetectedToolsCard
                tools={result.pixels}
                title={t("scanner.trackingPixels")}
                emptyMessage={t("scanner.noPixels")}
              />
              <ConsentBannerCard
                banners={result.consentBanners}
                needsConsent={
                  result.analytics.some((t) => !t.cnilExempt) ||
                  result.pixels.length > 0
                }
              />
              <DetectedToolsCard
                tools={result.tagManagers}
                title={t("scanner.tagManagers")}
                emptyMessage={t("scanner.noTagManager")}
              />
              <LegalPagesCard legalPages={result.legalPages} />
            </div>
          </div>

          {/* 3b. Sécurité, ressources tierces, efficacité consentement */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">{t("scanner.deepAnalysis")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SecurityHeadersCard headers={result.securityHeaders} />
              <ThirdPartyCard resources={result.thirdPartyResources} />
              <ConsentEffectivenessCard
                effectiveness={result.consentEffectiveness}
                hasConsentBanner={result.consentBanners.length > 0}
              />
            </div>
          </div>

          {/* 3c. Détail par page */}
          {result.pageDetails && result.pageDetails.length > 0 && (
            <div>
              <PageDetailsCard pageDetails={result.pageDetails} pagesScanned={result.pagesScanned} />
            </div>
          )}

          {/* 4. Plan d'action */}
          <ActionPlan recommendations={result.recommendations} />

          {/* 5. Aller plus loin */}
          <ActionSection />
        </div>
      )}
    </div>
  );
}
