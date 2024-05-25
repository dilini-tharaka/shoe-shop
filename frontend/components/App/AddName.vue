<script setup>
import { addNameSchema } from "~/schema";

const from = ref({
  name: "",
  brand: "",
  category: [],
});

//Product list radio button
const brands = [
  { value: "Nike", label: "Nike" },
  { value: "Adidas", label: "Adidas" },
  { value: "Vans", label: "Vans" },
  { value: "Converse", label: "Converse" },
  { value: "Puma", label: "Puma" },
  { value: "Reebok", label: "Reebok" },
];

function onSubmit() {
  console.log(from);
}
</script>

<template>
  <UForm
    :schema="addNameSchema"
    :state="from"
    @submit="onSubmit"
    class="p-4 flex-1 flex flex-col gap-5"
  >
    <div class="flex justify-between px-4">
      <h1 class="text-lg font-mono">Add New Name</h1>

      <UFormGroup label="ID">
        <UBadge color="primary" variant="outline">14958</UBadge>
      </UFormGroup>
    </div>

    <UFormGroup label="Name" name="name">
      <UInput v-model="from.name" />
    </UFormGroup>

    <UFormGroup label="Brand" name="brand">
      <URadio
        v-for="brand of brands"
        :key="brand.value"
        v-model="from.brand"
        v-bind="brand"
      />
    </UFormGroup>

    <UFormGroup label="category" name="category">
      <UCheckbox v-model="from.category" value="Men" label="Men" />
      <UCheckbox v-model="from.category" value="Women" label="Women" />
      <UCheckbox v-model="from.category" value="Kid" label="Kid" />
      <UCheckbox v-model="from.category" value="Sports" label="Sports" />
    </UFormGroup>
    <UButton type="submit" color="primary" variant="solid" block
      >Add Name</UButton
    >
  </UForm>
</template>
