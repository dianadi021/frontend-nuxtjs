# Nuxt Frontend Starter Template (All-Around)

Template frontend serbaguna berbasis Nuxt (Vue 3) yang telah disiapkan untuk mendukung rendering **SSR (Server-Side Rendering)** maupun **CSR (Client-Side Rendering / SPA)** secara fleksibel.

---

## 🚀 Fitur & Package yang Terintegrasi

| Kategori | Package / Library | Deskripsi |
| :--- | :--- | :--- |
| **Framework** | Nuxt 4 & Vue 3 | Framework utama dengan performa tinggi & SSR/CSR out of the box. |
| **Styling** | Tailwind CSS v3 | Utilitas styling modern dengan plugin Typography, Forms, & Aspect-Ratio. |
| **Dark Mode** | `@nuxtjs/color-mode` | Manajemen tema Light/Dark tanpa flicker pada SSR. |
| **State Management** | `@pinia/nuxt` & Pinia | State management reaktif yang terintegrasi penuh. |
| **Utilities** | `@vueuse/nuxt` & `@vueuse/core` | Koleksi komposabel reaktif untuk berbagai API browser dan Vue. |
| **Iconography** | `@nuxt/icon` | Komponen icon on-demand dengan dukungan ribuan icon (Heroicons, Lucide, dll). |
| **Carousel** | `swiper` | Carousel responsif dengan navigasi, pagination, dan modul aksesibilitas. |
| **HTTP Client** | `axios` | Terintegrasi dengan runtimeConfig (`baseURL`) dan interceptor request/response. |
| **Komponen UI** | `@headlessui/vue` | Komponen UI unstyled & accessible. |
| **Date Time** | `dayjs` | Utilitas manipulasi tanggal dengan plugin relative time & locale ID. |
| **Modal / Alert** | `sweetalert2` | Dialog popup aman untuk browser (CSR-safe plugin). |
| **Helper Class** | `clsx` + `tailwind-merge` | Utility `cn()` untuk penggabungan class Tailwind dinamis tanpa bentrok. |
| **Validasi** | `zod` | Skema validasi TypeScript untuk data form dan response API. |
| **SEO** | Nuxt `useSeoMeta` / `useHead` | Metadata title, description, Open Graph, dan Twitter di-render pada SSR tanpa dependency tambahan. |

---

## 📁 Struktur Direktori

```text
├── app/
│   ├── assets/
│   │   └── css/
│   │       └── main.css           # Directive Tailwind CSS
│   ├── layouts/
│   │   └── default.vue            # Layout global (Navbar, theme switcher, footer)
│   ├── pages/
│   │   ├── index.vue              # Halaman Beranda (/)
│   │   └── about.vue              # Halaman Showcase Seluruh Library (/about)
│   ├── plugins/
│   │   ├── axios.ts               # Setup Axios client & interceptor
│   │   ├── dayjs.ts               # Plugin Day.js & locale
│   │   └── sweetalert2.client.ts  # Plugin client-only SweetAlert2
│   ├── stores/
│   │   └── app.ts                 # Store Pinia (state, getters, actions)
│   ├── utils/
│   │   └── cn.ts                  # Helper Tailwind merge class
│   └── app.vue                    # Root component dengan NuxtLayout & NuxtPage
├── public/                        # File statis (favicon, robots.txt, dll)
├── nuxt.config.ts                 # Konfigurasi Nuxt, SSR/CSR routeRules, modul
├── tailwind.config.ts             # Konfigurasi Tailwind, palet Bootstrap, & dark mode
├── tsconfig.json                  # Konfigurasi TypeScript
└── package.json
```

---

## ⚙️ Mode Rendering (SSR & CSR)

- **SSR (Default):** Seluruh halaman dirender di server untuk SEO dan performa initial load.
- **CSR (SPA Mode):** Atur route tertentu melalui `routeRules` pada [nuxt.config.ts](file:///home/wannacry021/Public/Project/Skuad/frontend-nuxtjs/nuxt.config.ts):
  ```ts
  routeRules: {
    '/admin/**': { ssr: false },   // Route ini akan menjadi Client-Side Only (SPA)
    '/static/**': { prerender: true } // Route ini akan di-prerender saat build (SSG)
  }
  ```

---

## 🛠️ Perintah CLI

```bash
# Jalankan server pengembangan
npm run dev

# Validasi typecheck TypeScript
npm run typecheck

# Build untuk mode SSR (Node Server / Nitro)
npm run build

# Preview build produksi
npm run preview

# Generate untuk mode Static Site (SSG / Jamstack)
npm run generate
```

### SEO

Nuxt sudah menyediakan `useSeoMeta()` dan `useHead()` secara native. Atur metadata
unik per halaman (contoh di `app/pages/index.vue` dan `app/pages/about.vue`).
Untuk SEO produksi, ganti judul/deskripsi contoh dan tambahkan URL publik/canonical
serta gambar Open Graph sesuai domain situs. Paket sitemap/robots terpisah belum
diperlukan untuk template ini; tambahkan bila situs membutuhkan sitemap otomatis.

### Deploy ke GitHub Pages

Workflow `.github/workflows/deploy-pages.yml` menjalankan `npm ci` dan `npm run generate`,
lalu mengunggah `.output/public` ke GitHub Pages. Aktifkan **Settings → Pages → Build
and deployment → GitHub Actions** pada repository. Secara default workflow membangun
untuk URL project `/<nama-repository>/`. Untuk custom domain, tambahkan repository
variable `NUXT_APP_BASE_URL` dengan nilai `/`.

GitHub Pages hanya menyajikan file statis: route harus bisa di-prerender dan server
Nitro/API routes tidak berjalan di sana. Gunakan backend terpisah untuk API. Untuk
Vercel, impor repository dan biarkan Vercel mendeteksi Nuxt; gunakan `npm run build`
sehingga SSR/Nitro berjalan di Vercel. Atur `NUXT_APP_BASE_URL=/` pada deployment
Vercel bila ingin mengoverride default.
