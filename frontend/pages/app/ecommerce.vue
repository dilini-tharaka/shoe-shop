<script setup>
useHead({
  title: "E-commerce",
});
</script>

<template>
  <NuxtLayout name="e-commerce">
    <template #hero>
      <div
        class="w-full h-full bg-[url(/img/home.jpg)] bg-center bg-cover"
      ></div>
    </template>

    <template #content>
      <AppProductCard />
    </template>
  </NuxtLayout>
</template>
