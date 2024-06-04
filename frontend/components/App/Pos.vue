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
});

const discountPrecentage = ref(0);
let btnDisabled = ref(false);
const paidAmount = ref(0);
// Add item to the table
function addItem() {
  //console.log(form.value);
  if (form.value.price === 0) {
    alert("Please click get the details Button first");
    return;
  }
  if (form.value.id) {
    const index = purchesedItems.value.findIndex(
      (item) => item.id === form.value.id
    );
    if (index !== -1) {
      purchesedItems.value[index].quantity += form.value.quantity;
      purchesedItems.value[index].amount =
        purchesedItems.value[index].quantity *
        purchesedItems.value[index].price;
      form.value = {
        id: "",
        quantity: 0,
        name: "###",
        price: 0,
      };
      return;
    }
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
  };
}

// Get Shoe name,Price and discount
async function getValue() {
  if (form.value.id === "") {
    alert("Please enter the ID");
    return;
  }
  const { data } = await useFetch(
    "http://localhost:8000/invoice/stockdetails",
    {
      method: "POST",
      body: JSON.stringify({
        id: form.value.id,
      }),
    }
  );

  if (data.value && data.value.message === "success") {
    form.value.name = data.value.data.name;
    form.value.price = data.value.data.price;
    discountPrecentage.value = data.value.data.discount;
  } else {
    form.value.id = "";
    return alert(data.value.message);
  }
}

// Delete item from the table
function deleteItem(row) {
  const index = purchesedItems.value.findIndex((item) => item.id === row.id);
  purchesedItems.value.splice(index, 1);
  console.log(index);
}

// Calculate total, discount and net total
const total = computed(() => {
  return purchesedItems.value.reduce((acc, item) => acc + item.amount, 0);
});

const discount = computed(() => {
  return parseFloat(total.value * (discountPrecentage.value / 100)).toFixed(2);
});

const netTotal = computed(() => {
  return parseFloat(total.value - discount.value).toFixed(2);
});

// Print Recipt
async function print() {
  if (purchesedItems.value.length === 0) {
    return alert("Please add items to the table");
  }
  if (paidAmount.value === 0) {
    return alert("Please enter the Paid Amount");
  }
  if (paidAmount.value < parseFloat(netTotal.value)) {
    return alert("Paid Amount Not enough to pay the bill");
  }
  btnDisabled.value = true;

  const printData = ref({
    Cashier_id: 1, // Need to change
    invoiceitem: purchesedItems.value.map((item) => {
      return {
        id: parseInt(item.id),
        qty: parseInt(item.quantity),
        amount: parseFloat(
          item.amount * (1 - discountPrecentage.value / 100)
        ),
      };
    }),
  });

  console.log(printData.value);

  const { data: addinvoice } = await useFetch("http://localhost:8000/invoice", {
    method: "POST",
    body: JSON.stringify(printData.value),
  });

  if (addinvoice.value && addinvoice.value.message === "success") {
    alert(`Invoice Added Successfully!
    casheir ID: ${printData.value.Cashier_id}
    Invoice ID: ${addinvoice.value.data.id}
    items: ${purchesedItems.value.map((item) => {
      return `ID: ${item.id} Qty: ${item.quantity} Amount: ${item.amount}`;
    })}
    Total: ${total.value}
    Discount: ${discount.value}
    Net Total: ${netTotal.value}
    Paid Amount: ${paidAmount.value}
    Change: ${parseFloat(paidAmount.value - netTotal.value).toFixed(2)}=
    `);
    purchesedItems.value = [];
    btnDisabled.value = false;
    paidAmount.value = 0;
    discountPrecentage.value = 0;
  } else {
    console.log(addinvoice.value.data);
    alert("Invoice Adding Failed");
    btnDisabled.value = false;
  }
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
          <h1>{{ discountPrecentage }}%</h1>
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
      <template #action-data="{ row }">
        <UButton
          color="red"
          variant="ghost"
          icon="solar:trash-bin-minimalistic-2-broken"
          @click="() => deleteItem(row)"
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
        <h1>Rs. {{ total }}</h1>
        <h1>Rs. {{ discount }}</h1>
        <h1>Rs. {{ netTotal }}</h1>
      </div>
    </div>

    <div class="flex justify-end gap-4 p-4">
      <UFormGroup label="Paid Amount">
        <UInput v-model="paidAmount" type="number" />
      </UFormGroup>

      <UButton
        icon="solar:printer-broken"
        color="primary"
        variant="solid"
        label="Print Recipt"
        :disabled="btnDisabled"
        @click="print"
      />
    </div>
  </div>
</template>
