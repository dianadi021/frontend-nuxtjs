import { defineStore } from "pinia";

export const useAppStore = defineStore("app", function () {
  const sidebarOpen = ref(true);

  function toggleSidebar() {
    sidebarOpen.value = !sidebarOpen.value;

    alert(sidebarOpen.value)
  }

  return {
    sidebarOpen,
    toggleSidebar,
  };
});
