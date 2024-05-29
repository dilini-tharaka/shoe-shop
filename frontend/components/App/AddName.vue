<script setup>
import { addNameSchema } from "~/schema";

const form = ref({
  name: "",
  brand_id: 0,
  category_id: [],
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

//Fetch category using checkbox
const Categories = ref([]);
const { data: categories } = useFetch("http://localhost:8000/product/category");

watch(categories, () => {
  if (categories.value && categories.value.message === "success") {
    Categories.value = categories.value.data;
  } else {
    console.log("error");
    console.log(categories);
  }
});

async function addName() {
   const { data } = await useFetch("http://localhost:8000/product/shoe", {
    method: "POST",
    body: JSON.stringify(form.value),
  });

  if (data.value && data.value.message === "success") {
    form.value = {
      name: "",
      brand_id: 0,
      category_id: [],
    };
    return alert("Name added successfully");
  } else {
    console.log("error");
    console.log(data);
    return alert("Error! Name not added");
  }
}
</script>

<template>
  <UForm
    :schema="addNameSchema"
    :state="form"
    @submit="addName"
    class="p-4 flex-1 flex flex-col gap-5"
  >
    <div class="flex justify-between px-4">
      <h1 class="text-lg font-mono">Add New Name</h1>

      <UFormGroup label="ID">
        <UBadge color="primary" variant="outline">14958</UBadge>
      </UFormGroup>
    </div>

    <UFormGroup label="Name" name="name">
      <UInput v-model="form.name" />
    </UFormGroup>

    <UFormGroup label="Brand" name="brand_id">
      <URadio
        v-for="brand of Brands"
        :key="Brands.value"
        v-model="form.brand_id"
        v-bind="brand"
      />
    </UFormGroup>

    <UFormGroup label="Category" name="category_id">
      <UCheckbox
        v-for="category in Categories"
        :key="category.id"
        v-model="form.category_id"
        :value="category.id"
        :label="category.name"
      />
    </UFormGroup>
    <UButton type="submit" color="primary" variant="solid" block
      >Add Name</UButton
    >
  </UForm>
</template>
