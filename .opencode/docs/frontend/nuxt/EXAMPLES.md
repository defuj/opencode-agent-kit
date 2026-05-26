# Frontend Developer Agent - Contoh Praktis

Dokumen ini berisi contoh-contoh praktis penggunaan Frontend Developer Agent untuk berbagai skenario development.

## Daftar Isi

1. [Component Development](#1-component-development)
2. [Nuxt UI Integration](#2-nuxt-ui-integration)
3. [API Integration](#3-api-integration)
4. [Form Handling](#4-form-handling)
5. [State Management](#5-state-management)
6. [Performance Optimization](#6-performance-optimization)
7. [Accessibility Review](#7-accessibility-review)
8. [Bug Fixing](#8-bug-fixing)

---

## 1. Component Development

### Skenario: Membuat Product Card Component

**Prompt:**

```
@frontend Saya butuh ProductCard component untuk e-commerce dengan fitur:
- Gambar produk dengan lazy loading
- Badge untuk discount
- Rating stars
- Add to cart button
- Wishlist toggle
- Support dark mode
- Accessible (WCAG 2.1)

Gunakan Nuxt UI components sebisa mungkin.
```

**Output yang Diharapkan:**

- `app/components/product/ProductCard.vue` menggunakan `<UCard>`, `<UBadge>`, `<UButton>`
- TypeScript interfaces untuk Product type
- Composable `useProduct` untuk business logic
- Accessible markup dengan ARIA labels
- Responsive design dengan Tailwind
- Unit tests dengan Vitest

**Agent akan:**

1. ✅ Check MCP Nuxt UI untuk available components
2. ✅ Load skill `nuxt-ui` untuk component patterns
3. ✅ Load skill `building-components` untuk best practices
4. ✅ Load skill `web-design-guidelines` untuk accessibility
5. ✅ Create component dengan TypeScript strict mode
6. ✅ Add comprehensive tests

---

## 2. Nuxt UI Integration

### Skenario: Dashboard Layout dengan Sidebar

**Prompt:**

```
@frontend Build dashboard layout dengan:
- Collapsible sidebar navigation
- Top header dengan user menu
- Breadcrumb navigation
- Main content area
- Toast notifications
- Command palette (Cmd+K)

Gunakan Nuxt UI App components.
```

**Output yang Diharapkan:**

- Layout menggunakan `<UDashboard>` components
- `<UVerticalNavigation>` untuk sidebar
- `<UCommandPalette>` untuk search
- `<UToast>` untuk notifications
- Dark mode toggle
- Responsive mobile menu

**Agent akan:**

1. ✅ Query Nuxt UI MCP untuk Dashboard components
2. ✅ Check documentation untuk `<UDashboard>` API
3. ✅ Implement dengan Nuxt 4 app/ directory structure
4. ✅ Add keyboard shortcuts
5. ✅ Test responsive behavior

---

## 3. API Integration

### Skenario: Data Fetching dengan Error Handling

**Prompt:**

```
@frontend Implement user list page dengan:
- Fetch dari /api/users
- Loading skeleton
- Error state dengan retry
- Pagination
- Search dan filter
- Optimistic updates untuk delete

Gunakan useApi composable (app/composables/useApi.ts)
```

**Output yang Diharapkan:**

- `app/pages/users/index.vue` dengan `useApi`
- Error handling dengan `<UAlert>`
- Loading states dengan `<USkeleton>`
- Pagination dengan `<UPagination>`
- Search dengan debounce

**Agent akan:**

1. ✅ Load skill `frontend-patterns` untuk data fetching
2. ✅ Use custom `useApi` composable (recommended pattern)
3. ✅ Implement error boundaries
4. ✅ Add loading states
5. ✅ Handle authentication automatically

**Code Example (Recommended - Using useApi):**

```vue
<script setup lang="ts">
interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
}

const page = ref(1)
const search = ref('')

// ✅ BEST: Use useApi for automatic auth + error handling
const {
  data: response,
  pending,
  error,
  refresh,
} = await useApi<User[]>('/users', {
  query: { page, search },
  watch: [page, search],
})

// Access users from response.data
const users = computed(() => response.value?.data || [])

const handleDelete = async (id: string) => {
  // Optimistic update
  const originalUsers = users.value
  users.value = users.value.filter((u) => u.id !== id)

  // Use useApi for delete
  const { error: deleteError } = await useApi(`/users/${id}`, {
    method: 'DELETE',
  })

  if (deleteError.value) {
    // Rollback on error
    users.value = originalUsers
    useToast().add({
      title: 'Error',
      description: deleteError.value.message,
      color: 'red',
    })
  } else {
    useToast().add({
      title: 'Success',
      description: 'User deleted successfully',
    })
  }
}
</script>

<template>
  <UContainer>
    <div class="space-y-4">
      <UInput v-model="search" placeholder="Search users..." />

      <div v-if="pending">
        <USkeleton v-for="i in 5" :key="i" class="h-20" />
      </div>

      <UAlert v-else-if="error" color="red" :description="error.message">
        <template #actions>
          <UButton @click="refresh">Retry</UButton>
        </template>
      </UAlert>

      <div v-else>
        <UCard v-for="user in users" :key="user.id">
          <template #header>
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-semibold">{{ user.name }}</h3>
                <p class="text-sm text-gray-500">{{ user.email }}</p>
              </div>
              <UBadge :color="user.role === 'admin' ? 'blue' : 'gray'">
                {{ user.role }}
              </UBadge>
            </div>
          </template>

          <template #footer>
            <UButton color="red" variant="ghost" @click="handleDelete(user.id)"> Delete </UButton>
          </template>
        </UCard>
      </div>

      <UPagination v-model="page" :total="100" />
    </div>
  </UContainer>
</template>
```

**Alternative (Using native useFetch):**

```vue
<script setup lang="ts">
// ⚠️ Only use this if you need custom caching or external API
const {
  data: users,
  pending,
  error,
  refresh,
} = await useFetch<User[]>('/api/users', {
  query: { page, search },
  watch: [page, search],
})
</script>
```

**Key Differences - useApi vs useFetch:**

| Feature         | useApi                   | useFetch             |
| --------------- | ------------------------ | -------------------- |
| Authentication  | ✅ Automatic             | ⚠️ Manual            |
| Error message   | ✅ `error.value.message` | ❌ Need to extract   |
| 401 Redirect    | ✅ Automatic             | ❌ Manual            |
| SSR/CSR Smart   | ✅ Yes                   | ✅ Yes               |
| Type Safety     | ✅ Generic `<T>`         | ✅ Generic `<T>`     |
| POST/PUT/DELETE | ✅ Auto-$fetch           | ⚠️ Need useAsyncData |

**IMPORTANT: Always prefer `useApi` for this project's API calls.**
@frontend Implement user list page dengan:

- Fetch dari /api/users
- Loading skeleton
- Error state dengan retry
- Pagination
- Search dan filter
- Optimistic updates untuk delete

````

**Output yang Diharapkan:**

- `app/pages/users/index.vue` dengan `useFetch`
- Error handling dengan `<UAlert>`
- Loading states dengan `<USkeleton>`
- Pagination dengan `<UPagination>`
- Search dengan debounce

**Agent akan:**

1. ✅ Load skill `frontend-patterns` untuk data fetching
2. ✅ Use Nuxt 4 `useFetch` dengan proper typing
3. ✅ Implement error boundaries
4. ✅ Add loading states
5. ✅ Create reusable composable

**Code Example:**

```vue
<script setup lang="ts">
interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
}

const page = ref(1)
const search = ref('')

const {
  data: users,
  pending,
  error,
  refresh,
} = await useFetch<User[]>('/api/users', {
  query: { page, search },
  watch: [page, search],
})

const handleDelete = async (id: string) => {
  // Optimistic update
  users.value = users.value?.filter((u) => u.id !== id)

  try {
    await $fetch(`/api/users/${id}`, { method: 'DELETE' })
  } catch (err) {
    // Rollback on error
    await refresh()
  }
}
</script>

<template>
  <UContainer>
    <div class="space-y-4">
      <UInput v-model="search" placeholder="Search users..." />

      <div v-if="pending">
        <USkeleton v-for="i in 5" :key="i" class="h-20" />
      </div>

      <UAlert v-else-if="error" color="red" :description="error.message">
        <template #actions>
          <UButton @click="refresh">Retry</UButton>
        </template>
      </UAlert>

      <div v-else>
        <UCard v-for="user in users" :key="user.id">
          <!-- User content -->
        </UCard>
      </div>

      <UPagination v-model="page" :total="100" />
    </div>
  </UContainer>
</template>
````

---

## 4. Form Handling

### Skenario: Complex Form dengan Validation

**Prompt:**

```
@frontend Create user profile form dengan:
- Multiple steps (Personal, Contact, Preferences)
- Real-time validation
- File upload untuk avatar
- Auto-save draft
- Success/error toast
- Accessible form labels
```

**Output yang Diharapkan:**

- Multi-step form dengan `<UForm>`
- Validation dengan Zod schema
- `<UFormGroup>` untuk field groups
- File upload dengan preview
- Auto-save dengan debounce

**Agent akan:**

1. ✅ Check Nuxt UI Form components via MCP
2. ✅ Load skill `frontend-patterns` untuk form handling
3. ✅ Implement validation dengan Zod
4. ✅ Add accessibility features
5. ✅ Create composable untuk form state

**Code Example:**

```vue
<script setup lang="ts">
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  avatar: z.instanceof(File).optional(),
})

type FormData = z.infer<typeof schema>

const state = reactive<FormData>({
  name: '',
  email: '',
  avatar: undefined,
})

const { pending, error, execute } = useFetch('/api/profile', {
  method: 'POST',
  body: state,
  immediate: false,
})

const onSubmit = async () => {
  await execute()
  if (!error.value) {
    useToast().add({ title: 'Profile updated!' })
  }
}

// Auto-save draft
watchDebounced(
  state,
  () => {
    localStorage.setItem('profile-draft', JSON.stringify(state))
  },
  { debounce: 1000 }
)
</script>

<template>
  <UForm :schema="schema" :state="state" @submit="onSubmit">
    <UFormGroup label="Name" name="name" required>
      <UInput v-model="state.name" />
    </UFormGroup>

    <UFormGroup label="Email" name="email" required>
      <UInput v-model="state.email" type="email" />
    </UFormGroup>

    <UFormGroup label="Avatar" name="avatar">
      <UInput type="file" accept="image/*" />
    </UFormGroup>

    <UButton type="submit" :loading="pending"> Save Profile </UButton>
  </UForm>
</template>
```

---

## 5. State Management

### Skenario: Shopping Cart dengan Pinia

**Prompt:**

```
@frontend Implement shopping cart dengan:
- Add/remove items
- Update quantity
- Calculate total
- Persist to localStorage
- Sync across tabs
- Optimistic updates
```

**Output yang Diharapkan:**

- `app/stores/cart.ts` Pinia store
- Composable `useCart` untuk easy access
- LocalStorage persistence
- BroadcastChannel untuk sync
- Type-safe actions

**Agent akan:**

1. ✅ Load skill `frontend-patterns` untuk state management
2. ✅ Create Pinia store dengan TypeScript
3. ✅ Implement persistence plugin
4. ✅ Add optimistic updates
5. ✅ Create comprehensive tests

**Code Example:**

```typescript
// app/stores/cart.ts
import { defineStore } from 'pinia'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const total = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  const addItem = (product: Omit<CartItem, 'quantity'>) => {
    const existing = items.value.find((i) => i.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
  }

  const removeItem = (id: string) => {
    items.value = items.value.filter((i) => i.id !== id)
  }

  const updateQuantity = (id: string, quantity: number) => {
    const item = items.value.find((i) => i.id === id)
    if (item) {
      item.quantity = Math.max(0, quantity)
      if (item.quantity === 0) {
        removeItem(id)
      }
    }
  }

  // Persist to localStorage
  watch(
    items,
    (newItems) => {
      localStorage.setItem('cart', JSON.stringify(newItems))
    },
    { deep: true }
  )

  // Sync across tabs
  if (process.client) {
    const channel = new BroadcastChannel('cart-sync')
    channel.onmessage = (event) => {
      items.value = event.data
    }
    watch(items, (newItems) => {
      channel.postMessage(newItems)
    })
  }

  return {
    items,
    total,
    addItem,
    removeItem,
    updateQuantity,
  }
})

// app/composables/useCart.ts
export const useCart = () => useCartStore()
```

---

## 6. Performance Optimization

### Skenario: Optimize Slow Page

**Prompt:**

```
@frontend Page /products sangat lambat. Tolong optimize:
- Initial load time
- Image loading
- Component rendering
- Bundle size
- Lighthouse score target: 90+
```

**Agent akan:**

1. ✅ Load skill `frontend-patterns`
2. ✅ Analyze bundle dengan `nuxi analyze`
3. ✅ Implement lazy loading
4. ✅ Add image optimization
5. ✅ Use virtual scrolling untuk long lists
6. ✅ Run Lighthouse audit

**Optimizations Applied:**

```vue
<!-- Before -->
<script setup lang="ts">
import ProductCard from '~/components/ProductCard.vue'
import HeavyChart from '~/components/HeavyChart.vue'

const { data: products } = await useFetch('/api/products')
</script>

<template>
  <div v-for="product in products" :key="product.id">
    <img :src="product.image" />
    <ProductCard :product="product" />
  </div>
  <HeavyChart :data="chartData" />
</template>

<!-- After -->
<script setup lang="ts">
// Lazy load heavy component
const HeavyChart = defineAsyncComponent(() => import('~/components/HeavyChart.vue'))

// Fetch with caching
const { data: products } = await useFetch('/api/products', {
  key: 'products-list',
  getCachedData: (key) => useNuxtData(key).data,
})
</script>

<template>
  <!-- Virtual scrolling untuk list panjang -->
  <UVirtualScroll :items="products" :item-height="200">
    <template #default="{ item: product }">
      <!-- Optimized image dengan Nuxt Image -->
      <NuxtImg :src="product.image" width="400" height="300" loading="lazy" format="webp" />
      <ProductCard :product="product" />
    </template>
  </UVirtualScroll>

  <!-- Lazy load chart -->
  <ClientOnly>
    <HeavyChart v-if="showChart" :data="chartData" />
  </ClientOnly>
</template>
```

**Results:**

- ✅ Bundle size reduced: 500KB → 200KB
- ✅ First Contentful Paint: 3.5s → 1.2s
- ✅ Lighthouse Performance: 65 → 94
- ✅ Images optimized with WebP format
- ✅ Code splitting implemented

---

## 7. Accessibility Review

### Skenario: Audit Existing Component

**Prompt:**

```
@frontend Review accessibility untuk component app/components/Modal.vue
Target: WCAG 2.1 Level AA compliance
```

**Agent akan:**

1. ✅ Load skill `web-design-guidelines`
2. ✅ Check semantic HTML
3. ✅ Verify ARIA attributes
4. ✅ Test keyboard navigation
5. ✅ Check color contrast
6. ✅ Provide detailed report

**Audit Report Example:**

````markdown
# Accessibility Audit: Modal.vue

## Issues Found (6)

### Critical

1. ❌ Missing `role="dialog"` on modal container
2. ❌ No focus trap - keyboard navigation escapes modal
3. ❌ Missing `aria-labelledby` and `aria-describedby`

### Warning

4. ⚠️ Close button lacks accessible label
5. ⚠️ Background color contrast 3.2:1 (needs 4.5:1)

### Info

6. ℹ️ Consider adding focus restoration on close

## Recommended Fixes

### 1. Add proper ARIA attributes

```vue
<template>
  <div role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-desc">
    <h2 id="modal-title">{{ title }}</h2>
    <p id="modal-desc">{{ description }}</p>
  </div>
</template>
```
````

### 2. Implement focus trap

```typescript
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'

const modalRef = ref<HTMLElement>()
const { activate, deactivate } = useFocusTrap(modalRef)

watch(isOpen, (open) => {
  if (open) activate()
  else deactivate()
})
```

### 3. Add accessible close button

```vue
<UButton icon="i-heroicons-x-mark" aria-label="Close modal" @click="close" />
```

## After Fixes

✅ All WCAG 2.1 Level AA criteria met
✅ Keyboard navigation: Tab, Shift+Tab, Escape
✅ Screen reader friendly
✅ Color contrast: 7.8:1

```

---

## 8. Bug Fixing

### Skenario: Fix Hydration Mismatch

**Prompt:**
```

@frontend Ada error hydration mismatch di homepage:
"Hydration completed but contains mismatches."

Error terjadi di section hero dengan dynamic timestamp.

````

**Agent akan:**
1. ✅ Load skill `frontend-patterns`
2. ✅ Analyze SSR/CSR differences
3. ✅ Identify root cause
4. ✅ Provide fix dengan explanation
5. ✅ Add preventive measures

**Diagnosis:**
```markdown
# Hydration Mismatch Analysis

## Root Cause
Timestamp generated differently on server vs client:
- Server: Uses UTC time
- Client: Uses local timezone

## Code Causing Issue
```vue
<template>
  <p>Last updated: {{ new Date().toLocaleString() }}</p>
</template>
````

## Fix

```vue
<script setup lang="ts">
// Option 1: Client-only rendering
const timestamp = ref('')

onMounted(() => {
  timestamp.value = new Date().toLocaleString()
})
</script>

<template>
  <ClientOnly fallback="Loading...">
    <p>Last updated: {{ timestamp }}</p>
  </ClientOnly>
</template>
```

```vue
<!-- Option 2: Use consistent format -->
<script setup lang="ts">
const timestamp = new Date().toISOString()
</script>

<template>
  <p>Last updated: {{ timestamp }}</p>
</template>
```

## Prevention

- ✅ Always use ClientOnly for browser APIs
- ✅ Use ISO format untuk dates
- ✅ Test with SSR enabled
- ✅ Add hydration tests

```

---

## Tips untuk Prompt yang Efektif

### ✅ Good Prompts

```

@frontend Build login form dengan email/password, validation, dan error handling

```
- Specific dan actionable
- Jelas output yang diharapkan
- Focused scope

```

@frontend Check accessibility untuk ProductCard component, target WCAG 2.1 AA

```
- Clear success criteria
- Specific component
- Defined standard

### ❌ Bad Prompts

```

@frontend Bantu saya

```
- Terlalu vague
- Tidak ada context

```

@frontend Build full e-commerce website

```
- Scope terlalu luas
- Perlu breakdown

### Best Practices

1. **Be Specific**: Sebutkan exact component/page/feature
2. **Provide Context**: Jika ada existing code, mention file path
3. **Set Standards**: Sebutkan requirements (accessibility, performance, etc.)
4. **Ask Questions**: Agent bisa tanya jika butuh clarification
5. **Iterate**: Start small, kemudian expand

---

## MCP Integration Examples

### Query Nuxt Documentation

```

@frontend Bagaimana cara implement custom error page di Nuxt 4?

```

Agent akan:
1. Query Nuxt MCP untuk error handling docs
2. Get latest Nuxt 4 patterns
3. Provide code example dengan explanation

### Check Nuxt UI Components

```

@frontend Apa komponen terbaik untuk notification system?

```

Agent akan:
1. Query Nuxt UI MCP untuk Toast/Notification components
2. Compare options (`<UNotification>` vs `<UToast>`)
3. Provide implementation recommendation

### Use Playwright for Testing

```

@frontend Create E2E test untuk login flow

```

Agent akan:
1. Use Playwright MCP untuk browser automation
2. Generate test script
3. Add assertions dan error cases
4. Setup test runners

---

## Common Workflows Cheatsheet

| Task | Prompt Example |
|------|----------------|
| Create Component | `@frontend Create Button component dengan variants primary/secondary` |
| Fix Bug | `@frontend Fix hydration error di app/pages/index.vue` |
| Add Feature | `@frontend Add dark mode toggle menggunakan Nuxt UI` |
| Optimize | `@frontend Optimize bundle size untuk /dashboard route` |
| Review | `@frontend Review accessibility untuk Modal component` |
| Test | `@frontend Add unit tests untuk useCart composable` |
| Document | `@frontend Add JSDoc comments untuk ProductCard props` |
| Refactor | `@frontend Refactor UserList component, extract reusable logic` |

---

## Troubleshooting

### Agent tidak load skill yang expected

**Solusi:**
- Explicitly mention skill: `@frontend Gunakan skill web-design-guidelines untuk review ini`
- Check skill available: List skills di `.opencode/skills/` dan `~/.opencode/skills/`

### MCP server tidak respond

**Solusi:**
- Check `.opencode/config.json` - pastikan `enabled: true`
- Restart OpenCode session
- Verify internet connection (untuk remote MCP)

### Agent terlalu verbose

**Solusi:**
- Add constraint: `@frontend (concise) Create button component`
- Request specific output: `@frontend Show only code, no explanation`

### Need Figma access

**Solusi:**
1. Get token dari https://www.figma.com/developers/api#access-tokens
2. Set `FIGMA_ACCESS_TOKEN` di `.env`
3. Enable di `.opencode/config.json`: `"enabled": true`
4. Restart session

---

## Next Steps

Setelah familiar dengan examples di atas:

1. **Explore Skills**: Check `~/.opencode/skills/` untuk available skills
2. **Read Workflows**: Baca `WORKFLOWS.md` untuk detailed workflows
3. **Check MCP Guide**: Read `MCP_GUIDE.md` untuk advanced MCP usage
4. **Practice**: Start dengan simple components, gradually increase complexity
5. **Contribute**: Share your own examples dan workflows dengan team

---

**Happy Coding! 🚀**

Untuk pertanyaan atau feedback:
- Check dokumentasi lengkap di `.opencode/agents/`
- Atau mention `@frontend` dengan pertanyaan Anda
```
