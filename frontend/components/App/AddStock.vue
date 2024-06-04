<script setup>
import { addStockSchema } from "~/schema";
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
});

function addColor() {
  console.log(form.value.selectedColor);
}
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
</script>

<template>
  <div class="w-full">
    <div class="w-full p-2 flex justify-between items-center">
      <UForm>
        <h1 class="text-lg font-mono font-bold">Add New Stock</h1>
        <UFormGroup label="Brand:" class="font-bold" name="">
          <UInput />
        </UFormGroup>

        <div class="flex justify-center items-center">
          <UFormGroup label="Color:" name="selectedColor">
            <USelectMenu
              color="primary"
              :options="Colors"
              v-model="form.selectedColor"
            />
          </UFormGroup>
        </div>
      </UForm>
    </div>
  </div>
</template>
