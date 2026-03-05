import { Metadata } from "next";
import Link from "next/link";
import { tools } from "@/data/tools";
import { SITE_NAME, BASE_URL, CURRENT_YEAR } from "@/lib/constants";
import Breadcrumb from "@/components/layout/Breadcrumb";
import FaqSection from "@/components/content/FaqSection";
import JsonLd from "@/components/seo/JsonLd";
import { Article } from "schema-dts";

export const metadata: Metadata = {
  title: `Analytics conforme RGPD : guide complet ${CURRENT_YEAR}`,
  description: `Guide complet sur la conformite RGPD des outils analytics en ${CURRENT_YEAR}. Recommandations CNIL, outils exemptes de consentement, alternatives a Google Analytics.`,
  alternates: { canonical: "/ressources/rgpd-analytics" },
  openGraph: {
    title: `Analytics conforme RGPD : guide complet ${CURRENT_YEAR} | ${SITE_NAME}`,
    description: `Tout savoir sur la conformite RGPD des outils analytics.`,
    type: "article",
  },
};

const rgpdFaq = [
  {
    question: "Google Analytics est-il conforme au RGPD ?",
    answer: `Non, Google Analytics (GA4) n'est pas considere conforme au RGPD par la CNIL depuis fevrier 2022. Les donnees sont transferees aux serveurs Google aux USA, ce qui viole le RGPD apres l'invalidation du Privacy Shield. Le Consent Mode v2 et le server-side tagging ameliorent la situation mais ne resolvent pas completement le probleme.`,
  },
  {
    question: "Quels outils analytics sont exemptes de consentement par la CNIL ?",
    answer: `La CNIL exempte de consentement les outils analytics qui respectent certaines conditions : pas de cookies, pas de donnees personnelles, pas de suivi cross-site, donnees hebergees en UE. En ${CURRENT_YEAR}, les outils exemptes incluent Matomo (en configuration sans cookies), Plausible, Simple Analytics, Fathom, Umami et Piwik PRO (en mode cookieless).`,
  },
  {
    question: "Quelles sont les sanctions en cas de non-conformite RGPD ?",
    answer: "Les sanctions RGPD peuvent atteindre 20 millions d'euros ou 4 % du chiffre d'affaires mondial annuel (le montant le plus eleve est retenu). La CNIL a deja sanctionne des entreprises francaises pour utilisation non conforme de Google Analytics. Les mises en demeure sont publiques et impactent la reputation.",
  },
  {
    question: "Le Consent Mode v2 de Google rend-il GA4 conforme ?",
    answer: "Le Consent Mode v2 ameliore la conformite de GA4 en modelisant les donnees des utilisateurs qui refusent le consentement, mais ne resout pas le probleme fondamental du transfert de donnees vers les USA. Il reste necessaire d'afficher un bandeau de consentement et les donnees modelisees ne sont que des estimations.",
  },
];

const articleJsonLd: Article = {
  "@type": "Article",
  headline: `Analytics conforme RGPD : guide complet ${CURRENT_YEAR}`,
  description: `Guide complet sur la conformite RGPD des outils analytics.`,
  url: `${BASE_URL}/ressources/rgpd-analytics`,
  inLanguage: "fr",
  datePublished: `${CURRENT_YEAR}-01-01`,
  dateModified: new Date().toISOString().split("T")[0],
  author: { "@type": "Organization", name: SITE_NAME },
  publisher: { "@type": "Organization", name: SITE_NAME },
};

export default function RgpdAnalyticsPage() {
  const compliantTools = tools.filter((t) => t.compliance.gdprCompliant);
  const cnilExemptTools = tools.filter((t) => t.compliance.cnilExempt);
  const cookielessTools = tools.filter((t) => t.compliance.cookieless);

  return (
    <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <JsonLd data={{ "@context": "https://schema.org", ...articleJsonLd }} />

      <Breadcrumb
        items={[
          { label: "Ressources" },
          { label: "RGPD Analytics" },
        ]}
      />

      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
          Analytics conforme RGPD : le guide complet {CURRENT_YEAR}
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
          Tout savoir sur la conformite RGPD des outils analytics web : reglementation,
          recommandations CNIL, outils conformes et bonnes pratiques.
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <p className="text-sm font-semibold text-blue-800 uppercase tracking-wide mb-3">
          En resume
        </p>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li><strong>{compliantTools.length} outils sur {tools.length}</strong> sont conformes au RGPD dans notre comparatif.</li>
          <li><strong>{cnilExemptTools.length} outils</strong> sont exemptes de consentement par la CNIL.</li>
          <li><strong>{cookielessTools.length} outils</strong> fonctionnent sans aucun cookie.</li>
          <li>Google Analytics n&apos;est <strong>pas considere conforme</strong> au RGPD par la CNIL.</li>
        </ul>
      </section>

      {/* Contexte reglementaire */}
      <section className="mb-12" aria-labelledby="contexte">
        <h2 id="contexte" className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Contexte reglementaire
        </h2>
        <div className="prose prose-sm text-gray-700 dark:text-gray-300 space-y-4">
          <p>
            Le RGPD (Reglement General sur la Protection des Donnees), en vigueur depuis mai 2018,
            impose des regles strictes sur la collecte de donnees personnelles des residents europeens.
            Les outils analytics collectent par nature des donnees (adresses IP, identifiants de cookies,
            comportement de navigation) qui peuvent etre considerees comme personnelles.
          </p>
          <p>
            En <strong>fevrier 2022</strong>, la CNIL a juge que l&apos;utilisation de Google Analytics
            violait le RGPD en raison du transfert de donnees vers les Etats-Unis, apres l&apos;invalidation
            du Privacy Shield par la Cour de Justice de l&apos;UE (arret Schrems II, juillet 2020).
          </p>
          <p>
            Depuis, la CNIL recommande l&apos;utilisation d&apos;outils analytics qui ne transferent pas
            de donnees hors UE et qui peuvent fonctionner sans cookies ni donnees personnelles.
          </p>
        </div>
      </section>

      {/* Outils conformes */}
      <section className="mb-12" aria-labelledby="outils-conformes">
        <h2 id="outils-conformes" className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Outils analytics conformes RGPD
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="text-left p-3 border border-gray-200 dark:border-gray-700 font-semibold">Outil</th>
                <th className="text-center p-3 border border-gray-200 dark:border-gray-700 font-semibold">Conforme RGPD</th>
                <th className="text-center p-3 border border-gray-200 dark:border-gray-700 font-semibold">Exempte CNIL</th>
                <th className="text-center p-3 border border-gray-200 dark:border-gray-700 font-semibold">Sans cookies</th>
                <th className="text-left p-3 border border-gray-200 dark:border-gray-700 font-semibold">Donnees</th>
              </tr>
            </thead>
            <tbody>
              {tools.map((tool) => (
                <tr key={tool.slug}>
                  <td className="p-3 border border-gray-200 dark:border-gray-700">
                    <Link href={`/outils/${tool.slug}`} className="text-blue-600 hover:text-blue-800 font-medium">
                      {tool.name}
                    </Link>
                  </td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-center">
                    {tool.compliance.gdprCompliant ? <span className="text-green-600">Oui</span> : <span className="text-red-600">Non</span>}
                  </td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-center">
                    {tool.compliance.cnilExempt ? <span className="text-green-600">Oui</span> : <span className="text-red-600">Non</span>}
                  </td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-center">
                    {tool.compliance.cookieless ? <span className="text-green-600">Oui</span> : <span className="text-red-600">Non</span>}
                  </td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">{tool.compliance.dataLocation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bonnes pratiques */}
      <section className="mb-12" aria-labelledby="bonnes-pratiques">
        <h2 id="bonnes-pratiques" className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Bonnes pratiques pour etre conforme
        </h2>
        <ol className="list-decimal list-inside space-y-3 text-sm text-gray-700 dark:text-gray-300">
          <li>
            <strong>Choisissez un outil exempte de consentement CNIL</strong> : Matomo, Plausible, Umami,
            Fathom, Simple Analytics ou Piwik PRO en mode cookieless.
          </li>
          <li>
            <strong>Hebergez les donnees en Europe</strong> : privilegiez les solutions avec des serveurs
            en UE ou l&apos;auto-hebergement sur vos propres serveurs francais.
          </li>
          <li>
            <strong>Activez l&apos;anonymisation IP</strong> : masquez les adresses IP des visiteurs
            avant stockage pour minimiser la collecte de donnees personnelles.
          </li>
          <li>
            <strong>Desactivez les cookies</strong> : utilisez le mode sans cookies quand il est
            disponible pour eviter l&apos;obligation de bandeau de consentement.
          </li>
          <li>
            <strong>Documentez votre conformite</strong> : tenez a jour votre registre de traitement,
            votre politique de confidentialite et votre analyse d&apos;impact (AIPD si necessaire).
          </li>
        </ol>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <FaqSection items={rgpdFaq} heading="Questions frequentes RGPD et analytics" />
      </section>

      {/* CTA */}
      <section className="bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Trouvez un outil analytics conforme RGPD
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
          Comparez les {cnilExemptTools.length} outils exemptes de consentement CNIL dans notre comparatif.
        </p>
        <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/comparer"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Voir le comparatif
          </Link>
          <Link
            href="/categorie/privacy-first"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Outils privacy-first
          </Link>
        </div>
      </section>
    </article>
  );
}
