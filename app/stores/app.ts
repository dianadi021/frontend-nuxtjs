import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    appName: 'Nuxt Frontend Template',
    isSidebarOpen: false,
    counter: 0
  }),
  getters: {
    getAppName: (state) => state.appName,
    doubleCounter: (state) => state.counter * 2
  },
  actions: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
    },
    increment() {
      this.counter++
    },
    decrement() {
      this.counter--
    },
    resetCounter() {
      this.counter = 0
    }
  }
})
