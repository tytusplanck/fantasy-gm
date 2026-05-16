import { describe, expect, it } from "vitest";
import { evaluatePlayerValue } from "../src/analysis/playerValue.js";

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
});
