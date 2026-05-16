import { z } from "zod";
import {
  SleeperDraftPicksSchema,
  SleeperDraftsSchema,
  SleeperLeagueSchema,
  SleeperLeaguesSchema,
  SleeperManagersSchema,
  SleeperNflStateSchema,
  SleeperPlayersSchema,
  SleeperRostersSchema,
  SleeperTradedPicksSchema,
  SleeperTransactionsSchema,
  SleeperUserLookupSchema,
  type SleeperDraft,
  type SleeperDraftPick,
  type SleeperLeague,
  type SleeperManager,
  type SleeperNflState,
  type SleeperPlayers,
  type SleeperRoster,
  type SleeperTradedPick,
  type SleeperTransaction,
  type SleeperUserLookup
} from "./schemas.js";

export class SleeperClient {
  private readonly baseUrl: string;
  private readonly rateLimitMs: number;
  private lastRequestAt = 0;

  constructor(options: { baseUrl?: string; rateLimitMs?: number } = {}) {
    this.baseUrl = options.baseUrl ?? "https://api.sleeper.app/v1";
    this.rateLimitMs = options.rateLimitMs ?? 250;
  }

  async getUserByUsername(username: string): Promise<SleeperUserLookup> {
    return this.get(`/user/${encodeURIComponent(username)}`, SleeperUserLookupSchema);
  }

  async getUserById(userId: string): Promise<SleeperUserLookup> {
    return this.get(`/user/${encodeURIComponent(userId)}`, SleeperUserLookupSchema);
  }

  async getLeaguesForUser(userId: string, season: string): Promise<SleeperLeague[]> {
    return this.get(`/user/${encodeURIComponent(userId)}/leagues/nfl/${encodeURIComponent(season)}`, SleeperLeaguesSchema);
  }

  async getLeague(leagueId: string): Promise<SleeperLeague> {
    return this.get(`/league/${encodeURIComponent(leagueId)}`, SleeperLeagueSchema);
  }

  async getLeagueUsers(leagueId: string): Promise<SleeperManager[]> {
    return this.get(`/league/${encodeURIComponent(leagueId)}/users`, SleeperManagersSchema);
  }

  async getRosters(leagueId: string): Promise<SleeperRoster[]> {
    return this.get(`/league/${encodeURIComponent(leagueId)}/rosters`, SleeperRostersSchema);
  }

  async getTransactions(leagueId: string, week: number): Promise<SleeperTransaction[]> {
    return this.get(`/league/${encodeURIComponent(leagueId)}/transactions/${week}`, SleeperTransactionsSchema);
  }

  async getTradedPicks(leagueId: string): Promise<SleeperTradedPick[]> {
    return this.get(`/league/${encodeURIComponent(leagueId)}/traded_picks`, SleeperTradedPicksSchema);
  }

  async getDrafts(leagueId: string): Promise<SleeperDraft[]> {
    return this.get(`/league/${encodeURIComponent(leagueId)}/drafts`, SleeperDraftsSchema);
  }

  async getDraftPicks(draftId: string): Promise<SleeperDraftPick[]> {
    return this.get(`/draft/${encodeURIComponent(draftId)}/picks`, SleeperDraftPicksSchema);
  }

  async getNflState(): Promise<SleeperNflState> {
    return this.get("/state/nfl", SleeperNflStateSchema);
  }

  async getPlayers(): Promise<SleeperPlayers> {
    return this.get("/players/nfl", SleeperPlayersSchema);
  }

  private async get<T>(path: string, schema: z.ZodType<T>): Promise<T> {
    await this.waitForRateLimit();
    const response = await fetch(`${this.baseUrl}${path}`, {
      headers: {
        Accept: "application/json",
        "User-Agent": "fantasy-gm-local-first"
      }
    });
    this.lastRequestAt = Date.now();

    if (!response.ok) {
      throw new Error(`Sleeper API ${response.status} ${response.statusText} for ${path}`);
    }

    const json = (await response.json()) as unknown;
    return schema.parse(json);
  }

  private async waitForRateLimit(): Promise<void> {
    const elapsed = Date.now() - this.lastRequestAt;
    if (elapsed >= this.rateLimitMs) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, this.rateLimitMs - elapsed));
  }
}
