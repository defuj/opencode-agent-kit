# 🔌 MCP Integration Guide - Frontend Developer Agent

Model Context Protocol (MCP) integration untuk Frontend Developer Agent dengan fokus pada Nuxt.js stack.

---

## 📋 Table of Contents

1. [What is MCP?](#what-is-mcp)
2. [Available MCP Servers](#available-mcp-servers)
3. [Usage Examples](#usage-examples)
4. [Best Practices](#best-practices)
5. [Troubleshooting](#troubleshooting)

---

## What is MCP?

**Model Context Protocol (MCP)** adalah standar protocol yang memungkinkan AI assistants mengakses external data sources dan tools secara terstruktur.

### Benefits

✅ **Accurate Information** - Langsung dari official docs, bukan hallucination  
✅ **Always Updated** - Selalu menggunakan latest docs  
✅ **Tool Integration** - Browser automation, design file access  
✅ **Structured Data** - JSON responses yang konsisten

---

## Available MCP Servers

Project ini menggunakan **4 MCP servers**:

### 1. 🟢 Nuxt MCP (Always Active)

**URL**: `https://nuxt.com/mcp`  
**Status**: ✅ Active  
**Permission**: Allow

#### Purpose

Official Nuxt.js documentation, blog posts, deployment guides, dan migration help.

#### Available Tools

| Tool                        | Description             | Example Use                  |
| --------------------------- | ----------------------- | ---------------------------- |
| `list_documentation_pages`  | Browse all Nuxt docs    | Get overview of v4 features  |
| `get_documentation_page`    | Get specific doc page   | Fetch useFetch documentation |
| `get_getting_started_guide` | Quick start guide       | New to Nuxt setup            |
| `list_blog_posts`           | Browse blog posts       | Find release notes           |
| `get_blog_post`             | Get blog content        | Read Nuxt 4 announcement     |
| `list_deploy_providers`     | List hosting options    | See deployment options       |
| `get_deploy_provider`       | Deployment instructions | Get Vercel setup guide       |

#### Available Prompts

```bash
find_documentation_for_topic    # Find best docs for a topic
deployment_guide                # Get deployment instructions
migration_help                  # Nuxt version migration
```

#### When to Use

- ✅ Looking up Nuxt 4 features or APIs
- ✅ Understanding composables (`useFetch`, `useRoute`, `useState`)
- ✅ SSR/SSG implementation patterns
- ✅ Auto-imports and directory structure
- ✅ Deployment configuration
- ✅ Migration from Nuxt 3 to Nuxt 4
- ✅ Server API routes and Nitro

#### Example Queries

```
User: "How does useFetch work in Nuxt 4?"
Agent:
1. Use Nuxt MCP: get_documentation_page for "useFetch"
2. Read official API documentation
3. Explain with accurate examples
4. Implement using official patterns
```

```
User: "Show me file-based routing in Nuxt 4"
Agent:
1. Use Nuxt MCP: find_documentation_for_topic("routing")
2. Get pages directory documentation
3. Explain with examples (index.vue, [id].vue, etc.)
```

---

### 2. 🟢 Nuxt UI MCP (Always Active)

**URL**: `https://ui.nuxt.com/mcp`  
**Status**: ✅ Active  
**Permission**: Allow

#### Purpose

Complete Nuxt UI component library documentation dan examples.

#### Available Resources

**Form Components**:

- `UForm` - Form wrapper dengan validation
- `UFormGroup` - Form field group dengan label
- `UInput` - Text input
- `UTextarea` - Multi-line text
- `USelect` - Dropdown select
- `USelectMenu` - Advanced select dengan search
- `UCheckbox` - Checkbox input
- `URadio` - Radio button
- `URadioGroup` - Radio group
- `UToggle` - Toggle switch
- `URangeSlider` - Range slider

**Button Components**:

- `UButton` - Button dengan variants
- `UButtonGroup` - Button group

**Layout Components**:

- `UCard` - Card container dengan slots
- `UContainer` - Max-width container
- `UDivider` - Horizontal/vertical divider
- `UPage` - Page wrapper
- `UPageHeader` - Page header
- `UPageBody` - Page body
- `UPageGrid` - Page grid layout

**Navigation Components**:

- `UDropdown` - Dropdown menu
- `UCommandPalette` - Command palette (⌘K)
- `UTabs` - Tabs navigation
- `UBreadcrumb` - Breadcrumb navigation
- `UVerticalNavigation` - Sidebar navigation
- `UHorizontalNavigation` - Horizontal nav
- `UPagination` - Pagination

**Feedback Components**:

- `UNotification` - Toast notifications
- `UNotifications` - Notification container
- `UModal` - Modal dialog
- `USlideover` - Slide-over panel
- `UAlert` - Alert messages
- `UProgress` - Progress bar
- `USkeleton` - Loading skeleton

**Data Display**:

- `UTable` - Data table
- `UBadge` - Badge/tag
- `UAvatar` - Avatar image
- `UAvatarGroup` - Avatar group
- `UMeter` - Meter/progress
- `UKbd` - Keyboard shortcut

**And More**: Check Nuxt UI MCP for complete list!

#### When to Use

- ✅ Building ANY UI component (check Nuxt UI first!)
- ✅ Implementing forms with validation
- ✅ Creating modals, dropdowns, notifications
- ✅ Data tables and lists
- ✅ Navigation (tabs, breadcrumbs, pagination)
- ✅ Dark mode implementation
- ✅ Theme customization
- ✅ Icons and typography

#### Example Queries

```
User: "Create a form for market creation"
Agent:
1. Check Nuxt UI MCP for form components
2. Find: UForm, UFormGroup, UInput, UTextarea, UButton
3. Get props and usage examples
4. Implement using Nuxt UI components
```

```
User: "Add a notification when market is created"
Agent:
1. Check Nuxt UI MCP for UNotification
2. Learn usage: useToast() composable
3. Implement toast notification
```

---

### 3. 🟢 Playwright MCP (Always Active)

**Command**: `npx @modelcontextprotocol/server-playwright`  
**Status**: ✅ Active  
**Permission**: Allow

#### Purpose

Browser automation dan E2E testing dengan Playwright.

#### Available Capabilities

**Browser Automation**:

- Navigate to pages
- Click elements
- Fill forms
- Select dropdowns
- Upload files
- Take screenshots
- Record videos

**Testing Features**:

- Assertions (expect API)
- Network interception
- Mock API responses
- Wait for elements
- Auto-waiting
- Retry assertions

**Performance**:

- Measure load times
- Core Web Vitals (LCP, FID, CLS)
- Network performance
- JavaScript execution time

**Accessibility**:

- ARIA role testing
- Keyboard navigation
- Screen reader compatibility
- Color contrast

#### When to Use

- ✅ Writing E2E tests for critical user flows
- ✅ Testing form submissions
- ✅ Verifying navigation and routing
- ✅ Visual regression testing
- ✅ Performance measurement
- ✅ Accessibility audits
- ✅ Integration testing

#### Example Usage

```typescript
// E2E Test: Create Market Flow
import { test, expect } from '@playwright/test'

test('user can create new market', async ({ page }) => {
  // Navigate
  await page.goto('/markets/create')

  // Fill form
  await page.fill('[name="title"]', 'Bitcoin Price 2024')
  await page.fill('[name="description"]', 'Will Bitcoin reach $100k?')
  await page.selectOption('[name="category"]', 'crypto')

  // Submit
  await page.click('button[type="submit"]')

  // Verify success
  await expect(page).toHaveURL(/\/markets\/\d+/)
  await expect(page.locator('h1')).toContainText('Bitcoin Price 2024')
})

// Visual Regression Test
test('market card renders correctly', async ({ page }) => {
  await page.goto('/markets')
  const card = page.locator('[data-testid="market-card"]').first()
  await expect(card).toHaveScreenshot('market-card.png')
})

// Accessibility Test
test('form is accessible', async ({ page }) => {
  await page.goto('/markets/create')

  // Check keyboard navigation
  await page.keyboard.press('Tab')
  await expect(page.locator(':focus')).toHaveAttribute('name', 'title')

  // Check ARIA labels
  await expect(page.locator('label[for="title"]')).toBeVisible()

  // Check required fields
  await expect(page.locator('[name="title"]')).toHaveAttribute('aria-required', 'true')
})
```

---

### 4. 🟡 Figma MCP (On Request)

**Command**: `npx @modelcontextprotocol/server-figma`  
**Status**: ⚠️ Requires Setup  
**Permission**: Ask

#### Purpose

Access Figma design files untuk extract design tokens dan inspect components.

#### Setup Required

```bash
# User needs to provide Figma Personal Access Token
# Get from: https://www.figma.com/developers/api#access-tokens

export FIGMA_ACCESS_TOKEN="figd_your_token_here"
```

#### Available Capabilities

**Design Inspection**:

- Get file structure
- Read component properties
- Extract styles (colors, typography, spacing)
- Get component variants
- Access design tokens

**Asset Export**:

- Export images
- Get SVG code
- Download assets
- Get component screenshots

#### When to Use

- ✅ Implementing designs from Figma
- ✅ Extracting exact colors, spacing, typography
- ✅ Verifying component specifications
- ✅ Getting design assets (icons, images)
- ✅ Creating design system from Figma

#### Example Usage

```typescript
// After user provides Figma file URL and token

// Extract color palette
const colors = await getFigmaStyles(fileId, 'FILL')
// Result: { primary: '#3b82f6', secondary: '#8b5cf6', ... }

// Get component specs
const buttonSpecs = await getFigmaComponent(fileId, 'Button')
// Result: {
//   variants: ['primary', 'secondary', 'ghost'],
//   sizes: ['sm', 'md', 'lg'],
//   padding: { sm: '8px 12px', md: '12px 16px' },
//   borderRadius: '6px'
// }

// Implement with exact values
<UButton
  :style="{
    padding: buttonSpecs.padding.md,
    borderRadius: buttonSpecs.borderRadius
  }"
>
  Submit
</UButton>
```

---

## Usage Examples

### Example 1: Building a Market Card

```markdown
User: "Create a MarketCard component to display market information"

Agent Workflow:

1. CHECK NUXT UI MCP:
   Query: "What card components are available?"
   Found: UCard with header, body, footer slots
2. CHECK NUXT MCP:
   Query: "Component structure best practices in Nuxt 4"
   Found: Use <script setup lang="ts">, auto-imports
3. IMPLEMENT:
```

```vue
<script setup lang="ts">
// From Nuxt MCP: composables are auto-imported
interface Props {
  market: Market
}

const props = defineProps<Props>()

// From Nuxt MCP: router composables auto-imported
const router = useRouter()

const navigateToMarket = () => {
  router.push(`/markets/${props.market.id}`)
}
</script>

<template>
  <!-- From Nuxt UI MCP: UCard component -->
  <UCard
    :ui="{
      body: { padding: 'p-4 sm:p-6' },
      header: { padding: 'p-4 sm:p-6' },
    }"
    @click="navigateToMarket"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold">
          {{ market.title }}
        </h3>
        <!-- From Nuxt UI MCP: UBadge component -->
        <UBadge :color="market.status === 'active' ? 'green' : 'gray'">
          {{ market.status }}
        </UBadge>
      </div>
    </template>

    <p class="text-gray-600 dark:text-gray-400">
      {{ market.description }}
    </p>

    <template #footer>
      <!-- From Nuxt UI MCP: UButton component -->
      <UButton variant="ghost" block> View Details </UButton>
    </template>
  </UCard>
</template>
```

```markdown
4. TEST WITH PLAYWRIGHT MCP:
```

```typescript
test('market card is interactive', async ({ page }) => {
  await page.goto('/markets')
  const card = page.locator('[data-testid="market-card"]').first()

  // Click card
  await card.click()

  // Should navigate to market detail
  await expect(page).toHaveURL(/\/markets\/\d+/)
})
```

---

### Example 2: Form with Validation

```markdown
User: "Create form for creating a market with validation"

Agent Workflow:

1. CHECK NUXT UI MCP:
   Components: UForm, UFormGroup, UInput, UTextarea, UButton
   Validation: Supports Zod schema
2. CHECK NUXT MCP:
   Form handling: useForm composable (if available)
   Validation: Zod integration
3. IMPLEMENT:
```

```vue
<script setup lang="ts">
import { z } from 'zod'

// Validation schema
const schema = z.object({
  title: z.string().min(5, 'Min 5 characters').max(200, 'Max 200 characters'),
  description: z.string().min(20, 'Min 20 characters').max(2000, 'Max 2000 chars'),
  category: z.enum(['sports', 'politics', 'crypto', 'entertainment']),
  endDate: z.string().refine((date) => new Date(date) > new Date(), {
    message: 'End date must be in the future',
  }),
})

type Schema = z.output<typeof schema>

const state = reactive({
  title: '',
  description: '',
  category: undefined,
  endDate: '',
})

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    const result = await $fetch('/api/markets', {
      method: 'POST',
      body: event.data,
    })

    toast.add({
      title: 'Market created!',
      description: 'Your market has been published',
      color: 'green',
    })

    navigateTo(`/markets/${result.id}`)
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Failed to create market',
      color: 'red',
    })
  }
}
</script>

<template>
  <!-- From Nuxt UI MCP: UForm component with validation -->
  <UForm :schema="schema" :state="state" @submit="onSubmit">
    <!-- From Nuxt UI MCP: UFormGroup with validation -->
    <UFormGroup label="Title" name="title" required>
      <UInput v-model="state.title" placeholder="Enter market title" />
    </UFormGroup>

    <UFormGroup label="Description" name="description" required>
      <UTextarea v-model="state.description" placeholder="Describe your market" :rows="5" />
    </UFormGroup>

    <UFormGroup label="Category" name="category" required>
      <USelect
        v-model="state.category"
        :options="[
          { label: 'Sports', value: 'sports' },
          { label: 'Politics', value: 'politics' },
          { label: 'Crypto', value: 'crypto' },
          { label: 'Entertainment', value: 'entertainment' },
        ]"
      />
    </UFormGroup>

    <UFormGroup label="End Date" name="endDate" required>
      <UInput v-model="state.endDate" type="datetime-local" />
    </UFormGroup>

    <UButton type="submit" block> Create Market </UButton>
  </UForm>
</template>
```

```markdown
4. TEST WITH PLAYWRIGHT MCP:
```

```typescript
test('form validation works', async ({ page }) => {
  await page.goto('/markets/create')

  // Try submit without filling
  await page.click('button[type="submit"]')

  // Should show validation errors
  await expect(page.locator('.text-red-500')).toContainText('Min 5 characters')

  // Fill form with valid data
  await page.fill('[name="title"]', 'Bitcoin Price Prediction')
  await page.fill('[name="description"]', 'Will Bitcoin reach $100k by end of 2024?')
  await page.selectOption('[name="category"]', 'crypto')
  await page.fill('[name="endDate"]', '2024-12-31T23:59')

  // Submit
  await page.click('button[type="submit"]')

  // Should navigate to market page
  await expect(page).toHaveURL(/\/markets\/\d+/)
})
```

---

### Example 3: Deploy to Vercel

```markdown
User: "How do I deploy this Nuxt app to Vercel?"

Agent Workflow:

1. CHECK NUXT MCP:
   Tool: get_deploy_provider('vercel')
2. GET INSTRUCTIONS:
   - Install Vercel CLI or use dashboard
   - Nuxt preset auto-detected
   - Environment variables setup
   - Build configuration
3. PROVIDE STEPS:
```

```bash
# Option 1: Vercel CLI
npm i -g vercel
vercel

# Option 2: Git Integration (Recommended)
# 1. Push code to GitHub
git add .
git commit -m "feat: ready for deployment"
git push

# 2. Go to vercel.com/new
# 3. Import repository
# 4. Vercel auto-detects Nuxt
# 5. Add environment variables
# 6. Deploy!

# Environment Variables to set:
# - NUXT_PUBLIC_API_URL
# - DATABASE_URL
# - etc.
```

---

## Best Practices

### DO ✅

1. **Always Check MCP First**

   ```markdown
   Before implementing, ask:

   - Is there a Nuxt UI component for this?
   - What's the official Nuxt pattern?
   - How does the API actually work?
   ```

2. **Use Nuxt UI Components**

   ```vue
   <!-- ✅ GOOD: Use Nuxt UI -->
   <UButton variant="solid" color="primary">Submit</UButton>

   <!-- ❌ BAD: Custom button -->
   <button class="btn btn-primary">Submit</button>
   ```

3. **Verify API with MCP**

   ```typescript
   // ✅ GOOD: Check Nuxt MCP for correct API
   const { data } = await useFetch('/api/markets', {
     query: { status: 'active' },
     transform: (data) => data.markets,
   })

   // ❌ BAD: Guess the API
   const data = await fetch('/api/markets?status=active').then((r) => r.json())
   ```

4. **Write Tests with Playwright**

   ```typescript
   // ✅ GOOD: Comprehensive E2E test
   test('critical user flow', async ({ page }) => {
     // Test complete user journey
   })
   ```

5. **Announce MCP Usage**
   ```markdown
   📚 Checking Nuxt UI MCP for available components...
   Found UButton with these props: [list props]
   Implementing now with official API.
   ```

### DON'T ❌

1. **Don't Create Custom Components Unnecessarily**

   ```vue
   <!-- ❌ BAD: Custom card when UCard exists -->
   <div class="custom-card">
     <div class="custom-card-header">...</div>
   </div>

   <!-- ✅ GOOD: Use UCard -->
   <UCard>
     <template #header>...</template>
   </UCard>
   ```

2. **Don't Guess API Usage**

   ```typescript
   // ❌ BAD: Guessing useFetch options
   useFetch('/api/data', { cache: true }) // cache option doesn't exist!

   // ✅ GOOD: Check Nuxt MCP for correct options
   useFetch('/api/data', {
     key: 'data',
     lazy: true,
     server: true,
   })
   ```

3. **Don't Skip Testing**

   ```typescript
   // ❌ BAD: No tests
   // Just ship it!

   // ✅ GOOD: Test critical flows
   test('user can complete checkout', async ({ page }) => {
     // Test the flow
   })
   ```

4. **Don't Ignore Documentation**
   ```markdown
   ❌ BAD: "I think it works like this..."
   ✅ GOOD: "According to Nuxt MCP, the correct way is..."
   ```

---

## Troubleshooting

### MCP Server Not Responding

```bash
# Check MCP connection
opencode mcp status

# Reconnect
opencode mcp reconnect nuxt
opencode mcp reconnect nuxt-ui
```

### Figma MCP Not Working

```bash
# Check token is set
echo $FIGMA_ACCESS_TOKEN

# If not set, add to .env or shell profile
export FIGMA_ACCESS_TOKEN="figd_your_token_here"

# Restart OpenCode
```

### Playwright Tests Failing

```bash
# Install browsers
npx playwright install

# Run in headed mode for debugging
npx playwright test --headed

# Run with UI
npx playwright test --ui
```

### Wrong Documentation Version

```typescript
// Specify Nuxt version when querying
list_documentation_pages({ version: '4.x' }) // Not 3.x

// Or check which version docs you're reading
get_documentation_page({ path: '/guide/directory-structure/app' })
// Make sure it says "Nuxt 4" at the top
```

---

## MCP Command Reference

### Nuxt MCP

```bash
# List all docs
list_documentation_pages()
list_documentation_pages({ version: '4.x' })

# Get specific doc
get_documentation_page({ path: '/api/composables/use-fetch' })

# Search for topic
find_documentation_for_topic({ topic: 'server api routes' })

# Get deployment guide
get_deploy_provider({ provider: 'vercel' })
list_deploy_providers()

# Migration help
migration_help({ from: '3.x', to: '4.x' })
```

### Nuxt UI MCP

```bash
# Browse components
# Check MCP for available queries

# Get component docs
# [Component documentation URLs from ui.nuxt.com]
```

### Playwright MCP

```typescript
// Run test
await page.goto(url)
await page.click(selector)
await page.fill(selector, value)
await expect(page.locator(selector)).toBeVisible()

// Screenshot
await page.screenshot({ path: 'screenshot.png' })

// Performance
const metrics = await page.evaluate(() => performance.getEntriesByType('navigation'))
```

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────────┐
│ MCP INTEGRATION - Quick Reference                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ BEFORE IMPLEMENTING:                                         │
│   1. Check Nuxt UI MCP for components                       │
│   2. Check Nuxt MCP for framework patterns                  │
│   3. Implement using official APIs                          │
│   4. Test with Playwright MCP                               │
│                                                              │
│ AVAILABLE MCPs:                                              │
│   🟢 Nuxt         - https://nuxt.com/mcp                    │
│   🟢 Nuxt UI      - https://ui.nuxt.com/mcp                 │
│   🟢 Playwright   - Browser automation                      │
│   🟡 Figma        - Design files (requires token)           │
│                                                              │
│ COMMON QUERIES:                                              │
│   • "What Nuxt UI components are available?"                │
│   • "How does useFetch work in Nuxt 4?"                     │
│   • "Show me file-based routing structure"                  │
│   • "Get deployment guide for Vercel"                       │
│                                                              │
│ REMEMBER:                                                    │
│   ✅ MCP first, custom last                                 │
│   ✅ Verify APIs, don't guess                               │
│   ✅ Use Nuxt UI components                                 │
│   ✅ Test with Playwright                                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

**Happy coding with MCP! 🚀**

For more information:

- Nuxt MCP Docs: https://nuxt.com/docs/guide/ai/mcp
- Nuxt UI: https://ui.nuxt.com
- Playwright: https://playwright.dev
