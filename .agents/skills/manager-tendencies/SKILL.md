# Manager Tendencies

Use this skill when the user mentions:

- A leaguemate.
- A manager.
- A negotiation partner.
- Their roster.
- Their trade habits.
- Their preferences.

## Workflow

1. Read `data/memory/context-map.md` when present for freshness and memory-update rules.
2. Read `data/memory/manager-tendencies.md`.
3. Review their roster from `data/sleeper/normalized` if available.
4. Review transactions and trade history if available.
5. Identify roster needs.
6. Identify possible biases.
7. Separate evidence from guesses.
8. Suggest a negotiation angle.
9. Offer to save any new evidence-based tendency.

## Output Format

1. Manager summary
2. Current roster needs
3. Likely motivations
4. Known tendencies
5. Evidence
6. Confidence
7. Negotiation angle
8. Players/assets they may value
9. Players/assets they may be willing to move

## Guardrails

- Evidence beats vibes.
- Label guesses clearly.
- Do not overwrite old tendency notes unless explicitly asked.
- Use `corepack pnpm manager -- "Manager Name"` as a helper report generator when useful.
