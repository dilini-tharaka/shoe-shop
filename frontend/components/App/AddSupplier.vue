<script setup>
import { addSupplierSchema } from "~/schema";

// Fetching suppliers from the backend to display in the table
const Suppliers = ref([]);
const { data: suppliers } = useFetch("http://localhost:8000/supplier");

watch(suppliers, () => {
  if (suppliers) {
    Suppliers.value = suppliers.value.data;
  } else {
    console.log("error");
    console.log(suppliers);
  }
});

//Fetch brands from the backend to display in the checkbox
const Brands = ref([]);
const { data: brands } = useFetch("http://localhost:8000/product/brand");

watch(brands, () => {
  if (brands) {
    Brands.value = brands.value.data;
  } else {
    console.log("error");
    console.log(brands);
  }
});
// Table
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
    key: "mobile",
    label: "Mobile",
  },
  {
    key: "address",
    label: "Address",
  },
  {
    key: "email",
    label: "Email",
  },

  {
    key: "actions",
  },
];

const items = (row) => [
  [
    {
      label: "Edit",
      icon: "solar:gallery-edit-line-duotone",
      click: () => console.log("Edit", row.id),
    },
    {
      label: "More Info",
      icon: "solar:info-circle-broken",
    },
  ],
  [
    {
      label: "Delete",
      icon: "solar:clipboard-remove-broken",
    },
  ],
];

const page = ref(1);
const pageCount = 5;

const rows = computed(() => {
  return Suppliers.value.slice(
    (page.value - 1) * pageCount,
    page.value * pageCount
  );
});

//select menu for district
const district = ["Colombo", "Gampaha", "Kalutara", "Kandy", "Galle"];

//checkbox for available brands

//slideover for add brand
const isBrand = ref(false);

//select menu for bank name
const bankName = ["BOC", "Sampath", "Peoples"];

const form = ref({
  name: "",
  mobile: "",
  email: "",
  address: "",
  nic: "",
  selectedBank: bankName[0],
  accountHolderName: "",
  accountNumber: "",
  branch: "",
  checkedBrands: [],
});

//get next supplir id
const id = ref(0);
onMounted(async () => {
  const { data: nextid } = await useFetch(
    "http://localhost:8000/supplier/nextid"
  );
  //console.log(nextid.value.data);
  id.value = nextid.value.data;
});

// Search Filter
const filterOption = ["Filter Option", "ID", "Name", "Mobile"];
const selected = ref(filterOption[0]);
const searchedValue = ref("");
//search function for suppliers || search by id, name, mobile
async function search() {
  if (selected.value === "ID") {
    const { data: supplier } = await useFetch(
      `http://localhost:8000/supplier/${searchedValue.value}`
    );
    console.log(supplier);
  } else if (selected.value === "Name") {
    const { data: supplier } = await useFetch(
      `http://localhost:8000/supplier/name/${searchedValue.value}`
    );
    console.log(supplier);
  } else if (selected.value === "Mobile") {
    const { data: supplier } = await useFetch(
      `http://localhost:8000/supplier/mobile/${searchedValue.value}`
    );
    console.log(supplier);
  }
}

function addBrand() {
  isBrand.value = true
}
function cancel() {
  form.value = {
    name: "",
    mobile: "",
    email: "",
    address: "",
    nic: "",
    selectedBank: bankName[0],
    accountHolderName: "",
    accountNumber: "",
    branch: "",
    checkedBrands: [],
  };
}

//add supplier
function addSupplier() {
  const { data: supplier } = useFetch("http://localhost:8000/supplier", {
    method: "POST",
    body: JSON.stringify(form.value),
  });
  console.log(supplier);

  if (supplier && supplier.value.message === "success") {
    form.value = {
      name: "",
      mobile: "",
      email: "",
      address: "",
      nic: "",
      selectedBank: bankName[0],
      accountHolderName: "",
      accountNumber: "",
      branch: "",
      checkedBrands: [],
    };
    return alert("Supplier added successfully");
  } else {
    return alert("Error: This Email is already registered");
  }
}
</script>

<template>
  <div class="w-full">
    <div class="flex items-center p-3 gap-5">
      <USelectMenu color="primary" v-model="selected" :options="filterOption" />
      <UInput
        color="primary"
        variant="outline"
        placeholder="Search..."
        v-model="searchedValue"
      />
      <UButton
        color="primary"
        variant="ghost"
        icon="solar:minimalistic-magnifer-linear"
        @click="search"
      />
    </div>
    <div class="px-3">
      <UTable :rows="rows" :columns="columns">
        <template #actions-data="{ row }">
          <UDropdown :items="items(row)">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-ellipsis-horizontal-20-solid"
            />
          </UDropdown>
        </template>
      </UTable>

      <div
        class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
      >
        <UPagination
          v-model="page"
          :page-count="pageCount"
          :total="Suppliers.length"
        />
      </div>
    </div>
    <div class="w-full flex flex-col gap-2">
      <UForm :schema="addSupplierSchema" :state="form" @submit="addSupplier">
        <div class="flex gap-5">
          <h1 class="text-lg font-mono font-bold">Add New Supplier</h1>
          <h1>ID</h1>
          <UBadge color="primary" variant="outline" size="xs">{{ id }}</UBadge>
        </div>
        <div class="w-full flex flex-row gap-16 items-center">
          <UFormGroup label="Name" name="name">
            <UInput v-model="form.name" />
          </UFormGroup>

          <UFormGroup label="Mobile" name="mobile">
            <UInput placeholder="07########" v-model="form.mobile" />
          </UFormGroup>

          <UFormGroup label="Email" name="email" class="w-1/2">
            <UInput placeholder="sample@gmail.com" v-model="form.email" />
          </UFormGroup>
        </div>

        <div class="flex flex-row gap-16 items-center py-2">
          <UFormGroup label="Address" class="w-3/4" name="address">
            <UInput v-model="form.address" />
          </UFormGroup>

          <UFormGroup label="NIC" class="w-1/4" name="nic">
            <UInput v-model="form.nic" />
          </UFormGroup>
        </div>

        <div class="flex flex-row flex-wrap gap-6 items-center">
          <UFormGroup label="Available Brands" name="checkedBrands">
            <div class="flex gap-5">
              <UCheckbox
                v-for="brand in Brands"
                v-model="form.checkedBrands"
                :key="brand.id"
                :value="brand.id"
                :label="brand.name"
              />
            </div>
          </UFormGroup>
          <UButton
            icon="solar:add-circle-broken"
            size="sm"
            color="primary"
            variant="ghost"
            @click="addBrand"
          />
          <USlideover v-model="isBrand">
            <AppAddBrand />
          </USlideover>
        </div>
        <div class="flex flex-col">
          <h1 class="font-bold">Bank Details</h1>
          <div class="w-full flex flex-row gap-5 items-center">
            <UFormGroup
              label="Account Owner's Name"
              class="w-1/5"
              name="accountHolderName"
            >
              <UInput v-model="form.accountHolderName" />
            </UFormGroup>

            <UFormGroup label="Bank Name" class="w-1/5" name="selectedBank">
              <USelectMenu
                color="primary"
                :options="bankName"
                v-model="form.selectedBank"
              />
            </UFormGroup>

            <UFormGroup
              label="Account Number"
              class="w-1/4"
              name="accountNumber"
            >
              <UInput v-model="form.accountNumber" />
            </UFormGroup>

            <UFormGroup label="Branch" class="w-1/5" name="branch">
              <UInput v-model="form.branch" />
            </UFormGroup>
          </div>
        </div>
        <div class="w-1/2 flex items-center gap-2 pt-4">
          <UButton type="submit" color="primary" variant="solid" block
            >Add Supplier</UButton
          >
          <UButton color="gray" variant="solid" @click="cancel" block
            >Cancel</UButton
          >
        </div>
      </UForm>
    </div>
  </div>
</template>
