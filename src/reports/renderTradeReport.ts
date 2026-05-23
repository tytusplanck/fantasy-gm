import type { TradeAnalysisResult } from "../analysis/tradeAnalyzer.js";
import { isoNow } from "../utils/dates.js";

export function renderTradeReport(result: TradeAnalysisResult): string {
  return `# Trade Report

- Generated: ${isoNow()}
- Trade: ${result.tradeDescription}

## 1. Recommendation

${result.recommendation}

## 2. Confidence

${result.confidence}

## 3. Simple Verdict

${result.simpleVerdict}

## 4. Value Analysis

${result.valueAnalysis}

## 5. Roster Impact For My Team

${result.myRosterImpact}

## 6. Roster Impact For The Other Team

${result.otherRosterImpact}

## 7. Risk Analysis

${result.riskAnalysis}

## 8. Negotiation Angle

${result.negotiationAngle}

## 9. Suggested Counteroffers

### Conservative Counter

${result.suggestedCounteroffers.conservativeCounter}

### Fair Counter

${result.suggestedCounteroffers.fairCounter}

### Ambitious Counter

${result.suggestedCounteroffers.ambitiousCounter}

### Recommended First Offer

${result.suggestedCounteroffers.recommendedFirstOffer}

### Walk-Away Line

${result.suggestedCounteroffers.walkAwayLine}

## 10. Paste-Ready Message

${result.pasteReadyMessage}

## 11. What Would Change My Mind

${result.whatWouldChangeMyMind.map((item) => `- ${item}`).join("\n")}

## 12. Data Gaps

${result.dataGaps.length > 0 ? result.dataGaps.map((item) => `- ${item}`).join("\n") : "- No major gaps identified by the skeleton analyzer."}

## Suggested Memory Updates

${result.suggestedMemoryUpdates.length > 0 ? result.suggestedMemoryUpdates.map((item) => `- ${item}`).join("\n") : "- No new durable note suggested."}
`;
}
