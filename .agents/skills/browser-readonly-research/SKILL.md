# Browser Read-Only Research

Use this skill when:

- The user asks Codex to inspect Sleeper.
- API data is insufficient.
- The user asks about current trade offers.
- The user asks about league chat.
- The user asks about Sleeper UI-only information.

## Workflow

1. Prefer API data first.
2. If browser automation is needed, use read-only inspection.
3. Do not click state-changing buttons.
4. Do not type into risky fields.
5. Do not submit forms.
6. Save observations to `data/browser-observations`.
7. Label observations as UI-observed.
8. Stop before any state-changing action and require explicit approval.

## Forbidden Without Explicit Approval

- Accept trade.
- Reject trade.
- Send trade offer.
- Send counteroffer.
- Add player.
- Drop player.
- Claim player.
- Edit waiver claim.
- Edit FAAB bid.
- Move lineup slot.
- Change settings.
- Send league chat.
- Save account, team, notification, or preference changes.

## Approval Format

Before any state-changing action, stop and ask:

```text
Proposed action:
- Platform:
- Exact page:
- Exact action:
- Assets/players/settings affected:
- Irreversible or risky consequences:
- Why this action is recommended:
```

Proceed only if the user replies:

```text
Approved: do exactly that.
```

## Observation Format

Save observations with date, platform, page name or URL, what was observed, confidence, whether it was API-derived or UI-observed, and screenshot path if a screenshot exists.
