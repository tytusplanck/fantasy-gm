import type { NormalizedLeagueContext } from "../sleeper/normalize.js";

export interface ManagerFitResult {
  summary: string;
  currentRosterNeeds: string[];
  likelyMotivations: string[];
  knownTendencies: string[];
  evidence: string[];
  confidence: "Low" | "Medium" | "High";
  negotiationAngle: string;
  playersOrAssetsTheyMayValue: string[];
  playersOrAssetsTheyMayBeWillingToMove: string[];
  suggestedMemoryUpdates: string[];
  dataGaps: string[];
}

export function analyzeManagerFit(input: {
  managerName?: string | undefined;
  context?: NormalizedLeagueContext | undefined;
  managerTendencies: string;
  assetsTheyReceive: string[];
}): ManagerFitResult {
  const evidence: string[] = [];
  const dataGaps: string[] = [];
  const managerName = input.managerName?.trim();
  const roster = managerName
    ? input.context?.rosters.find(
        (candidate) =>
          candidate.managerName.toLowerCase() === managerName.toLowerCase() ||
          candidate.teamName.toLowerCase() === managerName.toLowerCase()
      )
    : undefined;
  const managerBlocks = managerName ? extractManagerBlocks(input.managerTendencies, managerName) : [];

  if (roster) {
    evidence.push(`Roster found: ${roster.teamName} (${roster.managerName}) with ${roster.players.length} players.`);
  }
  if (managerBlocks.length > 0) {
    evidence.push("Manager tendency memory contains this manager name.");
  }
  if (input.assetsTheyReceive.length > 0) {
    evidence.push(`Assets they receive in the proposed framing: ${input.assetsTheyReceive.join(", ")}.`);
  }
  if (!managerName) {
    dataGaps.push("No manager name was supplied.");
  }
  if (!input.context) {
    dataGaps.push("No normalized Sleeper context found. Run corepack pnpm sync:sleeper after configuring .env.");
  }
  if (managerName && input.context && !roster) {
    dataGaps.push(`Could not match ${managerName} to a normalized roster.`);
  }
  if (managerName && managerBlocks.length === 0) {
    dataGaps.push(`No durable tendency note found for ${managerName}.`);
  }

  const rosterRead = roster && input.context ? readRosterShape(input.context, roster.rosterId) : undefined;
  const currentRosterNeeds = rosterRead?.needs ?? ["Roster needs are speculative until the manager is matched to a Sleeper roster."];
  const likelyMotivations = buildLikelyMotivations(input.assetsTheyReceive, rosterRead?.needs ?? [], rosterRead?.surpluses ?? []);
  const playersOrAssetsTheyMayValue = buildMayValue(input.assetsTheyReceive, rosterRead?.needs ?? []);
  const playersOrAssetsTheyMayBeWillingToMove = rosterRead?.movableAssets ?? ["Unknown until roster depth, picks, and manager tendency context are reviewed."];
  const suggestedMemoryUpdates = buildSuggestedMemoryUpdates(managerName, rosterRead, managerBlocks);
  const confidence = roster && managerBlocks.length > 0 ? "Medium" : roster ? "Low" : "Low";
  const summary = roster
    ? `${roster.managerName} has an identifiable roster. Check whether the offer solves a real need before assuming acceptance.`
    : "Manager roster was not identified, so motivation is mostly speculative.";

  return {
    summary,
    currentRosterNeeds,
    likelyMotivations,
    knownTendencies: managerBlocks.length > 0 ? managerBlocks : ["No durable tendency is documented yet. Treat roster-read conclusions as provisional."],
    evidence,
    confidence,
    negotiationAngle:
      buildNegotiationAngle(rosterRead?.needs ?? [], input.assetsTheyReceive),
    playersOrAssetsTheyMayValue,
    playersOrAssetsTheyMayBeWillingToMove,
    suggestedMemoryUpdates,
    dataGaps
  };
}

function extractManagerBlocks(managerTendencies: string, managerName: string): string[] {
  const needle = managerName.toLowerCase();
  return managerTendencies
    .split(/\n(?=### )/)
    .map((block) => block.split(/\n##\s+/)[0]?.trim() ?? "")
    .filter((block) => block.toLowerCase().includes(needle))
    .map(summarizeManagerBlock)
    .filter(Boolean);
}

function summarizeManagerBlock(block: string): string {
  const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
  const heading = lines[0]?.replace(/^###\s+/, "");
  const tendency = fieldValue(lines, "Tendency");
  const evidence = fieldValue(lines, "Evidence");
  const confidence = fieldValue(lines, "Confidence");
  return [
    heading,
    tendency ? `Tendency: ${tendency}` : undefined,
    evidence ? `Evidence: ${evidence}` : undefined,
    confidence ? `Confidence: ${confidence}` : undefined
  ]
    .filter((part): part is string => Boolean(part))
    .join(" ");
}

function fieldValue(lines: string[], field: string): string | undefined {
  const prefix = `- ${field}:`;
  return lines.find((line) => line.startsWith(prefix))?.slice(prefix.length).trim();
}

function readRosterShape(context: NormalizedLeagueContext, rosterId: number) {
  const roster = context.rosters.find((candidate) => candidate.rosterId === rosterId);
  if (!roster) {
    return undefined;
  }

  const counts = countPositions(roster.players);
  const starterCounts = countPositions(roster.starters);
  const needs: string[] = [];
  const surpluses: string[] = [];

  if ((counts.QB ?? 0) <= 1) {
    needs.push("QB depth is thin even in 1QB.");
  } else if ((counts.QB ?? 0) >= 4 && !hasSuperflex(context)) {
    surpluses.push("QB depth may be movable in a 1QB format.");
  }
  if ((counts.RB ?? 0) < 5) {
    needs.push("RB depth looks thin for a dynasty roster with flex spots.");
  } else if ((counts.RB ?? 0) >= 8) {
    surpluses.push("RB depth may be a tradeable area.");
  }
  if ((counts.WR ?? 0) < 6) {
    needs.push("WR depth looks thin for a 3-WR lineup.");
  } else if ((counts.WR ?? 0) >= 9) {
    surpluses.push("WR depth may be a tradeable area.");
  }
  if ((counts.TE ?? 0) <= 1) {
    needs.push("TE depth is thin.");
  } else if ((counts.TE ?? 0) >= 4 && !hasTePremium(context)) {
    surpluses.push("Extra non-premium TE depth may be movable.");
  }

  if (needs.length === 0) {
    needs.push("No obvious positional shortage from roster counts alone; inspect starter quality and manager goals before assuming motivation.");
  }

  return {
    counts,
    starterCounts,
    needs,
    surpluses,
    movableAssets: buildMovableAssets(roster.players, roster.starters, surpluses)
  };
}

function countPositions(players: Array<{ position: string }>): Record<string, number> {
  return players.reduce<Record<string, number>>((counts, player) => {
    counts[player.position] = (counts[player.position] ?? 0) + 1;
    return counts;
  }, {});
}

function hasSuperflex(context: NormalizedLeagueContext): boolean {
  return context.league.rosterPositions.some((position) => position === "SUPER_FLEX" || position === "Q/W/R/T");
}

function hasTePremium(context: NormalizedLeagueContext): boolean {
  return Number(context.league.scoringSettings.bonus_rec_te ?? 0) > 0;
}

function buildMovableAssets(
  players: Array<{ name: string; position: string; age: number | null }>,
  starters: Array<{ name: string }>,
  surpluses: string[]
): string[] {
  if (surpluses.length === 0) {
    return ["No obvious surplus from roster counts alone. Look for bench/taxi pieces or future picks only after checking their goals."];
  }
  const starterNames = new Set(starters.map((player) => player.name.toLowerCase()));
  const surplusPositions = new Set(
    surpluses
      .map((surplus) => surplus.match(/\b(QB|RB|WR|TE)\b/)?.[1])
      .filter((position): position is string => Boolean(position))
  );
  const candidates = players
    .filter((player) => surplusPositions.has(player.position))
    .filter((player) => !starterNames.has(player.name.toLowerCase()))
    .slice(0, 8)
    .map((player) => `${player.name}${player.age ? ` (${player.position}, age ${player.age})` : ` (${player.position})`}`);
  return candidates.length > 0 ? candidates : ["Surplus is positional, but no clean bench candidate was identified from normalized starters."];
}

function buildLikelyMotivations(assetsTheyReceive: string[], needs: string[], surpluses: string[]): string[] {
  const actionableNeeds = needs.filter(isActionableNeed);
  const motivations = [...actionableNeeds.map((need) => `May engage if the offer addresses this need: ${need}`)];
  if (assetsTheyReceive.length > 0) {
    motivations.push(`May value the proposed incoming asset(s): ${assetsTheyReceive.join(", ")}.`);
  }
  if (surpluses.length > 0) {
    motivations.push(`Could trade from surplus: ${surpluses.join(" ")}`);
  }
  return motivations.length > 0 ? motivations : ["Motivation is unclear without roster, standings, trade block, or manager tendency evidence."];
}

function buildMayValue(assetsTheyReceive: string[], needs: string[]): string[] {
  const actionableNeeds = needs.filter(isActionableNeed);
  const values = [...assetsTheyReceive.map((asset) => `The proposed incoming asset: ${asset}.`)];
  if (actionableNeeds.some((need) => need.includes("RB"))) {
    values.push("Current RB production or RB depth.");
  }
  if (actionableNeeds.some((need) => need.includes("WR"))) {
    values.push("Startable WR depth or young WR liquidity.");
  }
  if (actionableNeeds.some((need) => need.includes("TE"))) {
    values.push("TE depth, though format premium should control price.");
  }
  return values.length > 0 ? values : ["Unknown until trade block, chat, or prior offer evidence is captured."];
}

function buildNegotiationAngle(needs: string[], assetsTheyReceive: string[]): string {
  const actionableNeeds = needs.filter(isActionableNeed);
  if (assetsTheyReceive.length > 0 && actionableNeeds.length > 0) {
    return `Frame the offer around ${assetsTheyReceive.join(", ")} solving their roster problem, then ask for any add-on as compensation for the value or risk gap.`;
  }
  if (actionableNeeds.length > 0) {
    return "Frame the offer around the clearest roster problem it solves for them; do not assume calculator balance is enough.";
  }
  return "Frame the offer around the problem it solves for them, while leaving room to ask for a small add if they are getting the cleaner side.";
}

function buildSuggestedMemoryUpdates(
  managerName: string | undefined,
  rosterRead: ReturnType<typeof readRosterShape> | undefined,
  managerBlocks: string[]
): string[] {
  if (!managerName || !rosterRead || managerBlocks.length > 0) {
    return [];
  }
  const actionableNeeds = rosterRead.needs.filter(isActionableNeed);
  if (actionableNeeds.length === 0) {
    return [];
  }
  return [
    `${managerName}: save an evidence-labeled manager note only if this roster need affects an actual negotiation. Current provisional read: ${actionableNeeds.join(" ")}`
  ];
}

function isActionableNeed(need: string): boolean {
  return !need.toLowerCase().startsWith("no obvious positional shortage");
}
