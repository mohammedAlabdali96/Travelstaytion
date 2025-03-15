import { defineStore } from "pinia";
import { getBitcoinHistoricalData } from "@/api/cryptoAPI";

export const useBitcoinStore = defineStore("bitcoin", {
  state: () => ({
    bitcoinData: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchBitcoin(start, end) {
      this.loading = true;
      this.error = null;
      try {
        const data = await getBitcoinHistoricalData(start, end);
        if (data) {
          this.bitcoinData = data;
        } else {
          this.error = "Failed to fetch Bitcoin data";
        }
      } catch (err) {
        this.error = "Error fetching Bitcoin data";
      } finally {
        this.loading = false;
      }
    },
  },
});
