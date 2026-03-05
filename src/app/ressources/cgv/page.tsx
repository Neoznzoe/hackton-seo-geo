import { Metadata } from "next";
import { SITE_NAME, BASE_URL, CURRENT_YEAR } from "@/lib/constants";
import Breadcrumb from "@/components/layout/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import { Article } from "schema-dts";

export const metadata: Metadata = {
  title: `Conditions Générales de Vente – DevRadar`,
  description: `Conditions Générales de Vente du site DevRadar. Services proposés, prix, paiement, droit de rétractation, résiliation et droit applicable.`,
  alternates: { canonical: "/cgv" },
  openGraph: {
    title: `Conditions Générales de Vente | DevRadar`,
    description: `CGV du site DevRadar – veille technologique pour développeurs.`,
    type: "article",
  },
};

const articleJsonLd: Article = {
  "@type": "Article",
  headline: `Conditions Générales de Vente – DevRadar`,
  description: `CGV du site DevRadar.`,
  url: `${BASE_URL}/cgv`,
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
        Les présentes Conditions Générales de Vente (ci-après « CGV ») définissent les modalités
        selon lesquelles le site <strong>DevRadar</strong> propose et vend ses services aux utilisateurs.
        <br /><br />
        DevRadar est une plateforme de veille technologique permettant d&apos;accéder à une agrégation
        d&apos;articles et de contenus liés au développement logiciel.
        <br /><br />
        Toute souscription à un service payant implique l&apos;acceptation sans réserve des présentes CGV.
      </p>
    ),
  },
  {
    id: "vendeur",
    title: "2. Identité du vendeur",
    content: (
      <div className="space-y-4">
        <p className="font-medium">Éditeur du service :</p>
        <ul className="list-none space-y-1 text-sm">
          <li><span className="font-medium">Nom :</span> Victor BESSON</li>
          <li><span className="font-medium">Statut :</span> Auto entrepreneur</li>
          <li><span className="font-medium">Adresse :</span> 37 place Saint Bruno, 38000 Grenoble</li>
          <li>
            <span className="font-medium">Email :</span>{" "}
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
    id: "services",
    title: "3. Description des services",
    content: (
      <div>
        <p className="mb-3">DevRadar propose notamment :</p>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 mb-4">
          <li>un accès à une plateforme de veille technologique</li>
          <li>l&apos;agrégation d&apos;articles issus de sources publiques</li>
          <li>des outils de recherche et de filtrage par technologies</li>
        </ul>
        <p>
          Certaines fonctionnalités peuvent être proposées sous forme d&apos;offres payantes
          (abonnement premium ou accès API).
        </p>
      </div>
    ),
  },
  {
    id: "prix",
    title: "4. Prix",
    content: (
      <p>
        Les prix des services sont indiqués en euros (€).
        <br /><br />
        DevRadar se réserve le droit de modifier les prix à tout moment. Toutefois, le prix appliqué
        sera celui affiché au moment de la commande.
      </p>
    ),
  },
  {
    id: "paiement",
    title: "5. Modalités de paiement",
    content: (
      <div>
        <p className="mb-3">Le paiement peut être effectué par :</p>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 mb-4">
          <li>carte bancaire</li>
          <li>service de paiement en ligne</li>
        </ul>
        <p>Le paiement est exigible immédiatement lors de la souscription au service.</p>
      </div>
    ),
  },
  {
    id: "acces",
    title: "6. Accès au service",
    content: (
      <div>
        <p className="mb-3">
          Après validation du paiement, l&apos;utilisateur reçoit un accès au service correspondant
          à l&apos;offre choisie.
        </p>
        <p className="mb-3">
          DevRadar s&apos;engage à mettre en œuvre les moyens nécessaires pour assurer la
          disponibilité du service.
        </p>
        <p className="mb-3">Cependant, des interruptions peuvent survenir notamment pour :</p>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          <li>maintenance</li>
          <li>mise à jour</li>
          <li>problème technique</li>
        </ul>
      </div>
    ),
  },
  {
    id: "retractation",
    title: "7. Droit de rétractation",
    content: (
      <p>
        Conformément au droit de la consommation, l&apos;utilisateur dispose d&apos;un délai de{" "}
        <strong>14 jours</strong> pour exercer son droit de rétractation.
        <br /><br />
        Toutefois, ce droit peut être limité lorsque l&apos;exécution du service a commencé avec
        l&apos;accord de l&apos;utilisateur.
      </p>
    ),
  },
  {
    id: "responsabilite",
    title: "8. Responsabilité",
    content: (
      <div>
        <p className="mb-3">
          DevRadar agit comme un agrégateur de contenus provenant de sources externes.
        </p>
        <p className="mb-3">L&apos;éditeur ne peut être tenu responsable :</p>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          <li>de l&apos;exactitude des informations publiées par les sources tierces</li>
          <li>de l&apos;indisponibilité temporaire du service</li>
          <li>de dommages indirects liés à l&apos;utilisation du service</li>
        </ul>
      </div>
    ),
  },
  {
    id: "propriete-intellectuelle",
    title: "9. Propriété intellectuelle",
    content: (
      <p>
        La structure du site, son design, son code et ses fonctionnalités sont protégés par le droit
        de la propriété intellectuelle.
        <br /><br />
        Toute reproduction ou exploitation non autorisée est interdite.
        <br /><br />
        Les contenus provenant de sites tiers restent la propriété de leurs auteurs respectifs.
      </p>
    ),
  },
  {
    id: "donnees-personnelles",
    title: "10. Données personnelles",
    content: (
      <p>
        Le traitement des données personnelles respecte les dispositions du Règlement général sur la
        protection des données (RGPD) et les recommandations de la Commission nationale de
        l&apos;informatique et des libertés (CNIL).
        <br /><br />
        Les modalités de traitement des données sont détaillées dans la politique de confidentialité
        du site.
      </p>
    ),
  },
  {
    id: "resiliation",
    title: "11. Résiliation",
    content: (
      <p>
        L&apos;utilisateur peut résilier son abonnement à tout moment.
        <br /><br />
        La résiliation prendra effet à la fin de la période d&apos;abonnement en cours.
        <br /><br />
        Aucun remboursement ne sera effectué pour la période restante.
      </p>
    ),
  },
  {
    id: "droit-applicable",
    title: "12. Droit applicable",
    content: (
      <p>
        Les présentes CGV sont soumises au droit français.
        <br /><br />
        En cas de litige, les tribunaux français seront seuls compétents.
      </p>
    ),
  },
];

export default function CgvPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <JsonLd data={{ "@context": "https://schema.org", ...articleJsonLd }} />

      <Breadcrumb
        items={[
          { label: "Légal" },
          { label: "Conditions Générales de Vente" },
        ]}
      />

      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Conditions Générales de Vente
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Dernière mise à jour :{" "}
          {new Date().toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </header>

      {/* Résumé */}
      <section className="mb-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <p className="text-sm font-semibold text-blue-800 uppercase tracking-wide mb-3">
          En résumé
        </p>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>DevRadar propose des offres payantes sous forme d&apos;<strong>abonnement premium ou accès API</strong>.</li>
          <li>Le paiement est <strong>immédiat</strong> lors de la souscription.</li>
          <li>Vous disposez d&apos;un <strong>délai de rétractation de 14 jours</strong>.</li>
          <li>La résiliation est possible à tout moment, <strong>sans remboursement de la période en cours</strong>.</li>
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
        <h2 className="text-xl font-bold text-gray-900">Une question sur nos offres ?</h2>
        <p className="mt-2 text-gray-600 text-sm">
          Pour toute question relative aux présentes CGV ou à nos services, contactez-nous par email.
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
