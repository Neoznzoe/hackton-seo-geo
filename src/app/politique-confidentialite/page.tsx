import type { Metadata } from "next";
import { SITE_NAME, BASE_URL } from "@/lib/constants";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: `Politique de confidentialite - ${SITE_NAME}`,
  description: `Politique de confidentialite de ${SITE_NAME}. Informations sur le traitement de vos donnees personnelles conformement au RGPD.`,
  alternates: { canonical: `${BASE_URL}politique-confidentialite` },
  robots: { index: true, follow: true },
};

const breadcrumbItems = [
  { label: "Politique de confidentialite" },
];

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={breadcrumbItems} />

      <article className="mt-6 prose prose-gray max-w-none">
        <h1>Politique de confidentialite</h1>
        <p className="text-sm text-gray-500">Derniere mise a jour : 5 mars 2026</p>

        <p>
          La presente politique de confidentialite decrit comment <strong>{SITE_NAME}</strong>{" "}
          collecte, utilise et protege vos donnees personnelles conformement au{" "}
          <strong>Reglement General sur la Protection des Donnees (RGPD — Reglement UE 2016/679)</strong>{" "}
          et a la <strong>loi Informatique et Libertes</strong> modifiee.
        </p>

        <h2>1. Responsable du traitement</h2>
        <p>
          Le responsable du traitement des donnees est l&apos;equipe {SITE_NAME}, dans le cadre
          du projet hackathon M2 IW.
        </p>
        <ul>
          <li>Site web : <a href={BASE_URL}>{BASE_URL}</a></li>
          <li>Contact : contact@devradar.fr (adresse projet)</li>
        </ul>

        <h2>2. Donnees collectees</h2>

        <h3>2.1 Donnees de navigation (analytics)</h3>
        <p>
          Nous utilisons <strong>Piwik PRO</strong>, une solution d&apos;analytics respectueuse de la
          vie privee, hebergee en Union Europeenne. Les donnees collectees incluent :
        </p>
        <ul>
          <li>Pages visitees et parcours de navigation</li>
          <li>Duree de visite et profondeur de scroll</li>
          <li>Source de trafic (referrer)</li>
          <li>Type d&apos;appareil et navigateur (sans fingerprinting)</li>
          <li>Evenements d&apos;interaction (clics CTA, utilisation du scanner)</li>
        </ul>
        <p>
          <strong>Base legale :</strong> Consentement (article 6.1.a du RGPD). Le tracking
          n&apos;est active qu&apos;apres acceptation explicite via notre bandeau de consentement.
        </p>

        <h3>2.2 Donnees du scanner RGPD</h3>
        <p>
          Lorsque vous utilisez notre scanner de conformite, nous traitons :
        </p>
        <ul>
          <li>L&apos;URL du site soumis a l&apos;analyse</li>
          <li>Les resultats du scan (outils detectes, score)</li>
        </ul>
        <p>
          <strong>Base legale :</strong> Interet legitime (article 6.1.f du RGPD) — fournir le
          service demande par l&apos;utilisateur.
        </p>
        <p>
          <strong>Aucune donnee personnelle du site scanne n&apos;est stockee.</strong> Seul le code
          HTML public est analyse de maniere ephemere.
        </p>

        <h3>2.3 Donnees de veille concurrentielle (scraping)</h3>
        <p>
          Notre module de veille concurrentielle collecte exclusivement des{" "}
          <strong>donnees produit publiquement accessibles</strong> (tarifs, fonctionnalites)
          sur les sites des outils analytics. Aucune donnee personnelle n&apos;est collectee via
          le scraping.
        </p>
        <ul>
          <li>Respect systematique du fichier robots.txt de chaque site cible</li>
          <li>Rate limiting : minimum 2 secondes entre chaque requete</li>
          <li>User-Agent identifie : DevRadarBot/1.0</li>
          <li>Journalisation complete de chaque operation</li>
          <li>Donnees minimisees : seules les informations produit sont extraites</li>
        </ul>

        <h2>3. Cookies et technologies de suivi</h2>
        <h3>3.1 Cookies essentiels</h3>
        <p>
          Cookie de consentement (<code>devradar_consent</code>) : stocke votre choix
          concernant les cookies. Duree : 12 mois. Pas de consentement requis
          (necessaire au fonctionnement du site).
        </p>
        <h3>3.2 Cookies analytics (Piwik PRO)</h3>
        <p>
          Deposes uniquement apres votre consentement explicite. Permettent l&apos;analyse
          d&apos;audience anonymisee. Duree : 13 mois maximum.
        </p>
        <h3>3.3 Cookies tiers</h3>
        <p>
          Ahrefs Analytics : script d&apos;analyse SEO, depose apres consentement.
        </p>

        <h2>4. Duree de conservation</h2>
        <table>
          <thead>
            <tr>
              <th>Donnee</th>
              <th>Duree de conservation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Donnees analytics Piwik PRO</td>
              <td>25 mois (recommandation CNIL)</td>
            </tr>
            <tr>
              <td>Cookie de consentement</td>
              <td>12 mois</td>
            </tr>
            <tr>
              <td>Resultats de scan</td>
              <td>Non conserves (temps reel uniquement)</td>
            </tr>
            <tr>
              <td>Logs de scraping</td>
              <td>1000 dernieres operations en memoire, non persistes</td>
            </tr>
          </tbody>
        </table>

        <h2>5. Transferts de donnees</h2>
        <p>
          <strong>Piwik PRO</strong> heberge les donnees en Union Europeenne (Allemagne).
          Aucun transfert de donnees hors UE n&apos;est effectue pour les donnees analytics.
        </p>
        <p>
          Le site est heberge sur <strong>Railway</strong>. Les donnees de navigation
          transitent via leurs serveurs.
        </p>

        <h2>6. Vos droits (RGPD)</h2>
        <p>Conformement aux articles 15 a 22 du RGPD, vous disposez des droits suivants :</p>
        <ul>
          <li><strong>Droit d&apos;acces :</strong> obtenir une copie de vos donnees personnelles</li>
          <li><strong>Droit de rectification :</strong> corriger des donnees inexactes</li>
          <li><strong>Droit a l&apos;effacement :</strong> demander la suppression de vos donnees</li>
          <li><strong>Droit a la limitation :</strong> restreindre le traitement</li>
          <li><strong>Droit a la portabilite :</strong> recevoir vos donnees dans un format structure</li>
          <li><strong>Droit d&apos;opposition :</strong> vous opposer au traitement</li>
          <li><strong>Droit de retirer votre consentement :</strong> a tout moment, sans affecter la licite du traitement anterieur</li>
        </ul>
        <p>
          Pour exercer vos droits, contactez-nous a : <strong>contact@devradar.fr</strong>
        </p>
        <p>
          Vous pouvez egalement introduire une reclamation aupres de la{" "}
          <strong>CNIL</strong> (Commission Nationale de l&apos;Informatique et des Libertes) :{" "}
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
            www.cnil.fr
          </a>
        </p>

        <h2>7. Securite</h2>
        <p>
          Nous mettons en oeuvre les mesures techniques et organisationnelles appropriees pour
          proteger vos donnees :
        </p>
        <ul>
          <li>Connexion HTTPS obligatoire</li>
          <li>Protection SSRF sur les endpoints de scan</li>
          <li>Rate limiting sur toutes les API</li>
          <li>Pas de base de donnees de donnees personnelles</li>
          <li>Minimisation des donnees collectees</li>
        </ul>

        <h2>8. Privacy-by-Design</h2>
        <p>
          Conformement a l&apos;article 25 du RGPD, {SITE_NAME} integre la protection des donnees
          des la conception :
        </p>
        <ul>
          <li>Analytics respectueux de la vie privee (Piwik PRO, hebergement UE)</li>
          <li>Consentement requis avant tout tracking</li>
          <li>Aucune collecte de donnees personnelles via le scraping</li>
          <li>Pas de stockage persistant des donnees de scan</li>
          <li>Journalisation des operations de scraping pour audit</li>
        </ul>

        <h2>9. Modifications</h2>
        <p>
          Cette politique peut etre mise a jour. La date de derniere modification est indiquee
          en haut du document. En cas de modification substantielle, nous vous en informerons
          via un bandeau sur le site.
        </p>
      </article>
    </div>
  );
}
