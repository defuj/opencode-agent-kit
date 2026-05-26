# Checklist Kurikulum Mentor (30 Hari)

Checklist harian untuk menjalankan roadmap 30 hari jalur ekosistem Nuxt.

Gunakan status:

- `[ ]` belum dikerjakan
- `[~]` sedang dikerjakan
- `[x]` selesai

## Minggu 1 - Node.js + Fundamental Runtime Nuxt

### Hari 1 - Runtime Node.js
- [ ] Pahami event loop mental model
- [ ] Tinjau `package.json` scripts (`dev/build/preview`)
- [ ] Jalankan app dan dokumentasikan lifecycle eksekusi
- [ ] Tulis 3 insight teknis

### Hari 2 - Konteks Server vs Client di Nuxt
- [ ] Jelaskan perbedaan kode yang jalan di server vs client
- [ ] Implement guard browser API (`localStorage/window`)
- [ ] Verifikasi tidak ada runtime error di SSR context
- [ ] Catat 2 potensi hydration issue
- [ ] Jelaskan ulang konsep CSR, SSR, dan hydration dengan contoh Nuxt sederhana

### Hari 3 - Struktur Nuxt
- [ ] Audit struktur `app/`, `pages/`, `components/`, `composables/`, `server/api/`
- [ ] Buat struktur folder feature kecil
- [ ] Pisahkan logic UI dan logic data
- [ ] Tinjau konsistensi penamaan

### Hari 4 - Routing, Layout, Middleware
- [ ] Buat minimal 2 route + 1 nested route
- [ ] Gunakan layout yang sesuai
- [ ] Implement middleware check sederhana
- [ ] Verifikasi alur redirect/guard

### Hari 5 - Strategi Data Fetching
- [ ] Implement use case `useFetch`
- [ ] Implement use case `useAsyncData`
- [ ] Tulis kapan pakai masing-masing
- [ ] Dokumentasikan trade-off singkat
- [ ] Dokumentasikan langkah pencegahan hydration mismatch pada fetch API

## Minggu 2 - Vue 3 + TypeScript Terapan

### Hari 6 - Reactivity
- [ ] Gunakan `ref` dan `computed` untuk derived state
- [ ] Hindari logic berat di template
- [ ] Verifikasi perubahan state memicu UI sesuai ekspektasi
- [ ] Catat 2 anti-pattern yang dihindari

### Hari 7 - Kontrak Komponen
- [ ] Definisikan props yang jelas
- [ ] Implement emits untuk interaction
- [ ] Gunakan slot untuk fleksibilitas
- [ ] Verifikasi komponen reusable di 2 konteks

### Hari 8 - Desain Composable
- [ ] Ekstrak logic dari component ke composable
- [ ] Kembalikan state `data/loading/error`
- [ ] Tambahkan typing return composable
- [ ] Uji composable pada minimal 1 halaman

### Hari 9 - TypeScript di Nuxt/Vue
- [ ] Type props, emits, dan API response
- [ ] Gunakan union type atau narrowing pada alur error
- [ ] Hindari `any` di code baru
- [ ] Catat 3 error TS yang berhasil diselesaikan

### Hari 10 - Mini Build Mingguan
- [ ] Bangun mini fitur end-to-end
- [ ] Terapkan composable + typed flow
- [ ] Tangani state loading/error/empty
- [ ] Demo singkat hasil minggu 2

## Minggu 3 - Nuxt UI + Styling Tailwind

### Hari 11 - Nuxt UI Component-First
- [ ] Mapping Figma/custom blocks ke komponen Nuxt UI
- [ ] Gunakan `UCard/UButton/UInput/UBadge` sesuai kebutuhan
- [ ] Hindari custom HTML jika sudah ada padanan Nuxt UI
- [ ] Tulis daftar komponen yang dimigrasikan

### Hari 12 - Pola Form Nuxt UI
- [ ] Implement form dengan feedback error
- [ ] Handle submit/pending state
- [ ] Verifikasi state UX (default/error/success)
- [ ] Tinjau konsistensi label dan hint

### Hari 13 - Fundamental Tailwind
- [ ] Terapkan spacing/typography scale konsisten
- [ ] Gunakan responsive modifiers
- [ ] Gunakan state modifier (`hover/focus/disabled`)
- [ ] Buat token mapping mini dari design ke class

### Hari 14 - Maintainability Tailwind
- [ ] Rapikan class yang terlalu panjang/duplikat
- [ ] Kelompokkan class secara konsisten
- [ ] Tinjau keterbacaan komponen
- [ ] Catat 3 improvement pada maintainability

### Hari 15 - Review Konsistensi UI
- [ ] Audit visual consistency lintas halaman
- [ ] Cek state UI utama (default/hover/focus/disabled/loading)
- [ ] Cek aksesibilitas dasar (kontras + keyboard)
- [ ] Susun backlog perbaikan prioritas

## Minggu 4 - Fundamental Produksi

### Hari 16 - Strategi Integrasi API
- [ ] Implement list endpoint + mutation endpoint
- [ ] Normalisasi error message
- [ ] Verifikasi success/error states konsisten
- [ ] Catat retry/fallback strategy sederhana

### Hari 17 - Strategi Manajemen State
- [ ] Tentukan local vs shared state boundary
- [ ] Gunakan `useState`, Pinia, atau composable sesuai kasus
- [ ] Dokumentasikan alasan pemilihan
- [ ] Verifikasi tidak ada state duplication yang tidak perlu

### Hari 18 - Baseline Performa + A11y
- [ ] Terapkan lazy-loading atau split komponen berat
- [ ] Audit semantic structure
- [ ] Audit keyboard interactions dasar
- [ ] Dokumentasikan improvement sebelum/sesudah

### Hari 19 - Mindset Testing
- [ ] Tulis test plan unit/integration/E2E
- [ ] Prioritaskan alur kritikal
- [ ] Definisikan expected behavior per test case
- [ ] Tinjau area risiko yang belum ter-cover
- [ ] Tambahkan cek: tidak ada warning hydration mismatch pada flow utama

### Hari 20 - Demo Final
- [ ] Demo mini app end-to-end
- [ ] Jelaskan keputusan arsitektur inti
- [ ] Presentasikan trade-off dan backlog
- [ ] Tulis rencana 2 minggu lanjutan

---

## Checklist Tambahan per Jalur

### Jalur Desainer (Figma -> Code)
- [ ] Buat component mapping table (Figma -> Nuxt UI)
- [ ] Buat token mapping table (Figma -> Tailwind/theme)
- [ ] Lakukan visual QA state-based
- [ ] Catat kompromi fidelity vs engineering constraints

### Jalur Profesional (Karyawan Umum)
- [ ] Kumpulkan weekly summary 1 halaman
- [ ] Lakukan presentasi teknis mingguan (5 menit)
- [ ] Dokumentasikan bug dan cara debug
- [ ] Simpan keputusan teknis penting (decision log)
