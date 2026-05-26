# Team Operating Guide (Frontend Agent)

Panduan ringkas agar penggunaan agent konsisten di level tim.

## Default Working Agreement

- Gunakan mode `fast` untuk task tiny, `balanced` untuk task normal
- Minta `thorough` hanya untuk task kompleks/berisiko
- Jangan minta commit/PR jika masih fase eksplorasi

## Prompting Contract untuk Developer

Sertakan 4 hal ini saat memberi task:

1. Tujuan perubahan
2. File target (kalau sudah tahu)
3. Constraint (mis. jangan ubah API, jangan ubah style global)
4. Level verifikasi yang diinginkan (`tiny/small/medium+`)

Contoh:

```text
Tambahkan UButton "Save" di app/components/profile/ProfileHeader.vue.
Jangan ubah styling global. Task tiny. Fokus minimal diff.
```

## Output yang Wajib dari Agent

Agent wajib memberikan:

1. What changed
2. Files touched
3. Verification status
4. Command manual jika belum fully verified

## Team Guardrails

- No commit / PR / push tanpa instruksi eksplisit
- No file di luar scope untuk task tiny/small
- No opportunistic refactor saat sprint task
- Selalu ikuti konvensi repo (bukan preferensi agent)

## Recommended Review Loop

1. Developer memberi task dengan konteks jelas
2. Agent implement + laporan output contract
3. Reviewer cek diff + verification status
4. Jika lolos, baru minta commit/PR

## Go/No-Go Cadence

- Lakukan review operasional mingguan terhadap 5-10 task terakhir
- Setelah perubahan prompt signifikan, lakukan smoke test lintas tiny/small/medium task
- Catat regresi kualitas berdasarkan: scope discipline, verification clarity, dan output consistency
