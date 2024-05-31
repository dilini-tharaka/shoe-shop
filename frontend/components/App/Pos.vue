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

const purchesedItems = ref([]);

const form = ref({
  id: "",
  quantity: 0,
  name: "###",
  price: 0,
  discount: 0,
});

function addItem() {
  //console.log(form.value);
  if (form.value.price === 0) {
    alert("Please click get the details first");
    return;
  }
  const newItem = {
    id: form.value.id,
    name: form.value.name,
    quantity: form.value.quantity,
    price: form.value.price,
    amount: form.value.price * form.value.quantity,
  };

  purchesedItems.value.push(newItem);
  //console.log(purchesedItems);
  form.value = {
    id: "",
    quantity: 0,
    name: "###",
    price: 0,
    discount: 0,
  };
}

// Get Shoe name,Price and discount
async function getValue() {
  if (form.value.id === "") {
    alert("Please enter the ID");
    return;
  }
  const { data } = await useFetch("http://localhost:8000/invoice/stockdetails", {
    method: "POST",
    body: JSON.stringify({
      id: form.value.id,
    }),

  });
  
    if (data.value && data.value.message === "success") {
      form.value.name = data.value.data.name;
      form.value.price = data.value.data.price;
      form.value.discount = data.value.data.discount;
    } else {
      form.value.id = "";
      return alert(data.value.message);
    }
  //console.log(data);
}
</script>

<template>
  <div class="w-full">
    <UForm :schema="posSchema" :state="form" @submit="addItem">
      <div class="w-full p-2 flex justify-between items-center">
        <UFormGroup label="ID:" class="font-bold" name="id">
          <UInput v-model="form.id" />
          <UButton
            color="primary"
            variant="outline"
            size="2xs"
            @click="getValue"
            >Get Details</UButton
          >
        </UFormGroup>

        <div class="flex flex-col">
          <h1 class="font-bold">Name:</h1>
          <h1>{{ form.name }}</h1>
        </div>

        <div class="flex flex-col">
          <h1 class="font-bold">Pair Price:</h1>
          <h1>Rs. {{ form.price }}</h1>
        </div>
        <UFormGroup label="Quantity:" class="font-bold" name="quantity">
          <UInput type="number" v-model="form.quantity" />
        </UFormGroup>
        <div class="flex flex-col">
          <h1 class="font-bold">Discount:</h1>
          <h1>{{ form.discount }}%</h1>
        </div>
      </div>
      <div class="w-full flex px-10">
        <UButton color="primary" variant="solid" type="submit" block
          >Add</UButton
        >
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
