import { z } from "zod";

const UnknownRecord = z.record(z.unknown());

export const SleeperUserLookupSchema = z
  .object({
    user_id: z.string(),
    username: z.string().nullable().optional(),
    display_name: z.string().nullable().optional(),
    avatar: z.string().nullable().optional()
  })
  .passthrough();

export const SleeperLeagueSchema = z
  .object({
    league_id: z.string(),
    name: z.string().nullable().optional(),
    season: z.string().nullable().optional(),
    sport: z.string().nullable().optional(),
    status: z.string().nullable().optional(),
    season_type: z.string().nullable().optional(),
    total_rosters: z.number().nullable().optional(),
    roster_positions: z.array(z.string()).nullable().optional(),
    scoring_settings: UnknownRecord.nullable().optional(),
    settings: UnknownRecord.nullable().optional(),
    metadata: UnknownRecord.nullable().optional(),
    previous_league_id: z.string().nullable().optional(),
    draft_id: z.string().nullable().optional()
  })
  .passthrough();

export const SleeperManagerSchema = z
  .object({
    user_id: z.string(),
    display_name: z.string().nullable().optional(),
    username: z.string().nullable().optional(),
    metadata: UnknownRecord.nullable().optional(),
    is_owner: z.boolean().nullable().optional()
  })
  .passthrough();

export const SleeperRosterSchema = z
  .object({
    roster_id: z.number(),
    owner_id: z.string().nullable().optional(),
    league_id: z.string().nullable().optional(),
    players: z.array(z.string()).nullable().optional(),
    starters: z.array(z.string()).nullable().optional(),
    reserve: z.array(z.string()).nullable().optional(),
    taxi: z.array(z.string()).nullable().optional(),
    settings: UnknownRecord.nullable().optional(),
    metadata: UnknownRecord.nullable().optional()
  })
  .passthrough();

export const SleeperTransactionSchema = z
  .object({
    transaction_id: z.string(),
    type: z.string().nullable().optional(),
    status: z.string().nullable().optional(),
    status_updated: z.number().nullable().optional(),
    created: z.number().nullable().optional(),
    roster_ids: z.array(z.number()).nullable().optional(),
    adds: z.record(z.string()).nullable().optional(),
    drops: z.record(z.string()).nullable().optional(),
    draft_picks: z.array(UnknownRecord).nullable().optional(),
    waiver_budget: z.array(UnknownRecord).nullable().optional(),
    metadata: UnknownRecord.nullable().optional()
  })
  .passthrough();

export const SleeperTradedPickSchema = z
  .object({
    season: z.string(),
    round: z.number(),
    roster_id: z.number(),
    owner_id: z.number().nullable().optional(),
    previous_owner_id: z.number().nullable().optional()
  })
  .passthrough();

export const SleeperDraftSchema = z
  .object({
    draft_id: z.string(),
    league_id: z.string().nullable().optional(),
    season: z.string().nullable().optional(),
    type: z.string().nullable().optional(),
    status: z.string().nullable().optional(),
    settings: UnknownRecord.nullable().optional(),
    metadata: UnknownRecord.nullable().optional()
  })
  .passthrough();

export const SleeperDraftPickSchema = z
  .object({
    draft_id: z.string().nullable().optional(),
    pick_no: z.number().nullable().optional(),
    round: z.number().nullable().optional(),
    roster_id: z.number().nullable().optional(),
    player_id: z.string().nullable().optional(),
    metadata: UnknownRecord.nullable().optional()
  })
  .passthrough();

export const SleeperNflStateSchema = z
  .object({
    season: z.string().nullable().optional(),
    season_type: z.string().nullable().optional(),
    week: z.number().nullable().optional(),
    display_week: z.number().nullable().optional(),
    league_season: z.string().nullable().optional(),
    league_create_season: z.string().nullable().optional(),
    previous_season: z.string().nullable().optional()
  })
  .passthrough();

export const SleeperPlayerSchema = z
  .object({
    player_id: z.string().nullable().optional(),
    full_name: z.string().nullable().optional(),
    first_name: z.string().nullable().optional(),
    last_name: z.string().nullable().optional(),
    search_full_name: z.string().nullable().optional(),
    position: z.string().nullable().optional(),
    fantasy_positions: z.array(z.string()).nullable().optional(),
    team: z.string().nullable().optional(),
    age: z.number().nullable().optional(),
    years_exp: z.number().nullable().optional(),
    active: z.boolean().nullable().optional(),
    injury_status: z.string().nullable().optional()
  })
  .passthrough();

export const SleeperPlayersSchema = z.record(SleeperPlayerSchema);

export const SleeperLeaguesSchema = z.array(SleeperLeagueSchema);
export const SleeperManagersSchema = z.array(SleeperManagerSchema);
export const SleeperRostersSchema = z.array(SleeperRosterSchema);
export const SleeperTransactionsSchema = z.array(SleeperTransactionSchema);
export const SleeperTradedPicksSchema = z.array(SleeperTradedPickSchema);
export const SleeperDraftsSchema = z.array(SleeperDraftSchema);
export const SleeperDraftPicksSchema = z.array(SleeperDraftPickSchema);

export type SleeperUserLookup = z.infer<typeof SleeperUserLookupSchema>;
export type SleeperLeague = z.infer<typeof SleeperLeagueSchema>;
export type SleeperManager = z.infer<typeof SleeperManagerSchema>;
export type SleeperRoster = z.infer<typeof SleeperRosterSchema>;
export type SleeperTransaction = z.infer<typeof SleeperTransactionSchema>;
export type SleeperTradedPick = z.infer<typeof SleeperTradedPickSchema>;
export type SleeperDraft = z.infer<typeof SleeperDraftSchema>;
export type SleeperDraftPick = z.infer<typeof SleeperDraftPickSchema>;
export type SleeperNflState = z.infer<typeof SleeperNflStateSchema>;
export type SleeperPlayer = z.infer<typeof SleeperPlayerSchema>;
export type SleeperPlayers = z.infer<typeof SleeperPlayersSchema>;
