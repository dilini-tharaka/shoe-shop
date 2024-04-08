<script setup>
import { addColorSchema } from "~/schema";

const from = ref({
  color: "",
});

function onSubmit() {
  console.log(from);
}
</script>

<template>
  <UForm
    :schema="addColorSchema"
    :state="from"
    @submit="onSubmit"
    class="p-4 flex-1 flex flex-col gap-5"
  >
    <div class="flex justify-between px-4">
      <h1 class="text-lg font-mono">Add New Color</h1>

      <UFormGroup label="ID">
        <UBadge color="primary" variant="outline">458</UBadge>
      </UFormGroup>
    </div>

    <UFormGroup label="Color" name="color">
      <UInput icon="material-symbols-light:format-color-fill" v-model="from.color" />
    </UFormGroup>

    <UButton type="submit" color="primary" variant="solid" block
      >Add Color</UButton
    >
  </UForm>
</template>
