import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import axios from "axios";
import router from "./router";
import VueApexCharts from "vue3-apexcharts";
import "./main.css";
import { useErrorStore } from "@/store/errorStore";


// Create Vue App
const app = createApp(App);

// Configure Plugins
app.use(createPinia()); // State Management
app.use(router); // Vue Router
app.use(VueApexCharts);

// Set Axios as a global property
app.config.globalProperties.$axios = axios;

app.config.errorHandler = (err) => {
    const errorStore = useErrorStore();
    errorStore.setError(err.message || "An unexpected error occurred.");
};

// Mount the App
app.mount("#app");
