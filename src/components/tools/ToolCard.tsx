import Link from "next/link";
import { AnalyticsTool } from "@/lib/types";
import ToolScore from "@/components/tools/ToolScore";

interface ToolCardProps {
  tool: AnalyticsTool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const hasFree = tool.pricing.some(
    (p) => p.price === "0 €" || p.price.toLowerCase().includes("gratuit")
  );

  return (
    <article className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow flex flex-col">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg font-bold text-blue-600 shrink-0">
          {tool.name[0]}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900">{tool.name}</h3>
            <ToolScore tool={tool} />
          </div>
          <div className="flex flex-wrap gap-1 mt-1">
            {hasFree && (
              <span className="inline-block text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                Gratuit
              </span>
            )}
            {tool.compliance.cookieless && (
              <span className="inline-block text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                Sans cookies
              </span>
            )}
            {tool.compliance.gdprCompliant && (
              <span className="inline-block text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                RGPD
              </span>
            )}
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4 flex-1">
        {tool.shortDescription}
      </p>
      <Link
        href={`/outils/${tool.slug}`}
        className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
      >
        Voir le detail &rarr;
      </Link>
    </article>
  );
}
