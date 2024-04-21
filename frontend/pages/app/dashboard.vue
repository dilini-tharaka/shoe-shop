<script setup>
const isSidebarOpen = ref(true);

function toggleMenu() {
  isSidebarOpen.value = !isSidebarOpen.value;
}
</script>

<template>
  <div>
    <NuxtLayout name="app">
      <div
        class="w-full min-h-screen p-8 bg-bkg-primary rounded-lg shadow dark:shadow-black"
      >
        <AppPos/>
      </div>
    </NuxtLayout>
  </div>
</template>
