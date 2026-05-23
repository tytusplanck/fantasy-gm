import { describe, expect, it } from "vitest";
import { buildMemoryEntry, resolveMemoryTarget } from "../src/cli/updateMemory.js";

describe("memory update helpers", () => {
  it("routes manager tendency notes to manager memory", () => {
    expect(resolveMemoryTarget("Sam tends to overvalue rookies")).toBe("manager-tendencies");
  });

  it("uses the manager tendency template for manager memory", () => {
    const entry = buildMemoryEntry({
      note: "Sam tends to overvalue rookies.",
      source: "User note",
      date: "2026-05-16",
      target: "manager-tendencies",
      manager: "Sam",
      evidence: "Two rookie-overpay offers after the NFL draft.",
      confidence: "Medium"
    });

    expect(entry).toContain("### 2026-05-16 - Sam");
    expect(entry).toContain("- Manager: Sam");
    expect(entry).toContain("- Tendency: Sam tends to overvalue rookies.");
    expect(entry).toContain("- Evidence: Two rookie-overpay offers after the NFL draft.");
    expect(entry).toContain("- Confidence: Medium");
    expect(entry).toContain("- Source: User note");
  });

  it("uses the player value template for player value memory", () => {
    const entry = buildMemoryEntry({
      note: "Worth more than a single late 2nd in this format.",
      source: "Analysis",
      date: "2026-05-16",
      target: "player-values",
      player: "David Montgomery",
      position: "RB",
      team: "DET",
      valueTier: "Useful starter",
      direction: "Volatile"
    });

    expect(entry).toContain("### 2026-05-16 - David Montgomery");
    expect(entry).toContain("- Player: David Montgomery");
    expect(entry).toContain("- Position: RB");
    expect(entry).toContain("- NFL team: DET");
    expect(entry).toContain("- Value tier: Useful starter");
    expect(entry).toContain("- Direction: Volatile");
    expect(entry).toContain("- Note: Worth more than a single late 2nd in this format.");
  });
});
