# API Patterns Guide - useApi Composable

Comprehensive guide untuk menggunakan custom `useApi` composable dalam project ini.

## 📋 Daftar Isi

1. [Overview](#overview)
2. [Why useApi?](#why-useapi)
3. [Basic Usage](#basic-usage)
4. [Advanced Patterns](#advanced-patterns)
5. [Error Handling](#error-handling)
6. [Authentication](#authentication)
7. [Best Practices](#best-practices)
8. [Migration Guide](#migration-guide)

---

## Overview

`useApi` adalah custom composable yang menyatukan `useFetch` dan `$fetch` dengan satu interface yang konsisten, plus automatic authentication dan enhanced error handling.

**Location:** `app/composables/useApi.ts`

### Key Features

- ✅ **Unified API** - Single interface untuk GET, POST, PUT, DELETE
- ✅ **Smart SSR/CSR** - Otomatis pakai `useFetch` di SSR, `$fetch` di CSR
- ✅ **Auto Authentication** - Cookies forwarded otomatis
- ✅ **Enhanced Errors** - `error.value.message` langsung accessible
- ✅ **Auto Redirect** - 401 otomatis redirect ke login
- ✅ **Type Safe** - Full TypeScript support dengan generics
- ✅ **Promise-like** - Bisa di-await seperti Promise

---

## Why useApi?

### Problem dengan Native Composables

**useFetch:**

```typescript
// ❌ Auth tidak automatic
const { data } = await useFetch('/api/users', {
  headers: useRequestHeaders(['cookie']), // Manual!
})

// ❌ Error message susah diakses
if (error.value) {
  // error.value.data?.message? error.value.message? Who knows!
  console.log(error.value?.data?.message)
}

// ❌ POST/PUT/DELETE butuh useAsyncData
const { data } = await useAsyncData('create-user', () =>
  $fetch('/api/users', { method: 'POST', body: formData })
)
```

**$fetch:**

```typescript
// ❌ Tidak bisa di-await di component root
const data = await $fetch('/api/users') // Hydration error!

// ❌ No reactive state
const loading = ref(false)
const error = ref(null)
// Manual state management diperlukan
```

### Solution dengan useApi

```typescript
// ✅ Simple, automatic, type-safe
const { data, pending, error } = await useApi<User[]>('/users')

// ✅ Works untuk semua HTTP methods
const { data: created } = await useApi('/users', {
  method: 'POST',
  body: newUser,
})

// ✅ Error message langsung accessible
if (error.value) {
  console.log(error.value.message) // Consistent!
}
```

---

## Basic Usage

### GET Request

```typescript
<script setup lang="ts">
interface User {
  id: string
  name: string
  email: string
}

// Simple GET
const { data, pending, error } = await useApi<User[]>('/users')

// With query parameters
const { data: filteredUsers } = await useApi<User[]>('/users', {
  query: {
    role: 'admin',
    page: 1,
    limit: 10
  }
})

// Reactive query
const search = ref('')
const { data: searchResults } = await useApi<User[]>('/users', {
  query: { q: search },
  watch: [search] // Refetch when search changes
})
</script>

<template>
  <div v-if="pending">Loading...</div>
  <div v-else-if="error">{{ error.message }}</div>
  <ul v-else>
    <li v-for="user in data?.data" :key="user.id">
      {{ user.name }}
    </li>
  </ul>
</template>
```

### POST Request

```typescript
<script setup lang="ts">
interface CreateUserDto {
  name: string
  email: string
  password: string
}

interface User {
  id: string
  name: string
  email: string
}

const form = reactive<CreateUserDto>({
  name: '',
  email: '',
  password: ''
})

const createUser = async () => {
  const { data, error } = await useApi<User>('/users', {
    method: 'POST',
    body: form
  })

  if (error.value) {
    useToast().add({
      title: 'Error',
      description: error.value.message,
      color: 'red'
    })
    return
  }

  useToast().add({
    title: 'Success',
    description: `User ${data.value?.data.name} created!`
  })

  navigateTo(`/users/${data.value?.data.id}`)
}
</script>
```

### PUT/PATCH Request

```typescript
const updateUser = async (userId: string) => {
  const { data, error } = await useApi<User>(`/users/${userId}`, {
    method: 'PATCH',
    body: {
      name: 'Updated Name',
      email: 'updated@example.com',
    },
  })

  if (!error.value) {
    console.log('Updated:', data.value?.data)
  }
}
```

### DELETE Request

```typescript
const deleteUser = async (userId: string) => {
  const confirmed = confirm('Are you sure?')
  if (!confirmed) return

  const { error } = await useApi(`/users/${userId}`, {
    method: 'DELETE',
  })

  if (error.value) {
    alert(error.value.message)
  } else {
    // Refresh list atau remove dari UI
    users.value = users.value.filter((u) => u.id !== userId)
  }
}
```

---

## Advanced Patterns

### Manual Trigger (immediate: false)

```typescript
<script setup lang="ts">
// Don't execute immediately
const { data, execute, pending } = await useApi<User>('/users/123', {
  immediate: false
})

const loadUser = async () => {
  await execute()
  // data.value now populated
}

// Or use in onMounted
onMounted(() => {
  loadUser()
})
</script>

<template>
  <button @click="loadUser" :disabled="pending">
    Load User
  </button>
</template>
```

### Optimistic Updates

```typescript
const deleteUser = async (userId: string) => {
  // Save original state
  const originalUsers = [...users.value]

  // Optimistic update
  users.value = users.value.filter((u) => u.id !== userId)

  // Perform API call
  const { error } = await useApi(`/users/${userId}`, {
    method: 'DELETE',
  })

  if (error.value) {
    // Rollback on error
    users.value = originalUsers
    useToast().add({
      title: 'Error',
      description: error.value.message,
      color: 'red',
    })
  }
}
```

### Refresh & Refetch

```typescript
const { data, refresh, execute } = await useApi<User[]>('/users')

// Refresh (same parameters)
const reloadUsers = async () => {
  await refresh()
}

// Execute again
const loadMore = async () => {
  await execute()
}

// Auto-refresh every 30s
onMounted(() => {
  const interval = setInterval(refresh, 30000)
  onUnmounted(() => clearInterval(interval))
})
```

### Dependent Requests

```typescript
// First request
const { data: user } = await useApi<User>(`/users/${userId}`)

// Second request depends on first
const { data: posts } = await useApi<Post[]>('/posts', {
  query: {
    authorId: computed(() => user.value?.data.id),
  },
  immediate: computed(() => !!user.value), // Only fetch when user loaded
})
```

### Polling

```typescript
const { data: status, refresh } = await useApi<JobStatus>(`/jobs/${jobId}`)

// Poll every 2 seconds until complete
const pollJob = () => {
  const interval = setInterval(async () => {
    await refresh()

    if (status.value?.data.status === 'completed') {
      clearInterval(interval)
      useToast().add({ title: 'Job completed!' })
    }
  }, 2000)

  onUnmounted(() => clearInterval(interval))
}

onMounted(pollJob)
```

### Pagination

```typescript
<script setup lang="ts">
const page = ref(1)
const limit = ref(10)

const { data: response, pending } = await useApi<User[]>('/users', {
  query: { page, limit },
  watch: [page, limit]
})

const users = computed(() => response.value?.data || [])
const total = computed(() => response.value?.total || 0)

const nextPage = () => {
  if (page.value * limit.value < total.value) {
    page.value++
  }
}

const prevPage = () => {
  if (page.value > 1) {
    page.value--
  }
}
</script>

<template>
  <div>
    <div v-if="pending">Loading...</div>
    <ul v-else>
      <li v-for="user in users" :key="user.id">{{ user.name }}</li>
    </ul>

    <div class="flex gap-2">
      <button @click="prevPage" :disabled="page === 1">Previous</button>
      <span>Page {{ page }} of {{ Math.ceil(total / limit) }}</span>
      <button @click="nextPage" :disabled="page * limit >= total">Next</button>
    </div>
  </div>
</template>
```

### Infinite Scroll

```typescript
<script setup lang="ts">
const page = ref(1)
const allUsers = ref<User[]>([])

const { data, pending, execute } = await useApi<User[]>('/users', {
  query: computed(() => ({ page: page.value, limit: 20 })),
  immediate: false
})

// Load initial page
onMounted(() => execute())

// Append results
watch(data, (newData) => {
  if (newData?.data) {
    allUsers.value = [...allUsers.value, ...newData.data]
  }
})

// Load more
const loadMore = async () => {
  page.value++
  await execute()
}

// Infinite scroll observer
const sentinel = ref<HTMLElement>()
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !pending.value) {
      loadMore()
    }
  })

  if (sentinel.value) {
    observer.observe(sentinel.value)
  }

  onUnmounted(() => observer.disconnect())
})
</script>

<template>
  <div>
    <div v-for="user in allUsers" :key="user.id">
      {{ user.name }}
    </div>
    <div ref="sentinel" class="h-4" />
    <div v-if="pending">Loading more...</div>
  </div>
</template>
```

---

## Error Handling

### Basic Error Handling

```typescript
const { data, error } = await useApi<User>('/users/123')

if (error.value) {
  // error.value.message is always accessible
  console.error(error.value.message)

  // Show user-friendly message
  useToast().add({
    title: 'Error',
    description: error.value.message,
    color: 'red',
  })
}
```

### Error Types

```typescript
interface ApiErrorResponse {
  status?: boolean | string
  message?: string // Always present
  data?: unknown // Additional error data
}

// Usage
const { error } = await useApi('/users')

if (error.value) {
  console.log(error.value.message) // "User not found"
  console.log(error.value.status) // false
  console.log(error.value.data) // Additional error context
}
```

### Global Error Handler

```typescript
// Create composable for consistent error handling
export const useApiError = () => {
  const toast = useToast()

  const handleError = (error: Ref<ApiErrorResponse | null>) => {
    if (!error.value) return

    const message = error.value.message || 'An error occurred'

    // Log to monitoring service
    if (import.meta.client) {
      console.error('API Error:', error.value)
      // trackError(error.value)
    }

    // Show toast
    toast.add({
      title: 'Error',
      description: message,
      color: 'red',
    })
  }

  return { handleError }
}

// Usage
const { data, error } = await useApi('/users')
const { handleError } = useApiError()

watch(error, () => handleError(error))
```

### Retry Logic

```typescript
const maxRetries = 3
let retryCount = 0

const { data, error, execute } = await useApi<User[]>('/users', {
  immediate: false,
})

const fetchWithRetry = async () => {
  while (retryCount < maxRetries) {
    await execute()

    if (!error.value) {
      retryCount = 0
      return
    }

    retryCount++

    if (retryCount < maxRetries) {
      await new Promise((resolve) => setTimeout(resolve, 1000 * retryCount))
    }
  }

  // Max retries reached
  useToast().add({
    title: 'Failed after 3 retries',
    description: error.value?.message,
    color: 'red',
  })
}

onMounted(fetchWithRetry)
```

---

## Authentication

### Automatic Cookie Forwarding

```typescript
// ✅ Cookies automatically forwarded on SSR
const { data } = await useApi<User>('/me')

// No manual header management needed!
// useApi handles:
// - Server: useRequestHeaders(['cookie'])
// - Client: credentials: 'include'
```

### 401 Auto-Redirect

```typescript
// If API returns 401, useApi automatically redirects to:
// - /cms/auth/login (for /cms/* routes)
// - /auth/login (for other routes)

// No manual redirect logic needed!
const { data } = await useApi<User>('/protected-resource')
// If unauthorized, user is redirected automatically
```

### Custom Auth Headers

```typescript
// For Bearer token authentication (if needed)
const token = useCookie('auth_token')

const { data } = await useApi<User>('/users', {
  headers: {
    Authorization: `Bearer ${token.value}`,
  },
})
```

### Skip Auto-Redirect

```typescript
// Prevent auto-redirect on specific pages
// Already handled in useApi for public pages:
const publicPages = [
  '/cms/auth/login',
  '/blog',
  '/services',
  '/about',
  // etc.
]

// If you need custom handling, use try-catch
const { error } = await useApi('/protected')

if (error.value && error.value.status === 401) {
  // Custom 401 handling
  showLoginModal()
}
```

---

## Best Practices

### 1. Always Use Type Generics

```typescript
// ❌ Bad - No type safety
const { data } = await useApi('/users')

// ✅ Good - Type safe
interface User {
  id: string
  name: string
  email: string
}

const { data } = await useApi<User[]>('/users')
// data.value?.data is now typed as User[]
```

### 2. Handle Errors Gracefully

```typescript
// ❌ Bad - Ignore errors
const { data } = await useApi('/users')

// ✅ Good - Always check errors
const { data, error } = await useApi('/users')

if (error.value) {
  useToast().add({
    title: 'Error',
    description: error.value.message,
    color: 'red',
  })
  return
}
```

### 3. Use Computed for Response Data

```typescript
// ✅ Good - Extract data into computed
const { data: response } = await useApi<User[]>('/users')
const users = computed(() => response.value?.data || [])

// Now use users in template
<template>
  <div v-for="user in users" :key="user.id">
    {{ user.name }}
  </div>
</template>
```

### 4. Leverage Immediate: false for Forms

```typescript
// ✅ Good for submit handlers
const { execute, pending, error } = await useApi('/users', {
  method: 'POST',
  body: form,
  immediate: false,
})

const handleSubmit = async () => {
  await execute()
  // Handle response
}
```

### 5. Use Watch for Reactive Queries

```typescript
// ✅ Good - Reactive filters
const filters = reactive({
  role: 'admin',
  status: 'active',
})

const { data } = await useApi('/users', {
  query: filters,
  watch: [() => filters.role, () => filters.status],
})
```

---

## Migration Guide

### From useFetch to useApi

```typescript
// Before
const { data, pending, error, refresh } = await useFetch('/api/users', {
  headers: useRequestHeaders(['cookie']),
  query: { page: 1 },
})

// After
const { data, pending, error, refresh } = await useApi('/users', {
  query: { page: 1 },
})
// Simpler! Auth automatic.
```

### From $fetch to useApi

```typescript
// Before
const loading = ref(false)
const error = ref(null)
const users = ref([])

const fetchUsers = async () => {
  loading.value = true
  try {
    users.value = await $fetch('/api/users')
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}

onMounted(fetchUsers)

// After
const { data: users, pending, error } = await useApi('/users')
// Much simpler! Reactive state automatic.
```

### From useAsyncData to useApi

```typescript
// Before
const { data, pending, error } = await useAsyncData('users', () => $fetch('/api/users'))

// After
const { data, pending, error } = await useApi('/users')
// Cleaner! No manual key needed.
```

---

## Common Patterns Cheatsheet

| Use Case       | Code                                                         |
| -------------- | ------------------------------------------------------------ |
| Simple GET     | `await useApi<T>('/endpoint')`                               |
| GET with query | `await useApi('/endpoint', { query: { key: 'value' } })`     |
| POST           | `await useApi('/endpoint', { method: 'POST', body: data })`  |
| PUT/PATCH      | `await useApi('/endpoint', { method: 'PATCH', body: data })` |
| DELETE         | `await useApi('/endpoint', { method: 'DELETE' })`            |
| Manual trigger | `await useApi('/endpoint', { immediate: false })`            |
| Reactive query | `await useApi('/endpoint', { query, watch: [query] })`       |
| Error handling | `if (error.value) { console.log(error.value.message) }`      |
| Refresh        | `await refresh()`                                            |
| Re-execute     | `await execute()`                                            |

---

## Summary

**When to use useApi:**

- ✅ All internal API calls (recommended default)
- ✅ Protected routes requiring authentication
- ✅ Consistent error handling needed
- ✅ Want automatic SSR/CSR optimization

**When to use useFetch:**

- ⚠️ External third-party APIs
- ⚠️ Custom caching requirements
- ⚠️ Special configurations not supported by useApi

**When to use $fetch:**

- ⚠️ Server-side only code (server/api/\*)
- ⚠️ One-off requests without reactive state
- ⚠️ Background jobs or scheduled tasks

**Default choice: useApi for 99% of cases in this project.**

---

For more examples, see:

- [EXAMPLES.md](./EXAMPLES.md) - Section 3: API Integration
- [CHEATSHEET.md](./CHEATSHEET.md) - Data Fetching section
- [frontend-developer.md](./frontend-developer.md) - Data Fetching Patterns

**Happy coding with useApi! 🚀**
