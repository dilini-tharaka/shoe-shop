<script setup>
const shoes = ref([
  {
    id: 1,
    wished: false,
    image: "/img/shoes/shoe01.jpg",
    name: "Nike Air Max",
    brand: "Nike",
    price: 1000.0,
    sizes: [
      { available: true, size: 23 },
      { available: true, size: 34 },
      { available: true, size: 13 },
    ],
  },
]);

const productCard = ref([]);
const { data: cardDetails } = useFetch("http://localhost:8000/product/card");

watch(cardDetails, () => {
  if (cardDetails) {
    productCard.value = cardDetails.value.data;
    console.log(productCard.value);
  } else {
    console.log("error");
    console.log(cardDetails);
  }
});

function toggleWish(index) {
  console.log(index);
  shoes.value[index].wished = !shoes.value[index].wished;
  console.log(shoes.value[index].wished);
}

const wishedIcon = computed(() => {
  return shoes.value.map((shoe, index) => {
    return shoe.wished ? "solar:heart-angle-bold" : "solar:heart-angle-outline";
  });
});
</script>

<template>
  <div
    class="w-80 h-96 flex flex-col rounded bg-bkg-primary shadow-lg dark:shadow-black"
    v-for="(shoe, index) in shoes"
    :key="shoe.index"
  >
    <div
      v-for="(shoe, index) in shoes"
      :key="shoe.id"
      :class="'w-full h-1/2 bg-center bg-cover bg-no-repeat'"
      :style="{ backgroundImage: `url(${shoe.image})` }"
    >
      <UButton
        :icon="wishedIcon[index]"
        color="gray"
        variant="ghost"
        @click="toggleWish(index)"
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
