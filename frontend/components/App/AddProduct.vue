<script setup>
const filterOption = ["Filter Option", "Brand", "Color", "Size", "ID", "Name"];
const selected = ref(filterOption[0]);
const searchedValue = ref("");

const shoes = [
  {
    id: 1,
    brand: "Nike",
    name: "Nike Air Max",
    price: 200,
    color: "black",
    size: 10,
  },

  {
    id: 2,
    brand: "Adidas",
    name: "Adidas Superstar",
    price: 150,
    color: "white",
    size: 10,
  },

  {
    id: 3,
    brand: "Vans",
    name: "Vans Old Skool",
    price: 100,
    color: "grey",
    size: 10,
  },
];

const page = ref(1);
const pageCount = 5;

const rows = computed(() => {
  return shoes.slice((page.value - 1) * pageCount, page.value * pageCount);
});

function search() {
  console.log("Search");
}
</script>

<template>
  <div class="w-full">
    <div class="flex items-center p-3 gap-5">
      <USelectMenu color="primary" v-model="selected" :options="filterOption" />
      <UInput
        color="primary"
        variant="outline"
        placeholder="Search..."
        v-model="searchedValue"
      />
      <UButton
        color="primary"
        variant="ghost"
        icon="solar:minimalistic-magnifer-linear"
        @click="search"
      />
    </div>
    <div class="px-3">
      <UTable :rows="rows" />

      <div
        class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
      >
        <UPagination
          v-model="page"
          :page-count="pageCount"
          :total="shoes.length"
        />
      </div>
    </div>

    <div class="w-full flex flex-col">
      <div class=" pl-3">
        <h1 class="text-lg font-mono font-bold">Add Product</h1>
      </div>

      <div class="">
        mxzcxc
      </div>
    </div>
  </div>
</template>
