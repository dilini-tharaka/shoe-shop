<script setup>
const color = useColorMode();

const themeIcon = computed(() => {
  return color.preference == "dark" ? "solar:moon-bold" : "solar:sun-bold";
});

function toggleTheme() {
  color.preference = color.preference == "dark" ? "light" : "dark";
}
</script>

<template>
  <div class="w-full p-5">
    <div
      class="bg-bkg-primary flex justify-between items-center shadow dark:shadow-black py-3 rounded"
    >
      <div class="hidden lg:flex w-[10%] rounded-full ml-6">
        <img src="/img/logo.png" alt="logo" class="w-2/5" />
      </div>
      <div class="flex lg:w-full gap-5 lg:gap-12 pl-4 lg:pl-20">
        <ULink
          to="/app/ecommerce"
          class="transition-colors duration-300 hover:text-primary text-md lg:text-lg font-mono"
          active-class="text-primary"
          inactive-class="text-secondary"
        >
          Home
        </ULink>

        <ULink
          to="/app/category/men"
          class="transition-colors duration-300 hover:text-primary text-md lg:text-lg font-mono"
          active-class="text-primary"
          inactive-class="text-secondary"
        >
          Men
        </ULink>

        <ULink
          to="/app/category/women"
          class="transition-colors duration-300 hover:text-primary text-md lg:text-lg font-mono"
          active-class="text-primary"
          inactive-class="text-secondary"
        >
          Women
        </ULink>

        <ULink
          to="/app/category/kids"
          class="transition-colors duration-300 hover:text-primary text-md lg:text-lg font-mono"
          active-class="text-primary"
          inactive-class="text-secondary"
        >
          Kids
        </ULink>
        <ULink
          to="/app/category/sports"
          class="transition-colors duration-300 hover:text-primary text-md lg:text-lg font-mono"
          active-class="text-primary"
          inactive-class="text-secondary"
        >
          Sports
        </ULink>
      </div>
      <div class="flex gap-3 px-5">
        <UButton
          variant="ghost"
          :icon="themeIcon"
          color="black"
          @click="toggleTheme"
          class="hidden lg:flex transition-transform duration-300 hover:rotate-[360deg]"
        />
        <UButton label="Register" color="gray" to="/auth/register" />
        <UButton label="Login" color="black" to="/auth/login" />
      </div>
    </div>
  </div>
</template>
