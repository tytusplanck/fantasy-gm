import "dotenv/config";
import { syncSleeper, relativeToRoot } from "../sleeper/sync.js";
import { info, error } from "../utils/logger.js";
import { isDirectRun } from "./shared.js";

async function main(): Promise<void> {
  const result = await syncSleeper({
    username: process.env.SLEEPER_USERNAME,
    userId: process.env.SLEEPER_USER_ID,
    leagueId: process.env.SLEEPER_LEAGUE_ID,
    season: process.env.SLEEPER_SEASON ?? "2026",
    myManagerName: process.env.MY_MANAGER_NAME,
    myTeamName: process.env.MY_TEAM_NAME,
    forcePlayerRefresh: process.argv.includes("--force-players")
  });

  info("Sleeper sync complete.");
  info(`Raw snapshot: ${relativeToRoot(result.rawBundlePath)}`);
  info(`Normalized snapshot: ${relativeToRoot(result.normalizedPath)}`);
  info(`League: ${result.normalized.league.name} (${result.normalized.league.season})`);
  info(`Rosters: ${result.normalized.rosters.length}`);
  info(`Transactions: ${result.normalized.transactions.length}`);
  if (result.normalized.myRoster) {
    info(`My roster: ${result.normalized.myRoster.teamName} (${result.normalized.myRoster.managerName})`);
  } else {
    info("My roster: not identified. Set SLEEPER_USER_ID, MY_MANAGER_NAME, or MY_TEAM_NAME.");
  }
  if (result.normalized.generatedNotes.length > 0) {
    info("Notes:");
    for (const note of result.normalized.generatedNotes) {
      info(`- ${note}`);
    }
  }
}

if (isDirectRun(import.meta.url)) {
  main().catch((caught: unknown) => {
    error(caught instanceof Error ? caught.message : String(caught));
    process.exitCode = 1;
  });
}
