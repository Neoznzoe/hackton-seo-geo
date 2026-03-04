interface Feature {
  label: string;
  available: boolean;
  detail?: string;
}

interface FeatureGridProps {
  features: Feature[];
}

export default function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {features.map((feature) => (
        <div
          key={feature.label}
          className="flex items-start gap-2 p-3 border border-gray-100 rounded-lg"
        >
          {feature.available ? (
            <svg
              className="w-5 h-5 text-green-500 shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-red-400 shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
          <div>
            <span
              className={`text-sm font-medium ${
                feature.available ? "text-gray-900" : "text-gray-400"
              }`}
            >
              {feature.label}
            </span>
            {feature.detail && (
              <span className="block text-xs text-gray-500">
                {feature.detail}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
