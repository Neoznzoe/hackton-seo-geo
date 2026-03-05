import Link from "next/link";
import { AnalyticsTool } from "@/lib/types";

interface ComparisonTableProps {
  tools: AnalyticsTool[];
}

export default function ComparisonTable({ tools }: ComparisonTableProps) {
  const allFeatureLabels = [
    "Suivi evenementiel",
    "Analyse en temps reel",
    "Suivi e-commerce",
    "Entonnoirs de conversion",
    "Respect vie privee par defaut",
    "Mode sans cookies",
    "Auto-hebergement",
  ];

  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800">
            <th
              scope="col"
              className="sticky left-0 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 min-w-[160px]"
            >
              Critere
            </th>
            {tools.map((tool) => (
              <th
                key={tool.slug}
                scope="col"
                className="px-4 py-3 text-center font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 min-w-[130px]"
              >
                <Link
                  href={`/outils/${tool.slug}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {tool.name}
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Prix */}
          <tr>
            <th
              scope="row"
              className="sticky left-0 bg-white dark:bg-gray-900 px-4 py-3 text-left font-medium text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-800"
            >
              Prix de depart
            </th>
            {tools.map((tool) => (
              <td
                key={tool.slug}
                className="px-4 py-3 text-center border-b border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300"
              >
                {tool.pricing[0]?.price}
                {tool.pricing[0]?.period && (
                  <span className="block text-xs text-gray-500 dark:text-gray-400">
                    {tool.pricing[0].period}
                  </span>
                )}
              </td>
            ))}
          </tr>

          {/* Conformite RGPD */}
          <tr className="bg-gray-50/50 dark:bg-gray-800/50">
            <th
              scope="row"
              className="sticky left-0 bg-gray-50/50 dark:bg-gray-800/50 px-4 py-3 text-left font-medium text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-800"
            >
              Conforme RGPD
            </th>
            {tools.map((tool) => (
              <td
                key={tool.slug}
                className="px-4 py-3 text-center border-b border-gray-100 dark:border-gray-800"
              >
                {tool.compliance.gdprCompliant ? (
                  <span className="text-green-600" aria-label="Oui">&#10003;</span>
                ) : (
                  <span className="text-red-400" aria-label="Non">&#10007;</span>
                )}
              </td>
            ))}
          </tr>

          {/* Exempte CNIL */}
          <tr>
            <th
              scope="row"
              className="sticky left-0 bg-white dark:bg-gray-900 px-4 py-3 text-left font-medium text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-800"
            >
              Exempte CNIL
            </th>
            {tools.map((tool) => (
              <td
                key={tool.slug}
                className="px-4 py-3 text-center border-b border-gray-100 dark:border-gray-800"
              >
                {tool.compliance.cnilExempt ? (
                  <span className="text-green-600" aria-label="Oui">&#10003;</span>
                ) : (
                  <span className="text-red-400" aria-label="Non">&#10007;</span>
                )}
              </td>
            ))}
          </tr>

          {/* Localisation */}
          <tr className="bg-gray-50/50 dark:bg-gray-800/50">
            <th
              scope="row"
              className="sticky left-0 bg-gray-50/50 dark:bg-gray-800/50 px-4 py-3 text-left font-medium text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-800"
            >
              Localisation donnees
            </th>
            {tools.map((tool) => (
              <td
                key={tool.slug}
                className="px-4 py-3 text-center text-xs text-gray-600 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800"
              >
                {tool.compliance.dataLocation}
              </td>
            ))}
          </tr>

          {/* Features */}
          {allFeatureLabels.map((label, i) => (
            <tr key={label} className={i % 2 === 0 ? "" : "bg-gray-50/50 dark:bg-gray-800/50"}>
              <th
                scope="row"
                className={`sticky left-0 ${
                  i % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50/50 dark:bg-gray-800/50"
                } px-4 py-3 text-left font-medium text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-800`}
              >
                {label}
              </th>
              {tools.map((tool) => {
                const feature = tool.features.find((f) => f.label === label);
                return (
                  <td
                    key={tool.slug}
                    className="px-4 py-3 text-center border-b border-gray-100 dark:border-gray-800"
                  >
                    {feature?.available ? (
                      <span className="text-green-600" aria-label="Oui">&#10003;</span>
                    ) : (
                      <span className="text-red-400" aria-label="Non">&#10007;</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
