# Sprint 4 — Scraping & Conformite : Livrable complet

**Projet :** DevRadar — Comparateur d'outils analytics web
**Date :** 5 mars 2026
**Equipe :** Hackathon M2 IW

---

# PARTIE 1 — Matrice de risques

## 1.1 Risques lies au scraping (veille concurrentielle)

| # | Risque | Probabilite | Impact | Niveau | Mesure de mitigation | Statut |
|---|--------|-------------|--------|--------|---------------------|--------|
| S1 | Violation du robots.txt d'un site cible | Faible | Eleve | **MOYEN** | Verification systematique du robots.txt avant chaque requete. Si interdit, scraping annule et journalise. | IMPLEMENTE |
| S2 | Surcharge du serveur cible (DDoS involontaire) | Faible | Eleve | **MOYEN** | Rate limiting strict : 2s minimum entre requetes par domaine + max 5 operations/min par utilisateur. | IMPLEMENTE |
| S3 | Collecte accidentelle de donnees personnelles | Faible | Tres eleve | **ELEVE** | Extraction limitee aux donnees produit (prix, fonctionnalites). Aucun champ nom/email/IP collecte. Minimisation des donnees (500KB max par page). | IMPLEMENTE |
| S4 | Violation des CGU d'un site cible | Moyen | Moyen | **MOYEN** | Scraping limite aux pages publiques de pricing/features. User-Agent identifie. Possibilite pour le site cible de nous bloquer. | ACCEPTE |
| S5 | Atteinte au droit sui generis sur les bases de donnees | Faible | Eleve | **MOYEN** | Extraction non substantielle : seules quelques donnees ponctuelles sont extraites, pas de copie de base de donnees. | ACCEPTE |
| S6 | Contenu scrape obsolete ou errone | Moyen | Faible | **FAIBLE** | Horodatage de chaque collecte. Donnees presentees comme "veille automatisee" avec source affichee. | IMPLEMENTE |

## 1.2 Risques lies au scanner RGPD

| # | Risque | Probabilite | Impact | Niveau | Mesure de mitigation | Statut |
|---|--------|-------------|--------|--------|---------------------|--------|
| R1 | SSRF (Server-Side Request Forgery) | Moyen | Tres eleve | **ELEVE** | Blocage des URLs privees/internes (localhost, 192.168.x.x, 10.x.x.x, .local, .internal). Validation du protocole (HTTP/HTTPS uniquement). | IMPLEMENTE |
| R2 | Abus du scanner (scan massif non autorise) | Moyen | Moyen | **MOYEN** | Rate limiting : max 10 scans/minute par IP. Plans limites (5/25/50 pages). Timeout global par plan. | IMPLEMENTE |
| R3 | Faux positifs/negatifs dans la detection | Moyen | Faible | **FAIBLE** | 30+ patterns de detection. Affichage du snippet detecte pour verification. Mise a jour reguliere des patterns. | ACCEPTE |
| R4 | Resultats de scan utilises comme "certification" RGPD | Moyen | Moyen | **MOYEN** | Disclaimer clair : "Les resultats sont indicatifs et ne constituent pas un audit juridique." | IMPLEMENTE |

## 1.3 Risques lies aux analytics (Piwik PRO)

| # | Risque | Probabilite | Impact | Niveau | Mesure de mitigation | Statut |
|---|--------|-------------|--------|--------|---------------------|--------|
| A1 | Tracking sans consentement | Faible | Tres eleve | **ELEVE** | Bandeau de consentement obligatoire. Tracking bloque par defaut, active uniquement apres consentement explicite. | IMPLEMENTE |
| A2 | Conservation excessive des donnees | Faible | Moyen | **FAIBLE** | Retention Piwik PRO limitee a 25 mois (recommandation CNIL). Cookie de consentement : 12 mois. | IMPLEMENTE |
| A3 | Transfert de donnees hors UE | Faible | Eleve | **MOYEN** | Piwik PRO heberge en Allemagne (UE). Pas de Google Analytics. | IMPLEMENTE |

## 1.4 Risques juridiques generaux

| # | Risque | Probabilite | Impact | Niveau | Mesure de mitigation | Statut |
|---|--------|-------------|--------|--------|---------------------|--------|
| J1 | Absence de mentions legales | Faible | Moyen | **FAIBLE** | Page /mentions-legales creee avec toutes les mentions obligatoires (editeur, hebergeur, PI, RGPD). | IMPLEMENTE |
| J2 | Absence de politique de confidentialite | Faible | Eleve | **MOYEN** | Page /politique-confidentialite creee, detaillant tous les traitements, bases legales, droits des personnes. | IMPLEMENTE |
| J3 | Non-conformite CNIL sur les cookies | Faible | Eleve | **MOYEN** | Bandeau cookies conforme (refus aussi simple que acceptation). Pas de cookie wall. Tracking conditionne au consentement. Page /politique-cookies dediee. | IMPLEMENTE |
| J4 | Plainte d'un concurrent pour scraping | Faible | Moyen | **FAIBLE** | Approche respectueuse (robots.txt, rate limiting, User-Agent identifie). Donnees non personnelles et publiques uniquement. | ACCEPTE |

## 1.5 Synthese de la matrice de risques

| Niveau de risque | Nombre | Pourcentage |
|-----------------|--------|-------------|
| FAIBLE | 5 | 36% |
| MOYEN | 7 | 50% |
| ELEVE | 3 | 14% |

**Risque global : MAITRISE**

Les 3 risques eleves (S3, R1, A1) sont tous couverts par des mesures techniques implementees et testees. Les risques moyens sont soit implementes soit acceptes avec justification documentee. Aucun risque residuel critique.

---

# PARTIE 2 — Ajustements Privacy-by-Design

*Conformement a l'article 25 du RGPD : "Protection des donnees des la conception et par defaut"*

## 2.1 Principes appliques

### Minimisation des donnees (Art. 5.1.c RGPD)

| Composant | Donnees collectees | Donnees NON collectees | Justification |
|-----------|-------------------|----------------------|---------------|
| Analytics (Piwik PRO) | Pages vues, scroll, clics CTA, source trafic | Nom, email, IP complete, fingerprint | Seules les metriques d'usage anonymisees sont necessaires pour piloter le produit |
| Scanner RGPD | URL soumise, HTML public du site scanne | Contenu prive, donnees personnelles du site scanne | Analyse ephemere, aucun stockage permanent |
| Veille concurrentielle | Prix, fonctionnalites des outils (donnees produit publiques) | Noms d'employes, emails, donnees clients des outils scannes | Uniquement des informations produit accessibles publiquement |
| Logs de scraping | Horodatage, URL cible, status HTTP, duree | IP de l'utilisateur, contenu HTML scrape | Audit technique sans donnees personnelles |

### Limitation de la conservation (Art. 5.1.e RGPD)

| Donnee | Duree | Mecanisme de purge |
|--------|-------|-------------------|
| Analytics Piwik PRO | 25 mois max | Configuration Piwik PRO (retention automatique) |
| Cookie de consentement | 12 mois | Expiration automatique du cookie navigateur |
| Resultats de scan | 0 — non persistes | Temps reel uniquement, pas de base de donnees |
| Logs de scraping | 1000 entrees max en memoire | FIFO : les anciens logs sont ecrases automatiquement |
| Donnees de veille | Non persistees | Calculees a la volee a chaque requete, pas de stockage |

### Consentement par defaut (Art. 7 RGPD + recommandations CNIL)

- **Tracking desactive par defaut** : aucun cookie analytics n'est depose avant consentement explicite de l'utilisateur
- **Refus aussi simple qu'acceptation** : bouton "Refuser" aussi visible et accessible que le bouton "Accepter" (conformite CNIL deliberation 2020-092)
- **Pas de cookie wall** : le site reste entierement fonctionnel (scanner, comparateur, guides) sans consentement aux cookies
- **Lien informatif** : le bandeau de consentement renvoie vers /politique-cookies pour plus de details
- **Granularite** : consentement specifique par categorie de cookies (essentiels vs analytics)

### Securite des la conception (Art. 32 RGPD)

| Mesure | Implementation technique |
|--------|--------------------------|
| HTTPS obligatoire | Force par Railway + Next.js (redirection automatique) |
| Protection SSRF | Validation des URLs dans le scanner (blocage IPs privees 127.0.0.1, 192.168.x.x, 10.x.x.x, .local, .internal + protocoles non-HTTP) |
| Rate limiting scanner | Max 10 requetes/minute par IP |
| Rate limiting veille | Max 5 requetes/minute par IP + 2s entre requetes par domaine |
| Pas de BDD de donnees personnelles | Aucune donnee personnelle n'est persistee — architecture stateless |
| User-Agent identifie | DevRadarBot/1.0 — les sites cibles peuvent nous identifier et bloquer |
| Troncature HTML | Scanner : 2MB max par page. Veille : 500KB max par page |
| Timeouts stricts | Scanner : 30s/60s/90s selon plan. Veille : 10s par source |

## 2.2 Ajustements effectues lors du Sprint 4

### Module de scraping (veille concurrentielle)

| Avant (conception initiale) | Apres (ajustement Privacy-by-Design) |
|----------------------------|-------------------------------------|
| Scraping sans verification robots.txt | Verification systematique du robots.txt avant chaque requete (`src/lib/scraper/robots-parser.ts`) |
| Pas de rate limiting | Rate limiting 2s/domaine + 5 req/min/utilisateur (`src/lib/scraper/rate-limiter.ts`) |
| User-Agent generique (Mozilla/5.0) | User-Agent identifie : DevRadarBot/1.0 |
| Stockage illimite du HTML en memoire | Troncature a 500KB, traitement ephemere, pas de stockage permanent |
| Pas de journalisation | Logs complets avec horodatage, status, duree, robots.txt (`src/lib/scraper/logger.ts`) |
| Extraction de toutes les donnees de la page | Extraction ciblee : uniquement prix et fonctionnalites produit |

### Scanner RGPD

| Avant | Apres |
|-------|-------|
| Pas de protection SSRF | Blocage des IPs privees et protocoles dangereux (`isPrivateUrl()`) |
| Pas de limite de pages | Plans avec limites strictes (5/25/50 pages) |
| HTML complet charge en memoire | Troncature a 2MB, traitement ephemere |
| Pas de timeout | Timeouts stricts par plan (30s/60s/90s) |

### Analytics (Piwik PRO)

| Avant | Apres |
|-------|-------|
| Tracking actif des le chargement de la page | Tracking conditionne au consentement explicite |
| Pas de bandeau cookies | Bandeau conforme CNIL avec refus = acceptation en simplicite |
| Donnees conservees indefiniment | Retention limitee a 25 mois (recommandation CNIL) |
| Pas de page politique cookies | Page /politique-cookies detaillee avec liste de chaque cookie |

## 2.3 Registre des traitements (simplifie — Art. 30 RGPD)

| Traitement | Finalite | Base legale | Categorie de donnees | Destinataires | Transfert hors UE | Duree de conservation |
|-----------|---------|-------------|---------------------|--------------|-------------------|----------------------|
| Analytics Piwik PRO | Mesure d'audience et pilotage produit | Consentement (Art. 6.1.a) | Donnees de navigation anonymisees | Piwik PRO (sous-traitant, hebergement UE, DPA) | Non (Allemagne) | 25 mois |
| Scanner RGPD | Service utilisateur — audit de conformite | Interet legitime (Art. 6.1.f) | URL publiques, HTML public | Aucun | Non | Non conserve |
| Veille concurrentielle | Enrichissement du comparatif produit | Interet legitime (Art. 6.1.f) | Donnees produit publiques (prix, fonctionnalites) | Aucun | Non | Non conserve |
| Cookie de consentement | Gestion des preferences cookies | Obligation legale (Art. 6.1.c) | Choix de l'utilisateur (accepte/refuse) | Aucun (1st party) | Non | 12 mois |
| Segmentation visiteur | Differenciation nouveau/recurrent | Consentement (Art. 6.1.a) | Flag booleen (localStorage) | Aucun (1st party) | Non | Persistant |

---

# PARTIE 3 — Politique de confidentialite

## 1. Responsable du traitement

Le responsable du traitement des donnees est l'equipe **DevRadar**, dans le cadre du projet hackathon M2 IW.

- **Site web :** https://devradar.up.railway.app/
- **Contact :** contact@devradar.fr

## 2. Donnees collectees

### 2.1 Donnees de navigation (analytics)

Nous utilisons **Piwik PRO**, une solution d'analytics respectueuse de la vie privee, hebergee en Union Europeenne (Allemagne). Les donnees collectees incluent :

- Pages visitees et parcours de navigation
- Duree de visite et profondeur de scroll
- Source de trafic (referrer)
- Type d'appareil et navigateur (sans fingerprinting)
- Evenements d'interaction (clics CTA, utilisation du scanner)

**Base legale :** Consentement (article 6.1.a du RGPD). Le tracking n'est active qu'apres acceptation explicite via notre bandeau de consentement.

### 2.2 Donnees du scanner RGPD

Lorsque vous utilisez notre scanner de conformite, nous traitons :

- L'URL du site soumis a l'analyse
- Les resultats du scan (outils detectes, score de conformite)

**Base legale :** Interet legitime (article 6.1.f du RGPD) — fournir le service demande par l'utilisateur.

**Aucune donnee personnelle du site scanne n'est stockee.** Seul le code HTML public est analyse de maniere ephemere, puis immediatement libere de la memoire.

### 2.3 Donnees de veille concurrentielle (scraping)

Notre module de veille concurrentielle collecte exclusivement des **donnees produit publiquement accessibles** (tarifs, fonctionnalites, conformite RGPD) sur les sites des outils analytics concurrents. Aucune donnee personnelle n'est collectee via le scraping.

Garanties mises en place :
- Respect systematique du fichier robots.txt de chaque site cible
- Rate limiting : minimum 2 secondes entre chaque requete par domaine
- User-Agent identifie : DevRadarBot/1.0
- Journalisation complete de chaque operation de scraping
- Donnees minimisees : seules les informations produit sont extraites (500KB max par page)
- Aucun stockage permanent des donnees scrapees

## 3. Cookies et technologies de suivi

### 3.1 Cookies strictement necessaires (sans consentement)

| Cookie | Finalite | Duree |
|--------|---------|-------|
| `devradar_consent` | Stocke votre choix de consentement cookies | 12 mois |
| `devradar_visited` | Differencie visiteurs nouveaux/recurrents | Persistant (localStorage) |

### 3.2 Cookies analytics — Piwik PRO (avec consentement)

| Cookie | Finalite | Duree |
|--------|---------|-------|
| `_pk_id.*` | Identifiant visiteur anonyme | 13 mois |
| `_pk_ses.*` | Identifiant de session | 30 minutes |
| `stg_*` | Tag Manager Piwik PRO | Variable |

### 3.3 Cookies tiers (avec consentement)

| Cookie | Finalite | Duree |
|--------|---------|-------|
| `ahrefs_*` | Analyse SEO du site | Variable |

Pour plus de details sur les cookies, consultez notre **politique de cookies** : /politique-cookies

## 4. Duree de conservation

| Donnee | Duree de conservation |
|--------|----------------------|
| Donnees analytics Piwik PRO | 25 mois (recommandation CNIL) |
| Cookie de consentement | 12 mois |
| Resultats de scan | Non conserves (temps reel uniquement) |
| Logs de scraping | 1000 dernieres operations en memoire, non persistes sur disque |
| Donnees de veille | Non conservees (calculees a la volee) |

## 5. Transferts de donnees

**Piwik PRO** heberge les donnees en **Union Europeenne (Allemagne)**. Aucun transfert de donnees personnelles hors UE n'est effectue pour les donnees analytics.

Le site est heberge sur **Railway** (San Francisco, USA). Les donnees de navigation transitent via leurs serveurs, mais aucune donnee personnelle n'est persistee cote serveur.

## 6. Vos droits (RGPD — Articles 15 a 22)

Conformement au Reglement General sur la Protection des Donnees, vous disposez des droits suivants :

- **Droit d'acces (Art. 15)** : obtenir une copie de vos donnees personnelles
- **Droit de rectification (Art. 16)** : corriger des donnees inexactes
- **Droit a l'effacement (Art. 17)** : demander la suppression de vos donnees
- **Droit a la limitation (Art. 18)** : restreindre le traitement de vos donnees
- **Droit a la portabilite (Art. 20)** : recevoir vos donnees dans un format structure et lisible
- **Droit d'opposition (Art. 21)** : vous opposer au traitement fonde sur l'interet legitime
- **Droit de retirer votre consentement (Art. 7.3)** : a tout moment, sans affecter la licite du traitement anterieur

**Pour exercer vos droits :** contact@devradar.fr — reponse sous 30 jours.

**Autorite de controle :** Vous pouvez introduire une reclamation aupres de la **CNIL** (Commission Nationale de l'Informatique et des Libertes) — www.cnil.fr

## 7. Securite (Art. 32 RGPD)

Mesures techniques et organisationnelles mises en oeuvre :

- Connexion HTTPS obligatoire (chiffrement en transit)
- Protection SSRF sur les endpoints de scan et scraping
- Rate limiting sur toutes les API exposees
- Pas de base de donnees contenant des donnees personnelles
- Minimisation systematique des donnees collectees
- Journalisation des operations de scraping pour audit et transparence
- Troncature du contenu HTML pour eviter toute fuite de donnees

## 8. Privacy-by-Design (Art. 25 RGPD)

DevRadar integre la protection des donnees des la conception :

- Analytics respectueux de la vie privee (Piwik PRO, hebergement UE, pas de Google Analytics)
- Consentement requis avant tout tracking non essentiel
- Aucune collecte de donnees personnelles via le scraping
- Pas de stockage persistant des donnees de scan ni de veille
- Journalisation des operations de scraping pour transparence et audit
- Bandeau cookies conforme aux recommandations CNIL
- Architecture stateless : pas de base de donnees de donnees personnelles

## 9. Modifications

Cette politique peut etre mise a jour. La date de derniere modification est indiquee en haut du document. En cas de modification substantielle, un bandeau d'information sera affiche sur le site.

---

# PARTIE 4 — References reglementaires

- **RGPD** — Reglement (UE) 2016/679 du Parlement europeen et du Conseil du 27 avril 2016 relatif a la protection des personnes physiques a l'egard du traitement des donnees a caractere personnel
  - Articles cites : 5, 6, 7, 13, 14, 15-22, 25, 30, 32
- **CNIL** — Lignes directrices cookies et traceurs (deliberation n° 2020-091 du 17 septembre 2020)
- **CNIL** — Recommandation cookies et autres traceurs (deliberation n° 2020-092 du 17 septembre 2020)
- **Loi Informatique et Libertes** (loi n° 78-17 du 6 janvier 1978 modifiee) — Article 82 (transposition ePrivacy)
- **Directive ePrivacy** (2002/58/CE modifiee par 2009/136/CE)
- **Directive 96/9/CE** relative a la protection juridique des bases de donnees (droit sui generis)
- **Jurisprudence Ryanair c/ PR Aviation** (CJUE, C-30/14, 2015) — licite du scraping de donnees publiques non protegees par droit sui generis

---

# PARTIE 5 — Points de contact

| Role | Contact |
|------|---------|
| Responsable du traitement | Equipe DevRadar |
| Contact donnees personnelles | contact@devradar.fr |
| Autorite de controle | CNIL — www.cnil.fr |
| Delai de reponse | 30 jours maximum |

---

*Document genere dans le cadre du Sprint 4 — Scraping & Conformite, Hackathon M2 IW, mars 2026.*
