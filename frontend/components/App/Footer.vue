<template>
  <div class="w-full px-5">
    <div
      class="bg-bkg-primary flex rounded justify-between items-center shadow dark:shadow-black px-3"
    >
      <div class="hidden lg:flex justify-center">
        <img src="/img/logo.png" alt="logo" class="w-2/5" />
      </div>

      <div class="flex flex-col p-1">
        <h1 class="text-xl font-bold">Location</h1>
        <p class="text-sm">No.10/A, Makola Road,</p>
        <p class="text-sm">Sapugaskanda</p>
      </div>

      <div class="flex flex-col">
        <h1 class="text-xl font-bold">Contact Us</h1>
        <div class="flex p-1 gap-1">
          <UIcon name="solar:call-chat-rounded-bold" class="text-xl"/>
          <p class="text-sm">+94 77 310 7099</p>
        </div>
      </div>

      <div class="flex flex-col pr-11">
        <h1 class="text-xl font-bold">Follow Us</h1>
        <UButton
          variant="ghost"
          icon="akar-icons:facebook-fill"
          color="black"
        />
      </div>
    </div>
  </div>
</template>
