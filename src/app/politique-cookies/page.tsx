import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, BASE_URL } from "@/lib/constants";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: `Politique de cookies - ${SITE_NAME}`,
  description: `Politique de cookies de ${SITE_NAME}. Liste des cookies utilises, finalites, durees de conservation et gestion du consentement conformement au RGPD et aux recommandations de la CNIL.`,
  alternates: { canonical: `${BASE_URL}politique-cookies` },
  robots: { index: true, follow: true },
};

const breadcrumbItems = [{ label: "Politique de cookies" }];

export default function PolitiqueCookiesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={breadcrumbItems} />

      <article className="mt-6 prose prose-gray max-w-none">
        <h1>Politique de cookies</h1>
        <p className="text-sm text-gray-500">Derniere mise a jour : 5 mars 2026</p>

        <p>
          La presente politique de cookies explique comment <strong>{SITE_NAME}</strong> utilise
          les cookies et technologies similaires sur son site web, conformement au{" "}
          <strong>Reglement General sur la Protection des Donnees (RGPD)</strong>, a la{" "}
          <strong>directive ePrivacy (2002/58/CE)</strong> et aux{" "}
          <strong>lignes directrices de la CNIL sur les cookies et traceurs</strong>{" "}
          (deliberation n° 2020-091 du 17 septembre 2020).
        </p>

        <h2>1. Qu&apos;est-ce qu&apos;un cookie ?</h2>
        <p>
          Un cookie est un petit fichier texte depose sur votre terminal (ordinateur,
          smartphone, tablette) lors de la visite d&apos;un site web. Il permet au site de
          memoriser des informations sur votre visite (preferences, choix de consentement,
          donnees de navigation).
        </p>

        <h2>2. Cookies utilises sur {SITE_NAME}</h2>

        <h3>2.1 Cookies strictement necessaires</h3>
        <p>
          Ces cookies sont indispensables au fonctionnement du site. Ils ne necessitent pas
          votre consentement (article 82 de la loi Informatique et Libertes, exemption CNIL).
        </p>
        <table>
          <thead>
            <tr>
              <th>Nom du cookie</th>
              <th>Finalite</th>
              <th>Duree</th>
              <th>Emetteur</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>devradar_consent</code></td>
              <td>Stocke votre choix de consentement (accepte / refuse) pour les cookies analytics</td>
              <td>12 mois</td>
              <td>{SITE_NAME} (1st party)</td>
            </tr>
            <tr>
              <td><code>devradar_visited</code></td>
              <td>Differencie les visiteurs nouveaux et recurrents pour la segmentation analytics (sans donnees personnelles)</td>
              <td>Persistant (localStorage)</td>
              <td>{SITE_NAME} (1st party)</td>
            </tr>
          </tbody>
        </table>

        <h3>2.2 Cookies analytics — Piwik PRO</h3>
        <p>
          Ces cookies sont deposes <strong>uniquement apres votre consentement explicite</strong>.
          Ils permettent de mesurer l&apos;audience du site de maniere anonymisee.{" "}
          <strong>Piwik PRO</strong> est une solution europeenne hebergee en Allemagne (UE).
        </p>
        <table>
          <thead>
            <tr>
              <th>Nom du cookie</th>
              <th>Finalite</th>
              <th>Duree</th>
              <th>Emetteur</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>_pk_id.*</code></td>
              <td>Identifiant visiteur anonyme pour la mesure d&apos;audience</td>
              <td>13 mois</td>
              <td>Piwik PRO</td>
            </tr>
            <tr>
              <td><code>_pk_ses.*</code></td>
              <td>Identifiant de session pour regrouper les pages vues</td>
              <td>30 minutes</td>
              <td>Piwik PRO</td>
            </tr>
            <tr>
              <td><code>stg_*</code></td>
              <td>Cookies du Tag Manager Piwik PRO pour le declenchement conditionnel des balises</td>
              <td>Variable (session a 12 mois)</td>
              <td>Piwik PRO</td>
            </tr>
          </tbody>
        </table>
        <p>
          <strong>Donnees collectees :</strong> pages visitees, duree de visite, profondeur
          de scroll, clics CTA, source de trafic, type d&apos;appareil et navigateur.
          Aucun fingerprinting, aucune donnee personnelle identifiante.
        </p>

        <h3>2.3 Cookies tiers — Ahrefs Analytics</h3>
        <p>
          Depose <strong>uniquement apres votre consentement</strong>. Utilise pour l&apos;analyse
          SEO du site.
        </p>
        <table>
          <thead>
            <tr>
              <th>Nom du cookie</th>
              <th>Finalite</th>
              <th>Duree</th>
              <th>Emetteur</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>ahrefs_*</code></td>
              <td>Mesure de trafic et analyse SEO</td>
              <td>Variable</td>
              <td>Ahrefs Pte. Ltd.</td>
            </tr>
          </tbody>
        </table>

        <h2>3. Gestion de votre consentement</h2>

        <h3>3.1 Bandeau de consentement</h3>
        <p>
          Lors de votre premiere visite, un bandeau vous propose d&apos;accepter ou de refuser
          les cookies non essentiels. Conformement aux recommandations de la CNIL :
        </p>
        <ul>
          <li>Le bouton <strong>Refuser</strong> est aussi visible et accessible que le bouton Accepter</li>
          <li>Aucun cookie non essentiel n&apos;est depose avant votre choix</li>
          <li>Le site reste entierement fonctionnel si vous refusez (pas de cookie wall)</li>
          <li>Votre choix est conserve 12 mois, puis le bandeau reapparait</li>
        </ul>

        <h3>3.2 Modifier votre choix</h3>
        <p>
          Vous pouvez modifier votre choix a tout moment en supprimant les donnees du
          site dans les parametres de votre navigateur (localStorage), ce qui fera
          reapparaitre le bandeau de consentement.
        </p>

        <h3>3.3 Parametres du navigateur</h3>
        <p>
          Vous pouvez egalement configurer votre navigateur pour bloquer les cookies :
        </p>
        <ul>
          <li><strong>Chrome :</strong> Parametres &gt; Confidentialite et securite &gt; Cookies</li>
          <li><strong>Firefox :</strong> Parametres &gt; Vie privee et securite &gt; Cookies</li>
          <li><strong>Safari :</strong> Preferences &gt; Confidentialite &gt; Cookies</li>
          <li><strong>Edge :</strong> Parametres &gt; Cookies et autorisations de site</li>
        </ul>

        <h2>4. Consequences du refus des cookies</h2>
        <p>
          Si vous refusez les cookies analytics :
        </p>
        <ul>
          <li>Le site reste entierement fonctionnel (scanner, comparateur, guides)</li>
          <li>Aucune donnee de navigation n&apos;est collectee</li>
          <li>Aucun cookie Piwik PRO ou Ahrefs n&apos;est depose</li>
          <li>Seul le cookie de consentement (<code>devradar_consent</code>) est conserve pour memoriser votre refus</li>
        </ul>

        <h2>5. Durees de conservation</h2>
        <table>
          <thead>
            <tr>
              <th>Categorie</th>
              <th>Duree maximale</th>
              <th>Conformite</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cookie de consentement</td>
              <td>12 mois</td>
              <td>Recommandation CNIL</td>
            </tr>
            <tr>
              <td>Cookies analytics Piwik PRO</td>
              <td>13 mois</td>
              <td>Recommandation CNIL (25 mois max pour les donnees)</td>
            </tr>
            <tr>
              <td>Donnees collectees via Piwik PRO</td>
              <td>25 mois</td>
              <td>Recommandation CNIL</td>
            </tr>
          </tbody>
        </table>

        <h2>6. Transferts de donnees</h2>
        <p>
          Les donnees collectees via les cookies analytics sont hebergees par{" "}
          <strong>Piwik PRO en Union Europeenne (Allemagne)</strong>. Aucun transfert hors
          UE n&apos;est effectue pour les donnees analytics.
        </p>

        <h2>7. Vos droits</h2>
        <p>
          Conformement au RGPD (articles 15 a 22), vous disposez de droits sur vos donnees
          personnelles. Pour plus de details, consultez notre{" "}
          <Link href="/politique-confidentialite">politique de confidentialite</Link>.
        </p>
        <p>
          Contact : <strong>contact@devradar.fr</strong>
          <br />
          Autorite de controle : <strong>CNIL</strong> —{" "}
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
            www.cnil.fr
          </a>
        </p>

        <h2>8. References reglementaires</h2>
        <ul>
          <li>Reglement General sur la Protection des Donnees (RGPD — Reglement UE 2016/679)</li>
          <li>Directive ePrivacy (2002/58/CE modifiee)</li>
          <li>Loi Informatique et Libertes — Article 82 (transposition ePrivacy)</li>
          <li>CNIL — Lignes directrices cookies et traceurs (deliberation n° 2020-091 du 17 septembre 2020)</li>
          <li>CNIL — Recommandation cookies (deliberation n° 2020-092 du 17 septembre 2020)</li>
        </ul>
      </article>
    </div>
  );
}
