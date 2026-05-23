import { describe, expect, it } from "vitest";
import { analyzeManagerFit } from "../src/analysis/managerFit.js";
import type { NormalizedLeagueContext } from "../src/sleeper/normalize.js";

describe("analyzeManagerFit", () => {
  it("builds manager report sections from roster shape and tendency memory", () => {
    const context: NormalizedLeagueContext = {
      fetchedAt: "2026-05-23T00:00:00.000Z",
      league: {
        leagueId: "league-1",
        name: "Test League",
        season: "2026",
        status: "pre_draft",
        totalRosters: 2,
        rosterPositions: ["QB", "RB", "RB", "WR", "WR", "WR", "TE", "FLEX", "FLEX", "BN"],
        scoringSettings: { bonus_rec_te: 0 },
        settings: {}
      },
      nflState: { season: "2026", week: 1 },
      managers: [],
      rosters: [
        {
          rosterId: 2,
          ownerId: "user-2",
          managerName: "Sam",
          teamName: "Sam Team",
          starters: [
            { id: "rb1", name: "RB One", position: "RB", team: "FA", age: 25, injuryStatus: null },
            { id: "wr1", name: "WR One", position: "WR", team: "FA", age: 24, injuryStatus: null }
          ],
          players: [
            { id: "qb1", name: "QB One", position: "QB", team: "FA", age: 27, injuryStatus: null },
            { id: "rb1", name: "RB One", position: "RB", team: "FA", age: 25, injuryStatus: null },
            { id: "rb2", name: "RB Two", position: "RB", team: "FA", age: 26, injuryStatus: null },
            { id: "wr1", name: "WR One", position: "WR", team: "FA", age: 24, injuryStatus: null },
            { id: "wr2", name: "WR Two", position: "WR", team: "FA", age: 24, injuryStatus: null },
            { id: "wr3", name: "WR Three", position: "WR", team: "FA", age: 23, injuryStatus: null },
            { id: "wr4", name: "WR Four", position: "WR", team: "FA", age: 22, injuryStatus: null },
            { id: "te1", name: "TE One", position: "TE", team: "FA", age: 28, injuryStatus: null }
          ],
          reserve: [],
          taxi: [],
          settings: {}
        }
      ],
      myRoster: null,
      transactions: [],
      tradedPicks: [],
      drafts: [],
      generatedNotes: []
    };

    const result = analyzeManagerFit({
      managerName: "Sam",
      context,
      managerTendencies: "### 2026-05-16 - Sam\n\n- Manager: Sam\n- Tendency: Overvalues rookie picks.\n- Confidence: Medium",
      assetsTheyReceive: ["Running Back A"]
    });

    expect(result.confidence).toBe("Medium");
    expect(result.currentRosterNeeds.join(" ")).toContain("RB depth");
    expect(result.knownTendencies.join(" ")).toContain("Overvalues rookie picks");
    expect(result.playersOrAssetsTheyMayValue.join(" ")).toContain("Running Back A");
  });
});
