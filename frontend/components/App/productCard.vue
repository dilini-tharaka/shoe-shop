<script setup>
const path = "/img/shoes/";

const shoes = ref([]);
const { data: cardDetails } = useFetch("http://localhost:8000/product/card");

watch(cardDetails, () => {
  if (cardDetails.value.message === "success") {
    shoes.value = cardDetails.value.data;
    //console.log(shoes.value);
  } else {
    console.log("error");
    console.log(cardDetails);
  }
});
////////////////////////////////////////

function toggleWish(index) {
  shoes.value[index].wished = !shoes.value[index].wished;
}

const wishedIcon = computed(() => {
  return shoes.value.map((shoe, index) => {
    return shoe.wished ? "solar:heart-angle-bold" : "solar:heart-angle-outline";
  });
});

function getPrice(size, index) {
  shoes.value[index].price = size.price;
}
</script>

<template>
  <div
    class="w-80 h-96 flex flex-col rounded bg-bkg-primary shadow-lg dark:shadow-black"
    v-for="(shoe, index) in shoes"
    :key="shoe.index"
  >
    <div
      :class="'w-full h-1/2 bg-center bg-cover bg-no-repeat'"
      :style="{ backgroundImage: `url(${path + shoe.image})` }"
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
        <h1 class="text-lg font-bold">LKR.{{ shoe.price }}</h1>
      </div>
      <div class="flex">
        <h2>Size(UK)</h2>
        <div
          class="flex flex-wrap gap-6 pt-1 p-1 pb-2"
          v-for="size in shoe.sizes"
          :key="size.size"
        >
          <UChip :color="size.available ? 'green' : 'red'">
            <UBadge
              color="primary"
              variant="soft"
              class="cursor-pointer"
              @click="getPrice(size, index)"
              >{{ size.size }}</UBadge
            >
          </UChip>
          <!-- <div>
            <p>{{ size.color }}</p>
          </div> -->
        </div>
      </div>
      <div class="flex gap-4 justify-center items-center pt-2">
        <UChip color="green"> <h6>Available</h6></UChip>
        <UChip color="red"> <h6>Out Of Stock</h6></UChip>
      </div>
    </div>
  </div>
</template>
