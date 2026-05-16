import path from "node:path";
import { SleeperClient } from "./client.js";
import { normalizeSleeperData, type SleeperRawSyncBundle, type NormalizedLeagueContext } from "./normalize.js";
import type { SleeperLeague, SleeperPlayers } from "./schemas.js";
import { isoNow, timestampForFile } from "../utils/dates.js";
import { ensureDir, readJsonIfExists, rootPath, writeJsonFile } from "../utils/file.js";

export interface SleeperSyncOptions {
  username?: string | undefined;
  userId?: string | undefined;
  leagueId?: string | undefined;
  season: string;
  myManagerName?: string | undefined;
  myTeamName?: string | undefined;
  forcePlayerRefresh?: boolean | undefined;
}

export interface SleeperSyncResult {
  rawBundlePath: string;
  normalizedPath: string;
  normalized: NormalizedLeagueContext;
  updated: string[];
}

const PLAYER_CACHE_PATH = rootPath("data", "sleeper", "raw", "players-nfl-latest.json");
const PLAYER_CACHE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

export async function syncSleeper(options: SleeperSyncOptions, client = new SleeperClient()): Promise<SleeperSyncResult> {
  await ensureDir(rootPath("data", "sleeper", "raw"));
  await ensureDir(rootPath("data", "sleeper", "normalized"));

  const updated: string[] = [];
  const fetchedAt = isoNow();
  const user = await resolveUser(options, client);
  if (user) {
    updated.push(`user:${user.user_id}`);
  }

  const userId = options.userId ?? user?.user_id;
  const leaguesForUser = userId ? await client.getLeaguesForUser(userId, options.season) : undefined;
  if (leaguesForUser) {
    updated.push(`leagues:${leaguesForUser.length}`);
  }

  const leagueId = resolveLeagueId(options.leagueId, leaguesForUser);
  if (!leagueId) {
    throw new Error("SLEEPER_LEAGUE_ID is required unless SLEEPER_USER_ID/SLEEPER_USERNAME resolves to exactly one league for the season.");
  }

  const nflState = await client.getNflState();
  const league = await client.getLeague(leagueId);
  const managers = await client.getLeagueUsers(leagueId);
  const rosters = await client.getRosters(leagueId);
  const tradedPicks = await client.getTradedPicks(leagueId);
  const drafts = await client.getDrafts(leagueId);
  const draftPicksByDraftId: Record<string, Awaited<ReturnType<SleeperClient["getDraftPicks"]>>> = {};
  for (const draft of drafts) {
    draftPicksByDraftId[draft.draft_id] = await client.getDraftPicks(draft.draft_id);
  }

  const transactionsByWeek: Record<string, Awaited<ReturnType<SleeperClient["getTransactions"]>>> = {};
  for (const week of transactionWeeksToFetch(nflState.week ?? nflState.display_week ?? 18)) {
    try {
      transactionsByWeek[String(week)] = await client.getTransactions(leagueId, week);
    } catch (error) {
      transactionsByWeek[String(week)] = [];
      updated.push(`transactions:${week}:unavailable:${(error as Error).message}`);
    }
  }

  const players = await getCachedPlayers(client, options.forcePlayerRefresh ?? false);
  updated.push("league", "managers", `rosters:${rosters.length}`, `transactions:${Object.values(transactionsByWeek).flat().length}`, `drafts:${drafts.length}`);

  const bundle: SleeperRawSyncBundle = {
    fetchedAt,
    nflState,
    league,
    managers,
    rosters,
    transactionsByWeek,
    tradedPicks,
    drafts,
    draftPicksByDraftId,
    players
  };
  if (user) {
    bundle.user = user;
  }
  if (leaguesForUser) {
    bundle.leaguesForUser = leaguesForUser;
  }

  const timestamp = timestampForFile();
  const { players: cachedPlayers, ...rawBundleWithoutPlayers } = bundle;
  const rawBundlePath = rootPath("data", "sleeper", "raw", `${timestamp}--sync-bundle.json`);
  await writeJsonFile(rawBundlePath, {
    ...rawBundleWithoutPlayers,
    playerMetadataCachePath: relativeToRoot(PLAYER_CACHE_PATH),
    playerMetadataCount: Object.keys(cachedPlayers).length
  });

  const normalized = normalizeSleeperData(bundle, {
    myUserId: userId,
    myManagerName: options.myManagerName,
    myTeamName: options.myTeamName
  });
  const normalizedPath = rootPath("data", "sleeper", "normalized", `${timestamp}--league-context.json`);
  await writeJsonFile(normalizedPath, normalized);
  await writeJsonFile(rootPath("data", "sleeper", "normalized", "latest-league-context.json"), normalized);

  return {
    rawBundlePath,
    normalizedPath,
    normalized,
    updated
  };
}

async function resolveUser(options: SleeperSyncOptions, client: SleeperClient) {
  if (options.userId) {
    return client.getUserById(options.userId);
  }
  if (options.username) {
    return client.getUserByUsername(options.username);
  }
  return undefined;
}

function resolveLeagueId(configuredLeagueId: string | undefined, leaguesForUser: SleeperLeague[] | undefined): string | undefined {
  if (configuredLeagueId && configuredLeagueId.trim().length > 0) {
    return configuredLeagueId;
  }
  if (leaguesForUser?.length === 1) {
    return leaguesForUser[0]?.league_id;
  }
  return undefined;
}

function transactionWeeksToFetch(currentWeek: number): number[] {
  const capped = Math.min(Math.max(currentWeek, 1), 18);
  return Array.from({ length: capped }, (_, index) => index + 1);
}

async function getCachedPlayers(client: SleeperClient, forceRefresh: boolean): Promise<SleeperPlayers> {
  const cached = await readJsonIfExists<{ fetchedAt: string; players: SleeperPlayers }>(PLAYER_CACHE_PATH);
  const fetchedAtMs = cached ? Date.parse(cached.fetchedAt) : 0;
  const fresh = Number.isFinite(fetchedAtMs) && Date.now() - fetchedAtMs < PLAYER_CACHE_MAX_AGE_MS;
  if (cached && fresh && !forceRefresh) {
    return cached.players;
  }

  const players = await client.getPlayers();
  await writeJsonFile(PLAYER_CACHE_PATH, {
    fetchedAt: isoNow(),
    note: "Cached aggressively because Sleeper player metadata is large.",
    players
  });
  return players;
}

export function relativeToRoot(filePath: string): string {
  return path.relative(process.cwd(), filePath);
}
