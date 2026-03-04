import { FaqItem } from "@/lib/types";
import JsonLd from "@/components/seo/JsonLd";
import { FAQPage } from "schema-dts";

interface FaqSectionProps {
  items: FaqItem[];
  heading?: string;
}

export default function FaqSection({
  items,
  heading = "Questions frequentes",
}: FaqSectionProps) {
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
  };

  return (
    <section aria-labelledby="faq-heading">
      <JsonLd data={{ "@context": "https://schema.org", ...faqJsonLd }} />
      <h2 id="faq-heading" className="text-2xl font-bold text-gray-900 mb-6">
        {heading}
      </h2>
      <dl className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-5"
          >
            <dt className="font-semibold text-gray-900">{item.question}</dt>
            <dd className="mt-2 text-gray-600 text-sm leading-relaxed">
              {item.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
