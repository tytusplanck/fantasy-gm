import { describe, expect, it } from "vitest";
import { buildMemoryEntry, resolveMemoryTarget } from "../src/cli/updateMemory.js";

describe("memory update helpers", () => {
  it("routes manager tendency notes to manager memory", () => {
    expect(resolveMemoryTarget("Sam tends to overvalue rookies")).toBe("manager-tendencies");
  });

  it("preserves history as an appended dated entry", () => {
    const entry = buildMemoryEntry({
      note: "Sam tends to overvalue rookies.",
      source: "User note",
      date: "2026-05-16",
      target: "manager-tendencies",
      manager: "Sam"
    });

    expect(entry).toContain("## 2026-05-16");
    expect(entry).toContain("- Manager: Sam");
    expect(entry).toContain("- Source: User note");
    expect(entry).toContain("- Note: Sam tends to overvalue rookies.");
  });
});
