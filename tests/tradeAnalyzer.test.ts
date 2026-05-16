import { describe, expect, it } from "vitest";
import { analyzeTrade, parseTradeDescription } from "../src/analysis/tradeAnalyzer.js";

describe("trade analyzer", () => {
  it("parses a basic give-for trade", () => {
    expect(parseTradeDescription("I give Player A and a 2026 2nd for Player B")).toEqual({
      assetsOut: ["Player A", "a 2026 2nd"],
      assetsIn: ["Player B"]
    });
  });

  it("keeps missing context visible as data gaps", () => {
    const result = analyzeTrade({
      tradeDescription: "I give Player A for Player B",
      leagueSettings: "",
      playerValues: "",
      playerNotes: "",
      managerTendencies: "",
      tradeHistory: "",
      strategy: ""
    });

    expect(result.recommendation).toBe("Explore");
    expect(result.dataGaps).toContain("No normalized Sleeper context found. Run pnpm sync:sleeper after configuring .env.");
  });
});
