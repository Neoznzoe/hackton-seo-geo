"use client";

import { useState, FormEvent } from "react";

interface ScannerHeroProps {
  onScan: (url: string) => void;
  isLoading: boolean;
  initialUrl?: string;
}

export default function ScannerHero({ onScan, isLoading, initialUrl }: ScannerHeroProps) {
  const [url, setUrl] = useState(initialUrl || "");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) return;
    onScan(trimmed);
  }

  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Scanner RGPD Analytics
        </h1>
        <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
          Analysez n&apos;importe quel site web pour detecter ses outils
          analytics, evaluer sa conformite RGPD/CNIL et recevoir des
          recommandations personnalisees.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="exemple.fr"
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
            disabled={isLoading}
            aria-label="URL du site a analyser"
          />
          <button
            type="submit"
            disabled={isLoading || !url.trim()}
            className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Analyse..." : "Analyser"}
          </button>
        </form>

        <p className="text-sm text-blue-200 mt-4">
          Gratuit et sans inscription. Nous ne stockons aucune donnee.
        </p>
      </div>
    </section>
  );
}
