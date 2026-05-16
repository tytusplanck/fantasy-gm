import { describe, expect, it } from "vitest";
import { normalizeSleeperData, type SleeperRawSyncBundle } from "../src/sleeper/normalize.js";

describe("normalizeSleeperData", () => {
  it("identifies my roster and attaches player names", () => {
    const bundle: SleeperRawSyncBundle = {
      fetchedAt: "2026-05-16T00:00:00.000Z",
      nflState: { season: "2026", week: 1 },
      league: {
        league_id: "league-1",
        name: "Test League",
        season: "2026",
        roster_positions: ["QB", "RB", "WR", "FLEX"],
        scoring_settings: {},
        settings: {}
      },
      managers: [{ user_id: "user-1", display_name: "Me", metadata: { team_name: "My Team" } }],
      rosters: [{ roster_id: 1, owner_id: "user-1", players: ["p1"], starters: ["p1"], settings: {} }],
      transactionsByWeek: { "1": [] },
      tradedPicks: [],
      drafts: [],
      draftPicksByDraftId: {},
      players: {
        p1: { player_id: "p1", full_name: "Example Player", position: "WR", team: "CIN", age: 25 }
      }
    };

    const normalized = normalizeSleeperData(bundle, { myUserId: "user-1" });

    expect(normalized.myRoster?.teamName).toBe("My Team");
    expect(normalized.myRoster?.players[0]?.name).toBe("Example Player");
    expect(normalized.league.rosterPositions).toEqual(["QB", "RB", "WR", "FLEX"]);
  });
});
