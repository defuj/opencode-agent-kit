# 🎯 Frontend Developer Agent - Cheat Sheet

Quick reference untuk command dan patterns yang sering dipakai.

---

## Aktivasi Agent

```bash
# Mention agent
@frontend-developer [request]

# Switch ke agent (jika primary)
<Tab>
```

---

## Skills Quick Load

```bash
# Load specific skill
@frontend-developer Load skill `nuxt-ui` untuk build form components

# Load multiple skills
@frontend-developer Load skills: `building-components`, `security-review`, `tdd-workflow`

# Check loaded skills
@frontend-developer What skills are currently loaded?
```

---

## Component Creation

### Basic Component

```bash
@frontend-developer Buat component Button dengan:
- Props: variant, size, disabled, loading
- TypeScript strict
- Accessible (ARIA + keyboard)
- File: app/components/ui/Button.vue
```

### Complex Component

```bash
@frontend-developer Buat DataTable component:
- Props: data, columns, sortable, paginated
- Features: sort, filter, search, selection
- Virtualization untuk 1000+ rows
- Export to CSV
- Responsive (stack on mobile)
```

### Form Component

```bash
@frontend-developer Buat LoginForm:
- Fields: email, password, remember me
- Validation dengan Zod
- Loading state
- Error handling
- Social login buttons
- Forgot password link
```

---

## Styling & Design

### Implement Design

```bash
@frontend-developer Implement design dari [screenshot]:
- Aesthetic: [minimalist/bold/playful/editorial]
- Colors: [specify or "your choice"]
- Typography: [specify or "distinctive choices"]
- Animations: [describe key moments]
```

### Dark Mode

```bash
@frontend-developer Add dark mode support:
- Toggle component in navigation
- Persist preference
- Smooth transitions
- Update all components
```

### Responsive Design

```bash
@frontend-developer Make [component] responsive:
- Mobile: stack vertically
- Tablet: 2-column grid
- Desktop: 3-column grid
- Breakpoints: 640px, 1024px, 1280px
```

---

## Performance

### Optimization Audit

```bash
@frontend-developer Load `frontend-patterns` dan audit:
- app/pages/dashboard.vue
- app/components/MarketList.vue

Focus pada bundle size dan re-renders.
```

### Specific Optimizations

```bash
# Virtualization
@frontend-developer Add virtualization ke MarketList untuk 500+ items

# Lazy Loading
@frontend-developer Lazy load semua components di bawah fold

# Memoization
@frontend-developer Add proper memoization ke expensive computations di [component]

# Code Splitting
@frontend-developer Code split routes dan heavy components
```

---

## State Management

### Pinia Store

```bash
@frontend-developer Create Pinia store untuk markets:
- State: markets, selectedMarket, filters
- Getters: activeMarkets, filteredMarkets
- Actions: fetchMarkets, selectMarket, updateFilters
```

### Composable

```bash
@frontend-developer Create composable useMarketData:
- Fetch market by ID
- Handle loading/error states
- Auto-refetch on ID change
- Return: { market, loading, error, refetch }
```

---

## Data Fetching

### useApi (Recommended - Custom Composable)

**IMPORTANT**: This project uses a custom `useApi` composable for all API calls.

```bash
@frontend Setup data fetching untuk users page:
- useApi untuk fetch users
- Automatic authentication
- Error handling dengan retry
- Loading skeleton
- Pagination

Gunakan app/composables/useApi.ts
```

**Quick Examples:**

```typescript
// GET request
const { data, pending, error } = await useApi<User[]>('/users')

// POST request (auto-uses $fetch)
const { data, error } = await useApi('/users', {
  method: 'POST',
  body: { name: 'John', email: 'john@example.com' },
})

// With query params
const { data } = await useApi('/users', {
  query: { page: 1, limit: 10 },
})

// Manual trigger (don't execute immediately)
const { execute } = await useApi('/users/123', {
  immediate: false,
})

// Error message accessible directly
if (error.value) {
  console.log(error.value.message) // "User not found"
}
```

**Benefits**:

- ✅ Automatic authentication (cookies)
- ✅ Smart SSR/CSR handling
- ✅ Consistent error.value.message
- ✅ Auto-401 redirect to login
- ✅ Type-safe with generics

### useFetch (Native - Only for External APIs)

```bash
@frontend Setup data fetching untuk external API:
- useFetch untuk third-party API
- Custom caching strategy
- Handle loading skeleton
- Error boundary

Prefer useApi for internal APIs.
```

### API Integration

```bash
@frontend Create API integration untuk markets menggunakan useApi:
- GET /api/markets (with filters)
- GET /api/markets/:id
- POST /api/markets (create)
- PATCH /api/markets/:id (update)
- DELETE /api/markets/:id (delete)

Include TypeScript types dan automatic error handling.
Use useApi composable untuk semua requests.
```

---

## Testing

### Unit Tests

```bash
@frontend-developer Load `tdd-workflow` dan write tests untuk Button:
- All variants render correctly
- Click handler works
- Disabled state prevents clicks
- Loading shows spinner
- Keyboard support works

Target: 80%+ coverage
```

### Integration Tests

```bash
@frontend-developer Integration test untuk CreateMarket flow:
1. Fill form fields
2. Validation works
3. Submit triggers API
4. Loading state shown
5. Success redirects to market page
6. Error shows toast

Use MSW untuk mock API.
```

---

## Accessibility

### Audit

```bash
@frontend-developer Load `web-design-guidelines` dan audit:
- app/pages/markets/index.vue
- app/components/MarketCard.vue

Check:
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Color contrast
- Screen reader support
```

### Fix Issues

```bash
@frontend-developer Fix accessibility issues:
- Add proper heading hierarchy
- ARIA labels untuk icon buttons
- Focus visible states
- Keyboard trap in modal
- Alt text untuk images
```

---

## Refactoring

### Component Refactor

```bash
@frontend-developer Load `vercel-composition-patterns` dan refactor UserProfile:
- Too many props (15+)
- Complex conditional rendering
- Hard to maintain

Gunakan compound components pattern.
```

### Code Quality

```bash
@frontend-developer Refactor untuk improve code quality:
- Extract magic numbers to constants
- Simplify deep nesting (use early returns)
- Remove code duplication
- Add missing types
- Improve function naming
```

---

## Forms & Validation

### Schema

```bash
@frontend-developer Create Zod schema untuk CreateMarket form:
- title: string, 5-200 chars
- description: string, 20-2000 chars
- endDate: future datetime
- category: enum
- tags: array, max 5 items
```

### Form Handling

```bash
@frontend-developer Implement form dengan:
- Real-time validation
- Error messages
- Submit disabled until valid
- Loading state
- Success/error handling
- Optimistic updates
```

---

## Animations

### Micro-interactions

```bash
@frontend-developer Add micro-interactions:

Buttons:
- Hover: scale 1.05
- Active: scale 0.98
- Click: ripple effect

Cards:
- Hover: lift + shadow
- Focus: outline
```

### Page Transitions

```bash
@frontend-developer Add page transitions:
- Fade in content: opacity 0 → 1
- Slide in from bottom: y 20px → 0
- Stagger children: 100ms delay each
- Duration: 500ms
- Easing: ease-out
```

---

## Error Handling

### Error Boundary

```bash
@frontend-developer Create ErrorBoundary component:
- Catch runtime errors
- Show user-friendly message
- Log to error tracking
- Retry button
- Fallback UI
```

### API Errors

```bash
@frontend-developer Implement error handling untuk API calls:
- Network errors
- 4xx client errors
- 5xx server errors
- Timeout errors
- Parse errors

Show appropriate toast messages.
```

---

## Code Review

### Review Request

```bash
@frontend-developer Review app/components/MarketCard.vue for:
- Performance issues
- Accessibility compliance
- Code quality
- Best practices
- Security concerns
```

### Pre-commit Review

```bash
@frontend-developer Review all changed files sebelum commit:
- TypeScript errors?
- Missing error handling?
- Performance concerns?
- Accessibility issues?
- Test coverage adequate?
```

---

## Common Patterns

### Loading States

```typescript
{loading && <Skeleton />}
{error && <ErrorMessage error={error} retry={refetch} />}
{!data && !loading && <EmptyState />}
{data && <DataDisplay data={data} />}
```

### Conditional Rendering

```typescript
// ✅ Use ternary for boolean conditions
{isLoggedIn ? <Dashboard /> : <Login />}

// ✅ Use && for optional rendering
{showBanner && <Banner />}

// ❌ Avoid complex nested ternaries
{isLoading ? <Spinner /> : error ? <Error /> : data ? <Data /> : null}
```

### Event Handlers

```typescript
// ✅ Use arrow functions for inline handlers
<button onClick={() => handleClick(id)}>

// ✅ Use useCallback for passed callbacks
const handleSearch = useCallback((query: string) => {
  setSearchQuery(query)
}, [])
```

---

## Debugging

### Component Debug

```bash
@frontend-developer Debug MarketCard component:
- Why re-rendering too much?
- Why props not updating?
- Why styles not applying?
- Why event handler not firing?

Add console logs dan explain what's happening.
```

### Performance Debug

```bash
@frontend-developer Profile performance di dashboard page:
- Identify slow renders
- Find unnecessary re-renders
- Locate large bundles
- Detect memory leaks

Gunakan Nuxt DevTools + browser Performance panel approach.
```

---

## Quick Commands

```bash
# Session Info
@frontend-developer What's the current session context?

# Skill Info
@frontend-developer List all available skills untuk frontend development

# Best Practices
@frontend-developer What's the best practice untuk [specific task]?

# Alternatives
@frontend-developer Ada cara lain yang lebih [simple/performant/maintainable]?

# Explain
@frontend-developer Explain kenapa [decision/pattern/choice]?

# Documentation
@frontend-developer Add JSDoc comments dan usage examples

# Examples
@frontend-developer Berikan contoh usage untuk component ini
```

---

## Hotkeys (Primary Agent Mode)

```
Tab          - Switch agents
Ctrl+P       - List actions
/undo        - Undo last change
/redo        - Redo change
/share       - Share conversation
@            - Mention agent/file
Ctrl+C       - Cancel current operation
```

---

## Memory Management

### Check Context

```bash
@frontend-developer What do you remember about this project?
```

### Reset Context

```bash
@frontend-developer Forget temporary debug code, keep architecture decisions
```

### Save Important Info

```bash
@frontend-developer Remember: we use Pinia for state, not Vuex
```

---

## Keyboard Shortcuts untuk Nuxt 4

```typescript
// Auto-imported - no need to import
const route = useRoute()
const router = useRouter()
const { data } = await useFetch('/api/data')
const config = useRuntimeConfig()

// SSR checks
if (process.client) { /* browser only */ }
if (process.server) { /* server only */ }

// Client-only component
<ClientOnly><BrowserComponent /></ClientOnly>
```

---

## Emergency Commands

```bash
# Rollback changes
/undo

# Fix TypeScript errors
@frontend-developer Fix all TypeScript errors di current file

# Quick accessibility fix
@frontend-developer Quick accessibility audit + fixes untuk [component]

# Performance emergency
@frontend-developer Page is slow, quick wins untuk improve performance?

# Production blocker
@frontend-developer URGENT: [describe issue], need fix ASAP
```

---

## Template Requests

### New Feature

```bash
@frontend-developer New feature: [describe]

Requirements:
- [list requirements]

Components needed:
- [list components]

Skills to load:
- [relevant skills]

Timeline: [urgent/normal/low priority]
```

### Bug Fix

```bash
@frontend-developer Bug in [component/page]:

Issue: [describe what's wrong]
Expected: [what should happen]
Actual: [what happens]
Steps to reproduce: [list steps]

Please debug and fix.
```

### Refactor Request

```bash
@frontend-developer Refactor [component/module]:

Current issues:
- [list problems]

Goals:
- [list goals]

Constraints:
- [list constraints]

Maintain existing functionality.
```

---

## Pro Tips

1. **Be Specific**: More context = better results
2. **Iterative**: Start simple, then enhance
3. **Review**: Always ask agent to review their work
4. **Skills**: Load relevant skills explicitly
5. **Context**: Help agent remember important decisions
6. **Accessibility**: Always remind about a11y
7. **Performance**: Mention performance concerns upfront
8. **Tests**: Ask for tests alongside implementation

---

**Print this and keep it handy! 📌**

Common questions? Check README.md or ask:

```bash
@frontend-developer How do I [question]?
```
