<script setup>
import { posSchema } from "~/schema";

const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "discount",
    label: "Discount",
  },
  {
    key: "price",
    label: "Pair Price",
  },
  {
    key: "quantity",
    label: "Quantity",
  },
  {
    key: "amount",
    label: "Amount",
  },

  {
    key: "action",
  },
];

const purchesedItems = [
  {
    id: 1,
    name: "Gravel Cycling Shoes",
    discount: "2%",
    quantity: 1,
    price: 6500,
  },
  {
    id: 2,
    name: "Nizza Platform Shoes",
    discount: "5%",
    quantity: 1,
    price: 9500,
  },
  {
    id: 3,
    name: "Gravel Cycling Shoes",
    discount: "0%",
    quantity: 2,
    price: 6500,
  },
];

const posState = ref({
  id: "",
  quantity: "",
});

function onSubmit() {
  console.log("add");
}
</script>

<template>
  <div class="w-full">
    <UForm :schema="posSchema" :state="posState" @submit="onSubmit">
      <div class="w-full p-2 flex justify-between items-center">
        <UFormGroup label="ID:" class="font-bold" name="id">
          <UInput v-model="posState.id" />
        </UFormGroup>
        <div class="flex flex-col">
          <h1 class="font-bold">Name:</h1>
          <h1>Gravel Cycling Shoes</h1>
        </div>
        <div class="flex flex-col">
          <h1 class="font-bold">Discount:</h1>
          <h1>5%</h1>
        </div>
        <div class="flex flex-col">
          <h1 class="font-bold">Pair Price:</h1>
          <h1>Rs. 6,500.00</h1>
        </div>
        <UFormGroup label="Quantity:" class="font-bold" name="quantity">
          <UInput type="number" v-model="posState.quantity" />
        </UFormGroup>
      </div>
      <div class="w-full flex px-10">
        <UButton color="primary" variant="solid" type="submit" block>Add</UButton>
      </div>
    </UForm>
    <UDivider label=" " class="py-3" />
    <UTable :columns="columns" :rows="purchesedItems">
      <template #action-data>
        <UButton
          color="red"
          variant="ghost"
          icon="solar:trash-bin-minimalistic-2-broken"
        />
      </template>
    </UTable>
    <UDivider label=" " />

    <div class="w-full flex justify-end gap-10 pr-52 pt-4">
      <div>
        <h1 class="font-bold">Total:</h1>
        <h1 class="font-bold">Discount:</h1>
        <h1 class="font-bold">Net Total:</h1>
      </div>

      <div>
        <h1>Rs. 10000</h1>
        <h1>Rs. 500</h1>
        <h1>Rs. 9500</h1>
      </div>
    </div>

    <div class="flex justify-end gap-4 p-4">
      <UFormGroup label="Paid Amount">
        <UInput />
      </UFormGroup>

      <UButton
        icon="solar:printer-broken"
        color="primary"
        variant="solid"
        label="Print Recipt"
      />
    </div>
  </div>
</template>
