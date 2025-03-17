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

onMounted(async () => {
  await checkInitialQuery();
});

</script>
