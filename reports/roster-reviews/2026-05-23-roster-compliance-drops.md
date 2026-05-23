# 2026-05-23 Roster Compliance Drop Review

## Recommendation

Drop, in order:

1. Mack Hollins
2. Marquez Valdes-Scantling
3. Noah Gray

First alternate: Zamir White, especially if he remains a free agent at the compliance deadline. Second alternate: Calvin Austin III.

No Sleeper action was taken.

## Known Facts

- League: Living Big Fantasy Football League, 12-team dynasty, 1QB, half-PPR, no TE premium.
- Current Sleeper status: pre-draft.
- Refreshed API snapshot: `data/sleeper/normalized/latest-league-context.json`, fetched 2026-05-23.
- Updated active roster structure: QB, RB, RB, WR, WR, WR, TE, FLEX, FLEX, plus 13 bench.
- Active roster max is now 22. Drumheads has 25 active players and 4 taxi players, so three active spots need to come off unless a legal taxi move reduces the active count.
- Taxi remains 5 slots. Current taxi: Isaiah Davis, Javon Baker, Jaylin Noel, Phil Mafah.
- IR/reserve is empty.

## League Context

The rules update reduces the margin for bench stashes. The prior setup supported more speculative bench depth; the new setup is tighter:

- One fewer active roster slot than the previous local memory note.
- Fewer flex spots, which reduces the weekly use case for marginal RB/WR/TE depth.
- One extra required WR spot, which means I would rather keep plausible WR depth over a fourth non-premium TE.

The current active roster has 2 QB, 9 RB, 10 WR, and 4 TE. In a non-TE-premium league with Sam LaPorta, David Njoku, and Juwan Johnson already rostered, TE4 is a low-value luxury.

## API-Derived Data

Sleeper metadata flags these three as weak active-roster holds:

- Mack Hollins: age 32, NE WR, depth-chart order 5, Sleeper search rank 999.
- Marquez Valdes-Scantling: age 31, DAL WR, depth-chart order 4, Sleeper search rank 999.
- Noah Gray: age 27, KC TE, depth-chart order 2, Sleeper search rank 999.

Zamir White is also weak by API context: age 26, free agent, no depth-chart role, Sleeper search rank 388. The reason he is not in the top three is roster construction: this team is thinner at usable RB than TE, and low-end RBs can gain emergency value faster than TE4s in a non-premium format.

## Market And Ranking Checks

Sources used:

- FantasyPros 2026 dynasty overall and positional rankings: https://www.fantasypros.com/nfl/rankings/dynasty-overall
- FantasyPros 2026 dynasty WR rankings: https://www.fantasypros.com/nfl/rankings/dynasty-wr.php
- FantasyPros 2026 dynasty TE rankings: https://www.fantasypros.com/nfl/rankings/dynasty-te.php
- KeepTradeCut dynasty rankings and player profiles: https://keeptradecut.com/dynasty-rankings
- Dynasty Nerds player pages for low-end profile cross-checks: https://www.dynastynerds.com/

Relevant market notes:

- FantasyPros has Marquez Valdes-Scantling down around WR196/WR201 territory depending page view, with several experts not ranking him.
- FantasyPros has Noah Gray around TE54-TE56 and outside the top 370 overall.
- FantasyPros has Calvin Austin III around WR126 and around 357 overall, which is weak but still slightly more useful than MVS by age/profile.
- FantasyPros has Juwan Johnson around TE22, which makes him a clear hold over Noah Gray.
- FantasyPros has Stefon Diggs around WR73 and overall 169 in the dynasty overall page, despite age and falling value.
- KeepTradeCut has Mack Hollins as a very low-end dynasty asset, around WR150 and overall 397.
- KeepTradeCut has Zamir White around RB133 and overall 495, making him the most fragile non-cut on the roster.
- KeepTradeCut has Justice Hill around RB92 and overall 371, which is not exciting but is materially more useful than the pure roster-clogger tier.

## Player-By-Player Drop Logic

### 1. Mack Hollins

This is the easiest drop. He is an older receiver with no durable dynasty value, no meaningful roster leverage, and no realistic path to become a weekly starter on this roster. Even if he has a temporary real-life role, he is the kind of player who becomes replaceable immediately when waivers reopen after other teams cut down.

What could go wrong: he could have a short-term touchdown or injury-driven role, especially if New England's WR room narrows. That is not enough reason to preserve him over younger or more scarce depth.

### 2. Marquez Valdes-Scantling

MVS is also a clean cut. He is older, volatile, and role-dependent. His best-case outcome is spike-week WR depth, but the updated roster size punishes players who cannot be forecast into stable weekly usage. FantasyPros and Dynasty Nerds both treat him as deep-fringe or worse.

What could go wrong: he can still hit a long touchdown and briefly look relevant. That is a bad bet to hold through a compliance crunch because his production is hard to predict and his trade market is tiny.

### 3. Noah Gray

Noah Gray is the correct third cut because of team fit, not because he is the worst player in a vacuum. In a TE premium league I would be more cautious. This is not TE premium, and the roster already has LaPorta, Njoku, and Juwan Johnson. Gray's market is low-end TE depth, and that is replaceable.

What could go wrong: if Travis Kelce or another KC pass-game piece exits and Gray becomes the full-time receiving TE, his value could pop. The market is still saying that path is not strong enough to protect him as TE4 on a cutdown roster.

## Hold Over The Cuts

- Stefon Diggs: old and falling, but still has recognizable market value and a better chance to matter in a 3-WR lineup than Hollins/MVS. Shop before cutting.
- Tyler Lockett: aging and fragile, but still a more credible one-season WR bet than Hollins/MVS. He is a fourth/fifth cut candidate if another move is needed.
- Juwan Johnson: hold. TE22-type market value and a top depth TE on this roster.
- David Njoku: hold or trade from strength, not a cut.
- Zamir White: very fragile, but I would keep the RB lottery ticket over TE4 unless he remains unsigned or you prefer reducing RB clutter.
- Justice Hill/Jaleel McLaughlin: ugly dynasty profiles, but RB scarcity makes them more useful than dead-end WR/TE depth.
- Calvin Austin III: weak hold. He is closer to the line than I would like, but still a better profile than MVS/Hollins and more useful to a 3-WR lineup than Noah Gray.

## Trade And Negotiation Angle

Trade leverage is poor because several other teams are also over the new 22-active limit. That means fringe veterans are not likely to return much, and waiting too long could leave only drops.

Before cutting, it is still worth trying one fast message:

> I need to trim after the roster change. Hollins, MVS, Noah Gray, Zamir, or Lockett are available for any future pick swap or late pick. Not looking for much, just checking before I cut down.

Best realistic return: a future 5th, a small pick-upgrade, or moving two cut candidates for one slightly better dart. I would not spend time trying to squeeze value if the deadline is close.

## Final Ranking

1. Mack Hollins - drop.
2. Marquez Valdes-Scantling - drop.
3. Noah Gray - drop.
4. Zamir White - first alternate.
5. Calvin Austin III - second alternate.
6. Tyler Lockett - aging emergency cut only if more space is needed.

## Data Gaps

- Exact league compliance deadline was not available in the local API snapshot.
- I did not use browser automation to inspect Sleeper UI-only notices or commissioner chat.
- I did not execute any Sleeper roster move.
- If taxi eligibility allows moving Emeka Egbuka or another active rookie to the open taxi slot, the number of actual drops could fall from three to two. That would be a state-changing roster action and should be confirmed manually before acting.
