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
    <section className="bg-gradient-to-br from-blue-700 to-indigo-900 text-white py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Scanner RGPD Analytics
        </h1>
        <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
          Analysez n&apos;importe quel site web pour détecter ses outils
          analytics, évaluer sa conformité RGPD/CNIL et recevoir des
          recommandations personnalisées.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="exemple.fr"
            className="flex-1 px-5 py-3.5 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-base shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
            disabled={isLoading}
            aria-label="URL du site à analyser"
          />
          <button
            type="submit"
            disabled={isLoading || !url.trim()}
            className="px-8 py-3.5 bg-amber-400 text-gray-900 font-bold rounded-lg hover:bg-amber-300 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-base"
          >
            {isLoading ? "Analyse..." : "Analyser"}
          </button>
        </form>

        <p className="text-sm text-blue-200 mt-5">
          Gratuit et sans inscription. Nous ne stockons aucune donnée.
        </p>
      </div>
    </section>
  );
}
