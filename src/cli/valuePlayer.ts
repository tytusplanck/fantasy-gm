import { evaluatePlayerValue } from "../analysis/playerValue.js";
import { renderPlayerValueReport } from "../reports/renderPlayerValueReport.js";
import { slugify, timestampForFile } from "../utils/dates.js";
import { rootPath, writeTextFile } from "../utils/file.js";
import { info, error } from "../utils/logger.js";
import { cleanCliArgs, findPlayerInContext, isDirectRun, loadLatestLeagueContext, loadMemoryContext, promptIfMissing } from "./shared.js";

async function main(): Promise<void> {
  const playerName = await promptIfMissing(cleanCliArgs(process.argv.slice(2)).join(" "), "Player name: ");
  const memory = await loadMemoryContext();
  const context = await loadLatestLeagueContext();
  const player = findPlayerInContext(context, playerName);
  const result = evaluatePlayerValue({
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

  const report = renderPlayerValueReport(result);
  const reportPath = rootPath("reports", "player-values", `${timestampForFile()}--${slugify(playerName) || "player"}.md`);
  await writeTextFile(reportPath, report);

  info(`${result.playerName}: ${result.bestUse} / ${result.currentValueTier} / ${result.direction} / ${result.riskProfile} risk`);
  if (result.notesToSave.length > 0) {
    info(`Suggested memory update: ${result.notesToSave[0]}`);
  }
  info(`Report: ${reportPath}`);
}

if (isDirectRun(import.meta.url)) {
  main().catch((caught: unknown) => {
    error(caught instanceof Error ? caught.message : String(caught));
    process.exitCode = 1;
  });
}
