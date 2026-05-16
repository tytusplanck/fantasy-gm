import type { ManagerFitResult } from "../analysis/managerFit.js";
import { isoNow } from "../utils/dates.js";

export function renderManagerReport(managerName: string, result: ManagerFitResult): string {
  return `# Manager Report: ${managerName}

- Generated: ${isoNow()}

## 1. Manager Summary

${result.summary}

## 2. Current Roster Needs

Not enough structured context yet. Use normalized Sleeper rosters plus manager tendencies to fill this in.

## 3. Likely Motivations

Likely motivation should be inferred from roster build, standings, injuries, and prior trades.

## 4. Known Tendencies

Review \`data/memory/manager-tendencies.md\`.

## 5. Evidence

${result.evidence.length > 0 ? result.evidence.map((item) => `- ${item}`).join("\n") : "- No direct evidence found."}

## 6. Confidence

${result.confidence}

## 7. Negotiation Angle

${result.negotiationAngle}

## 8. Players/Assets They May Value

Unknown until roster and tendency context are reviewed.

## 9. Players/Assets They May Be Willing To Move

Unknown until roster and tendency context are reviewed.
`;
}
