# Backend Patterns (Enterprise, Portable)

Use these patterns as baseline across backend services with Node.js + TypeScript + Express + Prisma.

## Standard Module Layout

- Controllers: request orchestration and response mapping
- Routes: endpoint registration and middleware chain
- DTOs: request validation and response exposure contracts
- Middlewares: auth, validation, upload, limiter, etc.
- Utilities/services: reusable domain/business logic

## DTO Conventions

- Request DTO suffix: `*.dto.ts`
- Response DTO suffix: `*.response.dto.ts`
- Explicit field exposure with `@Expose()`
- Route-level validation middleware uses request DTO class
- Response serialization maps through response DTO with extraneous field exclusion

Example mapping:

```ts
const result = plainToInstance(ResponseDTO, payload, {
  excludeExtraneousValues: true,
});
```

## API Response Conventions

- Use one centralized response helper for success and error envelopes
- Keep status/message/data structure consistent across endpoints
- Avoid ad-hoc response shapes in controllers

## Error Handling Conventions

- Wrap controller logic in try/catch
- Delegate catch to centralized error handler
- Provide predictable business error mappings
- Log unexpected errors once, near boundary layer

## Route and Middleware Conventions

- Register specific paths before parameterized paths
- Place auth middleware before validation and handler
- Keep middleware order deterministic and explicit
- For multipart endpoints, apply upload middleware before DTO validation when needed

## Data Access Conventions

- Use transactions for multi-step state mutations
- Keep write paths idempotent where practical (especially webhook/event handlers)
- Query only fields/relations needed for output
- Maintain tenant/ownership scoping where service model requires it

## Security Conventions

- Validate all external input via DTOs
- Enforce auth and resource-level authorization consistently
- Keep error responses safe (no stack traces/internal details)
- Restrict upload MIME types, size, and destination path
- Never leak secret values in logs or API responses

## Pagination and List Conventions

- Normalize paging params and cap upper bounds
- Apply filters and sorting through deterministic query builder logic
- Return pagination metadata alongside items

## Mutation Conventions

- Validate request payload and preconditions first
- Apply domain mutation in transaction
- Emit domain/audit log entries for critical operations
- Return mapped response DTO from committed state

## Test and Verification Conventions

- Tiny changes: one focused check
- Small changes: type-check plus one targeted check
- Medium+ changes: type-check, lint, and relevant tests
- Contract changes: include endpoint behavior validation
