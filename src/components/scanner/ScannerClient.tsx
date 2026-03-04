"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { ScanResult } from "@/lib/scanner/types";
import { trackEvent } from "@/lib/tracking";
import ScannerHero from "./ScannerHero";
import ScannerLoading from "./ScannerLoading";
import RiskScoreCard from "./RiskScoreCard";
import DetectedToolsCard from "./DetectedToolsCard";
import ConsentBannerCard from "./ConsentBannerCard";
import RecommendationSection from "./RecommendationSection";
import ActionSection from "./ActionSection";

type ScanState = "idle" | "loading" | "success" | "error";

export default function ScannerClient() {
  const [state, setState] = useState<ScanState>("idle");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const autoScanDone = useRef(false);

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

    trackEvent("scanner", "scan_start", url);

    try {
      const response = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue.");
      }

      setResult(data as ScanResult);
      setState("success");
      trackEvent("scanner", "scan_result", data.riskLevel, data.riskScore);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
      setState("error");
      trackEvent("scanner", "scan_error", url);
    }
  }

  return (
    <div>
      <ScannerHero onScan={handleScan} isLoading={state === "loading"} initialUrl={searchParams.get("url") || undefined} />

      {state === "loading" && <ScannerLoading />}

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
              Reessayer
            </button>
          </div>
        </div>
      )}

      {state === "success" && result && (
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 space-y-6">
          <p className="text-sm text-gray-600">
            Analyse de <span className="font-semibold text-gray-900">{result.url}</span>{" "}
            <span className="text-gray-400">—</span>{" "}
            {new Date(result.scannedAt).toLocaleString("fr-FR")}
          </p>

          <RiskScoreCard
            score={result.riskScore}
            level={result.riskLevel}
            details={result.riskDetails}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DetectedToolsCard
              tools={result.analytics}
              title="Outils analytics"
              emptyMessage="Aucun outil analytics detecte"
            />
            <DetectedToolsCard
              tools={result.pixels}
              title="Pixels de tracking"
              emptyMessage="Aucun pixel de tracking detecte"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ConsentBannerCard banners={result.consentBanners} />
            <DetectedToolsCard
              tools={result.tagManagers}
              title="Tag managers"
              emptyMessage="Aucun tag manager detecte"
            />
          </div>

          <RecommendationSection recommendations={result.recommendations} />

          <ActionSection />
        </div>
      )}
    </div>
  );
}
