interface VerdictSectionProps {
  verdict: {
    startup: string;
    enterprise: string;
    privacy: string;
    budget: string;
  };
}

const verdictLabels: { key: keyof VerdictSectionProps["verdict"]; label: string; icon: string }[] = [
  { key: "startup", label: "Pour une startup", icon: "🚀" },
  { key: "enterprise", label: "Pour une entreprise", icon: "🏢" },
  { key: "privacy", label: "Pour la vie privee", icon: "🔒" },
  { key: "budget", label: "Pour un petit budget", icon: "💰" },
];

export default function VerdictSection({ verdict }: VerdictSectionProps) {
  return (
    <section aria-labelledby="verdict" className="mb-12">
      <h2 id="verdict" className="text-2xl font-bold text-gray-900 mb-6">
        Notre verdict par cas d&apos;usage
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {verdictLabels.map(({ key, label, icon }) => (
          <div key={key} className="border border-gray-200 rounded-lg p-5">
            <p className="font-semibold text-gray-900 mb-2">
              <span aria-hidden="true" className="mr-2">{icon}</span>
              {label}
            </p>
            <p className="text-sm text-gray-600">{verdict[key]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
