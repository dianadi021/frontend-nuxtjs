<script setup lang="ts">
useSeoMeta({
  title: 'Showcase Library | Nuxt Frontend Template',
  description: 'Showcase package dan fitur pada template Nuxt 4: Tailwind CSS, Pinia, VueUse, dan lainnya.',
  ogTitle: 'Showcase Library | Nuxt Frontend Template',
  ogDescription: 'Jelajahi package dan fitur yang terintegrasi pada template Nuxt 4.',
  ogType: 'website',
  twitterCard: 'summary'
})

import {
  Switch as HeadlessSwitch,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild
} from '@headlessui/vue'
import { z } from 'zod'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { A11y, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// 1. Nuxt Plugins & Composables
const { $dayjs, $swal, $api } = useNuxtApp()
const colorMode = useColorMode()
const appStore = useAppStore()
const swiperModules = [A11y, Navigation, Pagination]
const swiperSlides = [
  { title: 'SSR siap pakai', description: 'Render HTML di server untuk konten awal yang cepat dan mudah diindeks.', icon: 'heroicons:server-20-solid' },
  { title: 'CSR fleksibel', description: 'Gunakan interaksi sisi client saat halaman atau komponennya membutuhkannya.', icon: 'heroicons:computer-desktop-20-solid' },
  { title: 'Swiper responsif', description: 'Atur jumlah slide per tampilan dan navigasi yang nyaman untuk layar kecil.', icon: 'heroicons:device-phone-mobile-20-solid' },
  { title: 'TypeScript', description: 'Integrasikan komponen carousel dengan aplikasi Nuxt berbasis TypeScript.', icon: 'heroicons:code-bracket-20-solid' }
]

// 2. VueUse Composables
const { x: mouseX, y: mouseY } = useMouse()
const isOnline = useOnline()
const { text: copiedText, copy, copied } = useClipboard()
const samplePersistedNote = useLocalStorage('showcase_note', 'Teks ini tersimpan di LocalStorage secara reaktif!')

// 3. Headless UI States
const isSwitchEnabled = ref(false)
const isModalOpen = ref(false)

// 4. Axios Demo State
const axiosLoading = ref(false)
const axiosResponse = ref<any>(null)
const fetchDemoData = async () => {
  axiosLoading.value = true
  axiosResponse.value = null
  try {
    // Memanfaatkan instance Axios ($api) yang telah dikonfigurasi interceptor & baseURL
    const res = await $api.get('https://jsonplaceholder.typicode.com/todos/1')
    axiosResponse.value = res.data
    if ($swal) {
      $swal.fire({
        icon: 'success',
        title: 'Axios Berhasil!',
        text: `Data diterima: ${res.data.title}`,
        confirmButtonColor: '#0d6efd'
      })
    }
  } catch (error: any) {
    axiosResponse.value = { error: error.message }
  } finally {
    axiosLoading.value = false
  }
}

// 5. SweetAlert2 Demos
const triggerSuccessSwal = () => {
  $swal?.fire({
    title: 'Sukses!',
    text: 'Ini adalah SweetAlert2 standar dengan Bootstrap primary color.',
    icon: 'success',
    confirmButtonColor: '#0d6efd'
  })
}

const triggerConfirmSwal = async () => {
  if (!$swal) return
  const result = await $swal.fire({
    title: 'Apakah kamu yakin?',
    text: 'Aksi ini mendemonstrasikan dialog konfirmasi asinkron.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc3545',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Ya, eksekusi!',
    cancelButtonText: 'Batal'
  })

  if (result.isConfirmed) {
    $swal.fire({
      title: 'Dikonfirmasi!',
      text: 'Kamu menekan tombol konfirmasi.',
      icon: 'success',
      confirmButtonColor: '#198754'
    })
  }
}

const triggerToastSwal = () => {
  $swal?.fire({
    toast: true,
    position: 'top-end',
    icon: 'info',
    title: 'Toast notifikasi berhasil dimunculkan!',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  })
}

// 6. Zod Form Validation Demo
const zodFormSchema = z.object({
  fullName: z.string().min(3, 'Nama minimal 3 karakter'),
  email: z.string().email('Format email tidak valid'),
  age: z.coerce.number().min(18, 'Usia minimal 18 tahun').max(100, 'Usia maksimal 100 tahun')
})

type ZodFormData = z.infer<typeof zodFormSchema>
const formData = reactive<ZodFormData>({
  fullName: '',
  email: '',
  age: 20
})
const formErrors = ref<Record<string, string>>({})
const formSuccess = ref(false)

const handleZodSubmit = () => {
  formErrors.value = {}
  formSuccess.value = false
  const parseResult = zodFormSchema.safeParse(formData)

  if (!parseResult.success) {
    const formatted = parseResult.error.format()
    if (formatted.fullName?._errors?.[0]) formErrors.value.fullName = formatted.fullName._errors[0]
    if (formatted.email?._errors?.[0]) formErrors.value.email = formatted.email._errors[0]
    if (formatted.age?._errors?.[0]) formErrors.value.age = formatted.age._errors[0]
  } else {
    formSuccess.value = true
    $swal?.fire({
      title: 'Validasi Zod Lolos!',
      text: `Data valid: ${JSON.stringify(parseResult.data)}`,
      icon: 'success',
      confirmButtonColor: '#198754'
    })
  }
}

// 7. Day.js Demos
const now = computed(() => $dayjs().format('dddd, DD MMMM YYYY - HH:mm:ss'))
const pastTime = computed(() => $dayjs().subtract(4, 'hour').fromNow())
const futureTime = computed(() => $dayjs().add(3, 'day').format('DD/MM/YYYY (dddd)'))

// 8. Tailwind merge (cn) Demo
const isButtonDanger = ref(false)
const mergedClasses = computed(() => {
  return cn(
    'px-4 py-2 rounded-lg font-medium transition text-white',
    isButtonDanger.value ? 'bg-danger hover:bg-danger-600' : 'bg-primary hover:bg-primary-600'
  )
})
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
    <!-- Header Showcase -->
    <header class="text-center space-y-3">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
        <Icon name="heroicons:sparkles-20-solid" class="w-4 h-4 text-warning" />
        Halaman Rute /about
      </div>
      <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight">
        Showcase Seluruh Library & Package
      </h1>
      <p class="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-400">
        Semua fitur di bawah ini dijalankan langsung oleh library package yang telah terpasang di template Nuxt ini.
      </p>
    </header>

    <!-- Swiper showcase -->
    <section class="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 shadow-sm space-y-5">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 dark:border-slate-700/60 pb-3">
        <div>
          <h2 class="text-lg font-bold">Swiper Carousel</h2>
          <p class="text-xs text-slate-500">Carousel responsif dengan navigasi, pagination, dan aksesibilitas.</p>
        </div>
        <span class="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 font-mono text-slate-600 dark:text-slate-300">swiper/vue</span>
      </div>

      <Swiper
        :modules="swiperModules"
        :slides-per-view="1"
        :space-between="16"
        :navigation="true"
        :pagination="{ clickable: true }"
        :breakpoints="{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }"
        :a11y="{ enabled: true }"
        class="showcase-swiper"
      >
        <SwiperSlide v-for="slide in swiperSlides" :key="slide.title">
          <article class="h-full min-h-44 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 p-5 flex flex-col gap-3">
            <Icon :name="slide.icon" class="w-7 h-7 text-primary" />
            <h3 class="font-semibold">{{ slide.title }}</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400">{{ slide.description }}</p>
          </article>
        </SwiperSlide>
      </Swiper>
    </section>

    <!-- SECTION 1: Tailwind CSS + Bootstrap Colors -->
    <section class="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 shadow-sm space-y-5">
      <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-sm">
            <Icon name="heroicons:paint-brush-20-solid" class="w-5 h-5" />
          </div>
          <div>
            <h2 class="text-lg font-bold">1. Tailwind CSS & Format Warna Bootstrap</h2>
            <p class="text-xs text-slate-500">Palet warna terintegrasi di tailwind.config.ts</p>
          </div>
        </div>
        <span class="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 font-mono text-slate-600 dark:text-slate-300">
          Tailwind + Bootstrap Palette
        </span>
      </div>

      <!-- Color Chips Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
        <div class="p-3 rounded-xl bg-primary text-white text-center shadow-xs">
          <span class="block text-xs font-bold">primary</span>
          <span class="block text-[10px] opacity-80 font-mono">#0d6efd</span>
        </div>
        <div class="p-3 rounded-xl bg-secondary-white text-secondary-black border border-slate-200 dark:border-slate-700 text-center shadow-xs">
          <span class="block text-xs font-bold">sec-white</span>
          <span class="block text-[10px] text-slate-500 font-mono">#f8f9fa</span>
        </div>
        <div class="p-3 rounded-xl bg-secondary-black text-secondary-white text-center shadow-xs">
          <span class="block text-xs font-bold">sec-black</span>
          <span class="block text-[10px] opacity-80 font-mono">#212529</span>
        </div>
        <div class="p-3 rounded-xl bg-secondary text-white text-center shadow-xs">
          <span class="block text-xs font-bold">secondary</span>
          <span class="block text-[10px] opacity-80 font-mono">#6c757d</span>
        </div>
        <div class="p-3 rounded-xl bg-warning text-slate-900 text-center shadow-xs">
          <span class="block text-xs font-bold">warning</span>
          <span class="block text-[10px] text-slate-800 font-mono">#ffc107</span>
        </div>
        <div class="p-3 rounded-xl bg-danger text-white text-center shadow-xs">
          <span class="block text-xs font-bold">danger</span>
          <span class="block text-[10px] opacity-80 font-mono">#dc3545</span>
        </div>
        <div class="p-3 rounded-xl bg-info text-slate-900 text-center shadow-xs">
          <span class="block text-xs font-bold">info</span>
          <span class="block text-[10px] text-slate-800 font-mono">#0dcaf0</span>
        </div>
        <div class="p-3 rounded-xl bg-success text-white text-center shadow-xs">
          <span class="block text-xs font-bold">success</span>
          <span class="block text-[10px] opacity-80 font-mono">#198754</span>
        </div>
      </div>

      <!-- Helper cn() Showcase -->
      <div class="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div>
          <span class="font-semibold text-slate-700 dark:text-slate-300">Helper cn() (clsx + tailwind-merge):</span>
          <p class="text-slate-500">Menggabungkan class dinamis tanpa konflik CSS.</p>
        </div>
        <div class="flex items-center gap-2">
          <button
            type="button"
            :class="mergedClasses"
            @click="isButtonDanger = !isButtonDanger"
          >
            Klik Toggle Warna (Saat ini: {{ isButtonDanger ? 'bg-danger' : 'bg-primary' }})
          </button>
        </div>
      </div>
    </section>

    <!-- SECTION 2: Headless UI Components -->
    <section class="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 shadow-sm space-y-5">
      <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-info/20 text-info-700 dark:text-info flex items-center justify-center font-bold text-sm">
            <Icon name="heroicons:square-3-stack-3d-20-solid" class="w-5 h-5" />
          </div>
          <div>
            <h2 class="text-lg font-bold">2. Headless UI (@headlessui/vue)</h2>
            <p class="text-xs text-slate-500">Komponen UI interaktif, accessible, dan unstyled</p>
          </div>
        </div>
        <span class="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 font-mono text-slate-600 dark:text-slate-300">
          @headlessui/vue
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <!-- Switch (Toggle) -->
        <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
          <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Headless UI Switch</span>
          <div class="flex items-center justify-between">
            <span class="text-sm">Status Notifikasi:</span>
            <HeadlessSwitch
              v-model="isSwitchEnabled"
              :class="isSwitchEnabled ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none"
            >
              <span
                :class="isSwitchEnabled ? 'translate-x-6' : 'translate-x-1'"
                class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
              />
            </HeadlessSwitch>
          </div>
          <p class="text-xs text-slate-500">Nilai switch: <strong>{{ isSwitchEnabled ? 'Aktif (True)' : 'Nonaktif (False)' }}</strong></p>
        </div>

        <!-- Menu (Dropdown) -->
        <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
          <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Headless UI Menu (Dropdown)</span>
          <Menu as="div" class="relative inline-block text-left w-full">
            <MenuButton class="w-full inline-flex justify-between items-center gap-2 rounded-lg bg-slate-100 dark:bg-slate-700 px-4 py-2 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition">
              <span>Pilihan Menu Dropdown</span>
              <Icon name="heroicons:chevron-down-20-solid" class="w-4 h-4 text-slate-500" />
            </MenuButton>
            <transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <MenuItems class="absolute right-0 mt-2 w-full origin-top-right divide-y divide-slate-100 dark:divide-slate-700 rounded-lg bg-white dark:bg-slate-800 shadow-lg ring-1 ring-black/5 focus:outline-none z-20">
                <div class="p-1">
                  <MenuItem v-slot="{ active }">
                    <button :class="[active ? 'bg-primary text-white' : 'text-slate-700 dark:text-slate-200', 'group flex w-full items-center rounded-md px-2 py-2 text-xs']" @click="triggerToastSwal">
                      Opsi 1: Munculkan Toast
                    </button>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <button :class="[active ? 'bg-primary text-white' : 'text-slate-700 dark:text-slate-200', 'group flex w-full items-center rounded-md px-2 py-2 text-xs']" @click="triggerSuccessSwal">
                      Opsi 2: Munculkan Dialog
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
          <p class="text-xs text-slate-500">Accessible dropdown dengan keyboard focus navigation.</p>
        </div>

        <!-- Dialog (Modal) -->
        <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
          <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Headless UI Modal (Dialog)</span>
          <button
            type="button"
            class="w-full inline-flex justify-center items-center gap-2 rounded-lg bg-primary hover:bg-primary-600 text-white px-4 py-2 text-sm font-medium transition"
            @click="isModalOpen = true"
          >
            <Icon name="heroicons:window-20-solid" class="w-4 h-4" />
            Buka Modal Dialog
          </button>
          <p class="text-xs text-slate-500">Modal dialog ramah pembaca layar (ARIA focus trap).</p>

          <!-- Headless UI Modal Transition -->
          <TransitionRoot appear :show="isModalOpen" as="template">
            <Dialog as="div" class="relative z-50" @close="isModalOpen = false">
              <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div class="fixed inset-0 bg-black/50 backdrop-blur-xs" />
              </TransitionChild>

              <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                  <TransitionChild
                    as="template"
                    enter="duration-300 ease-out"
                    enter-from="opacity-0 scale-95"
                    enter-to="opacity-100 scale-100"
                    leave="duration-200 ease-in"
                    leave-from="opacity-100 scale-100"
                    leave-to="opacity-0 scale-95"
                  >
                    <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-6 text-left align-middle shadow-xl transition-all space-y-4">
                      <DialogTitle as="h3" class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Icon name="heroicons:check-circle-20-solid" class="w-6 h-6 text-success" />
                        Modal Headless UI Aktif
                      </DialogTitle>
                      <p class="text-xs text-slate-600 dark:text-slate-300">
                        Komponen modal ini dirender melalui package <code>@headlessui/vue</code> dengan transisi animasi halus dan aksesibilitas penuh.
                      </p>
                      <div class="flex justify-end pt-2">
                        <button
                          type="button"
                          class="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-xs font-semibold text-slate-800 dark:text-slate-100 transition"
                          @click="isModalOpen = false"
                        >
                          Tutup Modal
                        </button>
                      </div>
                    </DialogPanel>
                  </TransitionChild>
                </div>
              </div>
            </Dialog>
          </TransitionRoot>
        </div>
      </div>

      <!-- Disclosure (Accordion) -->
      <div class="border-t border-slate-100 dark:border-slate-700/60 pt-4">
        <Disclosure v-slot="{ open }">
          <DisclosureButton class="flex w-full justify-between rounded-lg bg-slate-100 dark:bg-slate-700/60 px-4 py-2.5 text-left text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition">
            <span class="flex items-center gap-2">
              <Icon name="heroicons:question-mark-circle-20-solid" class="w-4 h-4 text-primary" />
              Disclosure / Accordion Demo (Klik untuk buka/tutup)
            </span>
            <Icon
              name="heroicons:chevron-up-20-solid"
              :class="open ? 'rotate-180 transform' : ''"
              class="h-5 w-5 text-slate-500 transition-transform duration-200"
            />
          </DisclosureButton>
          <DisclosurePanel class="px-4 pt-3 pb-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Komponen Disclosure ini memudahkan pembuatan panel FAQ, accordion menu, atau collapsible filter tanpa memerlukan JavaScript manual tambahan.
          </DisclosurePanel>
        </Disclosure>
      </div>
    </section>

    <!-- SECTION 3: VueUse Utilities & Nuxt Icon -->
    <section class="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 shadow-sm space-y-5">
      <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold text-sm">
            <Icon name="heroicons:sparkles-20-solid" class="w-5 h-5" />
          </div>
          <div>
            <h2 class="text-lg font-bold">3. VueUse Utilities (@vueuse/core) & Nuxt Icon</h2>
            <p class="text-xs text-slate-500">Komposisi reaktif peramban browser & ribuan icon</p>
          </div>
        </div>
        <span class="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 font-mono text-slate-600 dark:text-slate-300">
          @vueuse/nuxt · @nuxt/icon
        </span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <!-- useMouse -->
        <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
          <div class="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase">
            <Icon name="heroicons:cursor-arrow-rays-20-solid" class="w-4 h-4 text-primary" />
            <span>useMouse</span>
          </div>
          <div class="text-base font-mono font-bold text-slate-900 dark:text-white">
            X: {{ mouseX }} px · Y: {{ mouseY }} px
          </div>
          <p class="text-[11px] text-slate-500">Posisi kursor real-time</p>
        </div>

        <!-- useOnline -->
        <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
          <div class="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase">
            <Icon name="heroicons:wifi-20-solid" class="w-4 h-4 text-info" />
            <span>useOnline</span>
          </div>
          <div class="flex items-center gap-2">
            <span
              class="inline-block w-2.5 h-2.5 rounded-full"
              :class="isOnline ? 'bg-success animate-pulse' : 'bg-danger'"
            />
            <span class="text-sm font-bold">{{ isOnline ? 'Tersambung (Online)' : 'Offline' }}</span>
          </div>
          <p class="text-[11px] text-slate-500">Status konektivitas browser</p>
        </div>

        <!-- useClipboard -->
        <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
          <div class="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase">
            <Icon name="heroicons:clipboard-document-check-20-solid" class="w-4 h-4 text-warning" />
            <span>useClipboard</span>
          </div>
          <button
            type="button"
            class="w-full px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-xs font-medium transition flex items-center justify-center gap-1.5"
            @click="copy('Nuxt All-Around Template: Copy Success!')"
          >
            <Icon :name="copied ? 'heroicons:check-20-solid' : 'heroicons:document-duplicate-20-solid'" class="w-3.5 h-3.5" />
            <span>{{ copied ? 'Tersalin ke Clipboard!' : 'Salin Teks Contoh' }}</span>
          </button>
          <p class="text-[11px] text-slate-500">Akses API Clipboard</p>
        </div>

        <!-- useLocalStorage -->
        <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
          <div class="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase">
            <Icon name="heroicons:circle-stack-20-solid" class="w-4 h-4 text-primary" />
            <span>useLocalStorage</span>
          </div>
          <input
            v-model="samplePersistedNote"
            type="text"
            class="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800"
            placeholder="Ketik catatan..."
          >
          <p class="text-[11px] text-slate-500">Tersimpan otomatis di browser</p>
        </div>
      </div>

      <!-- Icon sets demo -->
      <div class="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span class="font-semibold text-slate-600 dark:text-slate-400">Dukungan Multi Icon Set (Nuxt Icon):</span>
        <div class="flex items-center gap-3">
          <span class="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-100 dark:bg-slate-700">
            <Icon name="heroicons:rocket-launch-20-solid" class="w-4 h-4 text-danger" /> Heroicons
          </span>
          <span class="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-100 dark:bg-slate-700">
            <Icon name="lucide:heart" class="w-4 h-4 text-danger" /> Lucide
          </span>
          <span class="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-100 dark:bg-slate-700">
            <Icon name="ph:lightning-fill" class="w-4 h-4 text-warning" /> Phosphor
          </span>
          <span class="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-100 dark:bg-slate-700">
            <Icon name="carbon:data-analytics" class="w-4 h-4 text-info" /> Carbon
          </span>
        </div>
      </div>
    </section>

    <!-- SECTION 4: Pinia State Management -->
    <section class="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 shadow-sm space-y-5">
      <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-warning/20 text-warning-700 dark:text-warning flex items-center justify-center font-bold text-sm">
            <Icon name="heroicons:circle-stack-20-solid" class="w-5 h-5" />
          </div>
          <div>
            <h2 class="text-lg font-bold">4. Pinia State Management (@pinia/nuxt)</h2>
            <p class="text-xs text-slate-500">State terpusat reaktif yang tersinkronisasi antar-halaman</p>
          </div>
        </div>
        <span class="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 font-mono text-slate-600 dark:text-slate-300">
          app/stores/app.ts
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 flex flex-col justify-center items-center text-center space-y-1">
          <span class="text-xs text-slate-500">Nilai Counter Store</span>
          <div class="text-3xl font-extrabold text-primary font-mono">{{ appStore.counter }}</div>
          <span class="text-xs text-slate-400">Getter Double Counter: <strong>{{ appStore.doubleCounter }}</strong></span>
        </div>

        <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col justify-center gap-2">
          <div class="flex gap-2">
            <button
              type="button"
              class="flex-1 px-3 py-2 rounded-lg bg-primary hover:bg-primary-600 text-white font-bold text-sm transition"
              @click="appStore.increment"
            >
              + Tambah (Increment)
            </button>
            <button
              type="button"
              class="flex-1 px-3 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-200 font-bold text-sm transition"
              @click="appStore.decrement"
            >
              - Kurang (Decrement)
            </button>
          </div>
          <button
            type="button"
            class="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs text-slate-600 dark:text-slate-300 transition"
            @click="appStore.resetCounter"
          >
            Reset Counter ke 0
          </button>
        </div>

        <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col justify-center space-y-2 text-xs text-slate-600 dark:text-slate-400">
          <p>
            Nilai counter ini akan tetap sinkron ketika kamu berpindah kembali ke halaman <strong>Beranda (/)</strong> karena tersimpan di store global Pinia.
          </p>
          <div class="text-[11px] text-slate-500">
            Nama App: <code class="font-bold text-primary">{{ appStore.appName }}</code>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 5: SweetAlert2 & Day.js -->
    <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- SweetAlert2 Box -->
      <div class="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 shadow-sm space-y-4">
        <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
          <div class="flex items-center gap-2">
            <Icon name="heroicons:bell-20-solid" class="w-5 h-5 text-warning" />
            <h2 class="text-base font-bold">5. SweetAlert2 (sweetalert2)</h2>
          </div>
          <span class="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 font-mono text-slate-500">CSR Plugin Safe</span>
        </div>

        <p class="text-xs text-slate-500">SweetAlert2 dikonfigurasi melalui plugin client-only sehingga 100% aman dan tidak menyebabkan error SSR.</p>

        <div class="flex flex-wrap gap-2.5">
          <button
            type="button"
            class="px-3.5 py-2 rounded-lg bg-primary hover:bg-primary-600 text-white text-xs font-semibold transition"
            @click="triggerSuccessSwal"
          >
            Alert Sukses
          </button>
          <button
            type="button"
            class="px-3.5 py-2 rounded-lg bg-danger hover:bg-danger-600 text-white text-xs font-semibold transition"
            @click="triggerConfirmSwal"
          >
            Dialog Konfirmasi
          </button>
          <button
            type="button"
            class="px-3.5 py-2 rounded-lg bg-info hover:bg-info-600 text-slate-900 text-xs font-semibold transition"
            @click="triggerToastSwal"
          >
            Toast Notification
          </button>
        </div>
      </div>

      <!-- Day.js Box -->
      <div class="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 shadow-sm space-y-4">
        <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
          <div class="flex items-center gap-2">
            <Icon name="heroicons:clock-20-solid" class="w-5 h-5 text-primary" />
            <h2 class="text-base font-bold">6. Day.js (dayjs)</h2>
          </div>
          <span class="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 font-mono text-slate-500">Locale Indonesia</span>
        </div>

        <div class="space-y-2 text-xs">
          <div class="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 flex justify-between">
            <span class="text-slate-500">Waktu Sekarang:</span>
            <span class="font-bold font-mono text-slate-800 dark:text-slate-200">{{ now }}</span>
          </div>
          <div class="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 flex justify-between">
            <span class="text-slate-500">Relative Time (fromNow):</span>
            <span class="font-semibold text-primary">{{ pastTime }}</span>
          </div>
          <div class="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 flex justify-between">
            <span class="text-slate-500">3 Hari ke Depan:</span>
            <span class="font-semibold text-success">{{ futureTime }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 6: Zod Form Validation -->
    <section class="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 shadow-sm space-y-5">
      <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-indigo-500 text-white flex items-center justify-center font-bold text-sm">
            <Icon name="heroicons:shield-check-20-solid" class="w-5 h-5" />
          </div>
          <div>
            <h2 class="text-lg font-bold">7. Zod Form Validation (zod)</h2>
            <p class="text-xs text-slate-500">Validasi skema TypeScript yang aman dan deklaratif</p>
          </div>
        </div>
        <span class="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 font-mono text-slate-600 dark:text-slate-300">
          zod safeParse
        </span>
      </div>

      <form class="grid grid-cols-1 md:grid-cols-3 gap-4" @submit.prevent="handleZodSubmit">
        <!-- Full Name Input -->
        <div class="space-y-1">
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Nama Lengkap (min 3 char)</label>
          <input
            v-model="formData.fullName"
            type="text"
            class="w-full text-xs px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary focus:outline-none dark:bg-slate-800"
            :class="formErrors.fullName ? 'border-danger focus:ring-danger' : 'border-slate-300 dark:border-slate-700'"
            placeholder="Misal: John Doe"
          >
          <span v-if="formErrors.fullName" class="text-[11px] text-danger font-medium block">{{ formErrors.fullName }}</span>
        </div>

        <!-- Email Input -->
        <div class="space-y-1">
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Alamat Email</label>
          <input
            v-model="formData.email"
            type="text"
            class="w-full text-xs px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary focus:outline-none dark:bg-slate-800"
            :class="formErrors.email ? 'border-danger focus:ring-danger' : 'border-slate-300 dark:border-slate-700'"
            placeholder="nama@domain.com"
          >
          <span v-if="formErrors.email" class="text-[11px] text-danger font-medium block">{{ formErrors.email }}</span>
        </div>

        <!-- Age Input -->
        <div class="space-y-1">
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Usia (18 - 100 tahun)</label>
          <input
            v-model.number="formData.age"
            type="number"
            class="w-full text-xs px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary focus:outline-none dark:bg-slate-800"
            :class="formErrors.age ? 'border-danger focus:ring-danger' : 'border-slate-300 dark:border-slate-700'"
          >
          <span v-if="formErrors.age" class="text-[11px] text-danger font-medium block">{{ formErrors.age }}</span>
        </div>

        <!-- Submit Button -->
        <div class="md:col-span-3 flex items-center justify-between pt-2">
          <span v-if="formSuccess" class="text-xs text-success font-semibold flex items-center gap-1">
            <Icon name="heroicons:check-circle-20-solid" class="w-4 h-4" />
            Validasi Berhasil & Lolos Zod Schema!
          </span>
          <span v-else class="text-xs text-slate-400">Tekan tombol untuk menguji validator Zod</span>

          <button
            type="submit"
            class="px-5 py-2 rounded-lg bg-primary hover:bg-primary-600 text-white text-xs font-bold transition shadow-xs"
          >
            Uji Validasi Form (Zod)
          </button>
        </div>
      </form>
    </section>

    <!-- SECTION 7: Axios HTTP Client -->
    <section class="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 shadow-sm space-y-5">
      <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center font-bold text-sm">
            <Icon name="heroicons:arrow-path-20-solid" class="w-5 h-5" />
          </div>
          <div>
            <h2 class="text-lg font-bold">8. Axios Client (axios)</h2>
            <p class="text-xs text-slate-500">Instance Axios plugin dengan interceptor request/response</p>
          </div>
        </div>
        <span class="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 font-mono text-slate-600 dark:text-slate-300">
          $api / useNuxtApp()
        </span>
      </div>

      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-xs text-slate-600 dark:text-slate-400">
          Uji pemanggilan API eksternal via instance Axios yang terdaftar secara otomatis di Nuxt:
        </p>
        <button
          type="button"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary-600 text-white text-xs font-semibold transition"
          :disabled="axiosLoading"
          @click="fetchDemoData"
        >
          <Icon v-if="axiosLoading" name="heroicons:arrow-path-20-solid" class="w-4 h-4 animate-spin" />
          <Icon v-else name="heroicons:cloud-arrow-down-20-solid" class="w-4 h-4" />
          <span>{{ axiosLoading ? 'Memuat Data...' : 'Kirim Request Axios' }}</span>
        </button>
      </div>

      <!-- Result View -->
      <div v-if="axiosResponse" class="p-3 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <span class="text-[11px] font-mono text-slate-400 block mb-1">Response JSON ($api):</span>
        <pre class="text-xs font-mono text-slate-800 dark:text-slate-200 overflow-x-auto">{{ JSON.stringify(axiosResponse, null, 2) }}</pre>
      </div>
    </section>
  </div>
</template>
