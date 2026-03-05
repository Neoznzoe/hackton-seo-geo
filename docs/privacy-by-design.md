# Ajustements Privacy-by-Design — DevRadar

*Conformement a l'article 25 du RGPD : "Protection des donnees des la conception et par defaut"*

## 1. Principes appliques

### 1.1 Minimisation des donnees (Art. 5.1.c RGPD)

| Composant | Donnees collectees | Donnees NON collectees | Justification |
|-----------|-------------------|----------------------|---------------|
| Analytics (Piwik PRO) | Pages vues, scroll, clics CTA, source trafic | Nom, email, IP complete, fingerprint | Seules les metriques d'usage anonymisees sont necessaires |
| Scanner RGPD | URL soumise, HTML public du site scanne | Contenu prive, donnees personnelles du site | Analyse ephemere, pas de stockage |
| Veille concurrentielle | Prix, fonctionnalites des outils (donnees produit) | Noms d'employes, emails, donnees clients | Uniquement des informations produit publiques |
| Logs de scraping | Horodatage, URL cible, status, duree | IP de l'utilisateur, donnees du contenu scrape | Audit technique sans donnees personnelles |

### 1.2 Limitation de la conservation (Art. 5.1.e RGPD)

| Donnee | Duree | Mecanisme de purge |
|--------|-------|-------------------|
| Analytics Piwik PRO | 25 mois max | Configuration Piwik PRO (retention automatique) |
| Cookie de consentement | 12 mois | Expiration automatique du cookie |
| Resultats de scan | 0 (non persistes) | Temps reel uniquement, pas de base de donnees |
| Logs de scraping | 1000 entrees max en memoire | FIFO : les anciens logs sont supprimes automatiquement |
| Donnees de veille | Non persistees | Calculees a la volee, pas de stockage permanent |

### 1.3 Consentement par defaut (Art. 7 RGPD + CNIL)

- **Tracking desactive par defaut** : aucun cookie analytics n'est depose avant consentement explicite
- **Refus aussi simple qu'acceptation** : bouton "Refuser" aussi visible que "Accepter"
- **Pas de cookie wall** : le site reste entierement fonctionnel sans consentement
- **Granularite** : consentement specifique par categorie de cookies

### 1.4 Securite des la conception (Art. 32 RGPD)

| Mesure | Implementation |
|--------|---------------|
| HTTPS obligatoire | Force par Railway + Next.js |
| Protection SSRF | Validation des URLs (blocage IPs privees, protocoles non-HTTP) |
| Rate limiting | Scanner : 10 req/min/IP. Veille : 5 req/min/IP |
| Pas de BDD de donnees personnelles | Aucune donnee personnelle n'est persistee en base |
| User-Agent identifie | DevRadarBot/1.0 — les sites cibles peuvent nous identifier et bloquer |

## 2. Ajustements effectues (Sprint 4)

### 2.1 Module de scraping — ajustements PbD

| Avant (conception initiale) | Apres (ajustement Privacy-by-Design) |
|----------------------------|-------------------------------------|
| Scraping sans verification robots.txt | Verification systematique avant chaque requete |
| Pas de rate limiting | Rate limiting 2s/domaine + 5 req/min/utilisateur |
| User-Agent generique (Mozilla) | User-Agent identifie : DevRadarBot/1.0 |
| Stockage illimite du HTML | Troncature a 500KB, pas de stockage permanent |
| Pas de journalisation | Logs complets de chaque operation (audit trail) |
| Extraction de toutes les donnees | Extraction ciblee : uniquement prix et fonctionnalites |

### 2.2 Scanner RGPD — ajustements PbD

| Avant | Apres |
|-------|-------|
| Pas de protection SSRF | Blocage des IPs privees et protocoles dangereux |
| Pas de limite de pages | Plans avec limites (5/25/50 pages) |
| HTML complet en memoire | Troncature a 2MB, traitement ephemere |
| Pas de timeout | Timeouts stricts par plan (30s/60s/90s) |

### 2.3 Analytics — ajustements PbD

| Avant | Apres |
|-------|-------|
| Tracking actif des le chargement | Tracking conditionne au consentement |
| Pas de bandeau cookies | Bandeau conforme CNIL (refus = acceptation en simplicite) |
| Donnees conservees indefiniment | Retention limitee a 25 mois |

## 3. Registre des traitements (simplifie)

| Traitement | Finalite | Base legale | Categorie de donnees | Destinataires | Transfert hors UE |
|-----------|---------|-------------|---------------------|--------------|-------------------|
| Analytics Piwik PRO | Mesure d'audience | Consentement (Art. 6.1.a) | Donnees de navigation anonymisees | Piwik PRO (sous-traitant, DPA signe) | Non (Allemagne) |
| Scanner RGPD | Service utilisateur | Interet legitime (Art. 6.1.f) | URL publiques, HTML public | Aucun | Non |
| Veille concurrentielle | Enrichissement comparatif | Interet legitime (Art. 6.1.f) | Donnees produit publiques | Aucun | Non |
| Cookie de consentement | Gestion des preferences | Obligation legale (Art. 6.1.c) | Choix de l'utilisateur | Aucun | Non |

## 4. Points de contact et droits

- **DPO / Contact** : contact@devradar.fr
- **Autorite de controle** : CNIL — www.cnil.fr
- **Exercice des droits** : email a contact@devradar.fr, reponse sous 30 jours

## 5. References reglementaires

- **RGPD** (Reglement UE 2016/679) — Articles 5, 6, 7, 13, 14, 15-22, 25, 32
- **CNIL** — Lignes directrices cookies et traceurs (deliberation n° 2020-091 du 17 septembre 2020)
- **CNIL** — Recommandation cookies (deliberation n° 2020-092)
- **Loi Informatique et Libertes** (modifiee) — Article 82 (cookies)
- **Directive ePrivacy** (2002/58/CE modifiee)
- **Jurisprudence Ryanair c/ PR Aviation** (CJUE, 2015) — scraping de donnees publiques
