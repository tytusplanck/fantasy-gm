export const RISK_LABELS = ["Low", "Medium", "High", "Fragile", "Volatile", "Unknown"] as const;
export type RiskLabel = (typeof RISK_LABELS)[number];

export const DIRECTIONS = ["Rising", "Falling", "Stable", "Volatile"] as const;
export type Direction = (typeof DIRECTIONS)[number];

export function inferRisk(text: string): RiskLabel {
  const normalized = text.toLowerCase();
  if (normalized.includes("injury") || normalized.includes("fragile")) {
    return "Fragile";
  }
  if (normalized.includes("volatile") || normalized.includes("boom")) {
    return "Volatile";
  }
  if (normalized.includes("high risk") || normalized.includes("risky")) {
    return "High";
  }
  if (normalized.includes("low risk") || normalized.includes("safe")) {
    return "Low";
  }
  if (normalized.trim().length > 0) {
    return "Medium";
  }
  return "Unknown";
}

export function inferDirection(text: string): Direction {
  const normalized = text.toLowerCase();
  if (normalized.includes("rising") || normalized.includes("ascending") || normalized.includes("breakout")) {
    return "Rising";
  }
  if (normalized.includes("falling") || normalized.includes("declining") || normalized.includes("sell before")) {
    return "Falling";
  }
  if (normalized.includes("volatile") || normalized.includes("uncertain")) {
    return "Volatile";
  }
  return "Stable";
}
