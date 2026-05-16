import type { NormalizedLeagueContext } from "../sleeper/normalize.js";
import { describePickValue } from "./pickValue.js";
import { summarizeOtherRosterFit, summarizeRosterFit } from "./rosterFit.js";
import { analyzeManagerFit } from "./managerFit.js";
import { buildCounterOffers, type CounterOfferSet } from "./counterOffers.js";

export type TradeRecommendation = "Accept" | "Decline" | "Counter" | "Explore" | "Hold";
export type Confidence = "Low" | "Medium" | "High";

export interface ParsedTrade {
  assetsOut: string[];
  assetsIn: string[];
}

export interface TradeAnalysisInput {
  tradeDescription: string;
  otherManagerName?: string | undefined;
  leagueSettings: string;
  playerValues: string;
  playerNotes: string;
  managerTendencies: string;
  tradeHistory: string;
  strategy: string;
  context?: NormalizedLeagueContext | undefined;
}

export interface TradeAnalysisResult {
  tradeDescription: string;
  parsedTrade: ParsedTrade;
  recommendation: TradeRecommendation;
  confidence: Confidence;
  simpleVerdict: string;
  valueAnalysis: string;
  myRosterImpact: string;
  otherRosterImpact: string;
  riskAnalysis: string;
  negotiationAngle: string;
  suggestedCounteroffers: CounterOfferSet;
  pasteReadyMessage: string;
  whatWouldChangeMyMind: string[];
  dataGaps: string[];
}

export function analyzeTrade(input: TradeAnalysisInput): TradeAnalysisResult {
  const parsedTrade = parseTradeDescription(input.tradeDescription);
  const dataGaps = collectDataGaps(input, parsedTrade);
  const managerFit = analyzeManagerFit({
    managerName: input.otherManagerName,
    context: input.context,
    managerTendencies: input.managerTendencies,
    assetsTheyReceive: parsedTrade.assetsOut
  });
  const counterOffers = buildCounterOffers({
    tradeDescription: input.tradeDescription,
    assetsOut: parsedTrade.assetsOut,
    assetsIn: parsedTrade.assetsIn,
    managerName: input.otherManagerName,
    managerFitSummary: managerFit.summary
  });
  const recommendation = dataGaps.length > 2 ? "Explore" : "Counter";
  const confidence: Confidence = dataGaps.length > 2 ? "Low" : "Medium";

  return {
    tradeDescription: input.tradeDescription,
    parsedTrade,
    recommendation,
    confidence,
    simpleVerdict:
      recommendation === "Explore"
        ? "Do not accept or reject from this skeleton read alone. Tighten the league, roster, and market context first."
        : "This is negotiable, but the first move should be protecting downside and asking for value where risk is being transferred.",
    valueAnalysis: buildValueAnalysis(input, parsedTrade),
    myRosterImpact: summarizeRosterFit(input.context, parsedTrade.assetsOut, parsedTrade.assetsIn),
    otherRosterImpact: summarizeOtherRosterFit(input.context, input.otherManagerName, parsedTrade.assetsOut, parsedTrade.assetsIn),
    riskAnalysis:
      "Main risks: overpaying for name value, creating a starting-lineup hole, underrating positional scarcity, and assuming the other manager values assets the same way you do.",
    negotiationAngle: managerFit.negotiationAngle,
    suggestedCounteroffers: counterOffers,
    pasteReadyMessage: counterOffers.pasteReadyMessage,
    whatWouldChangeMyMind: [
      "A confirmed league format or scoring setting changes positional value.",
      "The other manager has a documented roster need or tendency that makes the offer more realistic.",
      "Manual player values or external rankings show a clear tier gap.",
      "The deal materially improves my starting lineup without creating a harder hole."
    ],
    dataGaps
  };
}

export function parseTradeDescription(description: string): ParsedTrade {
  const normalized = description.replace(/\s+/g, " ").trim();
  const patterns = [
    /\b(?:i|we)\s+(?:give|send|trade)\s+(?<out>.+?)\s+(?:for|to get|to receive)\s+(?<in>.+)$/i,
    /\b(?:receive|get)\s+(?<in>.+?)\s+(?:for|and give|while giving)\s+(?<out>.+)$/i,
    /(?<out>.+?)\s+for\s+(?<in>.+)$/i
  ];

  for (const pattern of patterns) {
    const match = normalized.match(pattern);
    const out = match?.groups?.out;
    const incoming = match?.groups?.in;
    if (out && incoming) {
      return {
        assetsOut: splitAssets(out),
        assetsIn: splitAssets(incoming)
      };
    }
  }

  return {
    assetsOut: [],
    assetsIn: []
  };
}

function splitAssets(value: string): string[] {
  return value
    .split(/,|\+| and /i)
    .map((asset) => asset.trim())
    .filter(Boolean);
}

function buildValueAnalysis(input: TradeAnalysisInput, parsedTrade: ParsedTrade): string {
  const outgoing = parsedTrade.assetsOut.length > 0 ? parsedTrade.assetsOut : ["unknown outgoing assets"];
  const incoming = parsedTrade.assetsIn.length > 0 ? parsedTrade.assetsIn : ["unknown incoming assets"];
  const pickNotes = [...outgoing, ...incoming]
    .map((asset) => {
      const pickValue = describePickValue(asset);
      return pickValue === "not a clear rookie-pick asset" ? undefined : `${asset}: ${pickValue}`;
    })
    .filter((line): line is string => Boolean(line));
  const memoryHits = [...outgoing, ...incoming].filter((asset) =>
    [input.playerValues, input.playerNotes, input.tradeHistory].join("\n").toLowerCase().includes(asset.toLowerCase())
  );

  return [
    `Outgoing: ${outgoing.join(", ")}.`,
    `Incoming: ${incoming.join(", ")}.`,
    pickNotes.length > 0 ? `Pick context: ${pickNotes.join("; ")}.` : "No rookie-pick assets were confidently detected.",
    memoryHits.length > 0
      ? `Found local memory references for: ${memoryHits.join(", ")}. Use those before generic market assumptions.`
      : "No direct local memory hits found for the named assets, so market confidence is limited.",
    "This analyzer is intentionally explainable, not a projection engine."
  ].join(" ");
}

function collectDataGaps(input: TradeAnalysisInput, parsedTrade: ParsedTrade): string[] {
  const gaps: string[] = [];
  if (parsedTrade.assetsOut.length === 0 || parsedTrade.assetsIn.length === 0) {
    gaps.push("Could not confidently parse which assets I give and receive.");
  }
  if (!input.leagueSettings.toLowerCase().includes("dynasty") && !input.leagueSettings.toLowerCase().includes("keeper") && !input.leagueSettings.toLowerCase().includes("redraft")) {
    gaps.push("League type is not clearly documented.");
  }
  if (!input.context) {
    gaps.push("No normalized Sleeper context found. Run pnpm sync:sleeper after configuring .env.");
  }
  if (!input.context?.myRoster) {
    gaps.push("My roster is not identified in Sleeper context or memory.");
  }
  if (!input.otherManagerName) {
    gaps.push("Other manager was not supplied, so acceptance realism is limited.");
  }
  return gaps;
}
