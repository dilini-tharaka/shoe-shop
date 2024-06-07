<script setup>
const id = useRoute().params.id;
const available = ref(true);
const isFavorite = ref(false);
const isMen = ref(false);
const isWomen = ref(false);

useHead({
  title: `Product ${id} | E-commerce`,
});

function toggleWish() {
  isFavorite.value = !isFavorite.value;
}
</script>

<template>
  <div class="flex p-3">
    <div class="w-full flex justify-center items-center">
      <div class="container px-3 md:px-0">
        <div
          class="w-full flex flex-col md:flex-row justify-center flex-wrap gap-4"
        >
          <div class="flex shadow-lg">
            <div
              class="flex flex-col gap-3 p-2 bg-slate-50 dark:bg-gray-900 rounded-l-xl"
            >
              <div
                class="img-wrapper w-[70px] h-[70px] rounded overflow-hidden"
              >
                <img
                  src="/img/shoes/shoe01.jpg"
                  class="suggest-img duration-300 object-cover"
                />
              </div>
              <div
                class="img-wrapper w-[70px] h-[70px] rounded overflow-hidden"
              >
                <img
                  src="/img/shoes/shoe01.jpg"
                  class="suggest-img duration-300 object-cover"
                />
              </div>
              <div
                class="img-wrapper w-[70px] h-[70px] rounded overflow-hidden"
              >
                <img
                  src="/img/shoes/shoe01.jpg"
                  class="suggest-img duration-300 object-cover"
                />
              </div>
              <div
                class="img-wrapper w-[70px] h-[70px] rounded overflow-hidden"
              >
                <img
                  src="/img/shoes/shoe01.jpg"
                  class="suggest-img duration-300 object-cover"
                />
              </div>
            </div>
            <div class="w-full md:max-w-[400px]">
              <div
                class="w-full h-full bg-cover bg-top bg-no-repeat overflow-hidden bg-slate-50 dark:bg-gray-900 rounded-r-xl p-2"
              >
                <img
                  src="/img/shoes/shoe01.jpg"
                  class="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
          <div class="relative flex-1 bg-gray-50 p-10 rounded-lg shadow-lg">
            <div class="absolute top-5 right-5">
              <UButton
                v-if="isFavorite"
                color="black"
                size="md"
                variant="subtle"
                icon="solar:heart-angle-bold"
                @click="toggleWish"
              />
              <UButton
                v-else
                color="black"
                size="md"
                variant="subtle"
                icon="solar:heart-angle-outline"
                @click="toggleWish"
              />
            </div>
            <UButton
              icon="solar:alt-arrow-left-bold"
              size="md"
              color="primary"
              square
              variant="ghost"
              to="/app/ecommerce"
            />
            <div class="flex flex-col">
              <div class="w-full overflow-hidden">
                <h1 class="font-bold">Brand: Reebok</h1>
              </div>
              <div class="w-full lg:w-4/5 mt-4">
                <h1 class="text-2xl font-bold uppercase">
                  Reebok Women Shoes core
                </h1>
              </div>
              <span class="text-sm uppercase mt-3"> LKR. 12,000.00 </span>
              <div class="flex items-center gap-5">
                <span class="flex text-black mt-1">Size Chart</span>
                <p
                  class="text-sm underline text-blue-500 cursor-pointer"
                  @click="isMen = true"
                >
                  Men
                </p>
                <p
                  class="text-sm underline text-blue-500 cursor-pointer"
                  @click="isWomen = true"
                >
                  Women
                </p>
              </div>
              <span class="text-xs">Sizes are in UK Sizes</span>

              <!-- slideover for men -->
              <USlideover v-model="isMen" :overlay="false">
                <div class="p-4 flex-1">
                  <UButton
                    color="gray"
                    variant="ghost"
                    size="sm"
                    icon="i-heroicons-x-mark-20-solid"
                    class="flex sm:hidden absolute end-5 top-5 z-10"
                    square
                    padded
                    @click="isMen = false"
                  />

                  <div
                    class="h-full bg-center bg-cover"
                    :style="{ backgroundImage: `url(/img/shoeChart.jpg)` }"
                  />
                </div>
              </USlideover>

              <!-- slideover for Women -->
              <USlideover v-model="isWomen" :overlay="false">
                <div class="p-4 flex-1">
                  <UButton
                    color="gray"
                    variant="ghost"
                    size="sm"
                    icon="i-heroicons-x-mark-20-solid"
                    class="flex sm:hidden absolute end-5 top-5 z-10"
                    square
                    padded
                    @click="isWomen = false"
                  />

                  <div
                    class="h-full bg-cover"
                    :style="{ backgroundImage: `url(/img/sizeChart.gif)` }"
                  />
                </div>
              </USlideover>

              <div class="mt-5 flex flex-col">
                <span class="text-sm font-semibold">Sizes</span>
                <div class="w-full flex gap-3 mt-3">
                  <div
                    class="w-12 h-12 border flex justify-center items-center rounded-lg"
                    :class="{
                      'border-green-700 bg-green-500 hover:border-green-600 cursor-pointer':
                        available,
                      'border-red-500 bg-red-500 hover:!border-red-500 text-white !cursor-not-allowed':
                        !available,
                    }"
                  >
                    <span class="text-md">22</span>
                  </div>
                </div>
              </div>
              <div class="mt-5 flex flex-col">
                <span class="text-sm font-semibold"
                  >Color
                  <strong class="uppercase underline">Black</strong></span
                >
              </div>
              <div class="mt-4">
                <UBadge color="green" variant="subtle"> 2 in stock </UBadge>
              </div>
              <div class="mt-3 flex gap-3">
                <h1>Quantity:</h1>
                <UInput type="number" />
                <UButton color="black" size="md" disabled>Add to Cart</UButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
