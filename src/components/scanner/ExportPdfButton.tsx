"use client";

import { useState, useCallback } from "react";
import { ScanResult } from "@/lib/scanner/types";
import { useTranslation } from "@/lib/i18n/LanguageProvider";

interface ExportPdfButtonProps {
  scanResult: ScanResult;
}

type RGB = [number, number, number];

// Colors
const GREEN: RGB = [22, 163, 74];
const RED: RGB = [220, 38, 38];
const AMBER: RGB = [217, 119, 6];
const GRAY: RGB = [107, 114, 128];
const DARK: RGB = [17, 24, 39];
const EMERALD: RGB = [6, 95, 70];

function levelColor(level: string): RGB {
  if (level === "faible") return GREEN;
  if (level === "moyen") return AMBER;
  return RED;
}

export default function ExportPdfButton({ scanResult }: ExportPdfButtonProps) {
  const { t, locale } = useTranslation();
  const [generating, setGenerating] = useState(false);

  const handleExport = useCallback(async () => {
    setGenerating(true);

    try {
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF("p", "mm", "a4");
      const W = 210;
      const margin = 15;
      const contentW = W - margin * 2;
      let y = margin;

      function checkPage(needed: number) {
        if (y + needed > 280) {
          pdf.addPage();
          y = margin;
        }
      }

      function heading(text: string) {
        checkPage(15);
        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(...DARK);
        pdf.text(text, margin, y);
        y += 8;
      }

      function subText(text: string, color: RGB = GRAY) {
        checkPage(8);
        pdf.setFontSize(9);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(...color);
        const lines = pdf.splitTextToSize(text, contentW);
        pdf.text(lines, margin, y);
        y += lines.length * 4.5;
      }

      function separator() {
        checkPage(6);
        y += 2;
        pdf.setDrawColor(229, 231, 235);
        pdf.line(margin, y, W - margin, y);
        y += 4;
      }

      // === HEADER ===
      pdf.setFillColor(...EMERALD);
      pdf.rect(0, 0, W, 35, "F");
      pdf.setFontSize(20);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(255, 255, 255);
      pdf.text("DevRadar", margin, 16);
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      pdf.text(locale === "fr" ? "Rapport d'analyse RGPD" : "GDPR Analysis Report", margin, 24);
      pdf.setFontSize(8);
      pdf.text(scanResult.url, margin, 30);
      y = 42;

      // === META ===
      pdf.setFontSize(9);
      pdf.setTextColor(...GRAY);
      const dateStr = new Date(scanResult.scannedAt).toLocaleString(locale === "fr" ? "fr-FR" : "en-US");
      pdf.text(`${locale === "fr" ? "Date" : "Date"}: ${dateStr}  |  ${locale === "fr" ? "Plan" : "Plan"}: ${scanResult.plan}  |  ${scanResult.pagesScanned} ${locale === "fr" ? "pages analysees" : "pages scanned"}`, margin, y);
      y += 8;

      // === SCORE GLOBAL ===
      checkPage(30);
      pdf.setFillColor(240, 253, 244);
      pdf.roundedRect(margin, y, contentW, 25, 3, 3, "F");
      pdf.setFontSize(28);
      pdf.setFont("helvetica", "bold");
      const gradeColor = levelColor(scanResult.globalLevel);
      pdf.setTextColor(...gradeColor);
      pdf.text(scanResult.letterGrade, margin + 8, y + 17);
      pdf.setFontSize(16);
      pdf.text(`${scanResult.globalScore}/100`, margin + 35, y + 17);
      pdf.setFontSize(9);
      pdf.setTextColor(...GRAY);
      const levelLabel = scanResult.globalLevel === "faible"
        ? (locale === "fr" ? "Excellent" : "Excellent")
        : scanResult.globalLevel === "moyen"
          ? (locale === "fr" ? "A ameliorer" : "Needs improvement")
          : (locale === "fr" ? "Non conforme" : "Non-compliant");
      pdf.text(levelLabel, margin + 75, y + 17);
      y += 32;

      // === SOUS-SCORES ===
      heading(locale === "fr" ? "Detail par categorie" : "Detail by category");
      const subScoreEntries = Object.entries(scanResult.subScores);
      for (const [, sub] of subScoreEntries) {
        checkPage(12);
        const col = levelColor(sub.level);
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(...DARK);
        pdf.text(sub.label, margin, y);
        pdf.setTextColor(...col);
        pdf.text(`${sub.score}/100`, W - margin - 15, y);

        // Progress bar
        y += 3;
        pdf.setFillColor(229, 231, 235);
        pdf.roundedRect(margin, y, contentW, 2.5, 1, 1, "F");
        pdf.setFillColor(...col);
        pdf.roundedRect(margin, y, contentW * (sub.score / 100), 2.5, 1, 1, "F");
        y += 5;

        // Details
        if (sub.details.length > 0) {
          for (const detail of sub.details) {
            checkPage(6);
            pdf.setFontSize(8);
            pdf.setFont("helvetica", "normal");
            const isNeg = /manquant|missing|sans |without|non[- ]|risque|risk|aucun/i.test(detail);
            pdf.setTextColor(...(isNeg ? RED : GREEN));
            pdf.text(`${isNeg ? "\u2717" : "\u2713"} ${detail}`, margin + 3, y);
            y += 4;
          }
        }
        y += 3;
      }

      separator();

      // === OUTILS DETECTES ===
      heading(locale === "fr" ? "Outils detectes" : "Detected tools");
      const toolSections = [
        { label: "Analytics", tools: scanResult.analytics },
        { label: locale === "fr" ? "Pixels de tracking" : "Tracking pixels", tools: scanResult.pixels },
        { label: locale === "fr" ? "Bandeau consentement" : "Consent banner", tools: scanResult.consentBanners },
        { label: "Tag Managers", tools: scanResult.tagManagers },
      ];
      for (const section of toolSections) {
        checkPage(10);
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(...DARK);
        pdf.text(section.label, margin, y);
        y += 5;
        if (section.tools.length === 0) {
          subText(locale === "fr" ? "Aucun detecte" : "None detected");
        } else {
          for (const tool of section.tools) {
            checkPage(6);
            pdf.setFontSize(9);
            pdf.setFont("helvetica", "normal");
            pdf.setTextColor(...DARK);
            const exempt = tool.cnilExempt
              ? (locale === "fr" ? " (exempt CNIL)" : " (CNIL-exempt)")
              : (locale === "fr" ? " (non-exempt)" : " (non-exempt)");
            pdf.text(`- ${tool.name}${exempt}`, margin + 3, y);
            y += 4.5;
          }
        }
        y += 3;
      }

      separator();

      // === PAGES LEGALES ===
      heading(locale === "fr" ? "Pages legales" : "Legal pages");
      const legalItems = [
        { label: locale === "fr" ? "Mentions legales" : "Legal notice", value: scanResult.legalPages.mentionsLegales },
        { label: locale === "fr" ? "Politique de confidentialite" : "Privacy policy", value: scanResult.legalPages.politiqueConfidentialite },
        { label: "CGU", value: scanResult.legalPages.cgu },
        { label: "CGV", value: scanResult.legalPages.cgv },
        { label: locale === "fr" ? "Politique cookies" : "Cookie policy", value: scanResult.legalPages.politiqueCookies },
      ];
      for (const item of legalItems) {
        checkPage(6);
        pdf.setFontSize(9);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(...(item.value ? GREEN : RED));
        pdf.text(`${item.value ? "\u2713" : "\u2717"} ${item.label}`, margin + 3, y);
        y += 5;
      }

      separator();

      // === SECURITE ===
      heading(locale === "fr" ? "En-tetes de securite" : "Security headers");
      const headerItems = [
        { label: "HTTPS", value: scanResult.securityHeaders.https },
        { label: "HSTS", value: scanResult.securityHeaders.hsts },
        { label: "Content-Security-Policy", value: scanResult.securityHeaders.contentSecurityPolicy },
        { label: "X-Frame-Options", value: scanResult.securityHeaders.xFrameOptions },
        { label: "X-Content-Type-Options", value: scanResult.securityHeaders.xContentTypeOptions },
        { label: "Referrer-Policy", value: scanResult.securityHeaders.referrerPolicy },
      ];
      for (const item of headerItems) {
        checkPage(6);
        pdf.setFontSize(9);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(...(item.value ? GREEN : RED));
        pdf.text(`${item.value ? "\u2713" : "\u2717"} ${item.label}`, margin + 3, y);
        y += 5;
      }

      separator();

      // === RESSOURCES TIERCES ===
      if (scanResult.thirdPartyResources.length > 0) {
        heading(locale === "fr" ? "Ressources tierces" : "Third-party resources");
        for (const res of scanResult.thirdPartyResources) {
          checkPage(6);
          pdf.setFontSize(9);
          pdf.setFont("helvetica", "normal");
          pdf.setTextColor(...(res.gdprRisk ? RED : GRAY));
          pdf.text(`- ${res.name} (${res.domain})${res.gdprRisk ? (locale === "fr" ? " - risque RGPD" : " - GDPR risk") : ""}`, margin + 3, y);
          y += 5;
        }
        separator();
      }

      // === DETAIL PAR PAGE ===
      if (scanResult.pageDetails.length > 0) {
        heading(locale === "fr" ? "Detail par page" : "Detail by page");
        for (const page of scanResult.pageDetails) {
          checkPage(10);
          pdf.setFontSize(9);
          pdf.setFont("helvetica", "bold");
          pdf.setTextColor(...(page.issues.length > 0 ? RED : GREEN));
          pdf.text(`${page.issues.length > 0 ? "\u2717" : "\u2713"} ${page.path}`, margin, y);
          if (page.issues.length > 0) {
            pdf.setTextColor(...RED);
            pdf.text(`${page.issues.length} ${locale === "fr" ? "probleme(s)" : "issue(s)"}`, W - margin - 25, y);
          } else {
            pdf.setTextColor(...GREEN);
            pdf.text("OK", W - margin - 8, y);
          }
          y += 4.5;
          for (const issue of page.issues) {
            checkPage(5);
            pdf.setFontSize(8);
            pdf.setFont("helvetica", "normal");
            const sevColor = issue.severity === "high" ? RED : issue.severity === "medium" ? AMBER : GRAY;
            pdf.setTextColor(...sevColor);
            pdf.text(`  - [${issue.severity.toUpperCase()}] ${issue.label}`, margin + 3, y);
            y += 4;
          }
          y += 2;
        }
        separator();
      }

      // === RECOMMANDATIONS ===
      if (scanResult.recommendations.length > 0) {
        heading(locale === "fr" ? "Plan d'action" : "Action plan");
        for (const rec of scanResult.recommendations) {
          checkPage(14);
          const prioColor = rec.priority === "high" ? RED : rec.priority === "medium" ? AMBER : GREEN;
          pdf.setFontSize(9);
          pdf.setFont("helvetica", "bold");
          pdf.setTextColor(...prioColor);
          const prioLabel = rec.priority === "high"
            ? (locale === "fr" ? "URGENT" : "URGENT")
            : rec.priority === "medium"
              ? (locale === "fr" ? "RECOMMANDE" : "RECOMMENDED")
              : (locale === "fr" ? "OPTIONNEL" : "OPTIONAL");
          pdf.text(`[${prioLabel}] ${rec.title}`, margin, y);
          y += 4.5;
          pdf.setFont("helvetica", "normal");
          pdf.setTextColor(...GRAY);
          const descLines = pdf.splitTextToSize(rec.description, contentW - 5);
          pdf.text(descLines, margin + 3, y);
          y += descLines.length * 4 + 3;
        }
      }

      // === FOOTER ===
      const pageCount = pdf.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(7);
        pdf.setTextColor(...GRAY);
        pdf.text(`DevRadar - ${scanResult.url} - ${dateStr}`, margin, 290);
        pdf.text(`${i}/${pageCount}`, W - margin - 8, 290);
      }

      const hostname = new URL(scanResult.url).hostname;
      pdf.save(`devradar-${hostname}.pdf`);
    } catch (err) {
      console.error("PDF export failed:", err);
    } finally {
      setGenerating(false);
    }
  }, [scanResult, locale, t]);

  return (
    <button
      onClick={handleExport}
      disabled={generating}
      className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors text-sm shadow-sm disabled:opacity-50"
    >
      {generating ? (
        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
      )}
      {generating ? t("export.generating") : t("export.pdf")}
    </button>
  );
}
