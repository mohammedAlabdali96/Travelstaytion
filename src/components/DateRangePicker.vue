<template>
  <div>
    <div class="flex flex-col items-center justify-center gap-4 my-4">
      <CDateRangePicker
        v-model:start-date="vStartDate"
        v-model:end-date="vEndDate"
        :max-date="today"
        :no-cancel="true"
      />

      <button
        @click="applyDateSelection"
        :disabled="!dateChanged"
        class="px-4 py-2 rounded-md"
        :class="
          dateChanged
            ? 'bg-blue-500 text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        "
      >
        Apply
      </button>
      <h3>
        The chart date for bitcoin from
        <strong>{{ route.query.startDate }}</strong> to
        <strong>{{ route.query.endDate }}</strong>
      </h3>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { CDateRangePicker } from "@coreui/vue-pro";
import { useBitcoinData } from "@/composables/useBitcoinData";
import { useRoute } from "vue-router";
import "@coreui/coreui-pro/dist/css/coreui.min.css";

const { applyDateRange, formatDate } = useBitcoinData();
const route = useRoute();

// Helper function to parse date strings into Date objects
const parseDate = (dateString) => (dateString ? new Date(dateString) : null);

// Ensure `vStartDate` and `vEndDate` are Date objects
const today = new Date();
const vStartDate = ref(parseDate(route.query.startDate));
const vEndDate = ref(parseDate(route.query.endDate));
const subtitle = ref("the chart data for the last 7 days");

// Compute if dates have changed
const dateChanged = computed(() => {
  return (
    vStartDate.value &&
    vEndDate.value &&
    (formatDate(vStartDate.value) !== route.query.startDate ||
      formatDate(vEndDate.value) !== route.query.endDate)
  );
});

// Apply selected date range
const applyDateSelection = () => {
  console.log(formatDate(vStartDate.value));

  console.log(vStartDate.value);
  if (vStartDate.value && vEndDate.value) {
    applyDateRange({
      startDate: formatDate(vStartDate.value), // Convert back to YYYY-MM-DD format
      endDate: formatDate(vEndDate.value),
    });
  }

  subtitle.value = "the chart data for your custom dates";
};
</script>
