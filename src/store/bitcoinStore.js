import { defineStore } from "pinia";
import { getBitcoinHistoricalData } from "@/api/cryptoAPI";
import { useErrorStore } from "@/store/errorStore";

export const useBitcoinStore = defineStore("bitcoin", {
  state: () => ({
    bitcoinData: [],
    loading: false,
  }),
  actions: {
    async fetchBitcoin(start, end) {
      this.loading = true;
      const errorStore = useErrorStore();
      errorStore.clearError();

      try {
        this.bitcoinData = await getBitcoinHistoricalData(start, end);
      } catch (error) {
        errorStore.setError(error.message || "Error fetching Bitcoin data");
      } finally {
        this.loading = false;
      }
    },
  },
});
