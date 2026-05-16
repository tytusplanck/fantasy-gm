import type {
  SleeperDraft,
  SleeperDraftPick,
  SleeperLeague,
  SleeperManager,
  SleeperNflState,
  SleeperPlayer,
  SleeperPlayers,
  SleeperRoster,
  SleeperTradedPick,
  SleeperTransaction,
  SleeperUserLookup
} from "./schemas.js";

export interface SleeperRawSyncBundle {
  fetchedAt: string;
  user?: SleeperUserLookup;
  leaguesForUser?: SleeperLeague[];
  nflState: SleeperNflState;
  league: SleeperLeague;
  managers: SleeperManager[];
  rosters: SleeperRoster[];
  transactionsByWeek: Record<string, SleeperTransaction[]>;
  tradedPicks: SleeperTradedPick[];
  drafts: SleeperDraft[];
  draftPicksByDraftId: Record<string, SleeperDraftPick[]>;
  players: SleeperPlayers;
}

export interface NormalizedPlayerRef {
  id: string;
  name: string;
  position: string;
  team: string;
  age: number | null;
  injuryStatus: string | null;
}

export interface NormalizedRoster {
  rosterId: number;
  ownerId: string | null;
  managerName: string;
  teamName: string;
  starters: NormalizedPlayerRef[];
  players: NormalizedPlayerRef[];
  reserve: NormalizedPlayerRef[];
  taxi: NormalizedPlayerRef[];
  settings: Record<string, unknown>;
}

export interface NormalizedLeagueContext {
  fetchedAt: string;
  league: {
    leagueId: string;
    name: string;
    season: string;
    status: string;
    totalRosters: number | null;
    rosterPositions: string[];
    scoringSettings: Record<string, unknown>;
    settings: Record<string, unknown>;
  };
  nflState: SleeperNflState;
  managers: Array<{
    userId: string;
    managerName: string;
    teamName: string;
    rosterId: number | null;
  }>;
  rosters: NormalizedRoster[];
  myRoster: NormalizedRoster | null;
  transactions: Array<{
    week: number;
    transactionId: string;
    type: string;
    status: string;
    created: number | null;
    rosterIds: number[];
    adds: Record<string, string>;
    drops: Record<string, string>;
    draftPicks: unknown[];
  }>;
  tradedPicks: SleeperTradedPick[];
  drafts: Array<{
    draftId: string;
    season: string;
    type: string;
    status: string;
    pickCount: number;
  }>;
  generatedNotes: string[];
}

export function normalizeSleeperData(
  bundle: SleeperRawSyncBundle,
  options: { myUserId?: string | undefined; myManagerName?: string | undefined; myTeamName?: string | undefined } = {}
): NormalizedLeagueContext {
  const managerByUserId = new Map(bundle.managers.map((manager) => [manager.user_id, manager]));
  const rosterIdByOwner = new Map(bundle.rosters.flatMap((roster) => (roster.owner_id ? [[roster.owner_id, roster.roster_id] as const] : [])));

  const managers = bundle.managers.map((manager) => {
    const teamName = stringFromMetadata(manager.metadata, "team_name") ?? stringFromMetadata(manager.metadata, "team_name_update") ?? displayName(manager);
    return {
      userId: manager.user_id,
      managerName: displayName(manager),
      teamName,
      rosterId: rosterIdByOwner.get(manager.user_id) ?? null
    };
  });

  const rosters = bundle.rosters.map((roster) => normalizeRoster(roster, managerByUserId, bundle.players));
  const myRoster = findMyRoster(rosters, options);
  const transactions = Object.entries(bundle.transactionsByWeek)
    .flatMap(([week, transactionsForWeek]) =>
      transactionsForWeek.map((transaction) => ({
        week: Number(week),
        transactionId: transaction.transaction_id,
        type: transaction.type ?? "unknown",
        status: transaction.status ?? "unknown",
        created: transaction.created ?? null,
        rosterIds: transaction.roster_ids ?? [],
        adds: transaction.adds ?? {},
        drops: transaction.drops ?? {},
        draftPicks: transaction.draft_picks ?? []
      }))
    )
    .sort((left, right) => (right.created ?? 0) - (left.created ?? 0));

  const generatedNotes: string[] = [];
  if (!myRoster) {
    generatedNotes.push("Could not identify my roster from SLEEPER_USER_ID, MY_MANAGER_NAME, or MY_TEAM_NAME.");
  }
  if (Object.keys(bundle.players).length === 0) {
    generatedNotes.push("Player metadata was unavailable, so roster player names may be incomplete.");
  }

  return {
    fetchedAt: bundle.fetchedAt,
    league: {
      leagueId: bundle.league.league_id,
      name: bundle.league.name ?? "Unknown league",
      season: bundle.league.season ?? "unknown",
      status: bundle.league.status ?? "unknown",
      totalRosters: bundle.league.total_rosters ?? null,
      rosterPositions: bundle.league.roster_positions ?? [],
      scoringSettings: bundle.league.scoring_settings ?? {},
      settings: bundle.league.settings ?? {}
    },
    nflState: bundle.nflState,
    managers,
    rosters,
    myRoster,
    transactions,
    tradedPicks: bundle.tradedPicks,
    drafts: bundle.drafts.map((draft) => ({
      draftId: draft.draft_id,
      season: draft.season ?? "unknown",
      type: draft.type ?? "unknown",
      status: draft.status ?? "unknown",
      pickCount: bundle.draftPicksByDraftId[draft.draft_id]?.length ?? 0
    })),
    generatedNotes
  };
}

export function playerName(playerId: string, players: SleeperPlayers): string {
  const player = players[playerId];
  if (!player) {
    return playerId;
  }
  return player.full_name ?? joinName(player) ?? player.search_full_name ?? playerId;
}

function normalizeRoster(roster: SleeperRoster, managerByUserId: Map<string, SleeperManager>, players: SleeperPlayers): NormalizedRoster {
  const manager = roster.owner_id ? managerByUserId.get(roster.owner_id) : undefined;
  const managerName = manager ? displayName(manager) : `Roster ${roster.roster_id}`;
  const teamName = manager ? stringFromMetadata(manager.metadata, "team_name") ?? managerName : managerName;
  const allPlayers = roster.players ?? [];
  return {
    rosterId: roster.roster_id,
    ownerId: roster.owner_id ?? null,
    managerName,
    teamName,
    starters: (roster.starters ?? []).map((id) => normalizePlayer(id, players)),
    players: allPlayers.map((id) => normalizePlayer(id, players)),
    reserve: (roster.reserve ?? []).map((id) => normalizePlayer(id, players)),
    taxi: (roster.taxi ?? []).map((id) => normalizePlayer(id, players)),
    settings: roster.settings ?? {}
  };
}

function normalizePlayer(playerId: string, players: SleeperPlayers): NormalizedPlayerRef {
  const player = players[playerId];
  return {
    id: playerId,
    name: playerName(playerId, players),
    position: player?.position ?? firstFantasyPosition(player) ?? "UNKNOWN",
    team: player?.team ?? "FA",
    age: player?.age ?? null,
    injuryStatus: player?.injury_status ?? null
  };
}

function firstFantasyPosition(player: SleeperPlayer | undefined): string | undefined {
  return player?.fantasy_positions?.[0] ?? undefined;
}

function findMyRoster(
  rosters: NormalizedRoster[],
  options: { myUserId?: string | undefined; myManagerName?: string | undefined; myTeamName?: string | undefined }
): NormalizedRoster | null {
  if (options.myUserId) {
    const byUserId = rosters.find((roster) => roster.ownerId === options.myUserId);
    if (byUserId) {
      return byUserId;
    }
  }
  if (options.myTeamName) {
    const needle = options.myTeamName.toLowerCase();
    const byTeam = rosters.find((roster) => roster.teamName.toLowerCase() === needle);
    if (byTeam) {
      return byTeam;
    }
  }
  if (options.myManagerName) {
    const needle = options.myManagerName.toLowerCase();
    const byManager = rosters.find((roster) => roster.managerName.toLowerCase() === needle);
    if (byManager) {
      return byManager;
    }
  }
  return null;
}

function displayName(manager: SleeperManager): string {
  return manager.display_name ?? manager.username ?? manager.user_id;
}

function stringFromMetadata(metadata: Record<string, unknown> | null | undefined, key: string): string | undefined {
  const value = metadata?.[key];
  return typeof value === "string" && value.trim().length > 0 ? value : undefined;
}

function joinName(player: SleeperPlayer): string | undefined {
  const parts = [player.first_name, player.last_name].filter((part): part is string => typeof part === "string" && part.length > 0);
  return parts.length > 0 ? parts.join(" ") : undefined;
}
