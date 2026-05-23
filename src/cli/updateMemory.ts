import { appendTextFile, rootPath } from "../utils/file.js";
import { dateStamp } from "../utils/dates.js";
import { info, error } from "../utils/logger.js";
import { cleanCliArgs, isDirectRun, parseFlag, positionalArgs, promptIfMissing } from "./shared.js";

const MEMORY_FILES = {
  "my-team": "my-team.md",
  "league-settings": "league-settings.md",
  "player-values": "player-values.md",
  "player-notes": "player-notes.md",
  "manager-tendencies": "manager-tendencies.md",
  "trade-history": "trade-history.md",
  "negotiation-notes": "negotiation-notes.md",
  "draft-pick-values": "draft-pick-values.md",
  strategy: "strategy.md",
  "external-rankings": "external-rankings.md"
} as const;

export type MemoryTarget = keyof typeof MEMORY_FILES;

export function resolveMemoryTarget(note: string, requestedTarget?: string): MemoryTarget {
  if (requestedTarget && requestedTarget in MEMORY_FILES) {
    return requestedTarget as MemoryTarget;
  }

  const normalized = note.toLowerCase();
  if (normalized.includes("manager") || normalized.includes("tends to") || normalized.includes("leaguemate")) {
    return "manager-tendencies";
  }
  if (normalized.includes("strategy") || normalized.includes("risk tolerance") || normalized.includes("contender") || normalized.includes("rebuild")) {
    return "strategy";
  }
  if (normalized.includes("trade") || normalized.includes("offer")) {
    return "trade-history";
  }
  if (normalized.includes("pick") || normalized.includes("rookie")) {
    return "draft-pick-values";
  }
  if (normalized.includes("ranking") || normalized.includes("projection") || normalized.includes("source:")) {
    return "external-rankings";
  }
  if (normalized.includes("value") || normalized.includes("tier") || normalized.includes("buy") || normalized.includes("sell")) {
    return "player-values";
  }
  return "player-notes";
}

export function buildMemoryEntry(input: {
  note: string;
  source?: string | undefined;
  date?: string | undefined;
  target?: MemoryTarget | undefined;
  manager?: string | undefined;
  player?: string | undefined;
  confidence?: string | undefined;
  evidence?: string | undefined;
  position?: string | undefined;
  team?: string | undefined;
  format?: string | undefined;
  valueTier?: string | undefined;
  direction?: string | undefined;
}): string {
  const date = input.date ?? dateStamp();
  if (input.target === "manager-tendencies") {
    const label = input.manager ?? "Manager note";
    return [
      "",
      `### ${date} - ${label}`,
      "",
      `- Date: ${date}`,
      `- Manager: ${input.manager ?? ""}`,
      `- Tendency: ${input.note.trim()}`,
      `- Evidence: ${input.evidence ?? ""}`,
      `- Confidence: ${input.confidence ?? "Low"}`,
      `- Source: ${input.source ?? "User note"}`
    ].join("\n");
  }

  if (input.target === "player-values") {
    const label = input.player ?? "Player note";
    return [
      "",
      `### ${date} - ${label}`,
      "",
      `- Date: ${date}`,
      `- Player: ${input.player ?? ""}`,
      `- Position: ${input.position ?? ""}`,
      `- NFL team: ${input.team ?? ""}`,
      `- Format: ${input.format ?? ""}`,
      `- Value tier: ${input.valueTier ?? ""}`,
      `- Direction: ${input.direction ?? ""}`,
      `- Note: ${input.note.trim()}`,
      `- Source: ${input.source ?? "User note"}`
    ].join("\n");
  }

  if (input.target === "player-notes") {
    const label = input.player ?? "Player note";
    return [
      "",
      `### ${date} - ${label}`,
      "",
      `- Date: ${date}`,
      `- Player: ${input.player ?? ""}`,
      `- Note: ${input.note.trim()}`,
      `- Confidence: ${input.confidence ?? "Low"}`,
      `- Source: ${input.source ?? "User note"}`
    ].join("\n");
  }

  const lines = [
    "",
    `## ${date}`,
    "",
    `- Date: ${date}`,
    input.target ? `- File: ${input.target}` : undefined,
    input.manager ? `- Manager: ${input.manager}` : undefined,
    input.player ? `- Player: ${input.player}` : undefined,
    `- Source: ${input.source ?? "User note"}`,
    `- Note: ${input.note.trim()}`
  ].filter((line): line is string => line !== undefined);
  return lines.join("\n");
}

async function main(): Promise<void> {
  const args = cleanCliArgs(process.argv.slice(2));
  const requestedTarget = parseFlag(args, "--file") ?? parseFlag(args, "--target");
  const source = parseFlag(args, "--source") ?? "User note";
  const manager = parseFlag(args, "--manager");
  const player = parseFlag(args, "--player");
  const confidence = parseFlag(args, "--confidence");
  const evidence = parseFlag(args, "--evidence");
  const position = parseFlag(args, "--position");
  const team = parseFlag(args, "--team");
  const format = parseFlag(args, "--format");
  const valueTier = parseFlag(args, "--value-tier");
  const direction = parseFlag(args, "--direction");
  const note = await promptIfMissing(
    positionalArgs(args, [
      "--file",
      "--target",
      "--source",
      "--manager",
      "--player",
      "--confidence",
      "--evidence",
      "--position",
      "--team",
      "--format",
      "--value-tier",
      "--direction"
    ]).join(" "),
    "Memory note: "
  );
  const target = resolveMemoryTarget(note, requestedTarget);
  const filePath = rootPath("data", "memory", MEMORY_FILES[target]);
  await appendTextFile(
    filePath,
    buildMemoryEntry({
      note,
      source,
      target,
      manager,
      player,
      confidence,
      evidence,
      position,
      team,
      format,
      valueTier,
      direction
    })
  );
  info(`Saved memory note to ${filePath}`);
}

if (isDirectRun(import.meta.url)) {
  main().catch((caught: unknown) => {
    error(caught instanceof Error ? caught.message : String(caught));
    process.exitCode = 1;
  });
}
