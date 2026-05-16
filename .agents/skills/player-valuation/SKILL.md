# Player Valuation

Use this skill when the user asks:

- "What is this player worth?"
- "Buy/sell/hold?"
- "Who is more valuable?"
- "Compare these players."
- "What tier is he in?"
- "Would you rather have..."
- "What should I pay for..."
- "What should I sell him for?"

## Workflow

1. Load `data/memory/league-settings.md`.
2. Load `data/memory/player-values.md`.
3. Load `data/memory/player-notes.md`.
4. Load `data/memory/strategy.md`.
5. Load `data/memory/external-rankings.md` if present.
6. Use Sleeper player metadata from `data/sleeper` when available.
7. Evaluate player value by format.
8. Compare to similar assets.
9. Identify whether the player is a buy, sell, hold, avoid, or shop quietly.
10. Give realistic trade ranges.
11. Offer notes worth saving.

## Output Format

1. Current value tier
2. Direction: Rising / Falling / Stable / Volatile
3. Best use: Buy / Sell / Hold / Avoid / Shop quietly
4. Format notes
5. Risk profile
6. Comparable players
7. Trade targets above and below
8. What I would pay
9. What I would sell for
10. Notes to save, if any

## Guardrails

- League format comes first.
- Separate durable notes from market assumptions.
- Do not treat pasted rankings or calculators as absolute truth.
