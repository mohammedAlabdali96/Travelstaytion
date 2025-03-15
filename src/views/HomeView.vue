<template>
  <div class="container mx-auto p-6">
    <DateRangePicker />
    <BitcoinChart />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useBitcoinData } from "@/composables/useBitcoinData";
import BitcoinChart from "@/components/BitcoinChart.vue";
import DateRangePicker from "@/components/DateRangePicker.vue";

const { checkInitialQuery } = useBitcoinData();

// ✅ Wait for Router Ready & Check Query Before Fetching Data
onMounted(async () => {
  await checkInitialQuery();
});

// ✅ Handle Date Selection & Update URL
</script>
