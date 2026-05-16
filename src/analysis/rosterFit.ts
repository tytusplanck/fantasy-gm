import type { NormalizedLeagueContext, NormalizedRoster } from "../sleeper/normalize.js";

export function summarizeRosterFit(context: NormalizedLeagueContext | undefined, assetsOut: string[], assetsIn: string[]): string {
  if (!context?.myRoster) {
    return "My roster was not identified in normalized Sleeper data, so roster-fit analysis is limited to the manual description.";
  }

  const roster = context.myRoster;
  const outgoingPositions = positionsForAssets(roster, assetsOut);
  const incomingPositions = positionsForAssetsFromLeague(context, assetsIn);
  const starterNames = new Set(roster.starters.map((player) => player.name.toLowerCase()));
  const outgoingStarters = assetsOut.filter((asset) => starterNames.has(asset.toLowerCase()));

  const lines = [
    `Identified my roster as ${roster.teamName} (${roster.managerName}).`,
    outgoingPositions.length > 0 ? `Outgoing roster positions found: ${outgoingPositions.join(", ")}.` : "Outgoing assets were not confidently matched to my roster.",
    incomingPositions.length > 0 ? `Incoming asset positions found in league rosters: ${incomingPositions.join(", ")}.` : "Incoming assets were not confidently matched in current rosters.",
    outgoingStarters.length > 0
      ? `This may remove starter(s): ${outgoingStarters.join(", ")}. Replacement value needs a close look.`
      : "No outgoing asset was confidently matched as a current starter from normalized data."
  ];

  return lines.join(" ");
}

export function summarizeOtherRosterFit(context: NormalizedLeagueContext | undefined, managerName: string | undefined, assetsOut: string[], assetsIn: string[]): string {
  if (!context || !managerName) {
    return "Other manager roster was not identified, so acceptance realism is uncertain.";
  }
  const roster = context.rosters.find(
    (candidate) =>
      candidate.managerName.toLowerCase() === managerName.toLowerCase() ||
      candidate.teamName.toLowerCase() === managerName.toLowerCase()
  );
  if (!roster) {
    return `Could not match ${managerName} to a normalized roster. Acceptance realism is uncertain.`;
  }
  const theyGive = positionsForAssets(roster, assetsIn);
  const theyReceive = positionsForAssetsFromLeague(context, assetsOut);
  return [
    `Matched other roster as ${roster.teamName} (${roster.managerName}).`,
    theyGive.length > 0 ? `They would give positions: ${theyGive.join(", ")}.` : "Their outgoing assets were not confidently matched to their roster.",
    theyReceive.length > 0 ? `They would receive positions: ${theyReceive.join(", ")}.` : "Their incoming assets were not confidently matched in league rosters.",
    "They need a roster-construction reason to accept, not just a calculator-neutral offer."
  ].join(" ");
}

function positionsForAssets(roster: NormalizedRoster, assets: string[]): string[] {
  return assets.flatMap((asset) => {
    const player = roster.players.find((candidate) => candidate.name.toLowerCase() === asset.toLowerCase());
    return player ? [`${player.name}:${player.position}`] : [];
  });
}

function positionsForAssetsFromLeague(context: NormalizedLeagueContext, assets: string[]): string[] {
  return assets.flatMap((asset) => {
    for (const roster of context.rosters) {
      const player = roster.players.find((candidate) => candidate.name.toLowerCase() === asset.toLowerCase());
      if (player) {
        return [`${player.name}:${player.position}`];
      }
    }
    return [];
  });
}
