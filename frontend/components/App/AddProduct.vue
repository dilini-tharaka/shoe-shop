<script setup>
import { addProductSchema } from "~/schema";

// Filter
const filterOption = ["Filter Option", "Brand", "Color", "Size", "ID", "Name"];
const selected = ref(filterOption[0]);
const searchedValue = ref("");
const shoe = ref([]);

// Fetching Data to display in table
const { data: products } = useFetch("http://localhost:8000/product");

watch(products, () => {
  if (products) {
    shoe.value = products.value.data;
  } else {
    console.log("error");
    console.log(products);
  }
});

// Table columns
const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "brand",
    label: "Brand",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "selling_price",
    label: "Current Price",
  },
  {
    key: "color",
    label: "Color",
  },
  {
    key: "size",
    label: "Size",
  },
  {
    key: "actions",
  },
];

const items = (row) => [
  [
    {
      label: "Edit",
      icon: "solar:gallery-edit-line-duotone",
      click: () => console.log("Edit", row.id),
    },
    {
      label: "More Info",
      icon: "solar:info-circle-broken",
    },
  ],
  [
    {
      label: "Delete",
      icon: "solar:clipboard-remove-broken",
    },
  ],
];

const page = ref(1);
const pageCount = 5;

const rows = computed(() => {
  return shoe.value.slice((page.value - 1) * pageCount, page.value * pageCount);
});

// Add Product using radio button
const Brands = ref([]);

//Fetch brand using radio button
const { data: brand } = useFetch("http://localhost:8000/product/brand");
watch(brand, () => {
  if (brand.value && brand.value.message === "success") {
    const newBrands = brand.value.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));

    Brands.value = newBrands;
  } else {
    console.log("error");
    console.log(brand);
  }
});

const form = ref({
  size: "",
  selectedSize: "",
  color: "",
  brand: 0,
  name: "",
});

// Slideover
const isSize = ref(false);
const isColor = ref(false);
const isBrand = ref(false);
const isName = ref(false);

//Get size for select option
const SizeLookup = ref({});
const Sizes = ref([]);
const { data: sizeData } = useFetch("http://localhost:8000/product/size");
watch(sizeData, () => {
  if (sizeData.value && sizeData.value.message === "success") {
    SizeLookup.value = sizeData.value.data.reduce((acc, size) => {
      acc[size.size] = size.id;
      return acc;
    }, {});

    // Create an array of size
    Sizes.value = sizeData.value.data.map((size) => size.size);
   
  } else {
    console.log("error");
    console.log(sizeData);
  }
});

const sizeId = computed(() => {
  return SizeLookup.value[form.value.selectedSize] || null;
});

watch(sizeId, (newsizeID) => {
  form.value.size = newsizeID;
});

///////////**********************////////////////

//Get color for select option



function search() {
  console.log("Search");
}

function addProduct() {
  console.log("Submit");
}

function clean() {
  console.log("cancel clicking");
  console.log(form.value);
}

function addSize() {
  isSize.value = true;
  console.log("Add Size");
}

function addColor() {
  isColor.value = true;
  console.log("Add Color");
}

function addBrand() {
  isBrand.value = true;
  console.log("Add Brand");
}

function addName() {
  isName.value = true;
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
      <UTable :rows="rows" :columns="columns">
        <template #actions-data="{ row }">
          <UDropdown :items="items(row)">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-ellipsis-horizontal-20-solid"
            />
          </UDropdown>
        </template>
      </UTable>
      <div
        class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
      >
        <UPagination
          v-model="page"
          :page-count="pageCount"
          :total="shoe.length"
        />
      </div>
    </div>

    <div class="w-full flex flex-col px-3 pb-3">
      <UForm :schema="addProductSchema" :state="form" @submit="addProduct">
        <div>
          <h1 class="text-lg font-mono font-bold">Add Product</h1>
        </div>

        <div class="flex flex-row gap-16 items-center">
          <UFormGroup label="ID:">
            <UBadge color="primary" variant="soft">182393</UBadge>
          </UFormGroup>

          <div class="flex justify-center items-center">
            <UFormGroup label="Size:" name="selectedSize">
              <USelectMenu
                color="primary"
                :options="Sizes"
                v-model="form.selectedSize"
              />
            </UFormGroup>

            <UButton
              icon="solar:add-circle-broken"
              size="sm"
              color="primary"
              variant="ghost"
              @click="addSize"
            />
            <USlideover v-model="isSize">
              <AppAddSize />
            </USlideover>
          </div>
          <div class="flex justify-center items-center">
            <UFormGroup label="Color:" name="color">
              <UInput v-model="form.color" />
            </UFormGroup>
            <UButton
              icon="solar:add-circle-broken"
              size="sm"
              color="primary"
              variant="ghost"
              @click="addColor"
            />

            <USlideover v-model="isColor">
              <AppAddColor />
            </USlideover>
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-4 py-3">
          <UFormGroup label="Brands:" name="brand">
            <div class="flex gap-4 items-center">
              <URadio
                v-for="brand of Brands"
                :key="Brands.value"
                v-model="form.brand"
                v-bind="brand"
              />
            </div>
          </UFormGroup>
          <UButton
            icon="solar:add-circle-broken"
            size="sm"
            color="primary"
            variant="ghost"
            @click="addBrand"
          />
          <USlideover v-model="isBrand">
            <AppAddBrand />
          </USlideover>
        </div>
        <div class="w-full flex flex-row items-center gap-2">
          <UFormGroup label="Name:" name="name">
            <UInput v-model="form.name" />
          </UFormGroup>

          <UButton
            icon="solar:add-circle-broken"
            size="sm"
            color="primary"
            variant="ghost"
            @click="addName"
          />
          <USlideover v-model="isName">
            <AppAddName />
          </USlideover>
          <div class="flex justify-center gap-6 px-2">
            <UButton type="submit" class="my-5">Add a Product</UButton>
            <UButton class="my-5" color="gray" variant="solid" @click="clean"
              >Cancel</UButton
            >
          </div>
        </div>
      </UForm>
    </div>
  </div>
</template>
