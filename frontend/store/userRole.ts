import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    role: 0, // Store the user role
    isLoggedIn: false,
    token: null,
  }),

  actions: {
    setUser(user: any, token: string) {
      //console.log("User role: ", user);
      const userData = Array.isArray(user) ? user[0] : user;
      this.user = userData;
      this.role = userData.role_id; // Set the user role by the role_id
      this.isLoggedIn = !!userData;
      this.token = token;
      // console.log("Role: ", this.role);
      // console.log("working");
      // console.log(this.isLoggedIn);

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(this.user));
      localStorage.setItem("role", this.role.toString());
      localStorage.setItem("isLoggedIn", this.isLoggedIn.toString());
      localStorage.setItem("token", this.token);
    },
    clearUser() {
      this.user = null;
      this.role = 0;
      this.isLoggedIn = false;
      this.token = null;

      // Clear from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("token");
    },
    checkUser() {
      const user = localStorage.getItem("user");
      const role = localStorage.getItem("role");
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      const token = localStorage.getItem("token");

      if (user && role && isLoggedIn && token) {
        this.user = JSON.parse(user);
        this.role = parseInt(role);
        this.isLoggedIn = isLoggedIn === "true";
        this.token = token;
      }
    },
  },
  getters: {},
});
