"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { trackScannerCtaClick } from "@/lib/tracking";

export default function HomeScannerCta() {
  const [url, setUrl] = useState("");
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) {
      router.push("/scanner");
      return;
    }
    trackScannerCtaClick("homepage");
    router.push(`/scanner?url=${encodeURIComponent(trimmed)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="exemple.fr"
        className="flex-1 px-5 py-3.5 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 shadow-lg focus:outline-none focus:ring-2 focus:ring-white text-base"
        aria-label="URL du site à analyser"
      />
      <button
        type="submit"
        className="px-8 py-3.5 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-500 transition-colors text-base shadow-lg hover:shadow-xl"
      >
        Analyser gratuitement
      </button>
    </form>
  );
}
