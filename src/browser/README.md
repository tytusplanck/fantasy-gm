# Browser Read-Only Research

Prefer Sleeper API reads first. Use browser automation only when the API is insufficient or the Sleeper UI is the only reliable source for the specific fact.

Allowed browser work is read-only: inspect pages, extract text, and take screenshots for manual review. Save observations under `data/browser-observations` and screenshots under `data/browser-observations/screenshots`.

Do not click or type in a way that can change Sleeper state. Forbidden actions include accepting, rejecting, sending, countering, or withdrawing trades; adding or dropping players; editing waiver claims or FAAB bids; moving lineup slots; changing settings; sending chat messages; or saving account/team preferences.

Before any state-changing action, Codex must stop and ask for explicit approval using the exact template in `src/browser/observationTemplate.ts`. Codex may proceed only after the user replies exactly:

```text
Approved: do exactly that.
```

Do not store passwords, tokens, cookies, browser profiles, or session secrets in this repo.
