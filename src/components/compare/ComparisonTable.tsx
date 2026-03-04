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
          <tr className="bg-gray-50">
            <th
              scope="col"
              className="sticky left-0 bg-gray-50 px-4 py-3 text-left font-semibold text-gray-900 border-b border-gray-200 min-w-[160px]"
            >
              Critere
            </th>
            {tools.map((tool) => (
              <th
                key={tool.slug}
                scope="col"
                className="px-4 py-3 text-center font-semibold text-gray-900 border-b border-gray-200 min-w-[130px]"
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
              className="sticky left-0 bg-white px-4 py-3 text-left font-medium text-gray-900 border-b border-gray-100"
            >
              Prix de depart
            </th>
            {tools.map((tool) => (
              <td
                key={tool.slug}
                className="px-4 py-3 text-center border-b border-gray-100 text-gray-700"
              >
                {tool.pricing[0]?.price}
                {tool.pricing[0]?.period && (
                  <span className="block text-xs text-gray-500">
                    {tool.pricing[0].period}
                  </span>
                )}
              </td>
            ))}
          </tr>

          {/* Conformite RGPD */}
          <tr className="bg-gray-50/50">
            <th
              scope="row"
              className="sticky left-0 bg-gray-50/50 px-4 py-3 text-left font-medium text-gray-900 border-b border-gray-100"
            >
              Conforme RGPD
            </th>
            {tools.map((tool) => (
              <td
                key={tool.slug}
                className="px-4 py-3 text-center border-b border-gray-100"
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
              className="sticky left-0 bg-white px-4 py-3 text-left font-medium text-gray-900 border-b border-gray-100"
            >
              Exempte CNIL
            </th>
            {tools.map((tool) => (
              <td
                key={tool.slug}
                className="px-4 py-3 text-center border-b border-gray-100"
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
          <tr className="bg-gray-50/50">
            <th
              scope="row"
              className="sticky left-0 bg-gray-50/50 px-4 py-3 text-left font-medium text-gray-900 border-b border-gray-100"
            >
              Localisation donnees
            </th>
            {tools.map((tool) => (
              <td
                key={tool.slug}
                className="px-4 py-3 text-center text-xs text-gray-600 border-b border-gray-100"
              >
                {tool.compliance.dataLocation}
              </td>
            ))}
          </tr>

          {/* Features */}
          {allFeatureLabels.map((label, i) => (
            <tr key={label} className={i % 2 === 0 ? "" : "bg-gray-50/50"}>
              <th
                scope="row"
                className={`sticky left-0 ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                } px-4 py-3 text-left font-medium text-gray-900 border-b border-gray-100`}
              >
                {label}
              </th>
              {tools.map((tool) => {
                const feature = tool.features.find((f) => f.label === label);
                return (
                  <td
                    key={tool.slug}
                    className="px-4 py-3 text-center border-b border-gray-100"
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
