import { analyzeManagerFit } from "../analysis/managerFit.js";
import { renderManagerReport } from "../reports/renderManagerReport.js";
import { slugify, timestampForFile } from "../utils/dates.js";
import { rootPath, writeTextFile } from "../utils/file.js";
import { info, error } from "../utils/logger.js";
import { cleanCliArgs, isDirectRun, loadLatestLeagueContext, loadMemoryContext, promptIfMissing } from "./shared.js";

async function main(): Promise<void> {
  const managerName = await promptIfMissing(cleanCliArgs(process.argv.slice(2)).join(" "), "Manager name: ");
  const memory = await loadMemoryContext();
  const context = await loadLatestLeagueContext();
  const result = analyzeManagerFit({
    managerName,
    context,
    managerTendencies: memory.managerTendencies,
    assetsTheyReceive: []
  });

  const report = renderManagerReport(managerName, result);
  const reportPath = rootPath("reports", "manager-analysis", `${timestampForFile()}--${slugify(managerName) || "manager"}.md`);
  await writeTextFile(reportPath, report);

  info(`${managerName}: ${result.confidence} confidence - ${result.summary}`);
  if (result.dataGaps.length > 0) {
    info(`Data gaps: ${result.dataGaps.join("; ")}`);
  }
  if (result.suggestedMemoryUpdates.length > 0) {
    info(`Suggested memory update: ${result.suggestedMemoryUpdates[0]}`);
  }
  info(`Report: ${reportPath}`);
}

if (isDirectRun(import.meta.url)) {
  main().catch((caught: unknown) => {
    error(caught instanceof Error ? caught.message : String(caught));
    process.exitCode = 1;
  });
}
