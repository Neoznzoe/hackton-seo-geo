# Plan de Marquage — DevRadar

**Outil de tracking :** Piwik PRO
**Container ID :** `63d0dcd9-adc4-4484-9a9b-5d278b1ca118`
**Consent Management :** Bandeau cookies custom (RGPD/CNIL conforme)
**Principe :** Aucun tracking si consentement refuse (activation conditionnelle)

---

## 1. KPI Principal

**Conversion = Clic vers le site officiel d'un outil analytics**

| KPI | Definition | Objectif |
|-----|-----------|----------|
| Taux de conversion | Clics externes / Visiteurs uniques | > 5% |
| Engagement scanner | Scans completes / Visiteurs scanner | > 30% |
| Profondeur de visite | Pages vues / Session | > 2.5 |
| Temps moyen sur page outil | Secondes sur /outils/* | > 45s |

---

## 2. Funnel Principal (Comparateur)

```
Step 1: page_landing (homepage)
  |
Step 2: content_interaction (tool:click)
  |
Step 3: funnel > step_1_view_tool (page outil)
  |
Step 4: funnel > step_2_compare (page comparaison)
  |
Step 5: funnel > step_3_conversion_click (clic externe)
```

| Etape | Categorie | Action | Name | Valeur |
|-------|----------|--------|------|--------|
| Landing | navigation | page_landing | `homepage` | — |
| Clic outil | engagement | content_interaction | `tool:click:slug` | — |
| Vue outil | funnel | step_1_view_tool | `slug` | — |
| Comparaison | funnel | step_2_compare | `tool1-vs-tool2` | — |
| Conversion | funnel | step_3_conversion_click | `toolName \| url` | — |
| CTA click | funnel | step_cta_click | `label du CTA` | — |

---

## 3. Funnel Secondaire (Scanner RGPD)

```
Step 1: scanner_funnel > step_1_open
  |
Step 2: scanner_funnel > step_2_url_input
  |
Step 3: scanner_funnel > step_3_plan_select
  |
Step 4: scanner_funnel > step_4_scan_start
  |
Step 5: scanner_funnel > step_5_scan_result (score)
  |
Step 6: scanner_funnel > step_6_recommendation_click
```

| Etape | Categorie | Action | Name | Valeur |
|-------|----------|--------|------|--------|
| Ouverture scanner | scanner_funnel | step_1_open | `scanner_page` | — |
| Saisie URL | scanner_funnel | step_2_url_input | `url` | — |
| Selection plan | scanner_funnel | step_3_plan_select | `gratuit/rapide/complet` | — |
| Lancement scan | scanner_funnel | step_4_scan_start | `url` | — |
| Resultat | scanner_funnel | step_5_scan_result | `risque_level` | score (0-100) |
| Clic reco | scanner_funnel | step_6_recommendation_click | `link` | — |

---

## 4. Events d'Engagement

| Categorie | Action | Name | Valeur | Declencheur |
|----------|--------|------|--------|-------------|
| engagement | scroll_depth | `25%/50%/75%/100%` | depth | Scroll 25/50/75/100% |
| engagement | faq_toggle | `question` | — | Clic sur FAQ |
| engagement | time_on_page | `pageType` | seconds | Quitte la page (>5s) |
| engagement | content_interaction | `type:action:label` | — | Interaction contenu |

---

## 5. Segmentation Utilisateur

| Categorie | Action | Name | Declencheur |
|----------|--------|------|-------------|
| user | segment | `new` / `returning` | 1er chargement (localStorage) |
| user | entry_source | `google/bing/direct/chatgpt/perplexity/...` | document.referrer |

### Sources detectees
- `google` : Trafic Google Search
- `bing` : Trafic Bing
- `chatgpt` / `openai` : Trafic depuis ChatGPT (GEO)
- `perplexity` : Trafic depuis Perplexity AI (GEO)
- `linkedin` / `twitter` : Reseaux sociaux
- `direct` : Acces direct
- `other_referral` : Autre referent

---

## 6. Consent Management

| Categorie | Action | Name | Declencheur |
|----------|--------|------|-------------|
| consent | cookie_banner | `accepted` / `refused` | Clic bandeau cookies |

### Regles RGPD
- **Consentement refuse** = Piwik PRO n'est PAS initialise, aucun cookie depose
- **Consentement accepte** = Piwik PRO initialise, tracking actif
- Le choix est stocke dans `localStorage` (cle : `devradar_consent`)
- Pas de tracking avant consentement (conforme CNIL)

---

## 7. Table de KPI Business

| KPI | Metrique | Source | Frequence |
|-----|---------|--------|-----------|
| **Visiteurs uniques** | Users | Piwik PRO | Quotidien |
| **Pages / session** | Avg pages | Piwik PRO | Quotidien |
| **Taux de rebond** | Bounce rate | Piwik PRO | Hebdo |
| **Top outils vus** | step_1_view_tool count | Events | Hebdo |
| **Top comparaisons** | step_2_compare count | Events | Hebdo |
| **Taux de conversion** | step_3_conversion / users | Events | Hebdo |
| **Scanner completions** | step_5_scan_result / step_1_open | Events | Hebdo |
| **Score moyen scanner** | Avg value step_5 | Events | Mensuel |
| **Taux consentement** | accepted / (accepted+refused) | Events | Mensuel |
| **Part trafic GEO (IA)** | chatgpt+perplexity / total | Events | Mensuel |

---

## 8. Architecture Technique

```
[Bandeau Consent] --> localStorage (devradar_consent)
        |
    accepted?
        |
  [PiwikProProvider] --> PiwikPro.initialize()
        |
  [FunnelTracker] --> trackUserSegment() + trackEntryPoint() + trackPageLanding()
        |
  [ScrollTracker] --> trackScrollDepth() (25/50/75/100%)
        |
  [Page Components] --> trackToolView(), trackComparison(), trackExternalLink()...
        |
  [Scanner] --> trackScannerOpen() -> trackScan() -> trackScanResult()
```

---

## 9. Nommage

Convention : `snake_case` pour toutes les actions et noms d'evenements.

Categories :
- `navigation` : deplacement entre pages
- `funnel` : etapes du tunnel principal
- `scanner_funnel` : etapes du tunnel scanner
- `engagement` : interactions de profondeur
- `user` : segmentation visiteur
- `consent` : gestion du consentement
