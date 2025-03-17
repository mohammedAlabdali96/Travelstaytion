import { ref } from "vue";
import { useBitcoinStore } from "@/store/bitcoinStore";
import { useRoute, useRouter } from "vue-router";

export function useBitcoinData() {
  const bitcoinStore = useBitcoinStore();
  const route = useRoute();
  const router = useRouter();

  const customDateRange = ref({
    startDate: route.query.startDate || null,
    endDate: route.query.endDate || null,
  });

  const formatDate = (date) => date.toLocaleDateString("sv-SE"); // Keeps YYYY-MM-DD

  // Initialize on first load (if no query params, use last 7 days)
  const checkInitialQuery = async () => {
    await router.isReady(); // Ensure router is loaded

    if (!route.query.startDate || !route.query.endDate) {
      const today = new Date();
      const pastDate = new Date();
      pastDate.setDate(today.getDate() - 20);

      customDateRange.value = {
        startDate: formatDate(pastDate),
        endDate: formatDate(today),
      };

      //  Update URL with default range
      router.replace({ query: { ...customDateRange.value } });
    } else {
      customDateRange.value = {
        startDate: route.query.startDate,
        endDate: route.query.endDate,
      };
    }

    fetchData(); // Fetch data after setting the range
  };

  // Fetch Bitcoin data based on selected range
  const fetchData = async () => {
    const { startDate, endDate } = customDateRange.value;
    if (!startDate || !endDate) return;


    bitcoinStore.bitcoinData = [];
    await bitcoinStore.fetchBitcoin(startDate, endDate);
  };

  // Update date range and fetch new data
  const applyDateRange = ({ startDate, endDate }) => {
    console.log(startDate);
    if (!startDate || !endDate) return;

    // selecting a range longer than 49 days
    const maxRange = 49 * 24 * 60 * 60 * 1000;
    if (new Date(endDate) - new Date(startDate) > maxRange) {
      alert("You can select a maximum range of 49 days.");
      return;
    }

    //  Update state & URL
    customDateRange.value = { startDate, endDate };
    router.replace({ query: { ...customDateRange.value } });

    fetchData(); // Fetch updated data
  };

  return {
    customDateRange,
    fetchData,
    checkInitialQuery,
    applyDateRange, // Call this inside `onMounted()`
    formatDate,
  };
}
