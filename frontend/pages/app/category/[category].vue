<script setup>
let category = useRoute().params.category;

useHead({
  title: `${category} | E-commerce`,
});
// console.log(category);
</script>

<template>
  <NuxtLayout name="e-commerce">
    <template #hero>
      <div
        :style="{ backgroundImage: `url(/img/${category}.png)` }"
        class="w-full h-full bg-cover"
      ></div>
    </template>

    <template #content>
      <AppProductCard />
    </template>
  </NuxtLayout>
</template>
