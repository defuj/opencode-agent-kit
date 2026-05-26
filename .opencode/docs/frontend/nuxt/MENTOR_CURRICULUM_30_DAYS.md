# Kurikulum Mentor 30 Hari (Jalur Ekosistem Nuxt)

Roadmap 1 bulan ini dirancang untuk developer yang **sudah bisa coding web dasar**, lalu ingin menguatkan fundamental yang relevan langsung ke stack:

- **Node.js**
- **Vue.js 3**
- **Nuxt.js 4**
- **Nuxt UI**
- **Tailwind CSS**

Program ini juga dioptimalkan untuk:

- **UI/UX Designer yang terbiasa dengan Figma** dan ingin transisi ke implementasi
- **Karyawan/profesional teknis** yang membutuhkan struktur belajar mingguan dengan evaluasi progres
- Sebagian kecil peserta bisa berasal dari mahasiswa/alumni IT

## Format Program

- Durasi: **4 minggu**
- Hari aktif: **5 hari kerja per minggu (Senin-Jumat)**
- Total sesi: **20 hari**
- Waktu harian: **90-150 menit**
- Komposisi: **25% konsep + 75% praktik**

## Jalur Belajar

Gunakan jalur sesuai latar belakang peserta:

1. **Jalur Desainer (Figma -> Code)**
   - fokus translasi design system ke Nuxt UI + Tailwind
   - fokus QA visual, konsistensi state, dan kualitas handoff

2. **Jalur Profesional (Karyawan Umum)**
   - fokus fondasi arsitektur, debugging mindset, dan disiplin delivery
   - fokus tugas mingguan, komunikasi teknis, dan penilaian rubrik

## Target Hasil

Setelah 30 hari, peserta mampu:

1. Memahami konteks runtime Node.js untuk pengembangan Nuxt
2. Membangun fitur Nuxt berbasis Vue Composition API
3. Menggunakan Nuxt UI secara konsisten untuk sistem antarmuka
4. Styling cepat dan maintainable dengan Tailwind CSS
5. Mengimplementasikan alur produksi dasar: data fetching, validation, error handling, testing mindset

---

## Minggu 1 - Node.js + Fundamental Runtime Nuxt

**Tujuan minggu:** memahami fondasi runtime agar implementasi Nuxt tidak sekadar "jalan", tetapi tepat dalam konteks server/client.

### Hari 1 (Senin): Runtime Node.js untuk Frontend Engineer
- Materi: event loop mental model, process lifecycle, env vars, npm scripts
- Praktik: bedah `package.json` scripts (`dev`, `build`, `preview`)
- Output: catatan alur eksekusi project dari `npm run dev` sampai app running

**Fokus jalur desainer:** pahami kenapa preview di dev environment bisa berbeda dari static mock Figma.  
**Fokus jalur profesional:** pahami lifecycle command dan dependency graph sederhana untuk kebutuhan delivery tim.

### Hari 2 (Selasa): Konteks Eksekusi Nuxt (Server vs Client)
- Materi: SSR context, hydration concept, kapan kode jalan di server/client
- Praktik: buat contoh aman untuk akses browser API (`localStorage` guard)
- Output: 1 halaman demo server/client-safe behavior

**Checkpoint wajib sebelum lanjut:** peserta harus bisa menjelaskan CSR, SSR, dan hydration dengan contoh Nuxt sederhana.

### Hari 3 (Rabu): Pendalaman Struktur Proyek Nuxt
- Materi: `app/`, `pages/`, `layouts/`, `components/`, `composables/`, `server/api/`
- Praktik: susun mini structure feature (list + detail)
- Output: struktur folder feature yang rapi

**Fokus jalur desainer:** mapping page section Figma ke `pages/` + reusable blocks ke `components/`.  
**Fokus jalur profesional:** pahami separation of concerns antara UI, composable, dan API layer.

### Hari 4 (Kamis): Nuxt Routing + Layout + Middleware Basic
- Materi: file-based routing, nested route, route middleware basics
- Praktik: tambah auth-like middleware sederhana (dummy check)
- Output: alur navigasi + guard route dasar

### Hari 5 (Jumat): Fundamental Alur Data Nuxt
- Materi: `useFetch` vs `useAsyncData` vs `$fetch`, kapan pakai masing-masing
- Praktik: implement 2 halaman data dengan strategi fetching berbeda
- Output: perbandingan singkat plus keputusan teknik

**Deliverable tambahan:** catatan keputusan kapan pakai `useFetch`, `useAsyncData`, atau pembungkus API proyek.
**Guardrail wajib:** dokumentasikan cara mencegah hydration mismatch pada implementasi API di tugas hari ini.

---

## Minggu 2 - Vue 3 + TypeScript Fundamental Terapan

**Tujuan minggu:** menguasai pola Vue modern dan type safety yang dipakai harian di Nuxt app.

### Hari 6 (Senin): Arsitektur Reactivity
- Materi: `ref`, `reactive`, `computed`, `watch`, efek ke re-render
- Praktik: filter/sort list berbasis computed
- Output: komponen list reactive dengan derived state bersih

### Hari 7 (Selasa): Kontrak Komponen
- Materi: props, emits, slots, one-way data flow
- Praktik: buat komponen card reusable + slot action
- Output: 2-3 komponen reusable dengan contract jelas

**Fokus jalur desainer:** terjemahkan component variants dari Figma ke props/slots yang skalabel.

### Hari 8 (Rabu): Desain Composable
- Materi: extract logic dari komponen ke composable
- Praktik: `useProducts` atau `useMarkets` composable
- Output: composable dengan loading/error state dan typed return

### Hari 9 (Kamis): TypeScript for Nuxt/Vue
- Materi: typing props, emits, API response, union + narrowing
- Praktik: tambah tipe pada flow data fetch + form state
- Output: modul fitur typed end-to-end dasar

**Fokus jalur profesional:** jelaskan error type paling sering dan cara narrowing sederhana untuk mengurangi bug produksi.

### Hari 10 (Jumat): Weekly Mini Build
- Materi: integrasi konsep minggu 2
- Praktik: build fitur "catalog/list + detail + action" kecil
- Output: mini fitur dengan arsitektur Vue yang rapi

---

## Minggu 3 - Nuxt UI + Styling Sistematis Tailwind CSS

**Tujuan minggu:** membangun UI yang konsisten, cepat, dan maintainable dengan Nuxt UI + Tailwind.

Minggu ini adalah minggu utama untuk peserta dari latar UI/UX.

### Hari 11 (Senin): Alur Kerja Nuxt UI Component-First
- Materi: mapping kebutuhan UI ke komponen Nuxt UI
- Praktik: refactor elemen custom ke `UCard`, `UButton`, `UInput`, `UBadge`
- Output: 1 halaman UI dengan adopsi Nuxt UI dominan

**Deliverable tambahan:** tabel mapping komponen `Figma -> Nuxt UI`.

### Hari 12 (Selasa): Pola Form dengan Nuxt UI
- Materi: `UForm`, validasi input, error presentation
- Praktik: form create/edit dengan state submit dan error
- Output: form flow lengkap (validasi + feedback)

### Hari 13 (Rabu): Fundamental Tailwind untuk Nuxt
- Materi: utility-first workflow, spacing scale, responsive modifiers, state modifiers
- Praktik: styling halaman dengan utility classes konsisten
- Output: style guide mini (spacing + typography + color usage)

**Deliverable tambahan:** tabel mapping token `Figma token -> Tailwind utility/theme`.

### Hari 14 (Kamis): Pola Maintainability Tailwind
- Materi: class composition strategy, reusable class pattern, avoiding class chaos
- Praktik: rapikan class di beberapa komponen nyata
- Output: komponen lebih bersih dan mudah maintain

### Hari 15 (Jumat): Hari Review Konsistensi UI
- Materi: visual consistency, accessibility quick audit
- Praktik: audit 1 alur halaman (list -> detail -> submit)
- Output: daftar perbaikan UI/UX prioritas tinggi

**Deliverable tambahan:** lembar QA visual (state: default/hover/focus/disabled/loading).

---

## Minggu 4 - Fundamental Produksi (Delivery Aplikasi Nuxt)

**Tujuan minggu:** menggabungkan semua skill menjadi mini app siap demo dengan standar engineering dasar.

### Hari 16 (Senin): API Integration Strategy
- Materi: project API pattern (`useApi`/fetch wrapper), error normalization
- Praktik: integrasi 2 endpoint (list + mutation)
- Output: fitur data dengan success/error handling konsisten

### Hari 17 (Selasa): State Management Strategy
- Materi: local state vs shared state, kapan pakai Pinia/useState/composable
- Praktik: implement shared state untuk satu alur utama
- Output: state architecture ringkas + alasan pemilihan

### Hari 18 (Rabu): Performance + Accessibility Baseline
- Materi: lazy components, payload awareness, semantic/keyboard basics
- Praktik: optimasi 1 halaman berat + a11y cleanup
- Output: sebelum/sesudah (catatan improvement)

### Hari 19 (Kamis): Mindset Testing untuk Aplikasi Nuxt
- Materi: apa yang dites di unit/integration/E2E
- Praktik: tulis test plan untuk alur kritikal
- Output: 8-12 test case prioritas (dengan level test)

Tambahkan minimal 1 skenario verifikasi: "tidak muncul hydration mismatch warning pada flow utama".

### Hari 20 (Jumat): Demo Final dan Review
- Materi: technical storytelling, trade-off explanation
- Praktik: demo mini app + jelaskan keputusan arsitektur
- Output: mini app + review checklist + backlog improvement

**Mode presentasi tim (opsional):** presentasi 5-7 menit dengan struktur problem, approach, demo, trade-off.

---

## Rubrik Evaluasi Mingguan (Skor 1-5)

Nilai di akhir tiap minggu:

1. Pemahaman runtime dan framework
2. Kualitas struktur komponen/composable
3. Konsistensi Nuxt UI + Tailwind usage
4. Kualitas error handling dan state flow
5. Kesiapan ke praktik produksi

Tambahkan dimensi khusus:

6. Translasi desain ke code (khusus jalur desainer)
7. Kejelasan reasoning teknis saat presentasi (khusus jalur profesional)

Wajib tulis:

- 2 kekuatan utama minggu ini
- 2 gap paling penting untuk ditutup
- 1 fokus wajib minggu depan

## Template Sesi Harian

Gunakan format ini tiap hari:

```markdown
Hari ke-[x]

1) Refresh konsep (20-30 menit)
- [konsep yang ditargetkan]

2) Praktik coding terapan (60-100 menit)
- [tugas implementasi nyata]

3) Review dan refleksi (10-20 menit)
- Apa yang berjalan baik?
- Apa yang bermasalah?
- Apa yang harus ditingkatkan besok?
```

## Setelah 30 Hari (Jalur Lanjutan)

Pilih satu jalur lanjutan:

1. Bangun 2 mini apps Nuxt dengan scope berbeda (dashboard + form-heavy app)
2. Implement testing nyata (Vitest + Playwright) untuk 1 flow end-to-end
3. Dalami Nuxt server/api patterns + auth flow basics
4. Dalami performance profiling dan deployment readiness checklist

## Dokumen Pendamping

- Checklist harian: `MENTOR_CURRICULUM_CHECKLIST.md`
- Tugas mingguan + rubrik penilaian: `MENTOR_WEEKLY_ASSIGNMENTS.md`

---

_Roadmap ini dipakai oleh mentor agent untuk pembelajaran fundamental yang lebih tepat sasaran ke ekosistem Nuxt, bukan kelas pemrograman web dari nol._
