import { describe, expect, it } from "vitest";
import { REQUIRED_APPROVAL_PHRASE, STATE_CHANGING_APPROVAL_TEMPLATE } from "../src/browser/observationTemplate.js";

describe("browser safety wording", () => {
  it("keeps the exact approval phrase", () => {
    expect(REQUIRED_APPROVAL_PHRASE).toBe("Approved: do exactly that.");
  });

  it("includes the required state-changing approval fields", () => {
    expect(STATE_CHANGING_APPROVAL_TEMPLATE).toContain("Proposed action:");
    expect(STATE_CHANGING_APPROVAL_TEMPLATE).toContain("- Platform:");
    expect(STATE_CHANGING_APPROVAL_TEMPLATE).toContain("- Exact page:");
    expect(STATE_CHANGING_APPROVAL_TEMPLATE).toContain("- Exact action:");
    expect(STATE_CHANGING_APPROVAL_TEMPLATE).toContain("- Assets/players/settings affected:");
    expect(STATE_CHANGING_APPROVAL_TEMPLATE).toContain("- Irreversible or risky consequences:");
    expect(STATE_CHANGING_APPROVAL_TEMPLATE).toContain("- Why this action is recommended:");
  });
});
