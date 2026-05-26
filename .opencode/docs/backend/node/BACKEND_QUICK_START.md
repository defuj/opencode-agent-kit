# Backend Agent Quick Start (Enterprise)

This guide is portable across services that share the same backend stack style.

## Agent Name

- `backend`

## Activate the Agent

```text
@backend Analyze this backend service and align implementation with existing DTO, route, middleware, and controller patterns.
```

## High-Value Prompt Templates

```text
@backend Add endpoint <METHOD> <path> with request/response DTOs, validation middleware, and standardized error handling.
```

```text
@backend Implement transaction-safe <business operation> with audit logging and predictable response mapping.
```

```text
@backend Review this module for auth boundary, tenant scoping, validation, and API contract consistency.
```

```text
@backend Refactor this controller to reduce complexity while preserving behavior and response shape.
```

## What the agent is optimized for

- Node.js + TypeScript + Express + Prisma services
- DTO-driven validation and response mapping
- Consistent route/middleware layering
- Transaction-safe data mutations
- Security and tenant/ownership boundaries

## Recommended verification commands

```bash
npm run type-check
npm run lint
npm run test:run
```

If command names differ in a service, use that service's equivalents.
