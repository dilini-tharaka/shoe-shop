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
  size: 0,
  selectedSize: "",
  color: 0,
  selectedColor: "",
  brand: 0,
  name: 0,
  selectedName: "",
  category: 0,
  selectedCategory: "",
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

const colorLookup = ref({});
const Colors = ref([]);
const { data: colorData } = useFetch("http://localhost:8000/product/color");

watch(colorData, () => {
  if (colorData.value && colorData.value.message === "success") {
    colorLookup.value = colorData.value.data.reduce((acc, color) => {
      acc[color.name] = color.id;
      return acc;
    }, {});

    // Create an array of color
    Colors.value = colorData.value.data.map((color) => color.name);
  } else {
    console.log("error");
    console.log(colorData);
  }

  const colorId = computed(() => {
    return colorLookup.value[form.value.selectedColor] || null;
  });

  watch(colorId, (newcolorID) => {
    form.value.color = newcolorID;
  });
});

//////////////////////********************/////////////////////////

//Get name for select option
const nameLookup = ref({});
const Names = ref([]);
const { data: nameData } = useFetch("http://localhost:8000/product/shoe");

watch(nameData, () => {
  if (nameData.value && nameData.value.message === "success") {
    nameLookup.value = nameData.value.data.reduce((acc, name) => {
      acc[name.name] = name.id;
      return acc;
    }, {});

    // Create an array of name
    Names.value = nameData.value.data.map((name) => name.name);
  } else {
    console.log("error");
    console.log(nameData);
  }

  const nameId = computed(() => {
    return nameLookup.value[form.value.selectedName] || null;
  });

  watch(nameId, (newnameID) => {
    form.value.name = newnameID;
  });
});

//////////////////////********************/////////////////////////

//Get category for select option
const categoryLookup = ref({});
const Categories = ref([]);
const { data: categoryData } = useFetch(
  "http://localhost:8000/product/category"
);

watch(categoryData, () => {
  if (categoryData.value && categoryData.value.message === "success") {
    categoryLookup.value = categoryData.value.data.reduce((acc, category) => {
      acc[category.name] = category.id;
      return acc;
    }, {});

    // Create an array of category
    Categories.value = categoryData.value.data.map((category) => category.name);
  } else {
    console.log("error");
    console.log(categoryData);
  }

  const categoryId = computed(() => {
    return categoryLookup.value[form.value.selectedCategory] || null;
  });

  watch(categoryId, (newcategoryID) => {
    form.value.category = newcategoryID;
  });
});

function search() {
  console.log("Search");
}

async function addProduct() {
  const { data } = await useFetch("http://localhost:8000/product", {
    method: "POST",
    body: JSON.stringify(form.value),
  });

  if (data.value && data.value.message === "success") {
    form.value = {
      size: 0,
      selectedSize: "",
      color: 0,
      selectedColor: "",
      brand: 0,
      name: 0,
      selectedName: "",
      category: 0,
      selectedCategory: "",
    };
    return alert("Product Added Successfully!");
  } else {
    console.log("error");
    console.log(data);
    return alert("Product Not Added!");
  }
}

function cancel() {
  form.value = {
    size: 0,
    selectedSize: "",
    color: 0,
    selectedColor: "",
    brand: 0,
    name: 0,
    selectedName: "",
    category: 0,
    selectedCategory: "",
  };
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
            <UFormGroup label="Color:" name="selectedColor">
              <USelectMenu
                color="primary"
                :options="Colors"
                v-model="form.selectedColor"
              />
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
          <div class="flex justify-center items-center">
            <UFormGroup label="Category" name="selectedCategory">
              <USelectMenu
                color="primary"
                :options="Categories"
                v-model="form.selectedCategory"
              />
            </UFormGroup>
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
          <UFormGroup label="Name:" name="selectedName">
            <USelectMenu
              color="primary"
              :options="Names"
              v-model="form.selectedName"
            />
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
            <UButton class="my-5" color="gray" variant="solid" @click="cancel"
              >Cancel</UButton
            >
          </div>
        </div>
      </UForm>
    </div>
  </div>
</template>
