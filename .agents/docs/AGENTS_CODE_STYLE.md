## Code Style And Structure

Use this file for `src/*` JavaScript, module, middleware, and API changes.

## Code Style

- Prefer readable code over short code.
- Do not add any comments in the code.
- Use guard clauses instead of nested conditionals.

## Module Layout

Each feature lives under `src/modules/<feature>/` with:

- `<feature>.routes.js` — Express router wiring middleware, validation, and controllers
- `<feature>.controller.js` — HTTP handlers; parse request, call service, shape JSON response
- `<feature>.service.js` — business logic and orchestration
- `<feature>.model.js` — Mongoose schema and model (when persisted)
- `<feature>.validation.js` — express-validator schema arrays

Shared cross-cutting code:

- `src/middlewares/` — auth, validation wrapper, rate limiting, error handling
- `src/utils/` — pure helpers (errors, validation chains, phone normalization, etc.)
- `src/consts/` — shared error codes and validation limits
- `src/initialization/` — server bootstrap, index sync
- `src/router.js` — mounts module routers

## Naming And Files

- Module folders use lowercase feature names (`auth`, `events`, `reservations`).
- Files use `camelCase` (e.g. `auth.controller.js`, `syncModelIndexes.js`).
- Export named handlers from controllers and object-style services where the module already uses that pattern.

## Controllers

- Controllers call services and shape HTTP responses. Services return domain data only.
- Every controller handler must wrap success payloads in the standard envelope. Do not return raw documents, arrays, or service results directly.
- Use `auth.controller.js` and `reservations.controller.js` as reference implementations.

### Success Response Envelope

All success responses use:

```json
{ "status": "success", "message": "...", "data": {} }
```

- `status` is required and must be `"success"`.
- `message` is optional; include it for mutations such as create, login, or logout.
- `data` is optional; put the resource or collection here.

HTTP status codes:

- `200` for reads and updates.
- `201` for successful resource creation.

Examples:

```javascript
res.status(201).json({
  status: "success",
  message: "Reservation created successfully",
  data: reservation,
});

return res.status(200).json({
  status: "success",
  data: user,
});
```

## Validation

- Request validation uses `express-validator` schemas in `*.validation.js`.
- Reuse field rules from `src/utils/validationChains.js` when available.
- Pull length and format limits from `src/consts/validation.js`.
- Use error messages from `src/consts/errors.js`.
- Wire schemas through `validationMiddleware` in route definitions.
- Validate nested request fields with dot-notation keys (e.g. `"reservedBy.firstName"`).
- Keep module-specific rules inline in `*.validation.js`; move reusable field rules into `validationChains.js`.

## Errors And Responses

- Throw errors with helpers from `src/utils/errorsHelpers.js` (`createError`, `createNotFoundError`, etc.).
- Errors are handled centrally by `src/middlewares/errorHandler.js` as `{ success: false, code, message, errors? }`.

## Async

- Use `async/await` for async flows; avoid `.then()` / `.catch()` chains.
- Controllers and services should be async functions that let errors propagate to the error handler.

## Mongoose Models

- Define schemas in `*.model.js`; register models in `src/initialization/syncModelIndexes.js`.
- Use validators and messages from shared consts where the existing models do.
- Prefer pre-save hooks for normalization (e.g. phone) when already established in the codebase.
- Reuse the same field constraints in both Mongoose schemas and request validation where practical.

## Shared Modules

### Counter

`src/modules/counter/` provides numeric sequence IDs via `getNextSequence(name)`.

- Use it when a model needs a human-readable incrementing `id` separate from MongoDB `_id`.
- Call it from the service before `Model.create()`.
- Pass a stable counter name per resource type (e.g. `"reservation"`).

## Src Folder Map

- `src/modules/*` — feature modules (auth, events, reservations, token, user, counter)
- `src/middlewares/*` — Express middleware
- `src/utils/*` — shared helpers
- `src/consts/*` — errors and validation constants
- `src/config/` — env validation and config export
- `src/initialization/*` — DB connection and app setup
