<script setup></script>

<template>
  <div>
    <NuxtLayout name="e-commerce">
      <div class="w-full h-screen rounded-lg shadow dark:shadow-black">
        <BaseLayout>
          <template #hero>
            <div
              class="w-full h-full bg-[url(/img/login.png)] bg-center bg-cover"
            ></div>
          </template>

          <template #content>
            <AppProductCard />
          </template>
        </BaseLayout>
      </div>
    </NuxtLayout>
  </div>
</template>
