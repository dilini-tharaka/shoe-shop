import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    role: 0, // Store the user role
    isLoggedIn: false,
  }),

  actions: {
    setUser(user: any) {
      //console.log("User role: ", user);
      const userData = Array.isArray(user) ? user[0] : user;
      this.user = userData;
      this.role = userData.role_id; // Set the user role by the role_id
      this.isLoggedIn = !!userData;
      // console.log("Role: ", this.role);
      console.log("working");
      console.log(this.isLoggedIn);
    },
    clearUser() {
      this.user = null;
      this.role = 0;
      this.isLoggedIn = false;
    },
  },
  getters: {
    
  },
});
