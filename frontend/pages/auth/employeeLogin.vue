<script setup>
import { employeeLoginSchema } from "~/schema";
import { useAuthStore } from "~/store";

useHead({
  title: "Employee Login | Shoe Shop",
});

const authStore = useAuthStore();

const selected = ref(false);

const form = ref({
  username: "",
  password: "",
});

// Define roles and their respective sidebar items
const sidebarPath = ref({
  1: [
    // admin is 1
    {
      title: "Dashboard",
      to: "/app/dashboard",
    }
  ],
  2: [
    //Stock Manager is 2
    {
      title: "Dashboard",
      to: "/app/dashboard",
    }
  ],

  3: [
    //sales Assistant 3
    {
      title: "Products",
      to: "/app/products/add",
    }
  ],
  4: [
    //cashier is 4
    {
      title: "POS",
      to: "/app/pos",
    }
  ],
});

async function login() {
  const { data: user } = await useFetch(
    "http://localhost:8000/login//employee",
    {
      method: "POST",
      body: JSON.stringify(form.value),
    }
  );

  // if login success
  if (user.value.data && user.value.message === "success") {
    // Save user data to Pinia store
    const token = 'mock-jwt-token//this is a mock token';
    authStore.setUser(user.value.data, token);
    //console.log("User data set in store: ", authStore.user);
    console.log("User role in store: ", authStore.role);
    // Save user data to localStorage
    //localStorage.setItem("user", JSON.stringify(user.value.data));

    // Redirect to dashboard
    const firstPath = sidebarPath.value[authStore.role][0].to;  // Get the first path of the user role
    return navigateTo(firstPath);
  }
  if (!user.value.data) {
    form.value.username = "";
    form.value.password = "";
    // show error message
    return alert(user.value.message);
  }
}
</script>

<template>
  <div
    class="w-full min-h-screen bg-bkg-secondary flex justify-center items-center px-5"
  >
    <div
      class="w-full lg:w-2/3 flex bg-bkg-primary rounded-lg shadow dark:shadow-black"
    >
      <div
        class="hidden lg:flex w-1/2 bg-[url(/img/employee.svg)] bg-center bg-contain bg-no-repeat rounded-l-lg"
      ></div>
      <div class="flex flex-col w-full lg:w-1/2">
        <UForm
          :schema="employeeLoginSchema"
          :state="form"
          class="flex flex-col justify-between gap-3 py-5 px-10"
          @submit="login"
        >
          <div class="flex justify-center py-2">
            <h1 class="text-2xl uppercase font-bold">Welcome Back</h1>
          </div>

          <UFormGroup label="User Name" name="username">
            <UInput v-model="form.username" icon="solar:user-bold" />
          </UFormGroup>

          <UFormGroup label="Password" name="password">
            <UInput
              v-model="form.password"
              icon="solar:lock-keyhole-bold"
              type="password"
            />
          </UFormGroup>

          <div class="flex justify-between">
            <UCheckbox
              v-model="selected"
              name="rememberMe"
              label="Remember Me"
            />
            <ULink
              to=""
              class="underline"
              active-class="text-primary"
              inactive-class="text-primary"
            >
              Forgot Password
            </ULink>
          </div>

          <UButton type="submit" class="mt-5" block>Login</UButton>
          <!-- <UButton to="/" variant="outline" block>Cancel</UButton> -->
        </UForm>
      </div>
    </div>
  </div>
</template>
