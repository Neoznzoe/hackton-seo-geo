"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { trackCtaClick } from "@/lib/tracking";

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
    trackCtaClick("scanner-homepage");
    router.push(`/scanner?url=${encodeURIComponent(trimmed)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="exemple.fr"
        className="flex-1 px-4 py-3.5 rounded-lg border-2 border-blue-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-white focus:ring-2 focus:ring-white text-base"
        aria-label="URL du site a analyser"
      />
      <button
        type="submit"
        className="px-8 py-3.5 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-colors text-base shadow-lg hover:shadow-xl"
      >
        Analyser gratuitement
      </button>
    </form>
  );
}
