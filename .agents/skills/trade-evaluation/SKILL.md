# Trade Evaluation

Use this skill when the user asks:

- "Should I trade..."
- "What do you think of this offer?"
- "Would you accept..."
- "How should I counter?"
- "Is this fair?"
- "What should I offer for..."
- "Should I sell..."
- "Should I buy..."
- "What would you need on top?"

## Workflow

1. Load `data/memory/league-settings.md`.
2. Load `data/memory/my-team.md`.
3. Load the other manager roster from `data/sleeper/normalized` if known and available.
4. Load `data/memory/player-values.md`.
5. Load `data/memory/player-notes.md`.
6. Load `data/memory/manager-tendencies.md`.
7. Load relevant entries from `data/memory/trade-history.md`.
8. Use Sleeper data from `data/sleeper` when available.
9. Use browser-observed read-only data only if helpful and already captured.
10. Evaluate asset value, format fit, roster impact, replacement value, positional scarcity, risk, and negotiation realism.
11. Identify who benefits and why.
12. Identify what could go wrong.
13. Identify whether the other manager has a reason to accept.
14. Suggest counters when appropriate.
15. Suggest negotiation framing when useful.
16. Save a Markdown report under `reports/trades`.

## Output Format

1. Recommendation: Accept / Decline / Counter / Explore / Hold
2. Confidence: Low / Medium / High
3. Simple verdict
4. Value analysis
5. Roster impact for my team
6. Roster impact for the other team
7. Risk analysis
8. Negotiation angle
9. Suggested counteroffers
10. Message I can paste to the other manager, if useful
11. What would change my mind
12. Data gaps

## Guardrails

- Do not recommend an action without naming downside risk.
- Do not ignore league format.
- Do not ignore my roster construction.
- Do not auto-send, auto-accept, auto-reject, or modify Sleeper state.
