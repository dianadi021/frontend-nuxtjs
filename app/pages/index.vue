<script setup lang="ts">
useSeoMeta({
  title: 'Nuxt Frontend Template | SSR, CSR, and TypeScript',
  description: 'Template Nuxt 4 dengan dukungan SSR, CSR, TypeScript, dan Tailwind CSS.',
  ogTitle: 'Nuxt Frontend Template',
  ogDescription: 'Template Nuxt 4 dengan dukungan SSR, CSR, TypeScript, dan Tailwind CSS.',
  ogType: 'website',
  twitterCard: 'summary'
})

const appStore = useAppStore()
const { $dayjs, $swal } = useNuxtApp()

const currentDate = computed(() => {
  return $dayjs().format('dddd, DD MMMM YYYY - HH:mm:ss')
})

const showSampleAlert = () => {
  if ($swal) {
    $swal.fire({
      title: 'SweetAlert2 Berhasil!',
      text: 'Package SweetAlert2 berfungsi secara aman di client-side (CSR).',
      icon: 'success',
      confirmButtonColor: '#0d6efd'
    })
  }
}

const features = [
  { name: 'Nuxt 4 / 3 Engine', desc: 'Hybrid rendering (SSR & CSR ready) dengan Nitro.', icon: 'heroicons:bolt-20-solid' },
  { name: 'Tailwind CSS v3', desc: 'Pre-configured dengan Typography, Forms, & Aspect Ratio.', icon: 'heroicons:paint-brush-20-solid' },
  { name: 'Bootstrap Color Palette', desc: 'Warna primary, secondary, danger, warning, info, dll terintegrasi.', icon: 'heroicons:swatch-20-solid' },
  { name: 'Pinia Store', desc: 'State management global yang reaktif & terintegrasi penuh.', icon: 'heroicons:circle-stack-20-solid' },
  { name: 'VueUse & Nuxt Icon', desc: 'Ratusan utility composition & ribuan SVG icons on-demand.', icon: 'heroicons:sparkles-20-solid' },
  { name: 'Axios, Dayjs & Swal', desc: 'HTTP client, format tanggal lokal, dan modal dialog siap pakai.', icon: 'heroicons:cube-transparent-20-solid' }
]
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
    <!-- Hero Section -->
    <section class="text-center py-6 space-y-4">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
        <Icon name="heroicons:check-badge-20-solid" class="w-4 h-4" />
        Nuxt All-Around Template Aktif
      </div>

      <h2 class="text-3xl sm:text-5xl font-extrabold tracking-tight">
        Fondasi Frontend Modern
      </h2>

      <p class="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-400">
        Template all-around siap pakai mendukung SSR & CSR, Tailwind CSS dengan palet Bootstrap, Pinia store, Headless UI, Axios, VueUse, dan Zod.
      </p>

      <!-- Action Buttons -->
      <div class="flex flex-wrap items-center justify-center gap-3 pt-3">
        <!-- Direct Link to /about -->
        <NuxtLink
          to="/about"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-600 text-white text-sm font-semibold transition shadow-md hover:shadow-lg"
        >
          <Icon name="heroicons:sparkles-20-solid" class="w-4 h-4" />
          Buka Showcase Library (/about)
        </NuxtLink>

        <button
          type="button"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-sm font-medium transition"
          @click="showSampleAlert"
        >
          <Icon name="heroicons:bell-20-solid" class="w-4 h-4 text-warning" />
          Test SweetAlert2
        </button>

        <button
          type="button"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-sm font-medium transition"
          @click="appStore.increment"
        >
          <Icon name="heroicons:plus-circle-20-solid" class="w-4 h-4 text-primary" />
          Counter Pinia: {{ appStore.counter }}
        </button>
      </div>
    </section>

    <!-- Feature Grid -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div
        v-for="item in features"
        :key="item.name"
        class="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 shadow-xs space-y-2 hover:border-primary/50 transition"
      >
        <div class="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          <Icon :name="item.icon" class="w-5 h-5" />
        </div>
        <h3 class="font-semibold text-base">{{ item.name }}</h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{{ item.desc }}</p>
      </div>
    </section>

    <!-- Bootstrap Color Palette Preview -->
    <section class="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="font-bold text-base">Palet Warna Format Bootstrap</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">Terdaftar di Tailwind CSS config dan siap digunakan langsung.</p>
        </div>
        <span class="text-xs font-mono px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300">tailwind.config.ts</span>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 pt-1">
        <div class="p-3 rounded-lg bg-primary text-white text-center shadow-xs">
          <span class="block text-xs font-bold">Primary</span>
          <span class="block text-[10px] opacity-80 font-mono">#0d6efd</span>
        </div>
        <div class="p-3 rounded-lg bg-secondary-white text-secondary-black border border-slate-200 dark:border-slate-700 text-center shadow-xs">
          <span class="block text-xs font-bold">Sec. White</span>
          <span class="block text-[10px] text-slate-500 font-mono">#f8f9fa</span>
        </div>
        <div class="p-3 rounded-lg bg-secondary-black text-secondary-white text-center shadow-xs">
          <span class="block text-xs font-bold">Sec. Black</span>
          <span class="block text-[10px] opacity-80 font-mono">#212529</span>
        </div>
        <div class="p-3 rounded-lg bg-secondary text-white text-center shadow-xs">
          <span class="block text-xs font-bold">Secondary</span>
          <span class="block text-[10px] opacity-80 font-mono">#6c757d</span>
        </div>
        <div class="p-3 rounded-lg bg-warning text-slate-900 text-center shadow-xs">
          <span class="block text-xs font-bold">Warning</span>
          <span class="block text-[10px] text-slate-800 font-mono">#ffc107</span>
        </div>
        <div class="p-3 rounded-lg bg-danger text-white text-center shadow-xs">
          <span class="block text-xs font-bold">Danger</span>
          <span class="block text-[10px] opacity-80 font-mono">#dc3545</span>
        </div>
        <div class="p-3 rounded-lg bg-info text-slate-900 text-center shadow-xs">
          <span class="block text-xs font-bold">Info</span>
          <span class="block text-[10px] text-slate-800 font-mono">#0dcaf0</span>
        </div>
      </div>
    </section>

    <!-- System Info Box -->
    <section class="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
      <div class="flex items-center gap-2">
        <Icon name="heroicons:clock-20-solid" class="w-4 h-4 text-primary" />
        <span>Waktu Sistem (Dayjs): <strong>{{ currentDate }}</strong></span>
      </div>
      <div class="flex items-center gap-2">
        <Icon name="heroicons:check-circle-20-solid" class="w-4 h-4 text-success" />
        <span>TypeScript Strict & Auto-Import Aktif</span>
      </div>
    </section>
  </div>
</template>
