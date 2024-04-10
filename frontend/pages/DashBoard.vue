<script setup>
import { computed } from "vue";

const color = useColorMode();

const themeIcon = computed(() => {
  return color.preference == "dark" ? "solar:moon-bold" : "solar:sun-bold";
});

function toggleTheme() {
  color.preference = color.preference == "dark" ? "light" : "dark";
}

function notification() {
  console.log("Notification");
}

function showMenu() {
  console.log("Menu");
}
</script>

<template>
  <!-- Dashboard header -->

  <div class="w-full min-h-screen bg-bkg-secondary flex">
    <div class="w-full p-5">
      <div
        class="w-full bg-bkg-primary flex justify-between rounded p-2 shadow dark:shadow-black"
      >
        <UButton
          icon="solar:hamburger-menu-linear"
          size="xl"
          color="black"
          variant="ghost"
          @click="showMenu"
        />

        <div class="flex justify-center items-center gap-2">
          <UButton
            icon="solar:bell-bold"
            size="sm"
            color="black"
            variant="ghost"
            @click="notification"
          />

          <UButton
            :icon="themeIcon"
            size="sm"
            color="black"
            variant="ghost"
            @click="toggleTheme"
          />
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

      <!-- dashboard content -->
      <div class="w-full py-2 flex">
        <div
          class="hidden lg:flex lg:w-1/6 bg-bkg-primary flex-col justify-center items-center rounded mr-1 gap-6 p-2 py-2"
        >
          <ULink
            to="/"
            class="hover:text-primary text-lg font-mono"
            active-class="text-primary"
            inactive-class="text-secondary"
            >Home</ULink
          >
          <UDivider label=" " />

          <ULink
            to="/"
            class="hover:text-primary text-lg font-mono"
            active-class="text-primary"
            inactive-class="text-secondary"
            >Stocks</ULink
          >
          <UDivider label=" " />

          <ULink
            to="/"
            class="hover:text-primary text-lg font-mono"
            active-class="text-primary"
            inactive-class="text-secondary"
            >Products</ULink
          >
          <UDivider label=" " />

          <ULink
            to="/"
            class="hover:text-primary text-lg font-mono"
            active-class="text-primary"
            inactive-class="text-secondary"
            >Suppliers</ULink
          >
          <UDivider label=" " />

          <ULink
            to="/"
            class="hover:text-primary text-lg font-mono"
            active-class="text-primary"
            inactive-class="text-secondary"
            >Users</ULink
          >
          <UDivider label=" " />

          <ULink
            to="/"
            class="hover:text-primary text-lg font-mono"
            active-class="text-primary"
            inactive-class="text-secondary"
            >POS</ULink
          >
          <UDivider label=" " />
        </div>

        <div class="w-full lg:w-5/6 bg-bkg-primary flex rounded ml-1">
          <AppAddUser />
        </div>
      </div>
    </div>
  </div>
</template>
