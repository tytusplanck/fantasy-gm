import type { PlayerValueResult } from "../analysis/playerValue.js";
import { isoNow } from "../utils/dates.js";

export function renderPlayerValueReport(result: PlayerValueResult): string {
  return `# Player Value Report: ${result.playerName}

- Generated: ${isoNow()}

## 1. Current Value Tier

${result.currentValueTier}

## 2. Direction

${result.direction}

## 3. Best Use

${result.bestUse}

## 4. Format Notes

${result.formatNotes}

## 5. Risk Profile

${result.riskProfile}

## 6. Comparable Players

${result.comparablePlayers.map((item) => `- ${item}`).join("\n")}

## 7. Trade Targets Above And Below

${result.tradeTargetsAboveAndBelow}

## 8. What I Would Pay

${result.whatIWouldPay}

## 9. What I Would Sell For

${result.whatIWouldSellFor}

## 10. Notes To Save

${result.notesToSave.length > 0 ? result.notesToSave.map((item) => `- ${item}`).join("\n") : "- No new durable note suggested."}

## Data Gaps

${result.dataGaps.length > 0 ? result.dataGaps.map((item) => `- ${item}`).join("\n") : "- No major gaps identified by the skeleton evaluator."}
`;
}
