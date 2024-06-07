<script setup>
const isSidebarOpen = ref(true);

function toggleMenu() {
  isSidebarOpen.value = !isSidebarOpen.value;

  //console.log(isSidebarOpen.value);
}
</script>

<template>
  <div class="w-full h-screen bg-bkg-secondary flex flex-col">
    <!-- Header Start -->
    <header class="w-full p-5">
      <div
        class="w-full bg-bkg-primary flex justify-between rounded p-2 shadow dark:shadow-black"
      >
        <UButton
          icon="solar:hamburger-menu-linear"
          size="xl"
          color="black"
          variant="ghost"
          @click="toggleMenu"
        />

        <div class="flex justify-center items-center gap-2">
          <UButton
            icon="solar:bell-bold"
            size="sm"
            color="black"
            variant="ghost"
          />
          <!-- @click="notification" -->
          <UButton :icon="themeIcon" size="sm" color="black" variant="ghost" />
          <!-- @click="toggleTheme" -->
          <UAvatar
            chip-color="primary"
            chip-text=""
            chip-position="top-right"
            size="md"
            src="https://avatars.githubusercontent.com/u/739984?v=4"
            alt="Avatar"
          />

          <div class="flex flex-col px-2">
            <span class="text-sm">Hi! Dilini,</span>
            <span class="text-sm">Welcome back</span>
          </div>
        </div>
      </div>
    </header>
    <!-- Header End -->

    <div class="w-full flex-1 flex relative overflow-hidden">
      <!-- Side menu start -->
      <div
        class="absolute lg:static w-full lg:w-[300px] flex h-full px-5 lg:pr-0 pb-5 duration-300 transition-[margin]"
        :class="{
          '-ml-[100%] lg:-ml-[300px]': !isSidebarOpen,
        }"
      >
        <div
          class="bg-bkg-primary w-full rounded-lg shadow dark:shadow-black"
        ></div>
      </div>
      <!-- Side menu End -->

      <div
        class="flex-1 px-5 pb-5 flex flex-col justify-between overflow-y-scroll"
      >
        <!-- Content Start -->
        <main class="w-full flex flex-col gap-3 pb-5">
          <slot />
        </main>
        <!-- Content End -->

        <!-- Footer Start -->
        <footer
          class="w-full p-5 bg-bkg-primary flex justify-between items-center rounded-lg shadow dark:shadow-black"
        >
          <p class="text-sm">
            &copy; {{ new Date().getFullYear() }} Alright reserved
          </p>

          <p class="text-sm">
            Designed & Developed By
            <span class="font-semibold">Dilini Tharaka</span>
          </p>
        </footer>
        <!-- Footer End -->
      </div>
    </div>
  </div>
</template>
