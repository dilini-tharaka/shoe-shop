<script setup></script>

<template>
  <div class="w-full">
    <div class="w-full p-2 flex gap-4 justify-between">
      <UFormGroup label="ID:" class="font-bold">
        <UInput />
      </UFormGroup>
      <div class="flex flex-col">
        <h1 class="font-bold">Name:</h1>
        <h1>Gravel Cycling Shoes</h1>
      </div>

      <div class="flex flex-col">
        <h1 class="font-bold">Pair Price:</h1>
        <h1>Rs. 6,500.00</h1>
      </div>
      <UFormGroup label="Quantity:" class="font-bold">
        <UInput />
      </UFormGroup>
    </div>
    <UButton color="primary" variant="solid">Add</UButton>
  </div>
</template>
