---
name: leadership-workflow
description: Full leadership workflow for Complex Feature and Full Application scopes. Covers requirement discovery, effort estimation, sprint planning, risk management, client reporting, QA/UAT, retrospective, task tracking, team health, and post-delivery closure.
version: 1.0.0
---

# Leadership Workflow

Use this skill when acting as IT Leader for **Complex Feature** or **Full Application** scopes. Activate all 10 components at the appropriate depth.

## 1. Requirement Discovery

Use for: Complex Feature, Full App

### Protocol

Use the question tool to discover requirements before any delegation.

```
questions: [{
  header: "Feature Scope",
  question: "Apa yang perlu dibuat?",
  options: [
    { label: "Option A (Recommended)", description: "..." },
    { label: "Option B", description: "..." },
  ]
}]
```

### Output Structure

For each feature discovered, produce:

```markdown
- **User Story**: As a {role}, I want to {goal} so that {benefit}.
- **Acceptance Criteria**:
  - [ ] Criterion 1
  - [ ] Criterion 2
- **Technical Notes**: {constraints, dependencies, risks}
- **Scope**: {in scope / out of scope}
```

### Stakeholder Identification

Before starting, identify:

- Primary users and their goals
- Technical stakeholders (existing systems, APIs)
- Decision makers for scope changes

---

## 2. Estimasi & Sizing

Use for: Simple Feature, Complex Feature, Full App

### Sizing Matrix

| Size             | Criteria                      | Typical Scope                        | Delegation Strategy       |
| ---------------- | ----------------------------- | ------------------------------------ | ------------------------- |
| **XS (Trivial)** | 1 file, < 10 lines            | Typo, rename, single prop change     | Direct delegation         |
| **S (Small)**    | 1-3 files, 1 component/screen | Button, simple form, single endpoint | 1 delegation              |
| **M (Medium)**   | 3-8 files, 1-2 screens        | New page + API, filter/search        | 1-2 delegations parallel  |
| **L (Large)**    | 8-20 files, multiple screens  | Auth flow, payment, dashboard        | 3-5 delegations, phased   |
| **XL (Epic)**    | 20+ files, full feature set   | Marketplace, admin panel, CMS        | Multi-phase, cross-sprint |

### Estimation Formula

Count:

```
Total = screens + endpoints + data models + integrations
├── 1-3 → S (Small)
├── 4-8 → M (Medium)
├── 9-15 → L (Large)
└── 16+ → XL (Epic)
```

Report estimates to user before proceeding:

```markdown
## Scope Estimate

- Screens: 3
- Endpoints: 5
- Data models: 2
- Integrations: 1 (payment gateway)
- Size: L (Large)
- Strategy: 3 phases, 2 subagents parallel
- Estimated delegation cycles: 3-4
```

---

## 3. Sprint/Iterasi Planning

Use for: Full App

### Phase Structure

```
Phase N: {Phase Name}
Goal: {what this phase achieves}
Duration: {delegation cycles estimate}

Tasks:
├── {ID}: {task} → @{subagent} (sequential/parallel)
├── {ID}: {task} → @{subagent}
└── ...

Gate: {condition to mark phase done}
```

### Phase Ordering Rules

1. **Foundation first** — DB schema, auth, base API before UI
2. **Feature core before polish** — Functionality before design refinement
3. **Testing last** — E2E/code review/SEO after features stabilize
4. **Parallel in phase, sequential across phases**

### Sample Sprint Structure

```markdown
## Delivery Roadmap

Phase 1 — Foundation (cycles: 2-3)
├── DB: Schema design → @database
├── BE: Auth + User CRUD → @node-developer
└── FE: Login/Register + User list → @frontend-nuxt

Phase 2 — Core Features (cycles: 3-4)
├── BE: Business logic endpoints → @node-developer
└── FE: Main feature pages → @frontend-nuxt

Phase 3 — Polish & Ship (cycles: 2-3)
├── UI audit → @designer
├── Code review → @reviewer
├── E2E tests → @e2e-runner
└── SEO → @seo
```

---

## 4. Risk Management

Use for: Complex Feature, Full App

### Risk Register

Track all risks in a structured register:

| Risk                       | Category  | Likelihood | Impact   | Severity | Mitigation                  | Status    |
| -------------------------- | --------- | ---------- | -------- | -------- | --------------------------- | --------- |
| Third-party API rate limit | Technical | Medium     | High     | HIGH     | Fallback + caching          | Active    |
| Feature dependency chain   | Process   | High       | Medium   | MEDIUM   | Sequential delegation       | Monitored |
| Payment PII exposure       | Security  | Low        | Critical | CRITICAL | trigger @security-reviewer  | Mitigated |
| Scope creep                | Process   | High       | Medium   | MEDIUM   | Question tool at each phase | Active    |

### Escalation Protocol

```
Blocker identified during work
├── Self-resolvable? → Reschedule, parallelize, or reorder tasks
├── Needs subagent fix? → Delegate fix to appropriate subagent
└── Needs user decision? → Question tool with structured options
    └── If decision delayed → Flag as blocked, move to next independent task
```

### Monitoring

Check at each delegation cycle completion:

- Any new risks emerged?
- Existing risks changed status?
- Blockers introduced?

---

## 5. Client Reporting

Use for: Simple Feature (minimal), Complex Feature (full), Full App (full)

### Report Templates

**Simple Feature / Fix (1 line)**:

```
Done: {what changed}
Files: {paths}
Status: {subagent} verified
```

**Complex Feature (table)**:

```markdown
## Delivery Report

| Task              | Subagent | Status      | Files   |
| ----------------- | -------- | ----------- | ------- |
| {ID}: {desc}      | @{agent} | ✅ Verified | {count} |
| {ID}: {desc}      | @{agent} | ✅ Verified | {count} |
| Integration Check | Leader   | ✅ Passed   | -       |

Blockers: {none or list}
Next: {UAT / next feature / deploy}
```

**Full App (sprint report)**:

```markdown
## Sprint {N} — {Phase Name}

Completed: {N}/{N} tasks
Velocity: {Slow / Medium / Fast}
Blockers: {none or list}
Risks: {none or list}

### Phase Plan

{list next phase tasks}
```

---

## 6. QA/UAT Phase

Use for: Complex Feature, Full App

### Quality Gates (Sequential)

```
Feature complete
├── [Gate 1] Self-verification → Each subagent verifies own output
├── [Gate 2] Integration check → Leader verifies across subagents
├── [Gate 3] Code review → @reviewer (if not done during work)
├── [Gate 4] Security review → @security-reviewer (if auth/PII/payment)
├── [Gate 5] E2E tests → @e2e-runner (if critical flows)
└── [Gate 6] UAT sign-off → User approval
```

### UAT Sign-off

```markdown
questions: [{
header: "UAT Sign-off",
question: "Apakah hasil sudah sesuai dengan yang diharapkan?",
options: [
{ label: "Approved (Recommended)", description: "Lanjut ke phase berikutnya atau delivery" },
{ label: "Need changes", description: "Ada revisi, saya akan delegasikan ke subagent" },
{ label: "Custom answer", description: "Jelaskan perubahan yang diperlukan" }
]
}]
```

### Bug Triage

When user reports issues during UAT:

```
Bug received
├── Trivial (typo, spacing, color) → Direct delegation (fast)
├── Minor (missing state, wrong data) → Delegasi ke subagent terkait
└── Major (flow broken, data loss) → STOP, delegasi priority ke subagent
     └── If security-related → trigger @security-reviewer first
```

---

## 7. Retrospective

Use for: Complex Feature, Full App

### Session Retro

Run after completing a delivery phase or at session end:

```markdown
## Sesi Retrospective

What went well:

- {concrete positive observation}

What could be better:

- {concrete improvement area}

Action Items:

- [ ] {actionable improvement}
```

### Save Lessons to agentmemory

```
memory_lesson_save with:
- content: "{lesson learned}"
- context: "{project / feature context}"
- confidence: 0.7
- tags: "retrospective, {domain}"
```

### Cross-Session Learning

At the start of a new session for the same project, recall past lessons:

```
memory_recall query: "{project name} lessons"
```

---

## 8. Task Tracking

Use for: Small Fix, Simple Feature, Complex Feature, Full App

### In-Session Tracking

Use `todowrite` throughout the session:

```
todowrite with:
- Task {ID}: {description} → pending
- Task {ID}: {description} → pending
```

Update status as work progresses:

```
todowrite: Task {ID} → in_progress
todowrite: Task {ID} → completed
```

### Cross-Session Persistence

Save project state to agentmemory at session end:

```
memory_save with:
- content: "Project {name} — Phase {N} complete.
  Remaining: {task list}. Next step: {plan}."
- type: "workflow"
- project: "{project-slug}"
```

At the next session start, recall project state:

```
memory_smart_search query: "{project-slug} project status"
```

---

## 9. Team Health

Use for: Complex Feature, Full App

### Workload Tracking

Before each delegation round, check current load:

```
Current delegation load:
├── @{subagent}: {N} tasks → {busy / available / idle}
├── @{subagent}: {N} tasks → {busy / available / idle}
└── ...

Decision: {parallel / sequential / wait}
```

### Bottleneck Rules

Real bottlenecks are in **dependencies**, not subagent capacity — subagents handle parallel tasks independently.

| Condition                                    | Action                                                   |
| -------------------------------------------- | -------------------------------------------------------- |
| Tasks are independent (no output dependency) | Parallel delegation — subagent handles them concurrently |
| Task B needs output from Task A              | Sequential — queue B until A completes                   |
| Multiple sequential tasks for same subagent  | Send one at a time, chain results forward                |
| Leader has many outputs to verify at once    | Batch verify by priority: integration-critical first     |

---

## 10. Post-Delivery

Use for: Full App

### Project Closure

After final delivery:

```markdown
## Project Closure

Delivered:

- {feature list with status per item}

Architecture Decisions:

- {key decisions captured in agentmemory}

Knowledge Transfer:

- API contracts: {location}
- Design tokens: {DESIGN.md location}
- Key files to monitor: {paths}

Maintenance Notes:

- {dependency update schedule}
- {monitoring plan}
- {known limitations}

Archive: memory_save with full closure summary
```
