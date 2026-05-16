export interface CounterOfferSet {
  currentOfferSummary: string;
  myLeverage: string;
  theirLikelyMotivation: string;
  conservativeCounter: string;
  fairCounter: string;
  ambitiousCounter: string;
  recommendedFirstOffer: string;
  walkAwayLine: string;
  pasteReadyMessage: string;
}

export function buildCounterOffers(input: {
  tradeDescription: string;
  assetsOut: string[];
  assetsIn: string[];
  managerName?: string | undefined;
  managerFitSummary?: string | undefined;
}): CounterOfferSet {
  const give = input.assetsOut.length > 0 ? input.assetsOut.join(", ") : "the assets I am sending";
  const receive = input.assetsIn.length > 0 ? input.assetsIn.join(", ") : "the assets I am receiving";
  const manager = input.managerName ?? "the other manager";

  return {
    currentOfferSummary: input.tradeDescription,
    myLeverage:
      "My leverage depends on whether I am giving up a scarce starter or the cleaner asset. Do not add value just to make the trade feel active.",
    theirLikelyMotivation:
      input.managerFitSummary ?? `${manager} needs a clear roster or timeline reason to prefer ${give} over ${receive}.`,
    conservativeCounter: `Keep the same core structure, but ask for a small add on top of ${receive} if ${give} is solving a real need.`,
    fairCounter: `Ask for the best version of the same deal: ${give} for ${receive}, plus the smallest pick or depth piece that offsets risk.`,
    ambitiousCounter: `Start by asking for ${receive} plus a meaningful future pick or upside player, then be ready to fall back if they engage.`,
    recommendedFirstOffer:
      "Lead with the fair counter unless the other manager has already shown urgency. It is firm enough to protect value without sounding unserious.",
    walkAwayLine:
      "Walk away if the deal creates a starting-lineup hole, forces you to pay for name value, or depends on optimistic projections on every incoming asset.",
    pasteReadyMessage:
      "I am interested, but I would need a little more coming back to cover the roster/risk gap. Would you be open to adding a small pick or upside piece?"
  };
}
