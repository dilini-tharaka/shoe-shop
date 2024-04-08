<script setup>
import { addSizeSchema } from "~/schema";

const from = ref({
  toe: "",
  sizeUk: "",
});

function onSubmit() {
  console.log(from);
}
</script>

<template>
  <UForm
    :schema="addSizeSchema"
    :state="from"
    @submit="onSubmit"
    class="p-4 flex-1 flex flex-col gap-5"
  >
    <h1 class="text-lg font-mono">Add New Size</h1>

    <UFormGroup label="Heel-toe(cm)" name="toe">
      <UInput icon="material-symbols-light:footprint" v-model="from.toe" />
    </UFormGroup>

    <UFormGroup label="Size(UK)" name="sizeUK">
      <UInput v-model="from.sizeUk" />
    </UFormGroup>

    <UButton type="submit" color="primary" variant="solid" block
      >Add Size</UButton
    >
  </UForm>
</template>
