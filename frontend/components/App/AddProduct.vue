<script setup>
import { addProductSchema } from "~/schema";
import { imageSchema } from "~/schema";

let btnDisabled = ref(false);
// Filter
const filterOption = ["Filter Option", "Brand", "Color", "Size", "ID", "Name"];
const selected = ref(filterOption[0]);
const searchedValue = ref("");
const shoe = ref([]);

//Search product by id, brand, color, size, name
async function search() {
  if (searchedValue.value === "") {
    alert("Please enter a value to search");
    return;
  }
  if (selected.value === "ID") {
    const { data: product } = await useFetch(
      `http://localhost:8000/product/${searchedValue.value}`
    );
    //console.log(product.value);

    if (product.value.data) {
      shoe.value = Array.isArray(product.value.data)
        ? product.value.data
        : [product.value.data];
      //console.log(shoe.value);
    } else {
      console.log("error");
      alert("Product Not Found");
    }
  } else if (selected.value === "Brand") {
    const { data: product } = await useFetch(
      `http://localhost:8000/searchProduct/brand/${searchedValue.value}`
    );
    console.log(product.value);

    if (product.value.data) {
      shoe.value = Array.isArray(product.value.data)
        ? product.value.data
        : [product.value.data];
      //console.log(shoe.value);
    } else {
      console.log("error");
      console.log(product);
      alert("Product Not Found");
    }
  } else if (selected.value === "Color") {
    const { data: product } = await useFetch(
      `http://localhost:8000/searchProduct/color/${searchedValue.value}`
    );
    //console.log(product.value);

    if (product.value.data && product.value.message === "success") {
      shoe.value = Array.isArray(product.value.data)
        ? product.value.data
        : [product.value.data];
      //console.log(shoe.value);
    } else {
      console.log("error");
      console.log(product);
      alert("Product Not Found");
    }
  } else if (selected.value === "Size") {
    const { data: product } = await useFetch(
      `http://localhost:8000/searchProduct/size/${searchedValue.value}`
    );
    //console.log(searchedValue.value);
    //console.log(product.value);

    if (product.value.data) {
      shoe.value = Array.isArray(product.value.data)
        ? product.value.data
        : [product.value.data];
      //console.log(shoe.value);
    } else {
      console.log("error");
      console.log(product);
      alert("Product Not Found");
    }
  } else if (selected.value === "Name") {
    const { data: product } = await useFetch(
      `http://localhost:8000/searchProduct/name/${searchedValue.value}`
    );
    //console.log(product.value);

    if (product.value.data) {
      shoe.value = Array.isArray(product.value.data)
        ? product.value.data
        : [product.value.data];
    }
  } else {
    console.log("error");
    alert("Product Not Found");
  }
}

// Reset search
function reset() {
  searchedValue.value = "";
  selected.value = filterOption[0];
  shoe.value = products.value.data;
}
//////////////////////********************/////////////////////////
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

//////////////////////////*******************/////////////////////////

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
  image: null,
});

// Slideover
const isSize = ref(false);
const isColor = ref(false);
const isBrand = ref(false);
const isName = ref(false);

//////////////////////********************/////////////////////////

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
    //   nameLookup.value = nameData.value.data.reduce((acc, name) => {
    //     acc[name.name] = name.id;
    //     return acc;
    //   }, {});

    //   // Create an array of name
    //   Names.value = nameData.value.data.map((name) => name.name);
    // } else {
    //   console.log("error");
    //   console.log(nameData);
    // }
    const uniqueNames = new Set();
    const uniqueShoes = [];

    // Process data to filter unique names
    nameData.value.data.forEach((shoe) => {
      if (!uniqueNames.has(shoe.name)) {
        uniqueNames.add(shoe.name);
        uniqueShoes.push(shoe);
      }
    });

    // Populate nameLookup and Names
    nameLookup.value = uniqueShoes.reduce((acc, shoe) => {
      acc[shoe.name] = shoe.id;
      return acc;
    }, {});

    Names.value = uniqueShoes.map((shoe) => shoe.name);
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

//////////////////////********************/////////////////////////
//Get next id for product
const id = ref(0);
onMounted(async () => {
  const { data: nextId } = await useFetch(
    "http://localhost:8000/product/nextid"
  );
  //console.log(nextId.value.data);
  id.value = nextId.value.data;
});

//////////////////////********************/////////////////////////

function handleFileInput(event) {
  const fileInput = event.target;
  const file = fileInput.files[0];

  const allowedTypes = [
    "image/png",
    "image/jpeg",
    "image/svg+xml",
    "image/webp",
    "image/gif",
  ];
  const maxSize = 50 * 1024 * 1024; // 50 MB

  if (!allowedTypes.includes(file.type)) {
    alert("Invalid file type. Please select an image file.");
    fileInput.value = null;
    return;
  }

  if (file.size > maxSize) {
    alert("File size exceeds 50MB. Please select a smaller file.");
    fileInput.value = null;
    return;
  }

  form.value.image = {
    file: file,
    name: file.name,
  };
}
//////////////////////********************/////////////////////////
async function addProduct() {
  if (!form.value.image) {
    return alert("Please select an image.");
  }
  btnDisabled.value = true;

  const formData = new FormData();

  formData.append("image", form.value.image.file);
  formData.append("size", form.value.size);
  formData.append("selectedSize", form.value.selectedSize);
  formData.append("color", form.value.color);
  formData.append("selectedColor", form.value.selectedColor);
  formData.append("brand", form.value.brand);
  formData.append("name", form.value.name);
  formData.append("selectedName", form.value.selectedName);
  formData.append("category", form.value.category);
  formData.append("selectedCategory", form.value.selectedCategory);

  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }
  try {
    const data = await useFetch("http://localhost:8000/product", {
      method: "POST",
      body: formData,
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
    });

    console.log(data.data.value);

    if (data.data.value && data.data.value.message === "success") {
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
        image: null,
      };
      btnDisabled.value = false;
      return alert("Product Added Successfully!");
    } else {
      console.log("error");
      console.log(data);
      console.log(data.value);
      btnDisabled.value = false;
      return alert("Product Not Added!");
    }
  } catch (error) {
    console.error("Error:", error.error.message);
    btnDisabled.value = false;
    return alert("Product Not Added! catch error");
  }
}

function cancel() {
  // form.value = {
  //   size: 0,
  //   selectedSize: "",
  //   color: 0,
  //   selectedColor: "",
  //   brand: 0,
  //   name: 0,
  //   selectedName: "",
  //   category: 0,
  //   selectedCategory: "",
  // };
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
      <UButton size="2xs" variant="outline" @click="reset">Reset</UButton>
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
      <UForm
        :schema="addProductSchema"
        :state="form"
        @submit="addProduct"
        class="flex"
      >
        <div class="w-3/5">
          <div>
            <h1 class="text-lg font-mono font-bold">Add Product</h1>
          </div>

          <div class="flex flex-row gap-16 items-center">
            <UFormGroup label="ID:">
              <UBadge color="primary" variant="soft">{{ id }}</UBadge>
            </UFormGroup>

            <div class="flex justify-center items-center">
              <UFormGroup label="Size:" name="selectedSize">
                <USelectMenu
                  class="w-20"
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
                  class="w-24"
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
                  class="w-24"
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
                class="w-40"
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
              <UButton type="submit" class="my-5" :disabled="btnDisabled"
                >Add a Product</UButton
              >
              <UButton class="my-5" color="gray" variant="solid" @click="cancel"
                >Cancel</UButton
              >
            </div>
          </div>
        </div>
        <div class="w-2/5">
          <UFormGroup label="Shoe Image:" name="image.name">
            <div class="border border-dashed border-gray-500 relative">
              <input
                @change="handleFileInput"
                type="file"
                class="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50"
              />
              <div
                class="text-center p-10 absolute top-0 right-0 left-0 m-auto"
              >
                <h4 class="text-gray-400">
                  Drop Image anywhere to upload
                  <br />or
                </h4>
                <p class="text-gray-400">Select Files</p>
                <p class="text-gray-400">
                  PNG, JPG SVG, WEBP, and GIF are Allowed.
                </p>
              </div>
            </div>
          </UFormGroup>
          <!-- <div v-if="errors.length > 0" class="text-red-600 text-sm mt-2">
            <ul>
              <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
            </ul>
          </div> -->
        </div>
      </UForm>
    </div>
  </div>
</template>
