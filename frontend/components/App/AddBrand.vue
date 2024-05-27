<script setup>
//import { addBrandSchema } from "~/schema/addBrand.schema";


const form = ref({
  name: "",
});

//get next brand id
const brandId = ref(0);

const { data: nextId } = useFetch("http://localhost:8000/product/brand/nextid");
watch(nextId, () => {
  brandId.value = nextId.value.data;
});

// Fetching brands from the backend
async function onSubmit() {
  if (!form.value.name) {
    return alert("Please enter brand name");
  }
  const { data } = await useFetch("http://localhost:8000/product/brand", {
    method: "POST",
    body: JSON.stringify(form.value),
  });
console.log(data.value);
console.log(form.value);
  if (data.value && data.value.message === "success") {
    form.value = {
      name: "",
    };
    return alert("Brand added successfully");
  }else{
    return alert("Failed to add brand");

  }
}
</script>

<template>
  <UForm
    
    :state="form"
    @submit="onSubmit"
    class="p-4 flex-1 flex flex-col gap-5"
  >
    <div class="flex justify-between px-4">
      <h1 class="text-lg font-mono">Add New Brand</h1>

      <UFormGroup label="ID">
        <UBadge color="primary" variant="outline">{{ brandId }}</UBadge>
      </UFormGroup>
    </div>

    <UFormGroup label="Brand" name="name">
      <UInput v-model="form.name" />
    </UFormGroup>

    <UButton type="submit" color="primary" variant="solid" block
      >Add Brand</UButton
    >
  </UForm>
</template>
