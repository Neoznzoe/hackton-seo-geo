import { AnalyticsTool } from "@/lib/types";

interface ToolScoreProps {
  tool: AnalyticsTool;
  size?: "sm" | "md";
}

function calculateScore(tool: AnalyticsTool): number {
  let score = 0;

  // Privacy (max 30)
  if (tool.compliance.gdprCompliant) score += 10;
  if (tool.compliance.cnilExempt) score += 10;
  if (tool.compliance.cookieless) score += 10;

  // Features (max 30)
  const availableFeatures = tool.features.filter((f) => f.available).length;
  score += Math.round((availableFeatures / tool.features.length) * 30);

  // Price (max 20)
  const hasFree = tool.pricing.some((p) => p.price === "0 €");
  if (hasFree) score += 20;
  else {
    const lowestPrice = tool.pricing[0]?.price || "";
    const priceNum = parseFloat(lowestPrice.replace(/[^0-9.,]/g, ""));
    if (!isNaN(priceNum) && priceNum <= 15) score += 15;
    else if (!isNaN(priceNum) && priceNum <= 50) score += 10;
    else score += 5;
  }

  // Open source (max 20)
  if (tool.categories.includes("open-source")) score += 15;
  if (tool.categories.includes("hebergement-local")) score += 5;

  return Math.min(score, 100);
}

function getScoreColor(score: number): string {
  if (score >= 80) return "bg-green-100 text-green-800 border-green-200";
  if (score >= 60) return "bg-blue-100 text-blue-800 border-blue-200";
  if (score >= 40) return "bg-yellow-100 text-yellow-800 border-yellow-200";
  return "bg-gray-100 text-gray-800 border-gray-200";
}

export default function ToolScore({ tool, size = "sm" }: ToolScoreProps) {
  const score = calculateScore(tool);
  const colorClass = getScoreColor(score);

  if (size === "md") {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-semibold ${colorClass}`}>
        <span>Score DevRadar</span>
        <span className="font-bold">{score}/100</span>
      </div>
    );
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${colorClass}`} title={`Score DevRadar : ${score}/100`}>
      {score}/100
    </span>
  );
}
