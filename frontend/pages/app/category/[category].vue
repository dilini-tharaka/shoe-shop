<script setup>
const category = ref(useRoute().params.category);
console.log(category.value);

useHead({
  title: `${category.value} | E-commerce`,
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
