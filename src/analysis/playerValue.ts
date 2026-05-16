import { inferDirection, inferRisk, type Direction, type RiskLabel } from "./risk.js";
import { tierFromNotes, type ValueTier } from "./valueTiers.js";

export type BestUse = "Buy" | "Sell" | "Hold" | "Avoid" | "Shop quietly";

export interface PlayerValueInput {
  playerName: string;
  leagueSettings: string;
  playerValues: string;
  playerNotes: string;
  strategy: string;
  externalRankings: string;
  position?: string | undefined;
  team?: string | undefined;
  age?: number | null | undefined;
}

export interface PlayerValueResult {
  playerName: string;
  currentValueTier: ValueTier;
  direction: Direction;
  bestUse: BestUse;
  formatNotes: string;
  riskProfile: RiskLabel;
  comparablePlayers: string[];
  tradeTargetsAboveAndBelow: string;
  whatIWouldPay: string;
  whatIWouldSellFor: string;
  notesToSave: string[];
  dataGaps: string[];
}

export function evaluatePlayerValue(input: PlayerValueInput): PlayerValueResult {
  const relevantText = [input.playerValues, input.playerNotes, input.externalRankings]
    .join("\n")
    .split("\n")
    .filter((line) => line.toLowerCase().includes(input.playerName.toLowerCase()))
    .join("\n");
  const currentValueTier = tierFromNotes(relevantText);
  const riskProfile = inferRisk(relevantText);
  const direction = inferDirection(relevantText);
  const bestUse = inferBestUse(relevantText, currentValueTier, riskProfile);
  const formatNotes = formatAdjustment(input.leagueSettings, input.position);
  const descriptor = [input.position, input.team, input.age ? `age ${input.age}` : undefined].filter(Boolean).join(", ");

  return {
    playerName: input.playerName,
    currentValueTier,
    direction,
    bestUse,
    formatNotes,
    riskProfile,
    comparablePlayers: buildComparablePlaceholders(input.playerName, currentValueTier),
    tradeTargetsAboveAndBelow:
      "Use league-specific market memory first. Without pasted rankings or recent offers, bracket one tier above and one tier below rather than anchoring to a single calculator number.",
    whatIWouldPay: paymentGuidance(bestUse, currentValueTier),
    whatIWouldSellFor: sellGuidance(bestUse, currentValueTier),
    notesToSave: relevantText ? [] : [`${input.playerName}${descriptor ? ` (${descriptor})` : ""}: add a real valuation note after reviewing market/ranking context.`],
    dataGaps: dataGaps(input, relevantText)
  };
}

function inferBestUse(text: string, tier: ValueTier, risk: RiskLabel): BestUse {
  const normalized = text.toLowerCase();
  if (normalized.includes("avoid")) {
    return "Avoid";
  }
  if (normalized.includes("shop quietly")) {
    return "Shop quietly";
  }
  if (normalized.includes("buy")) {
    return "Buy";
  }
  if (normalized.includes("sell")) {
    return "Sell";
  }
  if (risk === "Fragile" || risk === "Volatile") {
    return "Shop quietly";
  }
  if (tier === "Unknown / needs market check") {
    return "Hold";
  }
  return "Hold";
}

function formatAdjustment(leagueSettings: string, position?: string): string {
  const settings = leagueSettings.toLowerCase();
  const pos = position?.toUpperCase();
  if ((settings.includes("superflex") || settings.includes("2qb")) && pos === "QB") {
    return "QB value is materially elevated in superflex/2QB formats. Replacement value matters more than generic rankings.";
  }
  if (settings.includes("te premium") && pos === "TE") {
    return "TE premium raises the value of true difference-makers but does not automatically make replacement TEs valuable.";
  }
  if (settings.includes("dynasty")) {
    return "Dynasty format means age, role security, and multi-year asset liquidity matter alongside current production.";
  }
  if (settings.includes("redraft")) {
    return "Redraft format prioritizes current role, weekly ceiling, schedule, injury status, and playoff usefulness.";
  }
  return "League format is not fully specified yet. Treat this valuation as provisional until scoring, lineup, and dynasty/keeper status are known.";
}

function buildComparablePlaceholders(playerName: string, tier: ValueTier): string[] {
  if (tier === "Unknown / needs market check") {
    return ["Need manual rankings or recent market comps before naming exact peers."];
  }
  return [`Other players in the ${tier} tier`, `One tier below ${playerName}`, `One tier above ${playerName}`];
}

function paymentGuidance(bestUse: BestUse, tier: ValueTier): string {
  if (bestUse === "Buy") {
    return `Pay up to the lower edge of the ${tier} tier, but avoid adding scarce starters unless the role and format fit are clear.`;
  }
  if (bestUse === "Avoid") {
    return "Do not pay market unless the price is a clear discount with limited downside.";
  }
  return "Pay only if the price improves a starting slot or buys durable dynasty value. Do not chase name value.";
}

function sellGuidance(bestUse: BestUse, tier: ValueTier): string {
  if (bestUse === "Sell" || bestUse === "Shop quietly") {
    return `Sell if someone prices him above the ${tier} tier or ignores the risk profile.`;
  }
  return `Sell only for a clean tier-up, a roster-need solution, or a package that preserves starting-lineup value.`;
}

function dataGaps(input: PlayerValueInput, relevantText: string): string[] {
  const gaps: string[] = [];
  if (!input.leagueSettings.toLowerCase().includes("dynasty") && !input.leagueSettings.toLowerCase().includes("keeper") && !input.leagueSettings.toLowerCase().includes("redraft")) {
    gaps.push("League type is not clearly documented in data/memory/league-settings.md.");
  }
  if (!relevantText) {
    gaps.push("No player-specific memory or external ranking note found.");
  }
  if (!input.position) {
    gaps.push("Player position was not found in local Sleeper metadata.");
  }
  return gaps;
}
