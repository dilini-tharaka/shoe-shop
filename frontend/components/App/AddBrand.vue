<script setup>
import {  } from "~/schema";

const from = ref({
  brand: "",
});

function onSubmit() {
  console.log(from);
}
</script>

<template>
  <UForm
    
    :state="from"
    @submit="onSubmit"
    class="p-4 flex-1 flex flex-col gap-5"
  >
    <div class="flex justify-between px-4">
      <h1 class="text-lg font-mono">Add New Brand</h1>

      <UFormGroup label="ID">
        <UBadge color="primary" variant="outline">458</UBadge>
      </UFormGroup>
    </div>

    <UFormGroup label="Brand" name="brand">
      <UInput v-model="from.brand" />
    </UFormGroup>

    <UButton type="submit" color="primary" variant="solid" block
      >Add Brand</UButton
    >
  </UForm>
</template>
