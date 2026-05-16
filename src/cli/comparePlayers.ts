import { evaluatePlayerValue } from "../analysis/playerValue.js";
import { info, error } from "../utils/logger.js";
import { cleanCliArgs, findPlayerInContext, isDirectRun, loadLatestLeagueContext, loadMemoryContext, promptIfMissing } from "./shared.js";

async function main(): Promise<void> {
  const raw = await promptIfMissing(cleanCliArgs(process.argv.slice(2)).join(" "), "Players to compare: ");
  const players = raw
    .split(/,|\bvs\.?\b|\band\b/i)
    .map((player) => player.trim())
    .filter(Boolean);
  if (players.length < 2) {
    throw new Error("Provide at least two players, separated by commas or vs.");
  }

  const memory = await loadMemoryContext();
  const context = await loadLatestLeagueContext();
  const results = players.map((playerName) => {
    const player = findPlayerInContext(context, playerName);
    return evaluatePlayerValue({
      playerName,
      leagueSettings: memory.leagueSettings,
      playerValues: memory.playerValues,
      playerNotes: memory.playerNotes,
      strategy: memory.strategy,
      externalRankings: memory.externalRankings,
      position: player?.position,
      team: player?.team,
      age: player?.age
    });
  });

  info("Player comparison:");
  for (const result of results) {
    info(`- ${result.playerName}: ${result.bestUse}, ${result.currentValueTier}, ${result.direction}, ${result.riskProfile} risk`);
    if (result.dataGaps.length > 0) {
      info(`  Data gaps: ${result.dataGaps.join("; ")}`);
    }
  }
  info("Skeptical note: use this as a tiering prompt, not a final answer. Add current rankings or offers to memory for stronger comparisons.");
}

if (isDirectRun(import.meta.url)) {
  main().catch((caught: unknown) => {
    error(caught instanceof Error ? caught.message : String(caught));
    process.exitCode = 1;
  });
}
