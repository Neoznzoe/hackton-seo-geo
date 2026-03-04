import { Metadata } from "next";
import Link from "next/link";
import { tools } from "@/data/tools";
import { SITE_NAME, BASE_URL, CURRENT_YEAR } from "@/lib/constants";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ComparisonTable from "@/components/compare/ComparisonTable";
import FaqSection from "@/components/content/FaqSection";
import JsonLd from "@/components/seo/JsonLd";
import { Article } from "schema-dts";

export const metadata: Metadata = {
  title: `Guide : comment choisir son outil analytics en ${CURRENT_YEAR}`,
  description: `Guide complet pour choisir le meilleur outil analytics web en ${CURRENT_YEAR}. Criteres essentiels, conformite RGPD/CNIL, comparatif et recommandations par profil.`,
  alternates: { canonical: "/guide/choisir-outil-analytics" },
  openGraph: {
    title: `Guide : comment choisir son outil analytics en ${CURRENT_YEAR} | ${SITE_NAME}`,
    description: `Guide complet pour choisir le meilleur outil analytics web en ${CURRENT_YEAR}.`,
    type: "article",
  },
};

const guideFaq = [
  {
    question: "Quel est le meilleur outil analytics pour un site vitrine ?",
    answer: `Plausible Analytics est le meilleur choix pour un site vitrine en ${CURRENT_YEAR}. Son script ultra-leger (< 1 ko) n'impacte pas les performances, il est conforme RGPD sans bandeau cookies, et son tableau de bord simple couvre toutes les metriques essentielles. Alternative gratuite : Umami en auto-hebergement.`,
  },
  {
    question: "Quel outil analytics pour un site e-commerce ?",
    answer: `Pour un site e-commerce, Matomo est la meilleure option en ${CURRENT_YEAR}. Il offre un suivi e-commerce complet (panier, revenus, produits), des entonnoirs de conversion, et reste conforme au RGPD avec exemption CNIL. Google Analytics 4 est egalement adapte mais necessite un bandeau de consentement.`,
  },
  {
    question: "Comment migrer de Google Analytics vers une alternative ?",
    answer: "La migration se fait en 3 etapes : 1) Installez le nouvel outil en parallele de GA pendant 2-4 semaines pour comparer les donnees. 2) Importez vos donnees historiques GA (Matomo propose un import natif). 3) Supprimez le script GA une fois satisfait. Matomo, Plausible et Fathom proposent des guides de migration detailles.",
  },
  {
    question: "Faut-il un bandeau cookies pour Google Analytics 4 ?",
    answer: "Oui, Google Analytics 4 utilise des cookies et transfere les donnees aux USA, ce qui necessite un bandeau de consentement conforme au RGPD. La CNIL a juge GA non conforme en fevrier 2022. Le Consent Mode v2 et le server-side tagging ameliorent la conformite mais ne suppriment pas l'obligation de consentement.",
  },
];

const articleJsonLd: Article = {
  "@type": "Article",
  headline: `Guide : comment choisir son outil analytics en ${CURRENT_YEAR}`,
  description: `Guide complet pour choisir le meilleur outil analytics web en ${CURRENT_YEAR}.`,
  url: `${BASE_URL}/guide/choisir-outil-analytics`,
  inLanguage: "fr",
  datePublished: `${CURRENT_YEAR}-01-01`,
  dateModified: new Date().toISOString().split("T")[0],
  author: { "@type": "Organization", name: SITE_NAME },
  publisher: { "@type": "Organization", name: SITE_NAME },
};

export default function GuidePage() {
  const privacyTools = tools.filter((t) => t.compliance.gdprCompliant && t.compliance.cnilExempt);
  const freeTools = tools.filter((t) => t.pricing.some((p) => p.price === "0 €"));

  return (
    <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <JsonLd data={{ "@context": "https://schema.org", ...articleJsonLd }} />

      <Breadcrumb
        items={[
          { label: "Guide" },
          { label: "Choisir son outil analytics" },
        ]}
      />

      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Comment choisir son outil analytics en {CURRENT_YEAR} ?
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Guide complet pour trouver la solution analytics adaptee a vos besoins :
          criteres de choix, conformite RGPD, comparatif et recommandations.
        </p>
      </header>

      {/* Criteres essentiels */}
      <section className="mb-12" aria-labelledby="criteres">
        <h2 id="criteres" className="text-2xl font-bold text-gray-900 mb-4">
          Les criteres essentiels pour choisir
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 mb-2">Fonctionnalites</h3>
            <p className="text-sm text-gray-600">
              Identifiez vos besoins : metriques de base (pages vues, sources, pays) ou avancees
              (e-commerce, entonnoirs, heatmaps, A/B testing). Un site vitrine n&apos;a pas les
              memes besoins qu&apos;un e-commerce.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 mb-2">Conformite RGPD</h3>
            <p className="text-sm text-gray-600">
              La conformite au RGPD est obligatoire en Europe. Privilegiez les outils exemptes
              de consentement par la CNIL pour eviter la perte de donnees liee aux refus de cookies
              (30-50 % des visiteurs).
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 mb-2">Budget</h3>
            <p className="text-sm text-gray-600">
              Les prix varient de 0 € (GA4, Matomo On-Premise, Umami) a plus de 100 000 $/an
              (Adobe Analytics). Evaluez le cout total : hebergement, plugins, support.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 mb-2">Facilite d&apos;utilisation</h3>
            <p className="text-sm text-gray-600">
              Un outil complexe non maitrise est inutile. Plausible et Simple Analytics sont les
              plus simples. GA4 et Adobe Analytics necessitent une formation approfondie.
            </p>
          </div>
        </div>
      </section>

      {/* RGPD/CNIL */}
      <section className="mb-12" aria-labelledby="rgpd">
        <h2 id="rgpd" className="text-2xl font-bold text-gray-900 mb-4">
          RGPD et recommandations CNIL
        </h2>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
          <p className="text-sm text-gray-700 mb-3">
            <strong>Ce que dit la CNIL :</strong> Depuis fevrier 2022, la CNIL considere que
            l&apos;utilisation de Google Analytics entraine des transferts illegaux de donnees vers
            les Etats-Unis. Elle recommande des alternatives conformes.
          </p>
          <p className="text-sm text-gray-700">
            <strong>Outils exemptes de consentement :</strong> Matomo (en configuration sans cookies),
            Plausible, Simple Analytics, Fathom, Umami et Piwik PRO (en mode cookieless) peuvent
            etre utilises sans bandeau de consentement.
          </p>
        </div>
        <p className="text-sm text-gray-600">
          <strong>{privacyTools.length} outils sur {tools.length}</strong> sont conformes RGPD et
          exemptes de consentement CNIL dans notre comparatif.
        </p>
      </section>

      {/* Comparatif rapide */}
      <section className="mb-12" aria-labelledby="comparatif">
        <h2 id="comparatif" className="text-2xl font-bold text-gray-900 mb-6">
          Comparatif rapide
        </h2>
        <ComparisonTable tools={tools} />
      </section>

      {/* Recommandations par profil */}
      <section className="mb-12" aria-labelledby="recommandations">
        <h2 id="recommandations" className="text-2xl font-bold text-gray-900 mb-4">
          Recommandations par profil
        </h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 mb-2">Blog / site vitrine</h3>
            <p className="text-sm text-gray-600">
              <strong>Recommande :</strong>{" "}
              <Link href="/outils/plausible" className="text-blue-600 hover:text-blue-800">Plausible</Link> ou{" "}
              <Link href="/outils/umami" className="text-blue-600 hover:text-blue-800">Umami</Link>.
              Legers, simples, conformes RGPD. Umami est gratuit en auto-hebergement.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 mb-2">Site e-commerce</h3>
            <p className="text-sm text-gray-600">
              <strong>Recommande :</strong>{" "}
              <Link href="/outils/matomo" className="text-blue-600 hover:text-blue-800">Matomo</Link> ou{" "}
              <Link href="/outils/piwik-pro" className="text-blue-600 hover:text-blue-800">Piwik PRO</Link>.
              Suivi e-commerce complet, entonnoirs de conversion, conformes RGPD.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 mb-2">Grande entreprise</h3>
            <p className="text-sm text-gray-600">
              <strong>Recommande :</strong>{" "}
              <Link href="/outils/adobe-analytics" className="text-blue-600 hover:text-blue-800">Adobe Analytics</Link> ou{" "}
              <Link href="/outils/google-analytics-4" className="text-blue-600 hover:text-blue-800">GA4 360</Link>.
              Fonctionnalites avancees, IA predictive, support dedie, SLA garanti.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 mb-2">Budget zero</h3>
            <p className="text-sm text-gray-600">
              <strong>Recommande :</strong>{" "}
              {freeTools.map((t, i) => (
                <span key={t.slug}>
                  {i > 0 && ", "}
                  <Link href={`/outils/${t.slug}`} className="text-blue-600 hover:text-blue-800">{t.name}</Link>
                </span>
              ))}
              . Tous proposent une offre gratuite suffisante pour la plupart des besoins.
            </p>
          </div>
        </div>
      </section>

      {/* Migration GA */}
      <section className="mb-12" aria-labelledby="migration">
        <h2 id="migration" className="text-2xl font-bold text-gray-900 mb-4">
          Migrer depuis Google Analytics
        </h2>
        <ol className="list-decimal list-inside space-y-3 text-sm text-gray-700">
          <li>
            <strong>Choisissez votre alternative</strong> : utilisez notre{" "}
            <Link href="/comparer" className="text-blue-600 hover:text-blue-800">comparatif</Link>{" "}
            pour identifier l&apos;outil adapte a vos besoins.
          </li>
          <li>
            <strong>Installez en parallele</strong> : faites tourner les deux outils pendant 2-4
            semaines pour comparer les donnees et valider la fiabilite.
          </li>
          <li>
            <strong>Importez vos historiques</strong> : Matomo propose un import natif des donnees
            GA. Les autres outils repartent generalement de zero.
          </li>
          <li>
            <strong>Supprimez GA</strong> : une fois satisfait, retirez le script Google Analytics
            et le bandeau de consentement associe.
          </li>
        </ol>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <FaqSection items={guideFaq} heading="Questions frequentes sur le choix d'un outil analytics" />
      </section>

      {/* CTA */}
      <section className="bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900">
          Pret a comparer ?
        </h2>
        <p className="mt-2 text-gray-600 text-sm">
          Consultez notre tableau comparatif complet avec les 8 outils analytics.
        </p>
        <Link
          href="/comparer"
          className="inline-flex items-center justify-center mt-4 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Voir le comparatif complet
        </Link>
      </section>
    </article>
  );
}
