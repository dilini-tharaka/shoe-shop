import { useAuthStore } from "~/store";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  console.log('Middleware: checking authentication status', authStore.isLoggedIn);
  if (!authStore.isLoggedIn) {
    return navigateTo("/auth/employeeLogin");
  }
});
