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
      <div class="w-10 h-10 rounded-full ml-6">
        <img src="/img/logo.png" alt="logo" class="w-full" />
      </div>
      <div class="flex gap-12 pl-20">
          <UFormGroup label="Kids" size="xl"></UFormGroup>
          <UFormGroup label="Men" size="xl"></UFormGroup>
          <UFormGroup label="Women" size="xl"></UFormGroup>
          <UFormGroup label="Sports" size="xl"></UFormGroup>
      </div>
      <div class="flex gap-3 px-5">
        <UButton
          variant="ghost"
          :icon="themeIcon"
          color="black"
          @click="toggleTheme"
          class="transition-transform duration-300 hover:rotate-[360deg]"
        />
        <UButton label="Register" color="gray" to="/auth/register" />
        <UButton label="Login" color="black" to="/auth/login" />
      </div>
    </div>
  </div>
</template>
