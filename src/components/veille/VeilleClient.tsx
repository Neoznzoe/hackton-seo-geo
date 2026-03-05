"use client";

import { useState } from "react";
import { ScrapeResult } from "@/lib/scraper/types";

export default function VeilleClient() {
  const [result, setResult] = useState<ScrapeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showLogs, setShowLogs] = useState(false);

  async function handleScrape() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/veille");
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || `Erreur ${res.status}`);
      }
      const data: ScrapeResult = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8">
      {/* Launch button */}
      <button
        onClick={handleScrape}
        disabled={loading}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? "Collecte en cours..." : "Lancer la veille concurrentielle"}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {loading && (
        <div className="mt-6 flex items-center gap-3 text-gray-500">
          <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full" />
          <span>Scraping en cours... Respect du rate limiting entre chaque source.</span>
        </div>
      )}

      {result && (
        <div className="mt-8 space-y-8">
          {/* Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <MetricCard
              label="Sources scrapees"
              value={`${result.metadata.successfulSources}/${result.metadata.totalSources}`}
            />
            <MetricCard
              label="Outils analyses"
              value={String(result.tools.length)}
            />
            <MetricCard
              label="Duree totale"
              value={`${(result.metadata.totalDuration / 1000).toFixed(1)}s`}
            />
            <MetricCard
              label="Date"
              value={new Date(result.metadata.scrapedAt).toLocaleString("fr-FR")}
            />
          </div>

          {/* Tool results */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Donnees collectees
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Outil
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Pricing detecte
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                      Gratuit
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                      Open Source
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                      Self-hosted
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                      RGPD
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                      Sans cookies
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Source
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {result.tools.map((tool, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {tool.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {tool.pricing || "—"}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Badge value={tool.freeplan} />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Badge value={tool.openSource} />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Badge value={tool.selfHosted} />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Badge value={tool.gdprCompliant} />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Badge value={tool.cookieless} />
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 max-w-[200px] truncate">
                        {tool.source}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Logs */}
          <div>
            <button
              onClick={() => setShowLogs(!showLogs)}
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              {showLogs ? "Masquer" : "Afficher"} le journal de scraping ({result.logs.length} operations)
            </button>

            {showLogs && (
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Horodatage
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Cible
                      </th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                        robots.txt
                      </th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                        Status
                      </th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                        Duree
                      </th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                        Points
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Erreur
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {result.logs.map((log, i) => (
                      <tr key={i} className={log.error ? "bg-red-50" : ""}>
                        <td className="px-3 py-2 text-gray-500 whitespace-nowrap">
                          {new Date(log.timestamp).toLocaleTimeString("fr-FR")}
                        </td>
                        <td className="px-3 py-2 text-gray-700 max-w-[200px] truncate">
                          {log.target}
                        </td>
                        <td className="px-3 py-2 text-center">
                          {log.robotsTxtChecked ? (
                            log.robotsTxtAllowed ? (
                              <span className="text-green-600">Autorise</span>
                            ) : (
                              <span className="text-red-600">Bloque</span>
                            )
                          ) : (
                            "—"
                          )}
                        </td>
                        <td className="px-3 py-2 text-center">
                          {log.statusCode || "—"}
                        </td>
                        <td className="px-3 py-2 text-center">
                          {log.duration}ms
                        </td>
                        <td className="px-3 py-2 text-center">
                          {log.dataPoints}
                        </td>
                        <td className="px-3 py-2 text-red-600">
                          {log.error || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}

function Badge({ value }: { value: boolean | null }) {
  if (value === null) return <span className="text-gray-400">—</span>;
  if (value) return <span className="text-green-600 font-medium">Oui</span>;
  return <span className="text-red-600 font-medium">Non</span>;
}
