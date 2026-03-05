import { Metadata } from "next";
import { SITE_NAME, BASE_URL, CURRENT_YEAR } from "@/lib/constants";
import Breadcrumb from "@/components/layout/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import { Article } from "schema-dts";

export const metadata: Metadata = {
  title: `Politique de confidentialité – DevRadar`,
  description: `Politique de confidentialité de DevRadar. Données collectées, cookies, droits RGPD, durée de conservation et sécurité.`,
  alternates: { canonical: "/politique-confidentialite" },
  openGraph: {
    title: `Politique de confidentialité | DevRadar`,
    description: `Comment DevRadar collecte, utilise et protège vos données personnelles.`,
    type: "article",
  },
};

const articleJsonLd: Article = {
  "@type": "Article",
  headline: `Politique de confidentialité – DevRadar`,
  description: `Politique de confidentialité du site DevRadar.`,
  url: `${BASE_URL}/politique-confidentialite`,
  inLanguage: "fr",
  datePublished: `${CURRENT_YEAR}-01-01`,
  dateModified: "2026-03-05",
  author: { "@type": "Organization", name: SITE_NAME },
  publisher: { "@type": "Organization", name: SITE_NAME },
};

const sections = [
  {
    id: "responsable",
    title: "1. Responsable du traitement",
    content: (
      <div>
        <p className="mb-3">
          Le responsable du traitement des données est l&apos;équipe DevRadar, dans le cadre du
          projet hackathon M2 IW.
        </p>
        <ul className="list-none space-y-1 text-sm">
          <li>
            <span className="font-medium">Site web :</span>{" "}
            <a
              href="https://devradar.up.railway.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              https://devradar.up.railway.app/
            </a>
          </li>
          <li>
            <span className="font-medium">Contact :</span>{" "}
            <a href="mailto:contact@devradar.fr" className="text-blue-600 hover:underline">
              contact@devradar.fr
            </a>{" "}
            <span className="text-gray-500 dark:text-gray-400">(adresse projet)</span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "donnees-collectees",
    title: "2. Données collectées",
    content: (
      <div className="space-y-8">
        {/* 2.1 */}
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
            2.1 Données de navigation (analytics)
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            Nous utilisons <strong>Piwik PRO</strong>, une solution d&apos;analytics respectueuse de
            la vie privée, hébergée en Union Européenne. Les données collectées incluent :
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-3">
            <li>Pages visitées et parcours de navigation</li>
            <li>Durée de visite et profondeur de scroll</li>
            <li>Source de trafic (referrer)</li>
            <li>Type d&apos;appareil et navigateur (sans fingerprinting)</li>
            <li>Événements d&apos;interaction (clics CTA, utilisation du scanner)</li>
          </ul>
          <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-3">
            <span className="font-medium">Base légale :</span> Consentement (article 6.1.a du RGPD).
            Le tracking n&apos;est activé qu&apos;après acceptation explicite via notre bandeau de
            consentement.
          </p>
        </div>

        {/* 2.2 */}
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
            2.2 Données du scanner RGPD
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            Lorsque vous utilisez notre scanner de conformité, nous traitons :
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-3">
            <li>L&apos;URL du site soumis à l&apos;analyse</li>
            <li>Les résultats du scan (outils détectés, score)</li>
          </ul>
          <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-3 mb-3">
            <span className="font-medium">Base légale :</span> Intérêt légitime (article 6.1.f du
            RGPD) — fournir le service demandé par l&apos;utilisateur.
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Aucune donnée personnelle du site scanné n&apos;est stockée. Seul le code HTML public
            est analysé de manière éphémère.
          </p>
        </div>

        {/* 2.3 */}
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
            2.3 Données de veille concurrentielle (scraping)
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            Notre module de veille concurrentielle collecte exclusivement des données produit
            publiquement accessibles (tarifs, fonctionnalités) sur les sites des outils analytics.{" "}
            <strong>Aucune donnée personnelle n&apos;est collectée via le scraping.</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li>
              Respect systématique du fichier{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-xs">robots.txt</code> de chaque site
              cible
            </li>
            <li>Rate limiting : minimum 2 secondes entre chaque requête</li>
            <li>
              User-Agent identifié :{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-xs">DevRadarBot/1.0</code>
            </li>
            <li>Journalisation complète de chaque opération</li>
            <li>Données minimisées : seules les informations produit sont extraites</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "cookies",
    title: "3. Cookies et technologies de suivi",
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">3.1 Cookies essentiels</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Cookie de consentement (
            <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-xs">devradar_consent</code>) : stocke
            votre choix concernant les cookies. Durée : <strong>12 mois</strong>. Pas de
            consentement requis (nécessaire au fonctionnement du site).
          </p>
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
            3.2 Cookies analytics (Piwik PRO)
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Déposés uniquement après votre consentement explicite. Permettent l&apos;analyse
            d&apos;audience anonymisée. Durée : <strong>13 mois maximum</strong>.
          </p>
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">3.3 Cookies tiers</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Ahrefs Analytics : script d&apos;analyse SEO, déposé après consentement.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "conservation",
    title: "4. Durée de conservation",
    content: (
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800">
              <th className="text-left p-3 border border-gray-200 dark:border-gray-700 font-semibold">Donnée</th>
              <th className="text-left p-3 border border-gray-200 dark:border-gray-700 font-semibold">
                Durée de conservation
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Données analytics Piwik PRO", "25 mois (recommandation CNIL)"],
              ["Cookie de consentement", "12 mois"],
              ["Résultats de scan", "Non conservés (temps réel uniquement)"],
              [
                "Logs de scraping",
                "1 000 dernières opérations en mémoire, non persistés",
              ],
            ].map(([donnee, duree], i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"}>
                <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">{donnee}</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">{duree}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: "transferts",
    title: "5. Transferts de données",
    content: (
      <p>
        Piwik PRO héberge les données en <strong>Union Européenne (Allemagne)</strong>. Aucun
        transfert de données hors UE n&apos;est effectué pour les données analytics.
        <br /><br />
        Le site est hébergé sur Railway. Les données de navigation transitent via leurs serveurs.
      </p>
    ),
  },
  {
    id: "droits",
    title: "6. Vos droits (RGPD)",
    content: (
      <div>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
          Conformément aux articles 15 à 22 du RGPD, vous disposez des droits suivants :
        </p>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 mb-4">
          {[
            ["Droit d'accès", "obtenir une copie de vos données personnelles"],
            ["Droit de rectification", "corriger des données inexactes"],
            ["Droit à l'effacement", "demander la suppression de vos données"],
            ["Droit à la limitation", "restreindre le traitement"],
            [
              "Droit à la portabilité",
              "recevoir vos données dans un format structuré",
            ],
            ["Droit d'opposition", "vous opposer au traitement"],
            [
              "Droit de retirer votre consentement",
              "à tout moment, sans affecter la licéité du traitement antérieur",
            ],
          ].map(([droit, description], i) => (
            <li key={i} className="flex gap-2">
              <span className="text-blue-500 mt-0.5">→</span>
              <span>
                <strong>{droit}</strong> : {description}
              </span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
          Pour exercer vos droits, contactez-nous à :{" "}
          <a href="mailto:contact@devradar.fr" className="text-blue-600 hover:underline">
            contact@devradar.fr
          </a>
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Vous pouvez également introduire une réclamation auprès de la{" "}
          <strong>CNIL</strong> :{" "}
          <a
            href="https://www.cnil.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            www.cnil.fr
          </a>
        </p>
      </div>
    ),
  },
  {
    id: "securite",
    title: "7. Sécurité",
    content: (
      <div>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
          Nous mettons en œuvre les mesures techniques et organisationnelles appropriées pour
          protéger vos données :
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <li>Connexion HTTPS obligatoire</li>
          <li>Protection SSRF sur les endpoints de scan</li>
          <li>Rate limiting sur toutes les API</li>
          <li>Pas de base de données de données personnelles</li>
          <li>Minimisation des données collectées</li>
        </ul>
      </div>
    ),
  },
  {
    id: "privacy-by-design",
    title: "8. Privacy-by-Design",
    content: (
      <div>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
          Conformément à l&apos;article 25 du RGPD, DevRadar intègre la protection des données dès
          la conception :
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <li>Analytics respectueux de la vie privée (Piwik PRO, hébergement UE)</li>
          <li>Consentement requis avant tout tracking</li>
          <li>Aucune collecte de données personnelles via le scraping</li>
          <li>Pas de stockage persistant des données de scan</li>
          <li>Journalisation des opérations de scraping pour audit</li>
        </ul>
      </div>
    ),
  },
  {
    id: "modifications",
    title: "9. Modifications",
    content: (
      <p>
        Cette politique peut être mise à jour. La date de dernière modification est indiquée en haut
        du document. En cas de modification substantielle, nous vous en informerons via un bandeau
        sur le site.
      </p>
    ),
  },
];

export default function PolitiqueConfidentialitePage() {
  return (
    <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <JsonLd data={{ "@context": "https://schema.org", ...articleJsonLd }} />

      <Breadcrumb
        items={[
          { label: "Légal" },
          { label: "Politique de confidentialité" },
        ]}
      />

      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
          Politique de confidentialité
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
          Dernière mise à jour : 5 mars 2026
        </p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Conformément au RGPD — Règlement UE 2016/679 et à la loi Informatique et Libertés
          modifiée.
        </p>
      </header>

      {/* Résumé */}
      <section className="mb-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <p className="text-sm font-semibold text-blue-800 uppercase tracking-wide mb-3">
          En résumé
        </p>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>
            Analytics via <strong>Piwik PRO</strong>, hébergé en UE — activé uniquement après
            votre consentement.
          </li>
          <li>
            Le scanner RGPD analyse uniquement le <strong>HTML public</strong>, sans stocker de
            données personnelles.
          </li>
          <li>
            Vous disposez de <strong>7 droits RGPD</strong> exerçables à tout moment par email.
          </li>
          <li>
            DevRadar applique le principe de <strong>Privacy-by-Design</strong> dès la conception.
          </li>
        </ul>
      </section>

      {/* Sommaire */}
      <nav className="mb-12 border border-gray-200 dark:border-gray-700 rounded-lg p-6" aria-label="Sommaire">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">
          Sommaire
        </p>
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
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Exercer vos droits</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
          Pour toute question relative à vos données personnelles ou pour exercer vos droits RGPD,
          contactez-nous par email.
        </p>
        <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="mailto:contact@devradar.fr"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Nous contacter
          </a>
          <a
            href="https://www.cnil.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Contacter la CNIL
          </a>
        </div>
      </section>
    </article>
  );
}
