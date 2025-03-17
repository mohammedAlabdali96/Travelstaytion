import { defineStore } from "pinia";

export const useErrorStore = defineStore("error", {
  state: () => ({
    globalError: null,
  }),
  actions: {
    setError(message) {
      console.log("Error:", message);
      this.globalError = message;
    },
    clearError() {
      this.globalError = null;
    },
  },
});
