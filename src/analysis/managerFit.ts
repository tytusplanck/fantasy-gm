import type { NormalizedLeagueContext } from "../sleeper/normalize.js";

export interface ManagerFitResult {
  summary: string;
  evidence: string[];
  confidence: "Low" | "Medium" | "High";
  negotiationAngle: string;
}

export function analyzeManagerFit(input: {
  managerName?: string | undefined;
  context?: NormalizedLeagueContext | undefined;
  managerTendencies: string;
  assetsTheyReceive: string[];
}): ManagerFitResult {
  const evidence: string[] = [];
  const managerName = input.managerName?.trim();
  const roster = managerName
    ? input.context?.rosters.find(
        (candidate) =>
          candidate.managerName.toLowerCase() === managerName.toLowerCase() ||
          candidate.teamName.toLowerCase() === managerName.toLowerCase()
      )
    : undefined;

  if (roster) {
    evidence.push(`Roster found: ${roster.teamName} (${roster.managerName}) with ${roster.players.length} players.`);
  }
  if (managerName && input.managerTendencies.toLowerCase().includes(managerName.toLowerCase())) {
    evidence.push("Manager tendency memory contains this manager name.");
  }
  if (input.assetsTheyReceive.length > 0) {
    evidence.push(`Assets they receive in the proposed framing: ${input.assetsTheyReceive.join(", ")}.`);
  }

  const confidence = roster && evidence.length > 1 ? "Medium" : roster ? "Low" : "Low";
  const summary = roster
    ? `${roster.managerName} has an identifiable roster. Check whether the offer solves a real need before assuming acceptance.`
    : "Manager roster was not identified, so motivation is mostly speculative.";

  return {
    summary,
    evidence,
    confidence,
    negotiationAngle:
      "Frame the offer around the problem it solves for them, while leaving room to ask for a small add if they are getting the cleaner side."
  };
}
