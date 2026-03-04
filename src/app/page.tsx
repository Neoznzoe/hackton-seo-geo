import Link from "next/link";
import { tools } from "@/data/tools";
import { categories } from "@/data/categories";
import { getToolsByCategory } from "@/data/tools";
import ToolCard from "@/components/tools/ToolCard";
import CategoryCard from "@/components/categories/CategoryCard";
import FaqSection from "@/components/content/FaqSection";
import JsonLd from "@/components/seo/JsonLd";
import { BASE_URL } from "@/lib/constants";
import { ItemList } from "schema-dts";

const homeFaq = [
  {
    question: "Quel est le meilleur outil analytics en 2025 ?",
    answer:
      "Il n'existe pas de meilleur outil universel. Google Analytics 4 est le plus complet et gratuit, Matomo est ideal pour la conformite RGPD avec auto-hebergement, et Plausible est parfait pour ceux qui veulent la simplicite et le respect de la vie privee. Le choix depend de vos besoins en fonctionnalites, budget et conformite.",
  },
  {
    question: "Quel outil analytics est conforme au RGPD sans bandeau cookies ?",
    answer:
      "Matomo (en configuration sans cookies), Plausible, Simple Analytics, Fathom, Umami et Piwik PRO (en mode cookieless) sont tous utilisables sans bandeau de consentement cookies. La CNIL recommande notamment Matomo en configuration respectueuse de la vie privee.",
  },
  {
    question: "Existe-t-il des alternatives gratuites a Google Analytics ?",
    answer:
      "Oui, plusieurs alternatives gratuites existent : Matomo On-Premise (open source, auto-heberge), Umami (open source, auto-heberge), et Piwik PRO Core (jusqu'a 500 000 actions/mois). Ces outils offrent en plus un meilleur respect de la vie privee.",
  },
  {
    question: "Comment choisir entre Matomo et Plausible ?",
    answer:
      "Matomo est plus complet (e-commerce, heatmaps, A/B testing) et convient aux sites complexes. Plausible est plus simple, plus leger (script < 1 ko) et ideal pour les sites qui veulent des metriques essentielles sans complexite. Les deux sont conformes RGPD.",
  },
  {
    question: "Qu'est-ce que DevRadar ?",
    answer:
      "DevRadar est un comparateur independant d'outils analytics web. Nous analysons et comparons 8 solutions (GA4, Matomo, Plausible, Piwik PRO, Simple Analytics, Fathom, Adobe Analytics, Umami) sur des criteres objectifs : fonctionnalites, tarifs, conformite RGPD et facilite d'utilisation.",
  },
];

const itemListJsonLd: ItemList = {
  "@type": "ItemList",
  itemListElement: tools.map((tool, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: tool.name,
    url: `${BASE_URL}/outils/${tool.slug}`,
  })),
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", ...itemListJsonLd }} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
            Comparez les meilleurs outils analytics web
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Google Analytics 4, Matomo, Plausible, Piwik PRO, Simple Analytics,
            Fathom, Adobe Analytics et Umami : trouvez la solution adaptee a vos
            besoins en fonctionnalites, prix et conformite RGPD.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/comparer"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Comparer les outils
            </Link>
            <Link
              href="#outils"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Voir tous les outils
            </Link>
          </div>
        </div>
      </section>

      {/* Outils */}
      <section id="outils" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            8 outils analytics compares
          </h2>
          <p className="text-gray-600 mb-8">
            De la solution gratuite a la suite entreprise, trouvez l&apos;outil
            qui correspond a votre projet.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Explorez par categorie
          </h2>
          <p className="text-gray-600 mb-8">
            Filtrez les outils analytics selon vos criteres prioritaires.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.slug}
                category={cat}
                toolCount={getToolsByCategory(cat.slug).length}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi DevRadar */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Pourquoi utiliser DevRadar ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">
                Comparaison objective
              </h3>
              <p className="mt-2 text-gray-600 text-sm">
                Nous analysons chaque outil sur des criteres factuels :
                fonctionnalites, tarifs, conformite RGPD, performance. Pas de
                classement sponsorise.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">
                Focus conformite RGPD
              </h3>
              <p className="mt-2 text-gray-600 text-sm">
                Chaque fiche outil detaille la conformite RGPD, les
                recommandations CNIL et la possibilite d&apos;utiliser l&apos;outil
                sans bandeau cookies.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">
                Donnees a jour
              </h3>
              <p className="mt-2 text-gray-600 text-sm">
                Tarifs, fonctionnalites et politiques de confidentialite sont
                regulierement verifies pour vous offrir des informations fiables
                et actuelles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FaqSection items={homeFaq} />
        </div>
      </section>
    </>
  );
}
