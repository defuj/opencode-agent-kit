# React Frontend Developer Agent — Data Fetching Patterns

Panduan data fetching patterns untuk React/Next.js project.

## Server Components (Next.js App Router)

### Direct Fetch (Default)

```typescript
async function ProductList() {
  const res = await fetch("https://api.example.com/products", {
    next: { revalidate: 60 },
  });
  const products = await res.json();

  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}
```

### Parallel Fetching

```typescript
async function DashboardPage() {
  const [users, products, stats] = await Promise.all([
    fetch("https://api.example.com/users").then((r) => r.json()),
    fetch("https://api.example.com/products").then((r) => r.json()),
    fetch("https://api.example.com/stats").then((r) => r.json()),
  ]);

  return (
    <div>
      <UserList users={users} />
      <ProductList products={products} />
      <StatsDisplay stats={stats} />
    </div>
  );
}
```

## TanStack Query (Client Components)

### Setup

```bash
npm install @tanstack/react-query
```

```typescript
// app/providers.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

### Query

```typescript
"use client";

import { useQuery } from "@tanstack/react-query";

function Profile() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: () => fetch("/api/profile").then((r) => r.json()),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>{data.name}</div>;
}
```

### Mutation

```typescript
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

function CreateProduct() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newProduct: { name: string; price: number }) =>
      fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(newProduct),
        headers: { "Content-Type": "application/json" },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return (
    <button onClick={() => mutation.mutate({ name: "Foo", price: 100 })}>
      {mutation.isPending ? "Creating..." : "Create Product"}
    </button>
  );
}
```

## Server Actions (Next.js)

```typescript
// app/products/actions.ts
"use server";

import { revalidatePath } from "next/cache";

export async function createProduct(formData: FormData) {
  const name = formData.get("name");
  const price = formData.get("price");

  // Validate
  if (!name || !price) {
    return { error: "Name and price required" };
  }

  // Database operation
  await prisma.product.create({
    data: { name: String(name), price: Number(price) },
  });

  revalidatePath("/products");
}
```

## Custom Fetch Composable (React)

```typescript
// lib/api.ts
interface ApiOptions<T> {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: T;
  params?: Record<string, string>;
}

export async function api<T>(
  endpoint: string,
  options: ApiOptions<unknown> = {}
): Promise<T> {
  const { method = "GET", body, params } = options;

  let url = `/api${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams}`;
  }

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || "API Error");
  }

  return res.json();
}

// Usage:
// const products = await api<Product[]>("/products");
// const user = await api<User>(`/users/${id}`);
