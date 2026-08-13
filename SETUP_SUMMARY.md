# Ringkasan Review, Refactor & Setup Template Nuxt.js

Dokumen ini berisi dokumentasi dan catatan teknis mengenai hasil penyiapan folder ini sebagai **All-Around Frontend Template** berbasis Nuxt 4 / Vue 3.

---

## 1. Masalah Awal yang Ditemukan & Diperbaiki

| Komponen | Isu / Kendala | Solusi & Refactoring |
| :--- | :--- | :--- |
| **Path CSS Tailwind** | `css: ['~/public/assets/scripts/vendor/tailwindcss/main.css']` pada `nuxt.config.ts` gagal build karena Nuxt 4 memperlakukan folder `app/` sebagai `srcDir` (path `~` merujuk ke `<rootDir>/app/`). | Dibuatkan file standar `app/assets/css/main.css` dan dihubungkan pada `nuxt.config.ts` melalui `css: ['~/assets/css/main.css']`. File asli di folder `public/` tetap dipertahankan. |
| **Tailwind Config** | Belum ada `tailwind.config.ts`, sehingga fitur *dark mode* dan plugin belum terdaftar. | Dibuatkan `tailwind.config.ts` dengan konfigurasi `darkMode: 'class'`, content scanner untuk file Nuxt, dan plugin tambahan. |
| **SweetAlert2 di SSR** | `sweetalert2` mengakses objek browser (`window`/`document`) yang belum ada pada server render, berpotensi menimbulkan crash SSR. | Dibuatkan plugin khusus client-side `app/plugins/sweetalert2.client.ts` sehingga aman dijalankan di mode SSR maupun CSR. |
| **Integrasi TypeScript** | Belum ada dependensi `@types/node`, menyebabkan variabel `process.env` gagal lolos typecheck. | Diinstal `@types/node` dan ditambahkan script `"typecheck": "nuxt typecheck"` pada `package.json`. |

---

## 2. Status Package & Library

> **Catatan:** Sesuai instruksi, **tidak ada package lama yang dihapus**. Semua dependensi bawaan tetap utuh.

### A. Package Bawaan (Tetap Dipertahankan)
- `@headlessui/vue` (`^1.7.23`): Komponen UI unstyled & accessible.
- `axios` (`^1.20.0`): HTTP client.
- `dayjs` (`^1.11.23`): Manipulasi tanggal & waktu.
- `nuxt` (`^4.5.2`): Framework inti Nuxt 4.
- `pinia` (`^4.0.3`) & `@pinia/nuxt` (`^1.0.2`): State management terintegrasi.
- `sweetalert2` (`^11.26.25`): Modal & popup dialog.
- `vue` (`^3.5.43`) & `vue-router` (`^5.3.1`): Vue 3 core.
- `@nuxtjs/tailwindcss` (`^6.14.0`): Modul Tailwind CSS untuk Nuxt.

### B. Package Tambahan yang Diinstal (Additive)
- **`@vueuse/nuxt` & `@vueuse/core`**: Utilitas composition reaktif browser & Vue 3.
- **`@nuxt/icon`**: Komponen icon on-demand berbasis Iconify (mendukung ribuan icon seperti Heroicons, Lucide, dll).
- **`@nuxtjs/color-mode`**: Pengatur tema Light/Dark tanpa flicker pada SSR.
- **`clsx` & `tailwind-merge`**: Helper utilitas `cn()` untuk penggabungan conditional classes Tailwind tanpa konflik nama class.
- **`zod`**: Schema validation untuk input form dan API response DTO.
- **`@tailwindcss/forms`**: Reset styling elemen form bawaan browser agar seragam.
- **`@tailwindcss/typography`**: Kelas `prose` untuk konten markdown dan artikel.
- **`@tailwindcss/aspect-ratio`**: Utilitas aspect ratio responsif.
- **`@types/node` & `vue-tsc`**: Kelengkapan type definitions untuk TypeScript strict checking.

---

## 3. Palet Warna Format Bootstrap pada Tailwind CSS

Warna-warna format Bootstrap telah ditambahkan pada [`tailwind.config.ts`](file:///home/wannacry021/Public/Project/Skuad/frontend-nuxtjs/tailwind.config.ts) dan dapat langsung digunakan sebagai utility classes Tailwind (misal: `bg-primary`, `text-danger`, `border-warning`, dll):

| Nama Warna | Hex Code | Contoh Class Tailwind | Keterangan |
| :--- | :---: | :--- | :--- |
| **Primary** | `#0d6efd` | `bg-primary`, `text-primary`, `border-primary` | Warna utama Bootstrap (lengkap dengan shades 50-900) |
| **Secondary White** | `#f8f9fa` | `bg-secondary-white`, `text-secondary-white` | Nuansa putih sekunder / light background Bootstrap |
| **Secondary Black** | `#212529` | `bg-secondary-black`, `text-secondary-black` | Nuansa hitam sekunder / dark body Bootstrap |
| **Secondary (Default)**| `#6c757d` | `bg-secondary`, `text-secondary`, `border-secondary` | Warna abu-abu sekunder Bootstrap (lengkap dengan shades 50-900) |
| **Warning** | `#ffc107` | `bg-warning`, `text-warning`, `border-warning` | Warna peringatan kuning Bootstrap |
| **Danger** | `#dc3545` | `bg-danger`, `text-danger`, `border-danger` | Warna bahaya/error merah Bootstrap |
| **Info** | `#0dcaf0` | `bg-info`, `text-info`, `border-info` | Warna informasi cyan/biru muda Bootstrap |
| **Success** | `#198754` | `bg-success`, `text-success`, `border-success` | Warna sukses hijau Bootstrap |

---

## 4. Struktur File Setup Baru & Yang Disesuaikan

```text
├── .env.example                       # [Baru] Contoh konfigurasi environment variable (API Base URL, Secret)
├── SETUP_SUMMARY.md                   # [Baru] Dokumen ringkasan ini
├── tailwind.config.ts                 # [Baru] Konfigurasi Tailwind, plugins, dan dark mode
├── nuxt.config.ts                     # [Refactor] Konfigurasi modul, routeRules (SSR & CSR), runtimeConfig, CSS
├── package.json                       # [Refactor] Penambahan modul dan script "typecheck"
├── README.md                          # [Refactor] Panduan penggunaan template
│
└── app/
    ├── assets/
    │   └── css/
    │       └── main.css               # [Baru] CSS entry point untuk Tailwind directives
    ├── plugins/
    │   ├── axios.ts                   # [Baru] Inisialisasi Axios dengan runtimeConfig & interceptors
    │   ├── dayjs.ts                   # [Baru] Registrasi Day.js dengan format waktu lokal Indonesia
    │   └── sweetalert2.client.ts      # [Baru] Plugin client-only SweetAlert2 (anti-crash di SSR)
    ├── stores/
    │   └── app.ts                     # [Baru] Starter store Pinia untuk state global
    ├── utils/
    │   └── cn.ts                      # [Baru] Fungsi pembantu tailwind merge (auto-imported)
    └── app.vue                        # [Refactor] Starter preview yang memverifikasi seluruh setup aktif
```

---

## 5. Dukungan Mode Rendering (SSR & CSR)

Template ini dikonfigurasi fleksibel untuk mendukung arsitektur hybrid rendering:

1. **SSR (Server-Side Rendering) - Default:**
   - Dijalankan secara default oleh Nuxt Nitro engine.
   - Mengoptimalkan SEO, performa First Contentful Paint (FCP), dan keamanan data server.
2. **CSR (Client-Side Rendering / SPA Mode):**
   - Dapat diaktifkan untuk route tertentu melalui `routeRules` di `nuxt.config.ts`:
     ```ts
     routeRules: {
       '/admin/**': { ssr: false },    // Mode SPA / Client Only
       '/dashboard/**': { ssr: false } // Bebas dari overhead server rendering
     }
     ```
3. **SSG (Static Site Generation):**
   - Dapat di-build ke folder static menggunakan perintah `npm run generate`.

---

## 6. Hasil Verifikasi & Pengujian

Seluruh proses verifikasi dijalankan langsung di terminal lokal:

| Perintah | Hasil | Keterangan |
| :--- | :---: | :--- |
| `npm run typecheck` | **Passed (0 error)** | Lolos validasi TypeScript strict mode dalam ~2.7 detik. |
| `npm run build` | **Passed** | Berhasil menghasilkan build produksi server Nitro (`.output/server/index.mjs`). |
| `npm run generate` | **Passed** | Berhasil menghasilkan prerender static files (`.output/public`). |

---

---

## 7. Rute Showcase `/about` & Layout Aktif

Untuk mendemonstrasikan seluruh fitur package yang terpasang secara interaktif, telah disiapkan struktur layout dan routing berikut:

- **[`app/app.vue`](file:///home/wannacry021/Public/Project/Skuad/frontend-nuxtjs/app/app.vue)**: Berfungsi sebagai wrapper utama dengan `<NuxtLayout>` dan `<NuxtPage />`.
- **[`app/layouts/default.vue`](file:///home/wannacry021/Public/Project/Skuad/frontend-nuxtjs/app/layouts/default.vue)**: Layout global yang menyediakan Navbar responsif (navigasi Beranda & `/about`), indikator status hidrasi SSR/CSR, dark mode switcher, dan footer.
- **[`app/pages/index.vue`](file:///home/wannacry021/Public/Project/Skuad/frontend-nuxtjs/app/pages/index.vue)**: Halaman Beranda (`/`) dengan rangkuman fitur dan tautan cepat ke showcase.
- **[`app/pages/about.vue`](file:///home/wannacry021/Public/Project/Skuad/frontend-nuxtjs/app/pages/about.vue)**: Halaman showcase lengkap yang mendemonstrasikan:
  1. **Tailwind CSS & Palet Bootstrap**: Color chips (`primary`, `secondary`, `secondary-white`, `secondary-black`, `warning`, `danger`, `info`, `success`) & helper `cn()`.
  2. **Headless UI (`@headlessui/vue`)**: Interactive Switch (toggle), Menu (dropdown), Dialog (modal dengan animasi), dan Disclosure (accordion).
  3. **VueUse (`@vueuse/core`)**: Deteksi posisi mouse real-time (`useMouse`), status koneksi (`useOnline`), salin clipboard (`useClipboard`), dan penyimpanan otomatis (`useLocalStorage`).
  4. **Nuxt Icon (`@nuxt/icon`)**: Render icon multi-koleksi on-demand (Heroicons, Lucide, Phosphor, Carbon).
  5. **Pinia Store (`app/stores/app.ts`)**: Mutasi state counter, computed getters, dan sinkronisasi reaktif antar-halaman.
  6. **SweetAlert2 (`sweetalert2`)**: Alert popup sukses, dialog konfirmasi asinkron, dan toast notification via plugin `$swal`.
  7. **Day.js (`dayjs`)**: Format waktu sekarang (locale Indonesia), relative time (`fromNow()`), dan formatting tanggal masa depan.
  8. **Zod (`zod`)**: Form interaktif dengan validasi skema TypeScript deklaratif (`safeParse`) dan tampilan pesan error instan.
  9. **Axios (`axios`)**: Pemanggilan endpoint via instance `$api` yang dilengkapi request/response interceptors.
