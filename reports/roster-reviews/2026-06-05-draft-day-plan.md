# 2026-06-05 Draft Day Plan

## Live State - 2026-06-06

Latest read used direct Sleeper API calls because the full repo sync could not write a snapshot with the filesystem at 100% capacity. No Sleeper action was taken.

Current draft state:

1. 1.01 Bigpat54 - Jeremiyah Love, RB ARI
2. 1.02 bschermerhorn - Carnell Tate, WR TEN
3. 1.03 WillyTime - Jordyn Tyson, WR NO
4. 1.04 tomplanck - Jadarian Price, RB SEA
5. 1.05 stevensonbrody224 - Makai Lemon, WR PHI
6. 1.06 kevinschraff - KC Concepcion, WR CLE
7. 1.07 tytusplanck - Omar Cooper Jr., WR NYJ

Current pick: 1.08, storerka's original pick, owned by Bigpat54.

Drumheads current state: 1.07 is resolved. Remaining picks are 2.07, 3.07, 4.07, and 5.07. The live roster endpoint still shows 22 active players and 3 taxi players, with Isaiah Davis, Jaylin Noel, and Phil Mafah on taxi. Omar Cooper Jr. is visible in the draft-pick endpoint but not yet in the roster endpoint while the draft is ongoing. With 2 open taxi slots, Drumheads can currently taxi Cooper plus one more rookie without clearing another taxi slot.

Current strategy: do not treat late 2026 second-round picks as strong compensation in this class. At 2.07, prefer a RB/WR with a real path, or use the pick as liquidity for a future 2nd/player if the board is flat.

## Snapshot

This section is the original 2026-06-05 snapshot. The `Live State - 2026-06-06` section above supersedes it where draft status or roster/taxi state differs.

- League: Living Big Fantasy Football League, 12-team 1QB half-PPR dynasty.
- Roster rules: QB, RB, RB, WR, WR, WR, TE, FLEX, FLEX, 13 bench, 5 taxi, 5 IR, no superflex, no TE premium.
- Sleeper state: `drafting` as of the 2026-06-05 20:37 UTC sync.
- Picks made: 1.01 Jeremiyah Love, 1.02 Carnell Tate, 1.03 Jordyn Tyson.
- Current pick state: 1.04 tomplanck is on the clock in the latest API snapshot.
- Drumheads picks: 1.07, 2.07, 3.07, 4.07, 5.07.
- Traded pick note: Bigpat54 owns storerka's original 1.08 and also owns extra 2026 2nds.
- No Sleeper action was taken.

## Current Draft Status

Latest Sleeper API sync: `data/sleeper/normalized/2026-06-05T20-37-40-460Z--league-context.json`.

Picks made:

1. 1.01 Bigpat54 - Jeremiyah Love, RB ARI
2. 1.02 bschermerhorn - Carnell Tate, WR TEN
3. 1.03 WillyTime - Jordyn Tyson, WR NO

Still before Drumheads:

1. 1.04 tomplanck
2. 1.05 stevensonbrody224
3. 1.06 kevinschraff
4. 1.07 tytusplanck

Current simple board for 1.07: Jadarian Price, Makai Lemon, KC Concepcion, then trade back. If all three are gone, Omar Cooper Jr. is the preferred forced pick over Kenyon Sadiq or Fernando Mendoza.

## Roster Moves Since 17:09 UTC Snapshot

- Drumheads dropped Javon Baker from the roster/taxi. Current normalized count is 25 total listed players, including 3 taxi players, which implies 22 active players and 2 open taxi slots.
- kevinschraff dropped DeAndre Hopkins.
- bschermerhorn dropped Ben Sinnott, Curtis Samuel, George Holani, Hassan Haskins, Jonathan Mingo, Ty Chandler, and Zavier Scott. Reserve/taxi records also changed for Austin Ekeler, Curtis Samuel, George Holani, Kendre Miller, and Ben Sinnott.
- kevinschraff and bschermerhorn also filled previously empty starter slots in the API lineup view.

Practical impact: Drumheads has a little more taxi flexibility after dropping Baker, but the active roster remains tight. Draft picks after the first two or three selections still need to beat replaceable depth or be taxi-eligible.

## Team Read

Drumheads is a playoff-capable dynasty team, not a full rebuild and not a blank-check all-in roster. The 2026 draft should add either a real weekly-upside RB or a young WR who can refresh the aging WR depth behind DeVonta Smith, Emeka Egbuka, Jayden Reed, and Brandon Aiyuk.

Current roster implications:

- QB is not a first-round need. Bo Nix and Trevor Lawrence are good enough in this 1QB format, and the league has a 4-QB roster limit.
- RB is the clearest roster need. Bijan Robinson is elite, but the room gets thinner after David Montgomery, Jaylen Warren, Tyler Allgeier, J.K. Dobbins, Dylan Sampson, Isaiah Davis, Jaleel McLaughlin, Justice Hill, and Phil Mafah.
- WR is also a priority because Stefon Diggs and Tyler Lockett are aging/free-agent-risk depth, while Keon Coleman, Jaylin Noel, and Calvin Austin are not bankable weekly starters.
- TE is a low first-round priority because this is non-TE-premium and Sam LaPorta already anchors the position. David Njoku and Juwan Johnson also reduce urgency.
- Roster spots are tight. The current roster is effectively full with 22 active players and 3 taxi players, so every drafted player creates a future cut/taxi decision unless moved into one of the 2 open taxi slots.

## Expected Picks Before 1.07

Pick order before Drumheads:

1. 1.04 tomplanck
2. 1.05 stevensonbrody224
3. 1.06 kevinschraff
4. 1.07 tytusplanck

The first three picks removed Jeremiyah Love, Carnell Tate, and Jordyn Tyson. None of the three remaining teams ahead has a clean 1QB need, so WR/RB chalk is still likely. The practical question is whether Jadarian Price, Makai Lemon, or KC Concepcion reaches 1.07. If one does, take the value.

## 1.07 On-Clock Board

### Auto-Pick Tier

If any of these players is available at 1.07, pick the highest remaining player from this group:

1. Jadarian Price, RB SEA
2. Makai Lemon, WR PHI
3. KC Concepcion, WR CLE

Reasoning: Price is the cleanest roster fit because Drumheads needs RB depth with a workload path. Lemon is the best remaining young WR asset from the original top group. Concepcion is the likely best realistic outcome if the board goes chalk through 1.06.

### Trade-Back Tier

If Price, Lemon, and Concepcion are gone, shop 1.07 before making a pick. The next names have value, but they are not clean enough for this roster to auto-pick at cost:

- Omar Cooper Jr., WR NYJ
- Kenyon Sadiq, TE NYJ
- Denzel Boston, WR CLE
- Jonah Coleman, RB DEN
- Fernando Mendoza, QB LV

Preferred forced pick if there is no trade: Omar Cooper Jr. over Sadiq or Mendoza. Cooper fits the roster better than a non-premium TE behind LaPorta or a 1QB rookie behind Bo Nix/Trevor Lawrence. Sadiq may have stronger market ADP than Cooper, but the roster fit is poor enough that a trade back is better.

## Trade Plan At 1.07

### If One Auto-Pick Tier Player Is Available

Pick the player. Do not get cute unless someone offers a clear overpay, such as a 2027 1st plus an additional useful pick/player.

### If The Auto-Pick Tier Is Gone

Start by offering the pick to managers at 1.08, 1.09, and 1.10.

Best trade-back asks:

- Bigpat54: 1.07 for 1.08 plus 2.10, or 1.08 plus a 2027 2nd.
- dgibbsy: 1.07 for 1.09 plus 2.09, or 1.09 plus a 2027 2nd.
- kmmckee: 1.07 for 1.10 plus a 2027 2nd or a useful veteran RB/WR depth piece.
- Any manager: 1.07 for a 2027 1st is acceptable if the top WR/RB tier is gone. Ask for a small add if the 2027 1st projects late.

Do not trade back below 1.12 unless the return includes a 2027 1st, a future 2nd plus a meaningful player, or a current player who can immediately compete for a flex spot.

### Trade-Up Rule

Do not chase unless a preferred tier player is clearly about to be taken.

- To move from 1.07 to 1.06: offer 3.07 first, then 3.07 plus 4.07 if needed.
- Do not spend 2.07 to move up one spot unless Price or Lemon is the player you are locking in.
- Do not pay up for Fernando Mendoza, Kenyon Sadiq, or another TE/QB in this roster format.

## Round 2 Plan: 2.07

Goal: WR/RB with enough profile to beat a bench clogger or sit on taxi. Do not draft a QB here unless a first-round-market QB falls far enough to become obvious trade value.

Targets if available:

1. Chris Bell, WR MIA
2. Nicholas Singleton, RB TEN
3. Germie Bernard, WR PIT
4. Antonio Williams, WR WAS
5. Emmett Johnson, RB KC
6. De'Zhaun Stribling, WR SF
7. Zachariah Branch, WR ATL
8. Elijah Sarratt, WR BAL
9. Malachi Fields, WR NYG
10. Chris Brazzell, WR CAR
11. Mike Washington, RB LV
12. Kaytron Allen, RB WAS

If a first-round TE or QB slides into the 2.07 range, treat it as trade bait first. It does not solve Drumheads' main roster problem.

## Round 3 Plan: 3.07

Goal: RB contingent-upside or WR profile swing. This is where roster fit should matter more than generic ADP.

Preferred archetypes:

- RBs with injury-away workload paths.
- WRs with draft capital plus a thin depth chart.
- One TE only if the prospect is a value fall and has a realistic chance to become tradeable.

Targets:

- Kaytron Allen, RB WAS
- Adam Randall, RB BAL
- Kaelon Black, RB SF
- Demond Claiborne, RB MIN
- Ted Hurst, WR TB
- Skyler Bell, WR BUF
- Ja'Kobi Lane, WR BAL
- Brenen Thompson, WR LAC
- Max Klare, TE LAR, only if he falls and the WR/RB board is flat

## Rounds 4-5 Plan

These picks are replaceable because roster spots are tight. Use them for upside, not low-ceiling backups.

Round 4 priority:

1. RB dart with a depth-chart path.
2. WR attached to a good offense or thin room.
3. Falling TE only if the athletic/draft-capital case is stronger than the RB/WR options.
4. QB only if the room has unusually strong league trade demand.

Round 5 priority:

1. RB lottery ticket.
2. WR special-teams/returner-plus profile with a real chance to make an active roster.
3. Any player who can sit on taxi without forcing a useful active cut.

Names to monitor around 4.07-5.07 based on recent 1QB non-TEP ADP:

- Caleb Douglas, WR MIA
- Le'Veon Moss, RB MIA
- Kevin Coleman, WR MIA
- Bryce Lance, WR NO
- Zavion Thomas, WR CHI
- J'Mari Taylor, RB JAX
- Jam Miller, RB NE
- Cyrus Allen, WR KC
- Josh Cameron, WR JAX
- Seth McGowan, RB IND
- Roman Hemby, RB LV
- Jaydn Ott, RB KC

## Negotiation Messages

If an auto-pick tier player is gone and you want to trade back:

> I am open to moving 1.07 if you want your choice of the next tier. I would be looking for a small move-back plus a 2nd-level add, something like 1.08/1.09 plus a 2nd.

If asking Bigpat54:

> Since you are right behind me and have some extra 2nds, I would move 1.07 for 1.08 plus 2.10 if you want to lock in your guy.

If you want to trade up one spot:

> If you are flexible at 1.06, I would send 1.07 plus 3.07 to move up and keep things simple.

## What Could Go Wrong

- This 2026 class has a real tier break. If the top WR/RB group is gone, forcing the pick can leave Drumheads with an illiquid TE/QB or a secondary WR with shaky target competition.
- Drafting Price for roster need can backfire if the Seattle workload is less clean than expected.
- Drafting Lemon or Concepcion keeps the roster younger at WR, but it does not directly solve the RB depth issue.
- Drafting Concepcion or Cooper adds quarterback/situation risk.
- Trading back too far can turn a useful first into multiple roster-clogging darts when roster spots are already tight.
- Taking a QB in Round 1 creates a roster-limit problem without improving the starting lineup.

## Sources Checked

- Sleeper API sync: `data/sleeper/normalized/2026-06-05T17-09-51-798Z--league-context.json`, `data/sleeper/normalized/2026-06-05T20-37-40-460Z--league-context.json`, and raw draft payloads.
- Local memory: `data/memory/context-map.md`, `league-settings.md`, `my-team.md`, `strategy.md`, `draft-pick-values.md`, `player-values.md`, manager notes, and prior reports.
- FantasyPros rookie ADP: https://www.fantasypros.com/nfl/adp/rookies.php
- Fantasy Orphans recent Sleeper rookie ADP: https://fantasyorphans.com/rookie-draft-adp
- DynastyCalc draft pick values: https://www.dynastycalc.com/draft-picks
- DraftSharks rookie rankings: https://www.draftsharks.com/dynasty-rankings/rookies
- RotoBaller post-draft rookie rankings: https://www.rotoballer.com/dynasty-rookie-rankings-for-fantasy-football-post-nfl-draft-2026/1860143
