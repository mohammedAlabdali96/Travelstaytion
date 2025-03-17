import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import NotFound from "@/components/NotFound.vue";

const routes = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
