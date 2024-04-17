<script setup>
import { addSupplierSchema } from "~/schema";
// Search Filter
const filterOption = ["Filter Option", "ID", "Name", "Mobile"];
const selected = ref(filterOption[0]);
const searchedValue = ref("");

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

const Suppliers = [
  {
    id: 1,
    name: "John",
    mobile: "+94 78 903 2143",
    address: "No.43/2,sggdgs,Kelaniya",
    email: "john@gmail.com",
  },

  {
    id: 2,
    name: "Perera",
    mobile: "+94 78 903 2143",
    address: "No.43/2,sggdgs,Kelaniya",
    email: "aggdsg@gmail.com",
  },

  {
    id: 3,
    name: "John",
    mobile: "+94 78 903 2143",
    address: "No.43/2,sggdgs,Kelaniya",
    email: "twytfytafsya@yahoo.com",
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
  return Suppliers.slice((page.value - 1) * pageCount, page.value * pageCount);
});

//select menu for district
const district = ["Colombo", "Gampaha", "Kalutara", "Kandy", "Galle"];

//checkbox for available brands
const checkedBrands = ref([]);

//slideover for add brand
const isBrand = ref(false);

//select menu for bank name
const bankName = ["BOC", "Sampath","Peoples"];

const form = ref({
  name: "",
  mobile: "",
  email: "",
  address: "",
  selectedDistrict: district[0],
  selectedBank: bankName[0],
  accountHolderName: "",
  accountNumber: "",
  branch: "",
});

function search() {
  console.log("Search");
}

function check() {
  console.log(checkedBrands.value);
}

function addSupplier() {
  console.log(form.value);
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
      <div class="flex gap-5">
        <h1 class="text-lg font-mono font-bold">Add New Supplier</h1>
        <h1>ID</h1>
        <UBadge color="primary" variant="outline" size="xs">458</UBadge>
      </div>
      <UForm :schema="addSupplierSchema" :state="form" @submit="addSupplier">
        <div class="w-full flex flex-row gap-16 items-center">
          <UFormGroup label="Name" name="name">
            <UInput v-model="form.name" />
          </UFormGroup>

          <UFormGroup label="Mobile" name="mobile">
            <UInput placeholder="07########" v-model="form.mobile" />
          </UFormGroup>

          <UFormGroup label="Email" name="email" class="w-1/2">
            <UInput v-model="form.email" />
          </UFormGroup>
        </div>

        <div class="flex flex-row gap-16 items-center py-2">
          <UFormGroup label="Address" class="w-3/4" name="address">
            <UInput v-model="form.address" />
          </UFormGroup>

          <UFormGroup label="District" class="w-1/4" name="selectedDistrict">
            <USelectMenu
              color="primary"
              :options="district"
              v-model="form.selectedDistrict"
            />
          </UFormGroup>
        </div>

        <div class="flex flex-row flex-wrap gap-10 items-center">
          <h1>Available Brands</h1>

          <UCheckbox v-model="checkedBrands" value="addidas" label="Addidas" />

          <UCheckbox v-model="checkedBrands" value="nike" label="Nike" />

          <UCheckbox v-model="checkedBrands" value="puma" label="Puma" />

          <UCheckbox v-model="checkedBrands" value="reebok" label="Reebok" />
          <UButton
            icon="solar:add-circle-broken"
            size="sm"
            color="primary"
            variant="ghost"
            @click="isBrand = true"
          />
          <USlideover v-model="isBrand">
            <AppAddBrand />
          </USlideover>
        </div>
        <div class="flex flex-col">
          <h1 class="font-bold">Bank Details</h1>
          <div class="w-full flex flex-row gap-5 items-center">
            <UFormGroup label="Account Owner's Name" class="w-1/5" name="accountHolderName">
              <UInput v-model="form.accountHolderName" />
            </UFormGroup>

            <UFormGroup label="Bank Name" class="w-1/5" name="selectedBank">
              <USelectMenu
                color="primary"
                :options="bankName"
                v-model="form.selectedBank"
              />
            </UFormGroup>

            <UFormGroup label="Account Number" class="w-1/4" name="accountNumber">
              <UInput v-model="form.accountNumber"/>
            </UFormGroup>

            <UFormGroup label="Branch" class="w-1/5" name="branch">
              <UInput v-model="form.branch"/>
            </UFormGroup>
          </div>
        </div>
        <div class="w-1/2 flex items-center gap-2  pt-4">
          <UButton type="submit" color="primary" variant="solid" block
            >Add Supplier</UButton
          >
          <UButton color="gray" variant="solid"  @click="check" block
            >Cancel</UButton
          >
        </div>
      </UForm>
    </div>
  </div>
</template>
