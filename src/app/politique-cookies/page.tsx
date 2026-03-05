import { Metadata } from "next";
import { SITE_NAME, BASE_URL, CURRENT_YEAR } from "@/lib/constants";
import Breadcrumb from "@/components/layout/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import { Article } from "schema-dts";

export const metadata: Metadata = {
  title: `Politique de cookies – DevRadar`,
  description: `Politique de cookies de DevRadar. Cookies utilisés, gestion du consentement, durées de conservation et vos droits RGPD.`,
  alternates: { canonical: "/politique-cookies" },
  openGraph: {
    title: `Politique de cookies | DevRadar`,
    description: `Comment DevRadar utilise les cookies et comment gérer vos préférences.`,
    type: "article",
  },
};

const articleJsonLd: Article = {
  "@type": "Article",
  headline: `Politique de cookies – DevRadar`,
  description: `Politique de cookies du site DevRadar.`,
  url: `${BASE_URL}/politique-cookies`,
  inLanguage: "fr",
  datePublished: `${CURRENT_YEAR}-01-01`,
  dateModified: "2026-03-05",
  author: { "@type": "Organization", name: SITE_NAME },
  publisher: { "@type": "Organization", name: SITE_NAME },
};

const cookieTableHeaders = ["Nom du cookie", "Finalité", "Durée", "Émetteur"];

const necessaryCookies = [
  {
    name: "devradar_consent",
    purpose: "Stocke votre choix de consentement (accepté / refusé) pour les cookies analytics",
    duration: "12 mois",
    emitter: "DevRadar (1st party)",
  },
  {
    name: "devradar_visited",
    purpose:
      "Différencie les visiteurs nouveaux et récurrents pour la segmentation analytics (sans données personnelles)",
    duration: "Persistant (localStorage)",
    emitter: "DevRadar (1st party)",
  },
];

const piwikCookies = [
  {
    name: "_pk_id.*",
    purpose: "Identifiant visiteur anonyme pour la mesure d'audience",
    duration: "13 mois",
    emitter: "Piwik PRO",
  },
  {
    name: "_pk_ses.*",
    purpose: "Identifiant de session pour regrouper les pages vues",
    duration: "30 minutes",
    emitter: "Piwik PRO",
  },
  {
    name: "stg_*",
    purpose: "Cookies du Tag Manager Piwik PRO pour le déclenchement conditionnel des balises",
    duration: "Variable (session à 12 mois)",
    emitter: "Piwik PRO",
  },
];

const ahrefsCookies = [
  {
    name: "ahrefs_*",
    purpose: "Mesure de trafic et analyse SEO",
    duration: "Variable",
    emitter: "Ahrefs Pte. Ltd.",
  },
];

const CookieTable = ({ rows }: { rows: typeof necessaryCookies }) => (
  <div className="overflow-x-auto mt-3">
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="bg-gray-50">
          {cookieTableHeaders.map((h) => (
            <th key={h} className="text-left p-3 border border-gray-200 font-semibold text-gray-700">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
            <td className="p-3 border border-gray-200">
              <code className="bg-gray-100 px-1 rounded text-xs">{row.name}</code>
            </td>
            <td className="p-3 border border-gray-200 text-gray-700">{row.purpose}</td>
            <td className="p-3 border border-gray-200 text-gray-600 whitespace-nowrap">{row.duration}</td>
            <td className="p-3 border border-gray-200 text-gray-600">{row.emitter}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const sections = [
  {
    id: "definition",
    title: "1. Qu'est-ce qu'un cookie ?",
    content: (
      <p>
        Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, smartphone,
        tablette) lors de la visite d&apos;un site web. Il permet au site de mémoriser des
        informations sur votre visite (préférences, choix de consentement, données de navigation).
      </p>
    ),
  },
  {
    id: "cookies-utilises",
    title: "2. Cookies utilisés sur DevRadar",
    content: (
      <div className="space-y-8">
        {/* 2.1 */}
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-1">
            2.1 Cookies strictement nécessaires
          </h3>
          <p className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded p-3 mb-2">
            Ces cookies sont indispensables au fonctionnement du site. Ils ne nécessitent pas votre
            consentement (article 82 de la loi Informatique et Libertés, exemption CNIL).
          </p>
          <CookieTable rows={necessaryCookies} />
        </div>

        {/* 2.2 */}
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-1">
            2.2 Cookies analytics — Piwik PRO
          </h3>
          <p className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded p-3 mb-2">
            Ces cookies sont déposés uniquement après votre consentement explicite. Ils permettent
            de mesurer l&apos;audience du site de manière anonymisée. Piwik PRO est une solution
            européenne hébergée en Allemagne (UE).
          </p>
          <CookieTable rows={piwikCookies} />
          <p className="text-xs text-gray-500 mt-2 italic">
            Données collectées : pages visitées, durée de visite, profondeur de scroll, clics CTA,
            source de trafic, type d&apos;appareil et navigateur. Aucun fingerprinting, aucune
            donnée personnelle identifiante.
          </p>
        </div>

        {/* 2.3 */}
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-1">
            2.3 Cookies tiers — Ahrefs Analytics
          </h3>
          <p className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded p-3 mb-2">
            Déposé uniquement après votre consentement. Utilisé pour l&apos;analyse SEO du site.
          </p>
          <CookieTable rows={ahrefsCookies} />
        </div>
      </div>
    ),
  },
  {
    id: "consentement",
    title: "3. Gestion de votre consentement",
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-2">
            3.1 Bandeau de consentement
          </h3>
          <p className="text-sm text-gray-700 mb-3">
            Lors de votre première visite, un bandeau vous propose d&apos;accepter ou de refuser
            les cookies non essentiels. Conformément aux recommandations de la CNIL :
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li>
              Le bouton <strong>Refuser</strong> est aussi visible et accessible que le bouton{" "}
              <strong>Accepter</strong>
            </li>
            <li>Aucun cookie non essentiel n&apos;est déposé avant votre choix</li>
            <li>
              Le site reste entièrement fonctionnel si vous refusez (pas de cookie wall)
            </li>
            <li>Votre choix est conservé 12 mois, puis le bandeau réapparaît</li>
          </ul>
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-2">
            3.2 Modifier votre choix
          </h3>
          <p className="text-sm text-gray-700">
            Vous pouvez modifier votre choix à tout moment en supprimant les données du site dans
            les paramètres de votre navigateur (localStorage), ce qui fera réapparaître le bandeau
            de consentement.
          </p>
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-2">
            3.3 Paramètres du navigateur
          </h3>
          <p className="text-sm text-gray-700 mb-3">
            Vous pouvez également configurer votre navigateur pour bloquer les cookies :
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li>
              <strong>Chrome</strong> : Paramètres &gt; Confidentialité et sécurité &gt; Cookies
            </li>
            <li>
              <strong>Firefox</strong> : Paramètres &gt; Vie privée et sécurité &gt; Cookies
            </li>
            <li>
              <strong>Safari</strong> : Préférences &gt; Confidentialité &gt; Cookies
            </li>
            <li>
              <strong>Edge</strong> : Paramètres &gt; Cookies et autorisations de site
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "refus",
    title: "4. Conséquences du refus des cookies",
    content: (
      <div>
        <p className="text-sm text-gray-700 mb-3">Si vous refusez les cookies analytics :</p>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          <li>Le site reste entièrement fonctionnel (scanner, comparateur, guides)</li>
          <li>Aucune donnée de navigation n&apos;est collectée</li>
          <li>Aucun cookie Piwik PRO ou Ahrefs n&apos;est déposé</li>
          <li>
            Seul le cookie de consentement (
            <code className="bg-gray-100 px-1 rounded text-xs">devradar_consent</code>) est
            conservé pour mémoriser votre refus
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "durees",
    title: "5. Durées de conservation",
    content: (
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50">
              {["Catégorie", "Durée maximale", "Conformité"].map((h) => (
                <th key={h} className="text-left p-3 border border-gray-200 font-semibold text-gray-700">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["Cookie de consentement", "12 mois", "Recommandation CNIL"],
              ["Cookies analytics Piwik PRO", "13 mois", "Recommandation CNIL (25 mois max pour les données)"],
              ["Données collectées via Piwik PRO", "25 mois", "Recommandation CNIL"],
            ].map(([cat, duree, conf], i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="p-3 border border-gray-200 text-gray-700">{cat}</td>
                <td className="p-3 border border-gray-200 text-gray-600 whitespace-nowrap">{duree}</td>
                <td className="p-3 border border-gray-200 text-gray-500 text-xs">{conf}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: "transferts",
    title: "6. Transferts de données",
    content: (
      <p>
        Les données collectées via les cookies analytics sont hébergées par Piwik PRO en{" "}
        <strong>Union Européenne (Allemagne)</strong>. Aucun transfert hors UE n&apos;est effectué
        pour les données analytics.
      </p>
    ),
  },
  {
    id: "droits",
    title: "7. Vos droits",
    content: (
      <div>
        <p className="text-sm text-gray-700 mb-3">
          Conformément au RGPD (articles 15 à 22), vous disposez de droits sur vos données
          personnelles. Pour plus de détails, consultez notre politique de confidentialité.
        </p>
        <ul className="list-none space-y-1 text-sm text-gray-700">
          <li>
            <span className="font-medium">Contact :</span>{" "}
            <a href="mailto:contact@devradar.fr" className="text-blue-600 hover:underline">
              contact@devradar.fr
            </a>
          </li>
          <li>
            <span className="font-medium">Autorité de contrôle :</span> CNIL —{" "}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              www.cnil.fr
            </a>
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "references",
    title: "8. Références réglementaires",
    content: (
      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
        <li>Règlement Général sur la Protection des Données (RGPD — Règlement UE 2016/679)</li>
        <li>Directive ePrivacy (2002/58/CE modifiée)</li>
        <li>Loi Informatique et Libertés — Article 82 (transposition ePrivacy)</li>
        <li>
          CNIL — Lignes directrices cookies et traceurs (délibération n° 2020-091 du 17 septembre
          2020)
        </li>
        <li>
          CNIL — Recommandation cookies (délibération n° 2020-092 du 17 septembre 2020)
        </li>
      </ul>
    ),
  },
];

export default function PolitiqueCookiesPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <JsonLd data={{ "@context": "https://schema.org", ...articleJsonLd }} />

      <Breadcrumb
        items={[
          { label: "Légal" },
          { label: "Politique de cookies" },
        ]}
      />

      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Politique de cookies
        </h1>
        <p className="mt-3 text-lg text-gray-600">Dernière mise à jour : 5 mars 2026</p>
        <p className="mt-2 text-sm text-gray-500">
          Conformément au RGPD, à la directive ePrivacy et aux lignes directrices de la CNIL
          (délibération n° 2020-091).
        </p>
      </header>

      {/* Résumé */}
      <section className="mb-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <p className="text-sm font-semibold text-blue-800 uppercase tracking-wide mb-3">
          En résumé
        </p>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>
            Seul le cookie <code className="bg-white border border-blue-100 px-1 rounded text-xs">devradar_consent</code> est déposé <strong>sans votre accord</strong>.
          </li>
          <li>
            Les cookies analytics (Piwik PRO) ne sont activés <strong>qu&apos;après votre consentement explicite</strong>.
          </li>
          <li>
            Le site reste <strong>entièrement fonctionnel</strong> si vous refusez tous les cookies non essentiels.
          </li>
          <li>
            Les données analytics sont hébergées en <strong>Union Européenne (Allemagne)</strong>.
          </li>
        </ul>
      </section>

      {/* Sommaire */}
      <nav className="mb-12 border border-gray-200 rounded-lg p-6" aria-label="Sommaire">
        <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Sommaire</p>
        <ol className="space-y-1 text-sm text-blue-600">
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className="hover:underline">
                {section.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Sections */}
      {sections.map((section) => (
        <section key={section.id} className="mb-10" aria-labelledby={section.id}>
          <h2 id={section.id} className="text-2xl font-bold text-gray-900 mb-4">
            {section.title}
          </h2>
          <div className="prose prose-sm text-gray-700">{section.content}</div>
        </section>
      ))}

      {/* Contact */}
      <section className="bg-blue-50 rounded-lg p-8 text-center mt-12">
        <h2 className="text-xl font-bold text-gray-900">Gérer vos préférences cookies</h2>
        <p className="mt-2 text-gray-600 text-sm">
          Pour toute question sur nos cookies ou pour exercer vos droits, contactez-nous.
        </p>
        <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="mailto:contact@devradar.fr"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Nous contacter
          </a>
          <a
            href="/politique-confidentialite"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Politique de confidentialité
          </a>
        </div>
      </section>
    </article>
  );
}
