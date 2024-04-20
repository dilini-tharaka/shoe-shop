<script setup>
const shoes = ref([
  {
    wished: false,
    image: "/img/register.jpg",
    name: "Nike Air Max",
    brand: "Nike",
    price: 1000.0,
    sizes: [
      { available: true, size: 23 },
      { available: true, size: 34 },
      { available: true, size: 13 },
    ],
  },

  {
    wished: false,
    image: "/img/register.jpg",
    name: "Adidas Superstar",
    brand: "Adidas",
    price: 800.0,
    sizes: [
      { available: true, size: 23 },
      { available: true, size: 34 },
      { available: true, size: 13 },
    ],
  },
  {
    wished: false,
    image: "/img/register.jpg",
    name: "Puma Suede",
    brand: "Puma",
    price: 700.0,
    sizes: [
      { available: true, size: 23 },
      { available: true, size: 34 },
      { available: true, size: 13 },
    ],
  },
]);

function toggleWish() {
  shoes.wished = !shoes.wished;
  console.log(shoes.wished);
}

const wishedIcon = computed(() => {
  return shoes.wished ? "solar:heart-angle-bold" : "solar:heart-angle-outline";
});
</script>

<template>
  <div
    class="w-80 h-96 flex flex-col rounded bg-bkg-primary shadow-lg dark:shadow-black"
    v-for="shoe in shoes"
  >
    <div class="w-full h-1/2 bg-[url(/img/register.jpg)] bg-center bg-contain">
      <UButton
        :icon="wishedIcon"
        color="gray"
        variant="ghost"
        @click="toggleWish"
      />
    </div>
    <div class="flex flex-col gap-2 p-2">
      <h2 class="text-lg font-mono font-bold">{{ shoe.name }}</h2>
      <div class="flex justify-between">
        <h2>{{ shoe.brand }}</h2>
        <h1 class="text-lg font-bold">SLRs.{{ shoe.price }}</h1>
      </div>
      <div class="flex">
        <h2>Size(UK)</h2>
        <div
          class="flex flex-wrap gap-4 pt-1 p-1"
          v-for="{ available, size } in shoes.sizes"
        >
          <UChip color="green">
            <h1>{{ size }}</h1>
          </UChip>
        </div>
      </div>
      <div class="flex gap-4 justify-center items-center">
        <UChip color="green"> <h6>Available</h6></UChip>
        <UChip color="red"> <h6>Out Of Stock</h6></UChip>
      </div>
    </div>
  </div>
</template>
