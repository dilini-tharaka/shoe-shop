<script setup>
import { addUserSchema } from "~/schema";
import {updateUserSchema} from "~/schema";
// Search Filter
const filterOption = ["Filter Option", "ID", "Mobile", "Role"];
const selected = ref(filterOption[0]);
const searchedValue = ref("");

//Search user by id, mobile, role
async function search() {
  if (searchedValue.value === "") {
    alert("Please Enter a Value to Search");
    return;
  }

  if (selected.value === "ID") {
    const { data: user } = await useFetch(
      `http://localhost:8000/user/${searchedValue.value}`
    );
    //console.log(user.value);

    if (user.value.data) {
      Users.value = Array.isArray(user.value.data)
        ? user.value.data
        : [user.value.data];
      // console.log(Users.value);
    } else {
      console.log("error");
      alert("User Not Found");
    }
  } else if (selected.value === "Mobile") {
    const { data: user } = await useFetch(
      `http://localhost:8000/user/mobile/${searchedValue.value}`
    );
    //console.log(user.value);

    if (user.value.data) {
      Users.value = Array.isArray(user.value.data)
        ? user.value.data
        : [user.value.data];
      //  console.log(Users.value);
    } else {
      console.log("error");
      console.log(user);
      alert("User Not Found");
    }
  } else if (selected.value === "Role") {
    const { data: user } = await useFetch(
      `http://localhost:8000/user/role/${searchedValue.value}`
    );
    //console.log(user.value);

    if (user.value.data) {
      Users.value = Array.isArray(user.value.data)
        ? user.value.data
        : [user.value.data];
      // console.log(Users.value);
    } else {
      console.log("error");
      console.log(user);
      alert("User Not Found");
    }
    return;
  }
}

function reset() {
  searchedValue.value = "";
  selected.value = filterOption[0];
  Users.value = users.value.data;
}
const form = ref({
  firstName: "",
  lastName: "",
  nic: "",
  mobile: "",
  email: "",
  role_id: "",
  selectedRole: "",
  userName: "",
  password: "",
});

//Role Filter
const Roles = ref([]);
const { data: roles } = useFetch("http://localhost:8000/user/role");
const RoleLookup = ref({});

watch(roles, () => {
  if (roles.value && roles.value.data) {
    RoleLookup.value = roles.value.data.reduce((acc, role) => {
      acc[role.name] = role.id;
      return acc;
    }, {});

    // Create an array of role names
    Roles.value = roles.value.data.map((role) => role.name);
  } else {
    console.log("error");
    console.log(roles);
  }
});

const roleId = computed(() => {
  return RoleLookup.value[form.value.selectedRole] || null;
});

watch(roleId, (newRoleId) => {
  form.value.role_id = newRoleId;
});

///// ********************************************** /////////
const editForm = ref({
  id: 0,
  firstName: "",
  lastName: "",
  nic: "",
  mobile: "",
  email: "",
  role_id: "",
  selectedRole: "",
  userName: "",
  password: "",
});

//////////////////////////////////////////

// Fetching Data for Table
const Users = ref([]);
const { data: users } = useFetch("http://localhost:8000/user");

watch(users, () => {
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

const items = (row) => [
  [
    {
      label: "Edit",
      icon: "solar:gallery-edit-line-duotone",
      click: () => openEditForm(row),
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
  return Users.value.slice(
    (page.value - 1) * pageCount,
    page.value * pageCount
  );
});

//get next user id
const id = ref(0);
onMounted(async () => {
  const { data } = await useFetch("http://localhost:8000/user/nextid");
  id.value = data.value.data;
});



async function addUser() {
  const { data: user } = await useFetch("http://localhost:8000/user", {
    method: "POST",
    body: JSON.stringify(form.value),
  });
  //console.log(user);

  if (user.value.data && user.value.message === "success") {
    form.value = {
      firstName: "",
      lastName: "",
      nic: "",
      mobile: "",
      email: "",
      role_id: "",
      selectedRole: "",
      userName: "",
      password: "",
    };
    return alert("User Added Successfully");
  } else {
    return alert("User Adding Failed");
  }
}

function cancel() {
  form.value = {
    firstName: "",
    lastName: "",
    nic: "",
    mobile: "",
    email: "",
    role_id: "",
    selectedRole: "",
    userName: "",
    password: "",
  };
}

//update user
function openEditForm(user) {
  if (!user.id) {
    console.error("User is undefined");
    return;
  }

  // Split the name into firstName and lastName
  const [firstName, lastName] = user.name.split(' ');

  editForm.value = {
    id: user.id,
    firstName: firstName,
    lastName: lastName,
    nic: user.nic,
    mobile: user.mobile,
    email: user.email,
    role_id: user.role.id,
    selectedRole: user.role.name,
    userName: user.userName,
    password: "",
  };
}

async function updateUser() {
  const {data} = await useFetch(`http://localhost:8000/user/${editForm.value.id}`, {
    method: "PATCH",
    body: JSON.stringify(editForm.value),
  });

  if (data.value.data && data.value.message === "success") {
    editForm.value = {
      id: 0,
      firstName: "",
      lastName: "",
      nic: "",
      mobile: "",
      email: "",
      role_id: "",
      selectedRole: "",
      userName: "",
      password: "",
    };
    return alert("User Updated Successfully");
  } else {
    return alert("User Updating Failed");
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
      <UButton size="2xs" variant="outline" @click="reset">Reset</UButton>
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

    <!-- Edit User -->
    <div
      v-if="editForm.id"
      class="w-full flex flex-col px-3 pb-5"
    >
      <UForm :schema="updateUserSchema" :state="editForm" @submit="updateUser">
        <div class="flex gap-4">
          <h1 class="text-lg font-mono font-bold">Edit User</h1>
          <UBadge color="primary" variant="outline" size="xs">{{
            editForm.id
          }}</UBadge>
        </div>
        <div class="flex flex-row gap-16 items-center px-2">
          <UFormGroup label="First Name" name="firstName">
            <UInput v-model="editForm.firstName" />
          </UFormGroup>

          <UFormGroup label="Last Name" name="lastName">
            <UInput v-model="editForm.lastName" />
          </UFormGroup>

          <UFormGroup label="NIC" name="nic">
            <UInput v-model="editForm.nic" />
          </UFormGroup>
        </div>

        <div class="flex flex-row gap-16 items-center p-2">
          <UFormGroup label="Mobile" name="mobile">
            <UInput v-model="editForm.mobile" />
          </UFormGroup>

          <UFormGroup label="Email" class="w-2/5" name="email">
            <UInput v-model="editForm.email" />
          </UFormGroup>
        </div>

        <div class="flex flex-row gap-16 items-center p-2">
          <UFormGroup label="Role" class="w-2/12" name="selectedRole">
            <USelectMenu
              color="primary"
              :options="Roles"
              v-model="editForm.selectedRole"
            />
          </UFormGroup>

          <UFormGroup label="User Name" name="userName">
            <UInput v-model="editForm.userName" />
          </UFormGroup>

          <UFormGroup label="Password" name="password">
            <UInput v-model="editForm.password" disabled/>
          </UFormGroup>
          <div class="flex flex-wrap items-center gap-2 w-2/5">
            <UButton type="submit" color="primary" variant="solid" block
              >Update User</UButton
            >
            <UButton color="gray" variant="solid" block @click="cancelEdit"
              >Cancel</UButton
            >
          </div>
        </div>
      </UForm>
    </div>

    <div v-if="!editForm.id" class="w-full flex flex-col px-3 pb-3">
      <UForm :schema="addUserSchema" :state="form" @submit="addUser">
        <div class="flex gap-4">
          <h1 class="text-lg font-mono font-bold">Add New User</h1>
          <UBadge color="primary" variant="outline" size="xs">{{ id }}</UBadge>
        </div>
        <div class="flex flex-row gap-16 items-center px-2">
          <UFormGroup label="First Name" name="firstName">
            <UInput v-model="form.firstName" />
          </UFormGroup>

          <UFormGroup label="Last Name" name="lastName">
            <UInput v-model="form.lastName" />
          </UFormGroup>

          <UFormGroup label="NIC" name="nic">
            <UInput v-model="form.nic" />
          </UFormGroup>
        </div>

        <div class="flex flex-row gap-16 items-center p-2">
          <UFormGroup label="Mobile" name="mobile">
            <UInput v-model="form.mobile" />
          </UFormGroup>

          <UFormGroup label="Email" class="w-2/5" name="email">
            <UInput v-model="form.email" />
          </UFormGroup>
        </div>

        <div class="flex flex-row gap-16 items-center p-2">
          <UFormGroup label="Role" class="w-2/12" name="selectedRole">
            <USelectMenu
              color="primary"
              :options="Roles"
              v-model="form.selectedRole"
            />
          </UFormGroup>

          <UFormGroup label="User Name" name="userName">
            <UInput v-model="form.userName" />
          </UFormGroup>

          <UFormGroup label="Password" name="password">
            <UInput v-model="form.password" />
          </UFormGroup>
          <div class="flex flex-wrap items-center gap-2 w-2/5">
            <UButton type="submit" color="primary" variant="solid" block
              >Add User</UButton
            >
            <UButton color="gray" variant="solid" block @click="cancel"
              >Cancel</UButton
            >
          </div>
        </div>
      </UForm>
    </div>

    
  </div>
</template>
