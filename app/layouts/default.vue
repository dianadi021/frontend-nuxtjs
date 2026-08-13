<script setup lang="ts">
const colorMode = useColorMode()
const appStore = useAppStore()
const route = useRoute()
const { $dayjs } = useNuxtApp()

const isHydrated = ref(false)
onMounted(() => {
  isHydrated.value = true
})

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-200">
    <!-- Navbar Header -->
    <header class="border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md sticky top-0 z-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <!-- Logo & Brand -->
        <NuxtLink to="/" class="flex items-center space-x-3 group">
          <div class="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-primary-600 transition">
            N
          </div>
          <div>
            <h1 class="text-base font-semibold leading-none">{{ appStore.appName }}</h1>
            <span class="text-xs text-slate-500 dark:text-slate-400">All-Around Frontend Template</span>
          </div>
        </NuxtLink>

        <!-- Navigation Links -->
        <nav class="hidden md:flex items-center space-x-1">
          <NuxtLink
            to="/"
            class="px-3 py-2 rounded-lg text-sm font-medium transition"
            :class="route.path === '/' ? 'bg-primary/10 text-primary dark:text-primary-300 font-semibold' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'"
          >
            Beranda
          </NuxtLink>
          <NuxtLink
            to="/about"
            class="px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5"
            :class="route.path === '/about' ? 'bg-primary/10 text-primary dark:text-primary-300 font-semibold' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'"
          >
            <span>Showcase Library</span>
            <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-danger text-white font-bold leading-none">/about</span>
          </NuxtLink>
        </nav>

        <!-- Status & Theme Controls -->
        <div class="flex items-center space-x-3">
          <!-- SSR / CSR Badge -->
          <span
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
            :class="isHydrated ? 'bg-success/10 text-success dark:bg-success/20 dark:text-success' : 'bg-warning/20 text-warning-700 dark:text-warning'"
          >
            {{ isHydrated ? '● CSR Hydrated' : '○ SSR Ready' }}
          </span>

          <!-- Dark Mode Toggle -->
          <button
            type="button"
            class="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
            :title="`Ubah ke tema ${colorMode.value === 'dark' ? 'light' : 'dark'}`"
            @click="toggleTheme"
          >
            <Icon
              :name="colorMode.value === 'dark' ? 'heroicons:sun-20-solid' : 'heroicons:moon-20-solid'"
              class="w-5 h-5"
            />
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content Slot -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Global Footer -->
    <footer class="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-xs text-slate-500 dark:text-slate-400">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <Icon name="heroicons:code-bracket-20-solid" class="w-4 h-4 text-primary" />
          <span>Nuxt 4 + Vue 3 Frontend Template · SSR & CSR Ready</span>
        </div>
        <div class="flex items-center gap-3">
          <NuxtLink to="/" class="hover:text-primary transition">Beranda</NuxtLink>
          <span>•</span>
          <NuxtLink to="/about" class="hover:text-primary transition">Showcase Library (/about)</NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>
