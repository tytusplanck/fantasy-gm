import type { ManagerFitResult } from "../analysis/managerFit.js";
import { isoNow } from "../utils/dates.js";

export function renderManagerReport(managerName: string, result: ManagerFitResult): string {
  return `# Manager Report: ${managerName}

- Generated: ${isoNow()}

## 1. Manager Summary

${result.summary}

## 2. Current Roster Needs

${result.currentRosterNeeds.map((item) => `- ${item}`).join("\n")}

## 3. Likely Motivations

${result.likelyMotivations.map((item) => `- ${item}`).join("\n")}

## 4. Known Tendencies

${result.knownTendencies.map((item) => `- ${item}`).join("\n")}

## 5. Evidence

${result.evidence.length > 0 ? result.evidence.map((item) => `- ${item}`).join("\n") : "- No direct evidence found."}

## 6. Confidence

${result.confidence}

## 7. Negotiation Angle

${result.negotiationAngle}

## 8. Players/Assets They May Value

${result.playersOrAssetsTheyMayValue.map((item) => `- ${item}`).join("\n")}

## 9. Players/Assets They May Be Willing To Move

${result.playersOrAssetsTheyMayBeWillingToMove.map((item) => `- ${item}`).join("\n")}

## Suggested Memory Updates

${result.suggestedMemoryUpdates.length > 0 ? result.suggestedMemoryUpdates.map((item) => `- ${item}`).join("\n") : "- No new durable manager note suggested."}

## Data Gaps

${result.dataGaps.length > 0 ? result.dataGaps.map((item) => `- ${item}`).join("\n") : "- No major gaps identified."}
`;
}
