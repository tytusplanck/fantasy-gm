import { analyzeTrade } from "../analysis/tradeAnalyzer.js";
import { renderTradeReport } from "../reports/renderTradeReport.js";
import { slugify, timestampForFile } from "../utils/dates.js";
import { rootPath, writeTextFile } from "../utils/file.js";
import { info, error } from "../utils/logger.js";
import { cleanCliArgs, isDirectRun, loadLatestLeagueContext, loadMemoryContext, parseFlag, positionalArgs, promptIfMissing } from "./shared.js";

async function main(): Promise<void> {
  const args = cleanCliArgs(process.argv.slice(2));
  const managerName = parseFlag(args, "--manager");
  const tradeDescription = await promptIfMissing(positionalArgs(args, ["--manager"]).join(" "), "Trade description: ");
  const memory = await loadMemoryContext();
  const context = await loadLatestLeagueContext();
  const result = analyzeTrade({
    tradeDescription,
    otherManagerName: managerName,
    leagueSettings: memory.leagueSettings,
    playerValues: memory.playerValues,
    playerNotes: memory.playerNotes,
    managerTendencies: memory.managerTendencies,
    tradeHistory: memory.tradeHistory,
    strategy: memory.strategy,
    context
  });

  const report = renderTradeReport(result);
  const reportPath = rootPath("reports", "trades", `${timestampForFile()}--${slugify(tradeDescription) || "trade"}.md`);
  await writeTextFile(reportPath, report);

  info(`${result.recommendation} (${result.confidence} confidence): ${result.simpleVerdict}`);
  info(`Report: ${reportPath}`);
}

if (isDirectRun(import.meta.url)) {
  main().catch((caught: unknown) => {
    error(caught instanceof Error ? caught.message : String(caught));
    process.exitCode = 1;
  });
}
