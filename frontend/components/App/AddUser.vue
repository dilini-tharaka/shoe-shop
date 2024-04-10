<script setup>
const filterOption = ["Filter Option", "Brand", "Color", "Size", "ID", "Name"];
const selected = ref(filterOption[0]);
const searchedValue = ref("");

const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "firstName",
    label: "First Name",
  },
  {
    key: "lastName",
    label: "Last Name",
  },
  {
    key: "role",
    label: "Role",
  },

  {
    key: "mobile",
    label: "Mobile",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "actions",
  },
];

const Users = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    role: "Admin",
    mobile: "+94 78 903 2143",
    email: "john@gmail.com",
  },

  {
    id: 2,
    firstName: "Jane",
    lastName: "Doe",
    role: "User",
    mobile: "+94 78 903 2143",
    email: "aggdsg@gmail.com",
  },

  {
    id: 3,
    firstName: "Dilini",
    lastName: "Perera",
    role: "User",
    mobile: "+94 78 903 2143",
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
  return Users.slice((page.value - 1) * pageCount, page.value * pageCount);
});

function search() {
  console.log("Search");
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
          :total="Users.length"
        />
      </div>
    </div>
  </div>
</template>
