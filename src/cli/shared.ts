import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { pathToFileURL } from "node:url";
import { readJsonIfExists, readTextIfExists, rootPath } from "../utils/file.js";
import type { NormalizedLeagueContext, NormalizedPlayerRef } from "../sleeper/normalize.js";

export interface MemoryContext {
  leagueSettings: string;
  contextMap: string;
  myTeam: string;
  playerValues: string;
  playerNotes: string;
  managerTendencies: string;
  tradeHistory: string;
  negotiationNotes: string;
  draftPickValues: string;
  strategy: string;
  externalRankings: string;
}

export async function loadMemoryContext(): Promise<MemoryContext> {
  return {
    leagueSettings: await readTextIfExists(rootPath("data", "memory", "league-settings.md")),
    contextMap: await readTextIfExists(rootPath("data", "memory", "context-map.md")),
    myTeam: await readTextIfExists(rootPath("data", "memory", "my-team.md")),
    playerValues: await readTextIfExists(rootPath("data", "memory", "player-values.md")),
    playerNotes: await readTextIfExists(rootPath("data", "memory", "player-notes.md")),
    managerTendencies: await readTextIfExists(rootPath("data", "memory", "manager-tendencies.md")),
    tradeHistory: await readTextIfExists(rootPath("data", "memory", "trade-history.md")),
    negotiationNotes: await readTextIfExists(rootPath("data", "memory", "negotiation-notes.md")),
    draftPickValues: await readTextIfExists(rootPath("data", "memory", "draft-pick-values.md")),
    strategy: await readTextIfExists(rootPath("data", "memory", "strategy.md")),
    externalRankings: await readTextIfExists(rootPath("data", "memory", "external-rankings.md"))
  };
}

export async function loadLatestLeagueContext(): Promise<NormalizedLeagueContext | undefined> {
  return readJsonIfExists<NormalizedLeagueContext>(rootPath("data", "sleeper", "normalized", "latest-league-context.json"));
}

export async function promptIfMissing(value: string | undefined, question: string): Promise<string> {
  if (value && value.trim().length > 0) {
    return value.trim();
  }
  const readline = createInterface({ input, output });
  try {
    return (await readline.question(question)).trim();
  } finally {
    readline.close();
  }
}

export function parseFlag(args: string[], flag: string): string | undefined {
  const index = args.indexOf(flag);
  if (index === -1) {
    return undefined;
  }
  return args[index + 1];
}

export function cleanCliArgs(args: string[]): string[] {
  return args.filter((arg) => arg !== "--");
}

export function positionalArgs(args: string[], flagsWithValues: string[]): string[] {
  const skip = new Set<number>();
  for (const flag of flagsWithValues) {
    const index = args.indexOf(flag);
    if (index >= 0) {
      skip.add(index);
      skip.add(index + 1);
    }
  }
  return cleanCliArgs(args.filter((_, index) => !skip.has(index)));
}

export function findPlayerInContext(context: NormalizedLeagueContext | undefined, playerName: string): NormalizedPlayerRef | undefined {
  if (!context) {
    return undefined;
  }
  const needle = playerName.toLowerCase();
  for (const roster of context.rosters) {
    const match = roster.players.find((player) => player.name.toLowerCase() === needle);
    if (match) {
      return match;
    }
  }
  for (const roster of context.rosters) {
    const match = roster.players.find((player) => player.name.toLowerCase().includes(needle));
    if (match) {
      return match;
    }
  }
  return undefined;
}

export function isDirectRun(metaUrl: string): boolean {
  return process.argv[1] ? pathToFileURL(process.argv[1]).href === metaUrl : false;
}
