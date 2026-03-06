"use client";

import { useState, useCallback } from "react";
import { useTranslation } from "@/lib/i18n/LanguageProvider";

interface ExportPdfButtonProps {
  targetId: string;
  filename?: string;
}

export default function ExportPdfButton({ targetId, filename = "devradar-report" }: ExportPdfButtonProps) {
  const { t } = useTranslation();
  const [generating, setGenerating] = useState(false);

  const handleExport = useCallback(async () => {
    const element = document.getElementById(targetId);
    if (!element) return;

    setGenerating(true);

    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas-pro"),
        import("jspdf"),
      ]);

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: document.documentElement.classList.contains("dark") ? "#030712" : "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF("p", "mm", "a4");
      let position = 0;
      const pageHeight = 297; // A4 height in mm

      // Add pages as needed
      while (position < imgHeight) {
        if (position > 0) pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, -position, imgWidth, imgHeight);
        position += pageHeight;
      }

      pdf.save(`${filename}.pdf`);
    } catch (err) {
      console.error("PDF export failed:", err);
    } finally {
      setGenerating(false);
    }
  }, [targetId, filename]);

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
