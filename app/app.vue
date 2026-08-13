<script setup lang="ts">
const appStore = useAppStore();

const { showSwal, showLoading, hideLoading } = useNotify();

function testSwal() {
  showLoading();
}
</script>

<template>
  <div>
    <!-- <NuxtRouteAnnouncer /> -->
    <!-- <NuxtWelcome /> -->

    <div class="w-full flex flex-wrap">
      <i class="fa-solid fa-house"></i>

      <i class="fa-solid fa-user"></i>

      <i class="fa-solid fa-spinner fa-spin"></i>

      <div class="w-full flex justify-center">
        <div class="h-[120px] w-[120px] bg-yellow-400">
          <p>Tailwind is working!</p>
        </div>
      </div>

      <button @click="appStore.toggleSidebar">Toggle Sidebar</button>
      <button @click="testSwal()">Swall</button>
    </div>
  </div>
</template>
