<script setup>
import { getProductSchema } from "~/schema";
import { addItemSchema } from "~/schema";
import { addStockSchema } from "~/schema";

//Table columns for adding stock items
const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "buyingPrice",
    label: "Buying Price",
  },
  {
    key: "sellingPrice",
    label: "Selling Price",
  },
  {
    key: "qty",
    label: "Quantity",
  },
  {
    key: "action",
  },
];

let btnDisabled = ref(false);
const stockItems = ref([]);

//Form state for getting product details
const form = ref({
  size: 0,
  selectedSize: "",
  color: 0,
  selectedColor: "",
  brand: 0,
  selectedBrand: "",
  name: 0,
  selectedName: "",
  category: 0,
  selectedCategory: "",
});

//Form state for adding stock items
const state = ref({
  productID: 0,
  buyingPrice: 0,
  sellingPrice: 0,
  qty: 0,
});

const total = computed(() => {
  return stockItems.value.reduce((acc, item) => {
    return acc + item.buyingPrice * item.qty;
  }, 0);
});

//Form state for adding stock
const script = ref({
  supplierID: 0,
  paidAmount: 0,
});
////////////////////*******************//////////////////////
//Get brand for select option

const brandlookup = ref({});
const Brands = ref([]);
const { data: brandData } = useFetch("http://localhost:8000/product/brand");

watch(brandData, () => {
  if (brandData.value && brandData.value.message === "success") {
    brandlookup.value = brandData.value.data.reduce((acc, brand) => {
      acc[brand.name] = brand.id;
      return acc;
    }, {});

    // Create an array of brand
    Brands.value = brandData.value.data.map((brand) => brand.name);
  } else {
    console.log("error");
    console.log(brandData);
  }

  const brandId = computed(() => {
    return brandlookup.value[form.value.selectedBrand] || null;
  });

  watch(brandId, (newbrandID) => {
    form.value.brand = newbrandID;
  });
});

////////////////////*******************//////////////////////
//Get name for select option

const nameLookup = ref({});
const Names = ref([]);
const { data: nameData } = useFetch("http://localhost:8000/product/shoe");

watch(nameData, () => {
  if (nameData.value && nameData.value.message === "success") {
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

///////////**********************////////////////
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

//////////////////////*******************//////////////////////
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
////////////////////*******************//////////////////////
//Get product ID based on details

async function getValue() {
  const { data: product } = await useFetch(
    "http://localhost:8000/stock/product",
    {
      method: "POST",
      body: JSON.stringify(form.value),
    }
  );

  if (product.value && product.value.message === "success") {
    state.value.productID = product.value.data.id;
    form.value = {
      size: 0,
      selectedSize: "",
      color: 0,
      selectedColor: "",
      brand: 0,
      selectedBrand: "",
      name: 0,
      selectedName: "",
      category: 0,
      selectedCategory: "",
    };
  } else {
    alert(product.value.message);
    form.value = {
      size: 0,
      selectedSize: "",
      color: 0,
      selectedColor: "",
      brand: 0,
      selectedBrand: "",
      name: 0,
      selectedName: "",
      category: 0,
      selectedCategory: "",
    };
  }
}

//Add item to table rows
function addItem() {
  console.log(state.value);
  console.log("Current state:", state.value.buyingPrice);
  console.log("Current state:", state.value.sellingPrice);

  //check if product ID is 0
  if (!state.value.productID) {
    alert(`Product ID is 0
    Please click get the details Button first`);
    return;
  }

  //check if buying price is less than selling price
  if (state.value.buyingPrice > state.value.sellingPrice) {
    alert(`Buying price should be less than selling price`);
    return;
  }

  // Check if the product ID already exists in the stockItems array
  const existingItem = stockItems.value.find(
    (item) => item.id === state.value.productID
  );
  if (existingItem) {
    alert(
      `Product ID ${state.value.productID} already exists in the stock items.`
    );
    return;
  }

  const newItem = {
    id: state.value.productID,
    buyingPrice: state.value.buyingPrice,
    sellingPrice: state.value.sellingPrice,
    qty: state.value.qty,
  };

  stockItems.value.push(newItem);
  state.value = {
    productID: 0,
    buyingPrice: 0,
    sellingPrice: 0,
    qty: 0,
  };
}

// Delete item from the table
function deleteItem(row) {
  const index = stockItems.value.findIndex((item) => item.id === row.id);
  stockItems.value.splice(index, 1);
  console.log(index);
}

////////////////////*******************//////////////////////
//Add stock to the database

async function addStock() {
  btnDisabled.value = true;
  const { data: stock } = await useFetch("http://localhost:8000/stock", {
    method: "POST",
    body: JSON.stringify({
      supplierID: script.value.supplierID,
      paidAmount: script.value.paidAmount,
      total: total.value,
      items: stockItems.value,
    }),
  });

  console.log(stock);
  if (stock.value && stock.value.message === "success") {
    alert("Stock added successfully");
    stockItems.value = [];
    script.value = {
      supplierID: 0,
      paidAmount: 0,
    };
    btnDisabled.value = false;
  } else {
    alert(stock.value.message);
    script.value = {
      supplierID: 0,
      paidAmount: 0,
    };
    btnDisabled.value = false;
  }
}
</script>

<template>
  <div class="w-full">
    
    <div class="w-full p-2 flex justify-between items-center">
      <UForm :schema="getProductSchema" :state="form" @submit="getValue">
        <h1 class="text-lg font-mono font-bold">Add New Stock</h1>
        <div class="flex flex-wrap gap-2">
          <UFormGroup label="Brand:" name="selectedBrand">
            <USelectMenu
              class="w-40"
              color="primary"
              :options="Brands"
              v-model="form.selectedBrand"
            />
          </UFormGroup>

          <UFormGroup label="Color:" name="selectedColor">
            <USelectMenu
              class="w-40"
              color="primary"
              :options="Colors"
              v-model="form.selectedColor"
            />
          </UFormGroup>

          <UFormGroup label="Size:" name="selectedSize">
            <USelectMenu
              class="w-20"
              color="primary"
              :options="Sizes"
              v-model="form.selectedSize"
            />
          </UFormGroup>

          <UFormGroup label="Category" name="selectedCategory">
            <USelectMenu
              class="w-24"
              color="primary"
              :options="Categories"
              v-model="form.selectedCategory"
            />
          </UFormGroup>

          <UFormGroup label="Name:" name="selectedName">
            <USelectMenu
              class="w-56"
              color="primary"
              :options="Names"
              v-model="form.selectedName"
            />
          </UFormGroup>
          <UButton color="primary" variant="outline" size="2xs" type="submit"
            >Get Product ID</UButton
          >
        </div>
      </UForm>
      <div class="flex flex-col pr-2">
        <h1 class="font-bold">Product ID:</h1>
        <h1>{{ state.productID }}</h1>
      </div>
    </div>

    <UDivider label="___" />

    <div class="flex py-2">
      <UForm
        :schema="addItemSchema"
        class="flex items-center w-full"
        :state="state"
        @submit="addItem"
      >
        <div class="flex w-3/5 gap-5">
          <UFormGroup label="Buying Price per Unit" name="buyingPrice">
            <UInput v-model="state.buyingPrice" type="number" />
          </UFormGroup>

          <UFormGroup label="Selling price per unit" name="sellingPrice">
            <UInput v-model="state.sellingPrice" type="number" />
          </UFormGroup>

          <UFormGroup label="Quantity" name="qty">
            <UInput v-model="state.qty" type="number" />
          </UFormGroup>
        </div>
        <div class="flex w-2/5">
          <UButton color="primary" variant="solid" type="submit" block
            >Add Item</UButton
          >
        </div>
      </UForm>
    </div>

    <UDivider label="___" />

    <UTable :columns="columns" :rows="stockItems">
      <template #action-data="{ row }">
        <UButton
          color="red"
          variant="ghost"
          icon="solar:trash-bin-minimalistic-2-broken"
          @click="() => deleteItem(row)"
        />
      </template>
    </UTable>
    <div class="w-full flex justify-end gap-10 pr-52 pt-4">
      <div>
        <h1 class="font-bold">Stock Value:</h1>
      </div>

      <div>
        <h1>Rs. {{ total }}</h1>
      </div>
    </div>

    <div class="w-full flex justify-end">
      <UForm
        :schema="addStockSchema"
        class="flex gap-10 pr-5 pt-4"
        :state="script"
        @submit="addStock"
      >
        <UFormGroup label="Supplier ID" name="supplierID">
          <UInput type="number" v-model="script.supplierID" />
        </UFormGroup>

        <UFormGroup label="Paid Amount" name="paidAmount">
          <UInput type="number" v-model="script.paidAmount" />
        </UFormGroup>

        <UButton
          icon="solar:shop-2-broken"
          color="primary"
          variant="solid"
          label="Add to Store"
          type="submit"
          :disabled="btnDisabled"
        />
      </UForm>
    </div>

    <div class="w-full flex pt-10">
      g
      h
      e
      d
      
    </div>
  </div>
</template>
