import { describe, expect, it } from "vitest";
import { evaluatePlayerValue, findRelevantPlayerText } from "../src/analysis/playerValue.js";

describe("evaluatePlayerValue", () => {
  it("does not treat generic strategy text as player-specific valuation evidence", () => {
    const result = evaluatePlayerValue({
      playerName: "Player A",
      leagueSettings: "Dynasty superflex",
      playerValues: "",
      playerNotes: "",
      strategy: "Avoid overpaying for replaceable production.",
      externalRankings: ""
    });

    expect(result.bestUse).toBe("Hold");
    expect(result.currentValueTier).toBe("Unknown / needs market check");
  });

  it("uses the full player memory block, not just the matching player-name line", () => {
    const text = `# Player Values

### 2026-05-16 - David Montgomery

- Date: 2026-05-16
- Player: David Montgomery
- Position: RB
- Value tier: Current starter/flex RB production piece
- Direction: Volatile
- Note: 2026 2.08 alone is light.`;

    expect(findRelevantPlayerText("David Montgomery", [text])).toContain("Value tier: Current starter/flex");

    const result = evaluatePlayerValue({
      playerName: "David Montgomery",
      leagueSettings: "12-team 1QB half-PPR dynasty",
      playerValues: text,
      playerNotes: "",
      strategy: "",
      externalRankings: "",
      position: "RB"
    });

    expect(result.currentValueTier).toBe("Useful starter");
    expect(result.direction).toBe("Volatile");
    expect(result.bestUse).toBe("Shop quietly");
    expect(result.dataGaps).not.toContain("No player-specific memory or external ranking note found.");
  });

  it("does not infer Sell from incidental words like selling", () => {
    const result = evaluatePlayerValue({
      playerName: "David Montgomery",
      leagueSettings: "12-team 1QB half-PPR dynasty",
      playerValues: "- Player: David Montgomery\n- Value tier: Current starter/flex RB production piece\n- Direction: Volatile\n- Note: Hold unless intentionally selling aging production.",
      playerNotes: "",
      strategy: "",
      externalRankings: "",
      position: "RB"
    });

    expect(result.bestUse).toBe("Shop quietly");
  });
});
