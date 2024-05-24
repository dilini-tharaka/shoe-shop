<script setup>
import { registerSchema } from "~/schema";
useHead({
  title: "Register| shoe shop",
});

const form = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
});

let btnDisabled = ref(false);

async function register() {
  btnDisabled.value = true;

  const { data: register } = await useFetch("http://localhost:8000/register", {
    method: "POST",
    body: JSON.stringify(form.value),
  });

  console.log(register.value.data);
  if (register.value.data && register.value.message === "success") {
    alert(`Register success!
    Your email is ${form.value.email}
    Your password is ${form.value.password}
    `);
    return navigateTo("/auth/login");
  }

  if (register.value.message === "error") {
    form.value = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };

    btnDisabled.value = false;
    return alert(`Register failed!
    Already have an account with this email
    `);
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
        class="hidden lg:flex w-1/2 bg-[url(/img/register.jpg)] bg-center bg-cover"
      ></div>
      <div class="flex flex-col w-full lg:w-1/2 py-2">
        <UForm
          :schema="registerSchema"
          :state="form"
          class="flex flex-col justify-between gap-3 py-5 px-10"
          @submit="register"
        >
          <div class="flex justify-center">
            <h1 class="text-2xl uppercase font-bold">Register</h1>
          </div>
          <div class="flex flex-row">
            <div class="w-full lg:w-1/2">
              <UFormGroup label="First Name" name="firstName">
                <UInput v-model="form.firstName" class="pr-2" />
              </UFormGroup>
            </div>
            <div class="w-full lg:w-1/2">
              <UFormGroup label="Last Name" name="lastName">
                <UInput v-model="form.lastName" class="pl-2" />
              </UFormGroup>
            </div>
          </div>
          <UFormGroup label="Email Address" name="email">
            <UInput v-model="form.email" icon="solar:letter-bold" />
          </UFormGroup>

          <UFormGroup label="Password" name="password">
            <UInput
              v-model="form.password"
              icon="solar:lock-keyhole-bold"
              type="password"
            />
          </UFormGroup>

          <div class="flex flex-col gap-2 px-10">
            <UButton
              type="submit"
              class="w-full"
              color="primary"
              block
              :disabled="btnDisabled"
            >
              Register
            </UButton>
            <UButton to="/" variant="outline" block>Cancel</UButton>
          </div>
        </UForm>
        <div class="flex justify-center">
          <h1>Already have an account?</h1>
          <ULink
            to="/auth/login"
            class="underline"
            active-class="text-primary"
            inactive-class="text-primary"
          >
            Login
          </ULink>
        </div>
      </div>
    </div>
  </div>
</template>
