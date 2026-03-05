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
import ActionSection from "./ActionSection";

type ScanState = "idle" | "loading" | "success" | "error";

export default function ScannerClient() {
  const [state, setState] = useState<ScanState>("idle");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState("");
  const [plan, setPlan] = useState<ScanPlan>("gratuit");
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
        throw new Error(data.error || "Une erreur est survenue.");
      }

      setResult(data as ScanResult);
      setState("success");
      trackScanResult(data.globalLevel, data.globalScore);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
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
          <div className="bg-red-50 border border-red-300 rounded-xl p-8 text-center shadow-sm">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <p className="text-red-800 font-semibold text-lg mb-2">Erreur d&apos;analyse</p>

            <p className="text-red-700 text-sm mb-4">{error}</p>
            <button
              onClick={() => setState("idle")}
              className="px-5 py-2.5 bg-white text-blue-700 font-medium rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors text-sm"
            >
              Réessayer
            </button>
          </div>
        </div>
      )}

      {state === "success" && result && (
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          {/* Timestamp + pages info */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
            <p>
              Analyse effectuée le {new Date(result.scannedAt).toLocaleString("fr-FR")}
            </p>
            <span className="hidden sm:inline">·</span>
            <p className="font-medium text-gray-700">
              {result.pagesScanned} page{result.pagesScanned > 1 ? "s" : ""} analysée{result.pagesScanned > 1 ? "s" : ""}
              {result.sitemapFound && result.totalPagesInSitemap > 0 && (
                <span className="text-gray-400 font-normal"> / {result.totalPagesInSitemap} dans le sitemap</span>
              )}
            </p>
          </div>

          {/* Sitemap alert */}
          <SitemapAlert sitemapFound={result.sitemapFound} />

          {/* 1. Score global */}
          <GlobalScoreCard
            score={result.globalScore}
            level={result.globalLevel}
            url={result.url}
            pagesScanned={result.pagesScanned}
            sitemapFound={result.sitemapFound}
          />

          {/* 2. Sous-scores */}
          <SubScoresGrid subScores={result.subScores} />

          {/* 3. Detail des outils detectes */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Outils détectés</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DetectedToolsCard
                tools={result.analytics}
                title="Analytics"
                emptyMessage="Aucun outil analytics détecté"
              />
              <DetectedToolsCard
                tools={result.pixels}
                title="Pixels de tracking"
                emptyMessage="Aucun pixel détecté"
              />
              <ConsentBannerCard banners={result.consentBanners} />
              <DetectedToolsCard
                tools={result.tagManagers}
                title="Tag managers"
                emptyMessage="Aucun tag manager détecté"
              />
              <LegalPagesCard legalPages={result.legalPages} />
            </div>
          </div>

          {/* 4. Plan d'action */}
          <ActionPlan recommendations={result.recommendations} />

          {/* 5. Aller plus loin */}
          <ActionSection />
        </div>
      )}
    </div>
  );
}
