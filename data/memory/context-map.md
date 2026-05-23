# Context Map

Use this file as the fresh-agent orientation layer. It explains where context lives, which source wins when context conflicts, and when to propose durable memory updates.

## Read Order

1. `AGENTS.md` for role, safety, output format, and repo rules.
2. This file for freshness and memory-update rules.
3. `data/memory/league-settings.md`, `data/memory/my-team.md`, and `data/memory/strategy.md` for current league/team posture.
4. `data/sleeper/normalized/latest-league-context.json` for current API-derived league, roster, manager, pick, draft, and transaction context.
5. Topic-specific memory files:
   - Player valuation: `player-values.md`, `player-notes.md`, `external-rankings.md`, `draft-pick-values.md`.
   - Manager analysis: `manager-tendencies.md`, `trade-history.md`, `negotiation-notes.md`.
   - Trade analysis: all of the above, plus the other manager's normalized roster.
6. `data/browser-observations` only for read-only UI facts that the API cannot provide.
7. `reports/**` for historical reasoning, prior recommendations, and stale-but-useful evidence.

## Freshness Rules

- Latest memory summaries and latest Sleeper normalized snapshot beat older reports for current roster/settings questions.
- Older reports remain useful as historical evidence, especially for prior negotiations, market checks, and lessons learned.
- If a report uses an old lineup or roster format, carry forward only the reasoning that still applies and explicitly label stale context.
- API-derived data is usually the first stop for rosters, managers, picks, drafts, and settings.
- UI-observed data is valid when captured, but should be treated as stale unless the date and page context still fit the question.
- External rankings and calculators are market evidence, not final truth.

## Command Convention

Use `corepack pnpm ...` for package scripts. Do not try bare `pnpm` first.

Common commands:

- `corepack pnpm sync:sleeper`
- `corepack pnpm trade -- "I give Player A for Player B" --manager "Other Manager"`
- `corepack pnpm manager -- "Other Manager"`
- `corepack pnpm value -- "Player A"`
- `corepack pnpm compare -- "Player A vs Player B"`
- `corepack pnpm memory:update -- --file player-values --player "Player A" "Durable note"`
- `corepack pnpm test`
- `corepack pnpm typecheck`

## When To Suggest Memory Updates

Suggest a specific memory file when analysis creates context that is likely to matter later. Ask before writing unless the user has already asked to save, remember, record, or update something.

Add to `player-values.md` when:

- A player gets a clear durable tier, buy/sell/hold stance, or price range.
- A trade discussion creates a usable market price.
- A ranking/calculator check materially changes the player's value range.

Add to `player-notes.md` when:

- The note is about role, injury, usage, trust, risk, or subjective preference rather than price.

Add to `manager-tendencies.md` when:

- There is evidence from an offer, accepted trade, repeated behavior, trade block, league chat, or roster construction that should shape future negotiation.
- Label one-time roster reads as provisional. Do not turn a current need into a proven tendency.

Add to `trade-history.md` when:

- A trade is proposed, countered, accepted, declined, withdrawn, or materially discussed.
- Include result and lesson learned after the discussion resolves.

Add to `negotiation-notes.md` when:

- A discussion is still active and there is a recommended next message, walk-away line, or leverage read.

Add to `external-rankings.md` when:

- Rankings, calculators, ADP, projections, or market data are manually pasted or cited for later reuse.
