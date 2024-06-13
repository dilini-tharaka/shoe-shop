<script setup>
import { useAuthStore } from "~/store";
definePageMeta({
  middleware: ["auth"]
});

const authStore = useAuthStore();
authStore.checkUser();
const isSidebarOpen = ref(true);

function toggleMenu() {
  isSidebarOpen.value = !isSidebarOpen.value;
  //console.log(isSidebarOpen.value);
}

// Define roles and their respective sidebar items
const sidebarItems = ref({
  1: [
    // admin is 1
    {
      title: "Dashboard",
      to: "/app/dashboard",
    },
    {
      title: "Users",

      to: "/app/user/add",
    },
    {
      title: "Suppliers",

      to: "/app/supplier/add",
    },
    {
      title: "Products",
      to: "/app/products/add",
    },
    {
      title: "POS",
      to: "/app/pos",
    },
    {
      title: "Stock",
      to: "/app/stock/add",
    },

    {
      title: "Logout",
      action: () => authStore.clearUser(), // Clear user data from store logout
      to: "/auth/employeeLogin",
    },
  ],
  2: [
    //Stock Manager is 2
    {
      title: "Dashboard",
      to: "/app/dashboard",
    },
    {
      title: "Products",
      to: "/app/products/add",
    },
    {
      title: "Suppliers",
      to: "/app/supplier/add",
    },
    {
      title: "Stock",
      to: "/app/stock/add",
    },

    {
      title: "Logout",
      action: () => authStore.clearUser(),
      to: "/auth/employeeLogin",
    },
  ],

  3: [
    //sales Assistant 3
    {
      title: "Products",
      to: "/app/products/add",
    },
    {
      title: "Logout",
      action: () => authStore.clearUser(),
      to: "/auth/employeeLogin",
    },
  ],
  4: [
    //cashier is 4
    {
      title: "POS",
      to: "/app/pos",
    },
    {
      title: "Logout",
      action: () => authStore.clearUser(),
      to: "/auth/employeeLogin",
    },
  ],
});

//const currentUserRole = ref(); // admin is 1

//Get sidebar items based on current user role

const sidebarItemsByRole = computed(() => {
  return sidebarItems.value[authStore.role] || [];
});
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
          class="bg-bkg-primary w-full flex flex-col items-center justify p-4 rounded-lg shadow dark:shadow-black"
        >
          <div
            v-for="item in sidebarItemsByRole"
            :key="item.title"
            class="flex p-6"
          >
            <ULink
              :to="item.to"
              class="hover:text-primary text-lg font-mono"
              active-class="text-primary font-bold"
              inactive-class="text-secondary"
            >
              {{ item.title }}</ULink
            >
            <UDivider />
          </div>
        </div>
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
