# League Settings

Use this file for league format and rules that change player and trade values.

## Basics

- League type: Dynasty
- Teams: 12
- Season: 2026
- Platform: Sleeper
- Sleeper league ID: 1336908184048107520
- League name: Living Big Fantasy Football League
- Current status: pre-draft / `pre_draft`

## Roster Positions

- Starting lineup: QB, RB, RB, WR, WR, WR, TE, FLEX, FLEX
- Bench: 13
- API-exposed roster limits: max 4 QBs (`position_limit_qb = 4`); no other position-specific limit fields appeared in the latest API snapshot
- Taxi: 5 slots, non-rookies not allowed, 3-year experience limit, deadline is start of regular season
- IR: 5 reserve slots; COVID allowed; doubtful/out/suspended/NA/DNR not allowed by API settings

## Scoring Settings

- Passing: 0.04 points/pass yard, 4 points/pass TD, -1 interception, 2-point conversions count 2
- Rushing: 0.1 points/rush yard, 6 points/rush TD, 2-point conversions count 2
- Receiving: 0.5 PPR, 0.1 points/receiving yard, 6 points/receiving TD, 2-point conversions count 2
- TE premium: No TE premium in API scoring (`bonus_rec_te = 0`)
- Superflex / 2QB: No superflex or 2QB roster slot in API roster positions
- Bonuses: No 100/200-yard or big-play offensive bonuses in API scoring
- Defensive scoring: Standard-ish DST scoring present; sacks 1, interceptions 2, fumble recoveries 2, defensive TD 6, safety 2, points allowed tiers active

## Calendar

- Trade deadline: Week 13
- Playoff structure: 6 teams, playoffs start week 15, one week per round, re-seed enabled, lower bracket is consolation bracket
- Keeper/dynasty rules: Dynasty. All rosters stay with owners; 5-round supplemental/rookie draft; draft pick trading enabled.

## Notes And Weird Settings

- FAAB budget: 150
- Daily waivers enabled
- Waiver processing time: API hour `0`; likely midnight Pacific / 3 AM EDT if Sleeper's API hour uses the same Pacific-time mapping as the prior UI-observed setting
- After-games waivers clear: Tuesday after day (`waiver_day_of_week = 1`)
- Dropped players stay on waivers: 1 day
- Custom daily waiver setting: Monday through Sunday Waivers (`daily_waivers_days = 5461`, base-4 `1111111`)
- Waiver type: FAAB, $0 minimum bid, FAAB suggestions enabled
- League average matchup enabled
- Trade review period: 2 days
- Veto votes needed: 6
- Pick trading enabled

## History

Add dated changes or clarifications here.

### 2026-05-16

- Source: User note
- Note: User identified Sleeper league as Living Big Fantasy Football League 2026, league ID 1336908184048107520, season 2026, status pre-draft.

### 2026-05-16

- Source: API-derived
- Note: Sleeper sync loaded 12 rosters, 10 starting slots, 15 bench spots, 5 taxi slots, 5 reserve slots, half-PPR scoring, no superflex slot, no TE premium, week 13 trade deadline, 6 playoff teams, 5 draft rounds, and pick trading enabled.

### 2026-05-16

- Source: UI-observed via Chrome/Sleeper
- Note: Verified league type is Dynasty. Verified roster settings are 1 QB, 2 RB, 2 WR, 1 TE, 4 W/R/T FLEX, 0 W/R FLEX, 0 W/T FLEX, 0 Q/W/R/T FLEX, 0 IDP FLEX, 0 K, 0 DEF, 0 DL, 0 LB, 0 DB, and 15 BN.
- Note: Verified general settings: 12 teams, FAAB bidding, $100 waiver budget, $0 minimum bid, after-games waivers clear None, dropped players stay on waivers 1 day, custom daily waivers enabled, processing time 10 AM EDT, Monday through Sunday locked, trade review 2 days, trade deadline 13th/week 13, playoffs start week 15, 6 playoff teams, one week per playoff round, re-seed enabled, lower bracket consolation bracket.
- Note: Verified IR/taxi/dynasty settings: 5 IR slots, COVID allowed on IR, OUT/suspended/NA/DNR/doubtful not allowed on IR, draft pick trading enabled, extra game against league median enabled, moves pre-draft allowed, bench players cannot be dropped after their game starts, free agent/waiver moves are not locked, 5 supplemental draft rounds, 5 taxi slots, non-rookies not allowed on taxi, 3-year taxi experience limit, taxi deadline start of regular season.

### 2026-05-23

- Source: API-derived from Sleeper sync `2026-05-23T14-16-34-123Z`.
- Note: Current roster settings are 1 QB, 2 RB, 3 WR, 1 TE, 2 W/R/T FLEX, and 13 BN. Taxi remains 5 slots and IR/reserve remains 5 slots.
- Note: Sleeper API exposes a QB roster limit of 4 (`position_limit_qb = 4`); no other `position_limit_*` keys appeared in the latest league settings payload.
- Note: Waiver/FAAB settings changed to $150 FAAB budget, $0 minimum bid, FAAB suggestions enabled, custom daily waivers enabled, all seven custom waiver days set to Waivers (`daily_waivers_days = 5461`, base-4 `1111111`), after-games waivers clear Tuesday after day (`waiver_day_of_week = 1`), dropped players stay on waivers 1 day, and processing hour is API value `0`.
- Note: The 2026-05-16 UI-observed lineup, bench, FAAB budget, after-games waiver, custom daily waiver, and processing-time notes are historical and superseded by this API-derived snapshot.
