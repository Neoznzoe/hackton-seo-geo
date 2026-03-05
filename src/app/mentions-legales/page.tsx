import { Metadata } from "next";
import { SITE_NAME, BASE_URL, CURRENT_YEAR } from "@/lib/constants";
import Breadcrumb from "@/components/layout/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import { Article } from "schema-dts";

export const metadata: Metadata = {
  title: `Mentions Légales – DevRadar`,
  description: `Mentions légales du site DevRadar. Éditeur, hébergement, propriété intellectuelle, données personnelles, cookies et droit applicable.`,
  alternates: { canonical: "/mentions-legales" },
  openGraph: {
    title: `Mentions Légales | DevRadar`,
    description: `Mentions légales du site DevRadar – veille technologique pour développeurs.`,
    type: "article",
  },
};

const articleJsonLd: Article = {
  "@type": "Article",
  headline: `Mentions Légales – DevRadar`,
  description: `Mentions légales du site DevRadar.`,
  url: `${BASE_URL}/mentions-legales`,
  inLanguage: "fr",
  datePublished: `${CURRENT_YEAR}-01-01`,
  dateModified: "2026-03-05",
  author: { "@type": "Organization", name: SITE_NAME },
  publisher: { "@type": "Organization", name: SITE_NAME },
};

const sections = [
  {
    id: "editeur",
    title: "1. Éditeur du site",
    content: (
      <div>
        <p className="mb-3">
          Le site{" "}
          <a
            href="https://devradar.up.railway.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            DevRadar
          </a>{" "}
          est édité dans le cadre d&apos;un projet pédagogique — <strong>Hackathon Fil Rouge M2 IW</strong>.
        </p>
        <ul className="list-none space-y-1 text-sm">
          <li><span className="font-medium">Nature :</span> projet étudiant à vocation pédagogique</li>
          <li>
            <span className="font-medium">Contact :</span>{" "}
            <a href="mailto:contact@devradar.fr" className="text-blue-600 hover:underline">
              contact@devradar.fr
            </a>
          </li>
          <li><span className="font-medium">Directeur de la publication :</span> équipe DevRadar</li>
        </ul>
      </div>
    ),
  },
  {
    id: "hebergement",
    title: "2. Hébergement",
    content: (
      <ul className="list-none space-y-1 text-sm">
        <li><span className="font-medium">Hébergeur :</span> Railway Corp.</li>
        <li><span className="font-medium">Adresse :</span> San Francisco, CA, USA</li>
        <li>
          <span className="font-medium">Site :</span>{" "}
          <a
            href="https://railway.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            railway.app
          </a>
        </li>
      </ul>
    ),
  },
  {
    id: "propriete-intellectuelle",
    title: "3. Propriété intellectuelle",
    content: (
      <p>
        L&apos;ensemble du contenu de ce site (textes, images, code source, mises en page) est
        protégé par le droit d&apos;auteur. Toute reproduction, même partielle, est soumise à
        autorisation préalable.
        <br /><br />
        Les logos et noms des outils analytics mentionnés (Google Analytics, Matomo, Plausible,
        Piwik PRO, etc.) sont la propriété de leurs détenteurs respectifs. Leur utilisation sur ce
        site est faite à titre informatif et comparatif.
      </p>
    ),
  },
  {
    id: "donnees-personnelles",
    title: "4. Données personnelles et RGPD",
    content: (
      <div>
        <p className="mb-3">
          Le traitement des données personnelles est régi par notre politique de confidentialité,
          conformément au{" "}
          <strong>Règlement Général sur la Protection des Données</strong> (RGPD — Règlement UE
          2016/679) et aux recommandations de la CNIL.
        </p>
        <p>
          Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de
          limitation, de portabilité et d&apos;opposition sur vos données personnelles. Pour exercer
          ces droits :{" "}
          <a href="mailto:contact@devradar.fr" className="text-blue-600 hover:underline">
            contact@devradar.fr
          </a>
        </p>
      </div>
    ),
  },
  {
    id: "cookies",
    title: "5. Cookies",
    content: (
      <p>
        Ce site utilise des cookies soumis à votre consentement. Un bandeau de consentement vous
        permet d&apos;accepter ou de refuser les cookies non essentiels. Pour plus de détails,
        consultez notre politique de confidentialité.
      </p>
    ),
  },
  {
    id: "scanner-rgpd",
    title: "6. Scanner RGPD et scraping",
    content: (
      <div>
        <p className="mb-3">
          DevRadar propose un scanner de conformité RGPD et un module de veille concurrentielle qui
          analysent des pages web publiques. Ces fonctionnalités :
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4">
          <li>Ne collectent aucune donnée personnelle des sites scannés</li>
          <li>Respectent le fichier <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-xs">robots.txt</code> de chaque site cible</li>
          <li>Appliquent un rate limiting strict (2 secondes minimum entre requêtes)</li>
          <li>Utilisent un User-Agent identifié (<code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-xs">DevRadarBot/1.0</code>)</li>
          <li>Journalisent toutes les opérations pour transparence</li>
        </ul>
        <p className="text-sm text-gray-600 dark:text-gray-400 italic">
          Conformément à la jurisprudence française et européenne, l&apos;extraction de données
          publiques non protégées par un droit sui generis et ne contenant pas de données
          personnelles est licite, sous réserve du respect des CGU du site cible et du robots.txt.
        </p>
      </div>
    ),
  },
  {
    id: "responsabilite",
    title: "7. Limitation de responsabilité",
    content: (
      <p>
        DevRadar est un projet pédagogique. Les informations fournies (comparatifs, scores de
        conformité, recommandations) sont données à titre indicatif et{" "}
        <strong>ne constituent pas un conseil juridique</strong>. L&apos;équipe DevRadar ne saurait
        être tenue responsable des décisions prises sur la base de ces informations.
      </p>
    ),
  },
  {
    id: "droit-applicable",
    title: "8. Droit applicable",
    content: (
      <p>
        Le présent site est soumis au droit français. Tout litige relatif à son utilisation sera
        soumis aux juridictions françaises compétentes.
      </p>
    ),
  },
];

export default function MentionsLegalesPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <JsonLd data={{ "@context": "https://schema.org", ...articleJsonLd }} />

      <Breadcrumb
        items={[
          { label: "Légal" },
          { label: "Mentions légales" },
        ]}
      />

      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
          Mentions légales
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
          Dernière mise à jour : 5 mars 2026
        </p>
      </header>

      {/* Résumé */}
      <section className="mb-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <p className="text-sm font-semibold text-blue-800 uppercase tracking-wide mb-3">
          En résumé
        </p>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>DevRadar est un <strong>projet pédagogique</strong> — Hackathon Fil Rouge M2 IW.</li>
          <li>Le site est hébergé par <strong>Railway Corp.</strong> (San Francisco, USA).</li>
          <li>Les informations fournies sont à titre indicatif et <strong>ne constituent pas un conseil juridique</strong>.</li>
          <li>Le droit applicable est le <strong>droit français</strong>.</li>
        </ul>
      </section>

      {/* Sommaire */}
      <nav className="mb-12 border border-gray-200 dark:border-gray-700 rounded-lg p-6" aria-label="Sommaire">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">Sommaire</p>
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
          <h2 id={section.id} className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {section.title}
          </h2>
          <div className="prose prose-sm text-gray-700 dark:text-gray-300">{section.content}</div>
        </section>
      ))}

      {/* Contact */}
      <section className="bg-blue-50 rounded-lg p-8 text-center mt-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Une question légale ?</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
          Pour toute question relative aux présentes mentions légales, contactez-nous par email.
        </p>
        <div className="mt-4">
          <a
            href="mailto:contact@devradar.fr"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Nous contacter
          </a>
        </div>
      </section>
    </article>
  );
}
