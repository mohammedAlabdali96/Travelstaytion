<template>
  <div>
    <h2 class="text-xl font-bold text-center">Bitcoin Price Chart</h2>

    <LoadingSpinner v-if="bitcoinStore.loading" />


    <apexchart
      v-if="series.length && !bitcoinStore.loading"
      type="area"
      height="350"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useBitcoinStore } from "@/store/bitcoinStore";
import LoadingSpinner from "@/components/LoadingSpinner.vue";



const bitcoinStore = useBitcoinStore();
const series = ref([]);

const chartOptions = ref({
  chart: {
    type: "area",
    stacked: false,
    height: 350,
    zoom: {
      type: "x",
      enabled: true,
      autoScaleYaxis: true,
    },
    toolbar: {
      autoSelected: "zoom",
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      inverseColors: false,
      opacityFrom: 0.4,
      opacityTo: 0.7,
      stops: [0, 90, 100],
    },
  },
  markers: {
    size: 0,
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: [],
    labels: {
      show: window.innerWidth > 900,
      hideOverlappingLabels: true,
      showDuplicates: false,
      trim: true,
    },
    tickAmount: "dataPoints",
  },
  yaxis: {
    labels: {
      formatter: (value) => value.toFixed(2),
      style: { colors: "#888", fontSize: "12px" },
    },
    tickAmount: 6,
  },
  grid: { borderColor: "#E5E5E5", strokeDashArray: 3 },
});

watch(
  () => bitcoinStore.bitcoinData,
  (data) => {

    if (data.length) {
      const formattedDates = data.map((d) => {
        if (!d.TIMESTAMP || isNaN(Number(d.TIMESTAMP))) return "N/A";

        const timestamp = Number(d.TIMESTAMP) * 1000;
        return new Date(timestamp).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
        });
      });

      chartOptions.value = {
        ...chartOptions.value,
        xaxis: {
          ...chartOptions.value.xaxis,
          categories: formattedDates,
        },
      };

      series.value = [
        { name: "Bitcoin Price (USD)", data: data.map((d) => d.CLOSE ?? 0) },
      ];
    }
  },
  { deep: true, flush: "post" }
);
</script>
