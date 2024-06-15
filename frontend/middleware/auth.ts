import { useAuthStore } from "~/store";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  authStore.checkUser();
  console.log('Middleware: checking authentication status', authStore.isLoggedIn,authStore.token);
  if (!authStore.isLoggedIn && !authStore.role) {
    return navigateTo("/auth/employeeLogin");
  }
});
