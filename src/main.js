import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia"; // Pinia for State Management
import axios from "axios"; // Axios for API Calls
import router from "./router"; // Vue Router (will be created next)
import VueApexCharts from "vue3-apexcharts";
import "./main.css";

// Create Vue App
const app = createApp(App);

// Configure Plugins
app.use(createPinia()); // State Management
app.use(router); // Vue Router
app.use(VueApexCharts);

// Set Axios as a global property (optional)
app.config.globalProperties.$axios = axios;

// Mount the App
app.mount("#app");
