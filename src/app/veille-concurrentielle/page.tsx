import type { Metadata } from "next";
import { SITE_NAME, BASE_URL } from "@/lib/constants";
import Breadcrumb from "@/components/layout/Breadcrumb";
import VeilleClient from "@/components/veille/VeilleClient";

export const metadata: Metadata = {
  title: `Veille concurrentielle analytics - ${SITE_NAME}`,
  description:
    "Veille concurrentielle automatisee sur les outils analytics : pricing, fonctionnalites, conformite RGPD. Donnees collectees dans le respect du robots.txt et du RGPD.",
  alternates: {
    canonical: `${BASE_URL}veille-concurrentielle`,
  },
  openGraph: {
    title: `Veille concurrentielle analytics - ${SITE_NAME}`,
    description:
      "Veille concurrentielle automatisee sur les outils analytics web. Scraping ethique et conforme.",
  },
};

const breadcrumbItems = [
  { label: "Veille concurrentielle" },
];

export default function VeillePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={breadcrumbItems} />

      <div className="mt-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Veille concurrentielle analytics
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
          Surveillance automatisee des outils analytics concurrents : tarifs,
          fonctionnalites et conformite RGPD. Toutes les donnees sont collectees
          de maniere ethique, dans le respect du fichier robots.txt de chaque
          source.
        </p>
      </div>

      {/* Transparency banner */}
      <div className="mt-6 rounded-lg bg-blue-50 border border-blue-200 p-4">
        <h2 className="text-sm font-semibold text-blue-800">
          Scraping ethique et transparent
        </h2>
        <ul className="mt-2 text-sm text-blue-700 space-y-1">
          <li>Respect du fichier robots.txt de chaque site cible</li>
          <li>Rate limiting : 1 requete toutes les 2 secondes par domaine</li>
          <li>User-Agent identifie : DevRadarBot/1.0</li>
          <li>Aucune donnee personnelle collectee (produit uniquement)</li>
          <li>Journalisation complete de chaque operation</li>
          <li>Minimisation des donnees : seules les infos produit sont extraites</li>
        </ul>
      </div>

      <VeilleClient />
    </div>
  );
}
