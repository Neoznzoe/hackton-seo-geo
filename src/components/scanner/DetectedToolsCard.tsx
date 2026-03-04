import { DetectedTool } from "@/lib/scanner/types";

interface DetectedToolsCardProps {
  tools: DetectedTool[];
  title: string;
  emptyMessage: string;
}

export default function DetectedToolsCard({ tools, title, emptyMessage }: DetectedToolsCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="font-semibold text-gray-900 mb-3">{title}</h3>
      {tools.length === 0 ? (
        <p className="text-sm text-gray-500">{emptyMessage}</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {tools.map((tool) => (
            <span
              key={tool.id}
              className={`inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full ${
                tool.cnilExempt
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {tool.name}
              {tool.cnilExempt ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
