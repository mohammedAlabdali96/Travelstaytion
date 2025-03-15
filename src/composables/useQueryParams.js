import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

export function useQueryParams() {
  const route = useRoute();
  const router = useRouter();

  // ✅ Reactive Query Parameters
  const queryParams = ref({});

  // ✅ Function to Update the Query Params in URL
  const updateQueryParams = (newParams) => {
    router.replace({ query: { ...route.query, ...newParams } });
  };

  // ✅ Ensure Router is Ready Before Setting Query Params
  onMounted(async () => {
    await router.isReady(); // ✅ Ensures query params are available
    queryParams.value = { ...route.query };
  });

  // ✅ Watch for URL Changes & Update `queryParams`
  watch(
    () => route.query,
    (newQuery) => {
      queryParams.value = { ...newQuery };
    },
    { deep: true }
  );

  return {
    queryParams, // ✅ Reactive query params (Always up-to-date)
    updateQueryParams, // ✅ Function to update URL params
  };
}
