<script setup></script>

<template>
  <header class="w-full bg-bkg-secondary">
    <AppHeader class="fixed opacity-90" />
  </header>

  <main class="w-full bg-bkg-secondary flex flex-1 flex-col">
    <div class="w-full h-[500px] overflow-hidden">
      <slot />
    </div>
    <div class="p-3">
      <div class="w-full flex min-h-screen bg-bkg-primary">
        <!-- <slot name="content" /> -->
      </div>
    </div>
  </main>

  <footer class="w-full bg-bkg-secondary">
    <AppFooter />
  </footer>
</template>
