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
import TrackedCta from "@/components/analytics/HomeCtaTracker";
import HomeScannerCta from "@/components/scanner/HomeScannerCta";

const homeFaq = [
  {
    question: `Quel est le meilleur outil analytics en ${new Date().getFullYear()} ?`,
    answer:
      `Le meilleur outil analytics depend de vos besoins. Google Analytics 4 est le plus complet et gratuit (25 millions d'evenements/mois). Matomo est la reference pour la conformite RGPD avec auto-hebergement gratuit. Plausible est le choix ideal pour la simplicite et le respect de la vie privee (script < 1 ko). Pour les grandes entreprises, Adobe Analytics offre l'IA predictive et l'attribution avancee.`,
  },
  {
    question: "Quel outil analytics est conforme au RGPD sans bandeau cookies ?",
    answer:
      "6 outils sur 8 sont exemptes de consentement CNIL : Matomo (en configuration sans cookies), Plausible, Simple Analytics, Fathom, Umami et Piwik PRO (en mode cookieless). La CNIL recommande officiellement Matomo en configuration respectueuse de la vie privee. Ces outils ne collectent aucune donnee personnelle et fonctionnent sans cookies.",
  },
  {
    question: "Existe-t-il des alternatives gratuites a Google Analytics ?",
    answer:
      "Oui, 4 alternatives gratuites existent : Matomo On-Premise (open source, auto-heberge, fonctionnalites comparables a GA4), Umami (open source, MIT License, interface moderne), Piwik PRO Core (500 000 actions/mois gratuites, consent manager inclus) et Google Analytics 4 lui-meme. Matomo et Umami offrent en plus un controle total des donnees et la conformite RGPD.",
  },
  {
    question: "Comment choisir entre Matomo et Plausible ?",
    answer:
      "Matomo est le choix pour les sites complexes : suivi e-commerce, heatmaps, A/B testing, import GA, auto-hebergement gratuit. Plausible est le choix pour la simplicite : script ultra-leger (< 1 ko vs 45 ko pour GA4), tableau de bord epure, tarifs a partir de 9 €/mois. Les deux sont conformes RGPD et exemptes de consentement CNIL.",
  },
  {
    question: "Qu'est-ce que DevRadar ?",
    answer:
      "DevRadar est un comparateur independant d'outils analytics web cree en France. Il analyse et compare 8 solutions (GA4, Matomo, Plausible, Piwik PRO, Simple Analytics, Fathom, Adobe Analytics, Umami) sur des criteres objectifs : fonctionnalites, tarifs, conformite RGPD/CNIL et facilite d'utilisation. Aucun classement sponsorise.",
  },
  {
    question: "Quelles sont les recommandations de la CNIL pour les analytics ?",
    answer:
      "La CNIL recommande d'utiliser des outils analytics qui ne transferent pas de donnees hors UE, fonctionnent sans cookies et ne collectent pas de donnees personnelles. Depuis fevrier 2022, la CNIL considere Google Analytics non conforme au RGPD. Elle recommande Matomo en configuration sans cookies comme alternative et exempte de consentement 6 outils de notre comparatif.",
  },
  {
    question: "Quel est le meilleur outil analytics open source ?",
    answer:
      "Matomo est le meilleur outil analytics open source en termes de fonctionnalites : suivi e-commerce, heatmaps, A/B testing, import GA, exempte CNIL. Umami (licence MIT) est le plus leger et le plus simple a deployer (Docker, Vercel, Railway). Plausible (AGPL) offre le meilleur compromis simplicite/conformite avec un script < 1 ko.",
  },
  {
    question: "Combien coute un outil analytics ?",
    answer:
      "Les prix varient de 0 € a plus de 100 000 $/an. Gratuits : GA4 (25M evenements/mois), Matomo On-Premise, Umami self-hosted, Piwik PRO Core (500K actions/mois). Abordables : Plausible a partir de 9 €/mois, Umami Cloud 9 $/mois, Fathom 15 $/mois. Entreprise : Adobe Analytics et GA4 360 sur devis (100 000+ $/an).",
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
            <TrackedCta
              href="/scanner"
              label="Scanner mon site gratuitement"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            />
            <TrackedCta
              href="/comparer"
              label="Comparer les outils"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Scanner CTA - prominent position */}
      <section className="py-12 bg-gradient-to-br from-blue-700 to-indigo-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 rounded-full text-sm font-medium text-blue-100">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              Outil gratuit
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            Votre site est-il conforme RGPD ?
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
            Scannez votre site pour detecter les outils analytics, pixels de tracking
            et obtenir un score de conformite instantane.
          </p>
          <HomeScannerCta />
          <p className="text-sm text-blue-200 mt-4">
            Analyse multi-pages automatique. Aucune inscription requise.
          </p>
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
