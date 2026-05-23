export const VALUE_TIERS = [
  "Elite cornerstone",
  "Premium starter",
  "Strong starter",
  "Useful starter",
  "Depth / matchup",
  "Speculative upside",
  "Replaceable",
  "Unknown / needs market check"
] as const;

export type ValueTier = (typeof VALUE_TIERS)[number];

export function tierFromNotes(notes: string): ValueTier {
  const normalized = notes.toLowerCase();
  if (normalized.includes("elite") || normalized.includes("cornerstone")) {
    return "Elite cornerstone";
  }
  if (normalized.includes("premium") || normalized.includes("top-")) {
    return "Premium starter";
  }
  if (normalized.includes("strong starter") || normalized.includes("locked-in starter")) {
    return "Strong starter";
  }
  if (
    normalized.includes("useful starter") ||
    normalized.includes("starter/flex") ||
    normalized.includes("weekly starter") ||
    normalized.includes("current starter")
  ) {
    return "Useful starter";
  }
  if (normalized.includes("depth") || normalized.includes("matchup")) {
    return "Depth / matchup";
  }
  if (normalized.includes("speculative") || normalized.includes("upside")) {
    return "Speculative upside";
  }
  if (normalized.includes("replaceable")) {
    return "Replaceable";
  }
  return "Unknown / needs market check";
}
