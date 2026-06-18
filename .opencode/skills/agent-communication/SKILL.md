---
name: agent-communication
description: 'Communication style guidelines, error handling patterns, and conflict resolution templates for AI coding agents.'
---

# Agent Communication

Guidelines for clear, structured communication with users and consistent error handling patterns.

## Communication Style

### When Planning

- Think out loud about approach
- Explain trade-offs and decisions
- Ask for clarification when needed
- Propose alternatives when appropriate
- Always use the question tool with structured options for any choice point

### When Implementing

- Announce file changes before making them
- Explain non-obvious code patterns
- Note any deviations from standards (with reasoning)
- Keep diffs focused and review-friendly

### When Reviewing

- Be specific about issues found
- Provide actionable suggestions
- Explain the "why" behind recommendations
- Celebrate good patterns when seen

### Example Communication

```markdown
I'm going to create a new MarketCard component in `app/components/markets/MarketCard.vue`.

This component will:

- Accept market data as props
- Display name, status, and key metrics
- Handle loading and error states
- Include hover animations for better UX

I'm using the existing pattern from UserCard.vue for consistency.
```

## Error Handling & Edge Cases

### Form Validation

```typescript
// Comprehensive validation with Zod
const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be 8+ characters'),
  age: z.number().min(18, 'Must be 18+').optional(),
});

try {
  const validated = schema.parse(formData);
} catch (error) {
  if (error instanceof z.ZodError) {
    setErrors(error.flatten().fieldErrors);
  }
}
```

### Loading States

```typescript
// All states handled
{ loading && <Skeleton /> }
{ error && <ErrorMessage error={error} retry={refetch} /> }
{ !data && !loading && <EmptyState /> }
{ data && <DataDisplay data={data} /> }
```

### Network Failures

```typescript
// Retry logic with exponential backoff
async function fetchWithRetry(url: string, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetch(url);
    } catch (error) {
      if (i === retries - 1) throw error;
      await sleep(Math.pow(2, i) * 1000);
    }
  }
}
```

## Conflict Resolution & Escalation

When encountering blockers or conflicting requirements:

1. **Technical constraints**: If requirements conflict with technical feasibility, explain the trade-off and propose an alternative.
2. **Unclear requirements**: Use the question tool with structured options. Never ask open-ended questions.
3. **Scope creep**: If the request expands beyond the original task, flag it explicitly and ask the user whether to proceed.
4. **Cross-agent conflicts**: If contracts between agents don't align, document the mismatch and escalate to IT Leader.
5. **Security concerns**: If a request introduces security risk, stop implementation, flag it to the user, and request a security review.

## Testing Mindset

When writing components or functions, consider testability:

```typescript
// GOOD: Easy to test — pure function, clear inputs/outputs
export function formatMarketData(market: Market): FormattedMarket {
  return {
    name: market.name,
    volumeFormatted: formatCurrency(market.volume),
    changePercent: market.change24h.toFixed(2),
  };
}

// GOOD: Composable with mockable dependencies
export function useMarketData(marketId: Ref<string>) {
  const data = ref<Market | null>(null);
  const loading = ref(false);

  const fetch = async () => {
    loading.value = true;
    data.value = await fetchMarket(marketId.value);
    loading.value = false;
  };

  watch(marketId, fetch, { immediate: true });
  return { data, loading, fetch };
}
```

## Continuous Learning

Stay updated on:

- Framework latest features (Vue/Nuxt, React/Next.js, etc.)
- Web performance best practices
- Accessibility standards
- Design trends and patterns
- New browser APIs

When encountering new patterns or tools:

1. Research thoroughly using MCP documentation servers
2. Understand trade-offs
3. Test in isolation
4. Document learnings
