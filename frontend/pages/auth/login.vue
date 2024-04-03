<template>
  <div
    class="w-full min-h-screen bg-bkg-secondary flex justify-center items-center"
  >
    <div
      class="w-2/3 max-w-[400px] h-[600px] flex flex-col bg-bkg-primary rounded-lg shadow dark:shadow-black"
    >
      <div class="w-full flex justify-center py-3">
        <h1 class="text-2xl uppercase font-bold">Welcome Back</h1>
      </div>
      <div class="w-full justify-center">
        Don't Have An Account
        <ULink
          to="/"
          class="underline"
          active-class="text-primary"
          inactive-class="text-primary"
        >
          Link
        </ULink>
      </div>
    </div>
  </div>
</template>
