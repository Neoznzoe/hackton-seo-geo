"use client";

import { useState } from "react";
import { FaqItem } from "@/lib/types";
import JsonLd from "@/components/seo/JsonLd";
import { trackFaqToggle } from "@/lib/tracking";
import { FAQPage } from "schema-dts";

interface FaqSectionProps {
  items: FaqItem[];
  heading?: string;
}

export default function FaqSection({
  items,
  heading = "Questions frequentes",
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqJsonLd: FAQPage = {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".faq-question", ".faq-answer"],
    },
  };

  return (
    <section aria-labelledby="faq-heading">
      <JsonLd data={{ "@context": "https://schema.org", ...faqJsonLd }} />
      <h2 id="faq-heading" className="text-2xl font-bold text-gray-900 mb-6">
        {heading}
      </h2>
      <dl className="space-y-3">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <dt>
                <button
                  type="button"
                  className="faq-question w-full flex items-center justify-between p-5 text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    if (!isOpen) trackFaqToggle(item.question);
                    setOpenIndex(isOpen ? null : index);
                  }}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform shrink-0 ml-2 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </dt>
              {isOpen && (
                <dd className="faq-answer px-5 pb-5 text-gray-600 text-sm leading-relaxed">
                  {item.answer}
                </dd>
              )}
            </div>
          );
        })}
      </dl>
    </section>
  );
}
