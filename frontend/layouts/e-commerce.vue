<script setup></script>

<template>
  <header class="w-full bg-bkg-secondary">
    <AppHeader class="fixed opacity-90" />
  </header>

  <main class="w-full bg-bkg-secondary flex flex-1 flex-col">
    <div class="w-full flex h-[600px]">
      <slot name="hero"></slot>
    </div>
    <div class="p-3">
      <div class="w-full flex flex-wrap min-h-screen bg-bkg-primary p-5 gap-10">
        <slot name="content"></slot>
      </div>
    </div>
  </main>

  <footer class="w-full bg-bkg-secondary">
    <AppFooter />
  </footer>
</template>
