<script setup>
import { employeeLoginSchema } from "~/schema";
useHead({
  title: "Employee Login | Shoe Shop",
});

const selected = ref(false);

const form = ref({
  username: "",
  password: "",
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
  // redirect to dashboard
  if (user.value.data && user.value.message === "success") {
    //save user data to local storage
    localStorage.setItem("user", JSON.stringify(user.value.data));
    return navigateTo("/app/dashboard");
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
              to="/"
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
