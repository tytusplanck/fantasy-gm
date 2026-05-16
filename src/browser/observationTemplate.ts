import { dateStamp } from "../utils/dates.js";

export const REQUIRED_APPROVAL_PHRASE = "Approved: do exactly that.";

export const STATE_CHANGING_APPROVAL_TEMPLATE = `Proposed action:
- Platform:
- Exact page:
- Exact action:
- Assets/players/settings affected:
- Irreversible or risky consequences:
- Why this action is recommended:`;

export function renderBrowserObservation(input: {
  date?: string;
  platform: string;
  page: string;
  observed: string;
  confidence: "Low" | "Medium" | "High";
  apiDerivedEquivalentAvailable: "Yes" | "No" | "Unknown";
  screenshotPath?: string;
}): string {
  return `- Date: ${input.date ?? dateStamp()}
- Platform: ${input.platform}
- Page name or URL: ${input.page}
- Observed: ${input.observed}
- Confidence: ${input.confidence}
- Source: UI-observed
- API-derived equivalent available: ${input.apiDerivedEquivalentAvailable}
- Screenshot path: ${input.screenshotPath ?? ""}
`;
}
