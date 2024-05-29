<script setup>
import { addColorSchema } from "~/schema";

const form = ref({
  color: "",
});

async function addColor() {
  const {data} = await useFetch("http://localhost:8000/product/color", {
    method: "POST",
    body: JSON.stringify(form.value),
  }); 

  if (data.value && data.value.message === "success") {
    form.value = {
      color: "",
    };
    return alert("Color added successfully");
  } else {
    return alert("Failed to add color");
  }
}
</script>

<template>
  <UForm
    :schema="addColorSchema"
    :state="form"
    @submit="addColor"
    class="p-4 flex-1 flex flex-col gap-5"
  >
    <div class="flex justify-between px-4">
      <h1 class="text-lg font-mono">Add New Color</h1>
    </div>

    <UFormGroup label="Color" name="color">
      <UInput icon="material-symbols-light:format-color-fill" v-model="form.color" />
    </UFormGroup>

    <UButton type="submit" color="primary" variant="solid" block
      >Add Color</UButton
    >
  </UForm>
</template>
