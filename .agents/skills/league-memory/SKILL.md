# League Memory

Use this skill when the user says:

- "Remember..."
- "Save this..."
- "Add this to notes..."
- "Update my strategy..."
- "Record this..."
- "This manager tends to..."
- "I think this player is..."

## Workflow

1. Save the note to the right Markdown file under `data/memory`.
2. Include date.
3. Include source: User note, API-derived, UI-observed, or Analysis.
4. Preserve history.
5. Do not overwrite old notes unless the user explicitly asks.
6. Keep notes concise and useful.

## Memory Routing

- My roster identity and team plan: `data/memory/my-team.md`
- League format and scoring: `data/memory/league-settings.md`
- Player valuation takes: `data/memory/player-values.md`
- Soft player notes: `data/memory/player-notes.md`
- Leaguemate behavior: `data/memory/manager-tendencies.md`
- Trade decisions and lessons: `data/memory/trade-history.md`
- Active negotiations: `data/memory/negotiation-notes.md`
- Pick market: `data/memory/draft-pick-values.md`
- Long-term philosophy: `data/memory/strategy.md`
- Pasted rankings and projections: `data/memory/external-rankings.md`
- Fresh-agent read order and save triggers: `data/memory/context-map.md`

## Guardrails

- User intent controls memory writes.
- Preserve old takes unless explicitly asked to revise.
- Mark UI-observed facts as UI-observed.
