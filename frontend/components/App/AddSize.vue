<script setup>
import { addSizeSchema } from "~/schema";

const form = ref({
  length: "",
  size: 0,
});

async function addSize() {
  const {data}= await useFetch("http://localhost:8000/product/size", {
    method: "POST",
    body: JSON.stringify(form.value),
  });

  
    console.log(data.value);

    if (data.value && data.value.message === "success") {
      form.value = {
        length: "",
        size: 0,
      };
      return alert("Size added successfully");
    } else {
      return alert("Failed to add size");
    }
  }



</script>

<template>
  <UForm
    :schema="addSizeSchema"
    :state="form"
    @submit="addSize"
    class="p-4 flex-1 flex flex-col gap-5"
  >
    <h1 class="text-lg font-mono">Add New Size</h1>

    <UFormGroup label="Heel-toe(cm)" name="length">
      <UInput icon="material-symbols-light:footprint" v-model="form.length"/>
    </UFormGroup>

    <UFormGroup label="Size(UK)" name="size">
      <UInput v-model="form.size" type="number"/>
    </UFormGroup>

    <UButton type="submit" color="primary" variant="solid" block
      >Add Size</UButton
    >
  </UForm>
</template>
