interface ComplianceData {
  gdprCompliant: boolean;
  cnilExempt: boolean;
  cookieless: boolean;
  dataLocation: string;
  details: string;
}

interface ComplianceDetailsProps {
  compliance: ComplianceData;
}

export default function ComplianceDetails({ compliance }: ComplianceDetailsProps) {
  const badges = [
    {
      label: "Conforme RGPD",
      value: compliance.gdprCompliant,
    },
    {
      label: "Exempte CNIL",
      value: compliance.cnilExempt,
    },
    {
      label: "Sans cookies",
      value: compliance.cookieless,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {badges.map((badge) => (
          <span
            key={badge.label}
            className={`inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full font-medium ${
              badge.value
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {badge.value ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            {badge.label}
          </span>
        ))}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        <strong className="text-gray-900 dark:text-gray-100">Localisation des donnees :</strong>{" "}
        {compliance.dataLocation}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        {compliance.details}
      </p>
    </div>
  );
}
