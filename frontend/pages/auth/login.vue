<script setup>
import { loginSchema } from "~/schema";
useHead({
  title: "Login | Shoe Shop",
});

const selected = ref(false);

const form = ref({
  email: "",
  password: "",
});

async function login() {
  const { data: user } = await useFetch("http://localhost:8000/login", {
    method: "POST",
    body: JSON.stringify(form.value),
  });
  console.log(user);

  // if login success
  // redirect to either dashboard or home page
  if (user.value.data && user.value.message === "success") {
    //save user data to local storage
    localStorage.setItem("user", JSON.stringify(user.value.data));
    return navigateTo("/app/ecommerce");
  }
  if(!user.value.data){
    form.value.email = "";
    form.value.password = "";
    // show error message
    return alert("Invalid email or password ");
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
        class="hidden lg:flex w-1/2 bg-[url(/img/login.png)] bg-center bg-cover"
      ></div>
      <div class="flex flex-col w-full lg:w-1/2">
        <UForm
          :schema="loginSchema"
          :state="form"
          class="flex flex-col justify-between gap-3 py-5 px-10"
          @submit="login"
        >
          <div class="flex justify-center py-2">
            <h1 class="text-2xl uppercase font-bold">Welcome Back</h1>
          </div>

          <UFormGroup label="Email Address" name="email">
            <UInput v-model="form.email" icon="solar:user-bold" />
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
          <UButton to="/app/ecommerce" variant="outline" block>Cancel</UButton>
        </UForm>

        <div class="flex justify-center py-5">
          Don't Have An Account
          <ULink
            to="/auth/register"
            class="underline px-1"
            active-class="text-primary"
            inactive-class="text-primary"
          >
            Register
          </ULink>
        </div>
      </div>
    </div>
  </div>
</template>
