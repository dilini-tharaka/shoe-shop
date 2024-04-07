<script setup>
import { addProductSchema } from "~/schema";

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

const brands = [
  { value: "Nike", label: "Nike" },
  { value: "Adidas", label: "Adidas" },
  { value: "Vans", label: "Vans" },
  { value: "Converse", label: "Converse" },
  { value: "Puma", label: "Puma" },
  { value: "Reebok", label: "Reebok" },
];

const state = reactive({
  size: "",
  color: "",
  brand: "",
  name: "",
});

const isOpen = ref(false);

function search() {
  console.log("Search");
}

function addSize() {
  console.log("Add Size");
}

function addColor() {
  console.log("Add Color");
}

function addBrand() {
  console.log("Add Brand");
}

function addName() {
  console.log("Add Name");
}

function addProduct() {
  console.log("Submit");
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

    <div class="w-full flex flex-col px-3 pb-3">
      <UForm :schema="addProductSchema" :state="state" @submit="addProduct">
        <div class="">
          <h1 class="text-lg font-mono font-bold">Add Product</h1>
        </div>

        <div class="flex flex-row gap-16 items-center">
          <UFormGroup label="ID:">
            <UBadge color="primary" variant="soft">182393</UBadge>
          </UFormGroup>

          <div class="flex justify-center items-center">
            <UFormGroup label="Size:">
              <UInput v-model="state.size" />
            </UFormGroup>

            <UButton
              icon="solar:add-circle-broken"
              size="sm"
              color="primary"
              variant="ghost"
              @click="isOpen = true"
            />
            <USlideover v-model="isOpen">
              <AppAddSize />
            </USlideover>
          </div>
          <div class="flex justify-center items-center">
            <UFormGroup label="Color:">
              <UInput v-model="state.color" />
            </UFormGroup>
            <UButton
              icon="solar:add-circle-broken"
              size="sm"
              color="primary"
              variant="ghost"
              @click="addColor"
            />
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-4 py-3">
          <label for="">Brands:</label>
          <URadio
            v-for="brand of brands"
            :key="brand.value"
            v-model="state.brand"
            v-bind="brand"
          />
          <UButton
            icon="solar:add-circle-broken"
            size="sm"
            color="primary"
            variant="ghost"
            @click="addBrand"
          />
        </div>
        <div class="w-full flex flex-row items-center gap-2">
          <UFormGroup label="Name:">
            <UInput v-model="state.name" />
          </UFormGroup>

          <UButton
            icon="solar:add-circle-broken"
            size="sm"
            color="primary"
            variant="ghost"
            @click="addName"
          />
          <div class="flex justify-center gap-6">
            <UButton type="submit" class="my-5">Add a Product</UButton>
            <UButton type="" class="my-5" color="black">Cancel</UButton>
          </div>
        </div>
      </UForm>
    </div>
  </div>
</template>
