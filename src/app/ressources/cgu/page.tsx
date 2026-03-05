import { Metadata } from "next";
import { SITE_NAME, BASE_URL, CURRENT_YEAR } from "@/lib/constants";
import Breadcrumb from "@/components/layout/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import { Article } from "schema-dts";

export const metadata: Metadata = {
  title: `Conditions Générales d'Utilisation – DevRadar`,
  description: `Conditions Générales d'Utilisation du site DevRadar. Accès au service, responsabilité, propriété intellectuelle, données personnelles et droit applicable.`,
  alternates: { canonical: "/cgu" },
  openGraph: {
    title: `Conditions Générales d'Utilisation | DevRadar`,
    description: `CGU du site DevRadar – veille technologique pour développeurs.`,
    type: "article",
  },
};

const articleJsonLd: Article = {
  "@type": "Article",
  headline: `Conditions Générales d'Utilisation – DevRadar`,
  description: `CGU du site DevRadar.`,
  url: `${BASE_URL}/cgu`,
  inLanguage: "fr",
  datePublished: `${CURRENT_YEAR}-01-01`,
  dateModified: new Date().toISOString().split("T")[0],
  author: { "@type": "Organization", name: SITE_NAME },
  publisher: { "@type": "Organization", name: SITE_NAME },
};

const sections = [
  {
    id: "objet",
    title: "1. Objet",
    content: (
      <p>
        Les présentes Conditions Générales d&apos;Utilisation (ci-après « CGU ») ont pour objet de
        définir les modalités d&apos;accès et d&apos;utilisation du site <strong>DevRadar</strong>{" "}
        (ci-après « le Site »).
        <br /><br />
        Le Site propose un service de veille technologique permettant de consulter des articles et
        contenus relatifs au développement logiciel et aux technologies informatiques, collectés
        automatiquement depuis différentes sources publiques sur Internet.
        <br /><br />
        Toute utilisation du Site implique l&apos;acceptation pleine et entière des présentes CGU.
      </p>
    ),
  },
  {
    id: "editeur",
    title: "2. Éditeur du site",
    content: (
      <div className="space-y-4">
        <p>Le site DevRadar est édité par :</p>
        <ul className="list-none space-y-1 text-sm">
          <li><span className="font-medium">Nom / Raison sociale :</span> Victor BESSON</li>
          <li><span className="font-medium">Statut juridique :</span> Auto entrepreneur</li>
          <li><span className="font-medium">Adresse :</span> 37 place Saint Bruno, 38000 Grenoble</li>
          <li>
            <span className="font-medium">Email de contact :</span>{" "}
            <a href="mailto:contact@devradar.up.railway.app" className="text-blue-600 hover:underline">
              contact@devradar.up.railway.app
            </a>
          </li>
        </ul>
        <p className="font-medium mt-4">Hébergement :</p>
        <ul className="list-none space-y-1 text-sm">
          <li><span className="font-medium">Hébergeur :</span> Railway</li>
          <li>
            <span className="font-medium">Site :</span>{" "}
            <a href="https://railway.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              https://railway.app
            </a>
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "acces",
    title: "3. Accès au site",
    content: (
      <p>
        Le Site est accessible gratuitement à tout utilisateur disposant d&apos;un accès à Internet.
        Tous les frais liés à l&apos;accès au Site (matériel informatique, connexion Internet, etc.)
        sont à la charge de l&apos;utilisateur.
        <br /><br />
        L&apos;éditeur se réserve le droit d&apos;interrompre, suspendre ou modifier l&apos;accès à
        tout ou partie du Site à tout moment, notamment pour maintenance ou mise à jour.
      </p>
    ),
  },
  {
    id: "service",
    title: "4. Description du service",
    content: (
      <div>
        <p className="mb-3">Le Site met à disposition :</p>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <li>une agrégation automatisée d&apos;articles et contenus liés au développement logiciel</li>
          <li>un classement par technologies ou thématiques</li>
          <li>des liens vers les sources originales des contenus</li>
        </ul>
        <p className="mt-3">
          Les articles affichés peuvent provenir de sources tierces. Le Site ne revendique pas la
          propriété de ces contenus et renvoie systématiquement vers leur publication originale.
        </p>
      </div>
    ),
  },
  {
    id: "responsabilite",
    title: "5. Responsabilité",
    content: (
      <div>
        <p className="mb-3">L&apos;éditeur s&apos;efforce de fournir des informations fiables. Toutefois :</p>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4">
          <li>les contenus agrégés proviennent de sources externes</li>
          <li>leur exactitude, exhaustivité ou mise à jour ne peut être garantie</li>
        </ul>
        <p className="mb-3">En conséquence, l&apos;éditeur ne pourra être tenu responsable :</p>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <li>d&apos;erreurs ou d&apos;informations inexactes provenant de sources tierces</li>
          <li>d&apos;un dommage résultant de l&apos;utilisation des informations présentes sur le Site</li>
          <li>d&apos;une indisponibilité temporaire du service</li>
        </ul>
      </div>
    ),
  },
  {
    id: "propriete-intellectuelle",
    title: "6. Propriété intellectuelle",
    content: (
      <div>
        <p className="mb-3">Les éléments suivants sont protégés par le droit de la propriété intellectuelle :</p>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4">
          <li>le design du site</li>
          <li>le code source</li>
          <li>la structure et l&apos;organisation du service</li>
        </ul>
        <p>
          Toute reproduction, modification ou distribution sans autorisation préalable est interdite.
          Les articles, logos ou marques appartenant à des tiers restent la propriété de leurs auteurs respectifs.
        </p>
      </div>
    ),
  },
  {
    id: "utilisation",
    title: "7. Utilisation du service",
    content: (
      <div>
        <p className="mb-3">L&apos;utilisateur s&apos;engage à :</p>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4">
          <li>ne pas utiliser le Site à des fins illégales</li>
          <li>ne pas perturber le fonctionnement du service</li>
          <li>ne pas tenter d&apos;accéder de manière frauduleuse aux systèmes du Site</li>
        </ul>
        <p>
          L&apos;éditeur se réserve le droit de bloquer l&apos;accès à tout utilisateur ne respectant
          pas ces règles.
        </p>
      </div>
    ),
  },
  {
    id: "liens-externes",
    title: "8. Liens externes",
    content: (
      <div>
        <p className="mb-3">Le Site peut contenir des liens vers des sites tiers.</p>
        <p className="mb-3">L&apos;éditeur ne contrôle pas ces sites et ne peut être tenu responsable :</p>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <li>du contenu qu&apos;ils publient</li>
          <li>de leur politique de confidentialité</li>
          <li>de leurs pratiques commerciales</li>
        </ul>
      </div>
    ),
  },
  {
    id: "donnees-personnelles",
    title: "9. Données personnelles",
    content: (
      <p>
        Le Site peut collecter certaines données techniques (logs, statistiques, cookies) afin
        d&apos;améliorer l&apos;expérience utilisateur.
        <br /><br />
        Ces données sont traitées conformément à la réglementation applicable en matière de protection
        des données personnelles (notamment le RGPD).
        <br /><br />
        Pour plus d&apos;informations, l&apos;utilisateur peut consulter la Politique de confidentialité
        du Site.
      </p>
    ),
  },
  {
    id: "modification",
    title: "10. Modification des CGU",
    content: (
      <p>
        L&apos;éditeur se réserve le droit de modifier les présentes CGU à tout moment.
        La version applicable est celle publiée sur le Site à la date de consultation.
      </p>
    ),
  },
  {
    id: "droit-applicable",
    title: "11. Droit applicable",
    content: (
      <p>
        Les présentes CGU sont régies par le droit français.
        En cas de litige, et à défaut de résolution amiable, les tribunaux compétents seront ceux
        du ressort de l&apos;éditeur du Site.
      </p>
    ),
  },
];

export default function CguPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <JsonLd data={{ "@context": "https://schema.org", ...articleJsonLd }} />

      <Breadcrumb
        items={[
          { label: "Légal" },
          { label: "Conditions Générales d'Utilisation" },
        ]}
      />

      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
          Conditions Générales d&apos;Utilisation
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
          Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
        </p>
      </header>

      {/* Résumé */}
      <section className="mb-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <p className="text-sm font-semibold text-blue-800 uppercase tracking-wide mb-3">
          En résumé
        </p>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>DevRadar est un service de <strong>veille technologique gratuit</strong> édité par Victor BESSON.</li>
          <li>Les contenus agrégés proviennent de <strong>sources tierces publiques</strong>.</li>
          <li>Les données personnelles sont traitées conformément au <strong>RGPD</strong>.</li>
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
          <div className="prose prose-sm text-gray-700 dark:text-gray-300">
            {section.content}
          </div>
        </section>
      ))}

      {/* Contact */}
      <section className="bg-blue-50 rounded-lg p-8 text-center mt-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Une question ?</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
          Pour toute question relative aux présentes CGU, vous pouvez nous contacter par email.
        </p>
        <div className="mt-4">
          <a
            href="mailto:contact@devradar.up.railway.app"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Nous contacter
          </a>
        </div>
      </section>
    </article>
  );
}
