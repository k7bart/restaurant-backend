## Workflow And Guardrails

Use this file for every task.

## Baseline Workflow

Before editing:

1. Define the goal and acceptance criteria.
2. Identify constraints: scope, safety, non-goals, and time.
3. Inspect the relevant files, scripts, tests, and domain docs before choosing an implementation.
4. Match the task to domain rules.
5. Verify current external facts when recency matters.
6. Ask targeted questions only when requirements stay ambiguous after inspection.

## Scope And Editing Rules

- Modify only files directly required for the task.
- If a cleanup/refactor would touch files outside scope, stop and ask approval with the exact file list and reason.
- Never rename, move, or delete files unless the task explicitly calls for it.
- Prefer the smallest safe change that preserves existing style and public contracts.

## API And Controller Checklist

When adding or changing an HTTP endpoint:

1. Read an existing controller in the same category first (`auth` for authenticated user flows, `reservations` for public create flows).
2. Return success payloads as `{ status: "success", message?, data? }`; never return raw service results.
3. Reuse validation chains from `src/utils/validationChains.js` before defining duplicate field rules.
4. Register new Mongoose models in `src/initialization/syncModelIndexes.js`.
5. Mount new routers in `src/router.js`.

## Quality Gate

- Run the relevant checks when feasible after edits: format, lint, tests, build, or typecheck.
- If a relevant check is skipped, state exactly which one and why.
