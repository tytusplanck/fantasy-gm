# Fantasy GM

Local-first fantasy football trade GM context for Codex.

This repo helps Codex act like a skeptical fantasy football trade advisor from inside the repo. It stores league context, manual fantasy memory, Sleeper API snapshots, read-only UI observations, and Markdown reports in versionable files.

## What This Does

- Syncs Sleeper public API league context into JSON snapshots.
- Normalizes league settings, managers, rosters, transactions, traded picks, drafts, and draft picks.
- Keeps durable fantasy memory in Markdown under `data/memory`.
- Produces Markdown trade reports under `reports/trades`.
- Produces player valuation reports under `reports/player-values`.
- Provides repo-scoped Codex skills for trade evaluation, player valuation, counteroffers, manager tendencies, memory updates, and read-only browser research.

## What This Does Not Do

- No automatic Sleeper actions.
- No automatic trade accepts, rejects, counters, or offers.
- No waiver automation.
- No lineup automation.
- No frontend.
- No database.
- No Docker.
- No projection engine.
- No claim that a trade calculator is absolute truth.

Trade decisions remain yours. Codex should challenge bad assumptions and explain downside risk.

## Repo As Source Of Truth

Codex should use files in this repo instead of chat memory. Durable context belongs here:

- `data/memory`: manual league, player, manager, strategy, and trade memory.
- `data/sleeper/raw`: raw Sleeper API snapshots.
- `data/sleeper/normalized`: normalized JSON views for analysis.
- `data/browser-observations`: read-only UI observations that the API cannot provide.
- `reports`: generated Markdown analysis.

## Setup

Node 22+ is required. This repo is configured for pnpm through Corepack. Use `corepack pnpm ...` for repo commands; do not try bare `pnpm` first.

```bash
corepack enable
corepack pnpm install
```

Create a local `.env` from the example:

```bash
cp .env.example .env
```

Fill in what you know:

```text
SLEEPER_USERNAME=
SLEEPER_USER_ID=
SLEEPER_LEAGUE_ID=
SLEEPER_SEASON=2026
MY_MANAGER_NAME=
MY_TEAM_NAME=
```

`SLEEPER_LEAGUE_ID` is the most direct way to sync. If it is missing, the sync command can only infer the league when the configured user has exactly one league for the season.

## Commands

Sync Sleeper:

```bash
corepack pnpm sync:sleeper
```

The large NFL player metadata response is cached at `data/sleeper/raw/players-nfl-latest.json`. Timestamped raw sync bundles reference that cache instead of duplicating the full player file on every sync.

Force refresh the large Sleeper player metadata cache:

```bash
corepack pnpm sync:sleeper -- --force-players
```

Evaluate a trade:

```bash
corepack pnpm trade -- "I give Player A and a 2026 2nd for Player B" --manager "Other Manager"
```

Analyze a manager:

```bash
corepack pnpm manager -- "Other Manager"
```

Compare players:

```bash
corepack pnpm compare -- "Player A vs Player B"
```

Value one player:

```bash
corepack pnpm value -- "Player A"
```

Add durable memory:

```bash
corepack pnpm memory:update -- --file manager-tendencies --manager "Sam" "Sam tends to overvalue rookies after the NFL draft."
```

Typecheck:

```bash
corepack pnpm typecheck
```

Run tests:

```bash
corepack pnpm test
```

## Memory Files To Edit First

Start with these:

- `data/memory/context-map.md`: fresh-agent read order, freshness rules, and when to suggest memory updates.
- `data/memory/league-settings.md`: dynasty/keeper/redraft, lineup, scoring, bench, taxi, IR, playoffs, trade deadline.
- `data/memory/my-team.md`: contender/rebuild status, core players, expendable players, roster holes.
- `data/memory/strategy.md`: risk tolerance, preferred roster build, player archetypes.
- `data/memory/manager-tendencies.md`: evidence-based manager tendencies.
- `data/memory/player-values.md`: durable player valuation takes.
- `data/memory/player-notes.md`: injury, role, trust, usage, and bias notes.

Memory should preserve history. Do not overwrite old takes unless you intentionally want to revise them. When reports conflict with current memory, treat the latest memory summary and latest Sleeper snapshot as current context, and treat older reports as historical evidence.

## Browser Read-Only Observations

Use browser automation only when the Sleeper API is insufficient or the UI is the only reliable source. Save observations under:

- `data/browser-observations/trade-offers.md`
- `data/browser-observations/trade-block.md`
- `data/browser-observations/league-chat.md`
- `data/browser-observations/ui-notes.md`

Screenshots go under `data/browser-observations/screenshots`, which is ignored by git by default.

Read-only examples include inspecting current trade offers, trade blocks, league chat, player cards, matchup pages, draft room context, available players, waiver UI, and manager roster pages.

## Browser Safety Rules

Never use browser automation to change Sleeper state unless explicitly approved. Forbidden without explicit approval:

- Accept, reject, send, counter, or withdraw a trade.
- Add, drop, claim, or bid on a player.
- Move lineup slots.
- Edit waiver claims or FAAB bids.
- Change league settings.
- Send league chat messages.
- Edit team name, avatar, notifications, preferences, or account settings.

Before any state-changing action, Codex must stop and ask:

```text
Proposed action:
- Platform:
- Exact page:
- Exact action:
- Assets/players/settings affected:
- Irreversible or risky consequences:
- Why this action is recommended:
```

Codex may proceed only if you reply exactly:

```text
Approved: do exactly that.
```

## Privacy

Do not commit `.env`, browser session files, cookies, tokens, passwords, or screenshots. League data and reports may still be private, so treat this repo accordingly if pushing to a remote.

## MCP Guidance

This repo does not require MCP servers. Sleeper public API calls are direct. Browser automation may be useful for read-only UI-only facts, but it should remain optional and safety-constrained.

## Current Limits

The analysis logic is intentionally simple and explainable. The CLI commands combine local memory, Sleeper context, and skeptical trade reasoning, but they are not projection engines and should not replace full repo-grounded reasoning. Add external rankings, observed league-market prices, resolved trade discussions, and evidence-based manager tendencies to memory to make future output sharper.
