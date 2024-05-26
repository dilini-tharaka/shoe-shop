<script setup>
import { addUserSchema } from "~/schema";
// Search Filter
const filterOption = ["Filter Option", "ID", "Mobile", "Role"];
const selected = ref(filterOption[0]);
const searchedValue = ref("");

//Role Filter
const roleFilter = ["Role", "Admin", "Cashier", "User", "Stock Manager"];

// Fetching Data
const { data: users } = useFetch("http://localhost:8000/user");

watch(users, () => {
  console.log(users);
  console.log(users.value.data);
  if (users) {
    Users.value = users.value.data;
  } else {
    console.log("error");
    console.log(users);
  }
});
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
    key: "role.name",
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

const Users = ref([]);

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
  return Users.value.slice((page.value - 1) * pageCount, page.value * pageCount);
});

const form = ref({
  firstName: "",
  lastName: "",
  nic: "",
  mobile: 0,
  email: "",
  selectedRole: "",
  userName: "",
  password: "",
});

function search() {
  console.log("Search");
}

function addUser() {
  console.log("Add User");
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
    <div class="w-full flex flex-col px-3 pb-3">
      <h1 class="text-lg font-mono font-bold">Add New User</h1>
      <UForm :schema="addUserSchema" :state="form" @submit="addUser">
        <div class="flex flex-row gap-16 items-center px-2">
          <UFormGroup label="First Name" name="firstName">
            <UInput v-model="form.firstName"/>
          </UFormGroup>

          <UFormGroup label="Last Name" name="lastName">
            <UInput v-model="form.lastName"/>
          </UFormGroup>

          <UFormGroup label="NIC" name="nic">
            <UInput v-model="form.nic"/>
          </UFormGroup>
        </div>

        <div class="flex flex-row gap-16 items-center p-2">
          <UFormGroup label="Mobile" name="mobile">
            <UInput v-model="form.mobile"/>
          </UFormGroup>

          <UFormGroup label="Email" class="w-2/5" name="email">
            <UInput v-model="form.email"/>
          </UFormGroup>
        </div>

        <div class="flex flex-row gap-16 items-center p-2">
          <UFormGroup label="Role" class="w-2/12" name="role">
            <USelectMenu
              color="primary"
              :options="roleFilter"
              v-model="form.selectedRole"
            />
          </UFormGroup>

          <UFormGroup label="User Name" name="userName">
            <UInput v-model="form.userName"/>
          </UFormGroup>

          <UFormGroup label="Password" name="password">
            <UInput v-model="form.password"/>
          </UFormGroup>
          <div class="flex flex-wrap items-center gap-2 w-2/5">
            <UButton type="submit" color="primary" variant="solid" block>Add User</UButton>
            <UButton color="gray" variant="solid" block>Cancel</UButton>
          </div>
        </div>
      </UForm>
    </div>
  </div>
</template>
