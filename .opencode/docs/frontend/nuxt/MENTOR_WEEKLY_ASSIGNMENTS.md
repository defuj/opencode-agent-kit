# Tugas Mingguan Mentor (Jalur Ekosistem Nuxt)

Dokumen tugas mingguan untuk peserta di jalur ekosistem Nuxt.

## Tujuan Dokumen

- Memberi tugas terstruktur per minggu
- Menyamakan ekspektasi hasil belajar
- Menyediakan rubrik penilaian yang objektif

## Skema Penilaian

Skor total per minggu: **100**

- Implementasi teknis: 35
- Arsitektur dan maintainability: 20
- Konsistensi UI (Nuxt UI + Tailwind): 15
- Reliability (error handling/performance/a11y basics): 15
- Komunikasi reasoning teknis: 15

Nilai akhir rekomendasi:

- 85-100: Sangat baik (siap naik level)
- 70-84: Baik (perlu minor perbaikan)
- 55-69: Cukup (butuh penguatan area inti)
- <55: Perlu remedial terstruktur

---

## Tugas Minggu 1 - Runtime dan Konteks Framework

### Ringkasan
Bangun mini Nuxt app dengan minimal 3 halaman, 1 layout, dan 1 middleware dummy.

### Kebutuhan
1. Minimal 3 route (`/`, `/catalog`, `/profile` atau setara)
2. 1 route dilindungi middleware check sederhana
3. Tunjukkan pemahaman konteks server/client pada minimal 1 komponen
4. Sertakan catatan kapan data sebaiknya di-fetch di SSR vs CSR

### Hasil Wajib
- Source code feature minggu 1
- Dokumen singkat: `week1-decision-note.md`
- Demo 3-5 menit

### Rubrik Minggu 1
- Routing/layout/middleware benar (25)
- SSR/client context dipahami (25)
- Struktur folder rapi (20)
- Kejelasan catatan keputusan (15)
- Komunikasi saat demo (15)

---

## Tugas Minggu 2 - Arsitektur Vue + Type Safety

### Ringkasan
Bangun fitur list-detail dengan komponen reusable + composable + TypeScript.

### Kebutuhan
1. Minimal 2 komponen reusable (card/list item + detail section)
2. Gunakan 1 composable untuk alur data
3. Type-safe props, emits, dan response model
4. Handle loading/error/empty states

### Hasil Wajib
- Source code fitur minggu 2
- Dokumen singkat: `week2-architecture-note.md`
- Demo 5 menit

### Rubrik Minggu 2
- Kualitas kontrak komponen (25)
- Kualitas desain composable (25)
- TypeScript correctness (20)
- Kualitas penanganan state (15)
- Kejelasan reasoning teknis (15)

---

## Tugas Minggu 3 - Design System ke Code

### Ringkasan
Implement satu alur UI berdasarkan referensi desain (Figma/mock) dengan Nuxt UI + Tailwind.

### Kebutuhan
1. Gunakan Nuxt UI sebagai basis komponen utama
2. Gunakan Tailwind class secara konsisten dan maintainable
3. Sertakan state visual: default, hover, focus, disabled, loading
4. Buat tabel mapping:
   - Figma component -> Nuxt UI component
   - Figma token -> Tailwind utility/theme

### Hasil Wajib
- Source code alur UI minggu 3
- `week3-figma-to-code-mapping.md`
- Visual QA checklist
- Demo 5-7 menit

### Rubrik Minggu 3
- Ketepatan adopsi Nuxt UI (25)
- Konsistensi dan kerapian Tailwind (20)
- Fidelity desain dengan trade-off yang rasional (20)
- Kelengkapan state + dasar aksesibilitas (20)
- Kualitas dokumentasi mapping (15)

---

## Tugas Minggu 4 - Capstone Fundamental Produksi

### Ringkasan
Final mini app: list + detail + create/update action dengan baseline kualitas produksi.

### Kebutuhan
1. Alur data end-to-end (read + mutation)
2. Shared state strategy yang jelas
3. Error handling yang konsisten
4. Perbaikan baseline performa minimal 1 area
5. Test plan (unit/integration/E2E) untuk alur kritikal

### Hasil Wajib
- Final mini app
- `week4-capstone-report.md`
- Test plan 8-12 test case
- Demo final 7-10 menit

### Rubrik Minggu 4
- Kelengkapan fitur end-to-end (25)
- Keputusan arsitektur dan state (20)
- Kualitas reliability/error handling (20)
- Baseline performa + aksesibilitas (15)
- Test plan + komunikasi teknis (20)

---

## Penyesuaian Berdasarkan Jalur

### Jalur Desainer (UI/UX + Figma)

Tambahan penilaian:

- Akurasi translasi design token (+10 bonus)
- Kelengkapan QA visual (+5 bonus)

Fokus feedback:

- Konsistensi komponen
- Fidelity desain yang realistis
- Detail interaksi state

### Jalur Profesional (Karyawan Umum)

Tambahan penilaian:

- Dokumentasi reasoning teknis (+10 bonus)
- Kualitas presentasi teknis (+5 bonus)

Fokus feedback:

- Kejelasan pilihan arsitektur
- Kedewasaan proses debugging
- Konsistensi kualitas implementasi

---

## Template Umpan Balik (Per Minggu)

Gunakan format ini:

```markdown
Feedback Minggu [x]

Skor: [0-100]

Yang sudah bagus:
- ...
- ...

Yang perlu ditingkatkan:
- ...
- ...

Prioritas utama minggu depan:
- ...

Referensi yang direkomendasikan:
- ...
```

---

_Dokumen ini dipakai bersama roadmap 30 hari untuk memastikan proses belajar tetap terukur, praktis, dan relevan dengan kebutuhan ekosistem Nuxt._
