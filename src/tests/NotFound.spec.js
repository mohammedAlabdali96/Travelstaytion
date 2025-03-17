import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import NotFound from "@/components/NotFound.vue";

describe("NotFound.vue", () => {
  it("renders the correct 404 text", () => {
    const wrapper = mount(NotFound);

    expect(wrapper.text()).toContain("404");
    expect(wrapper.text()).toContain("Oops! The page you’re looking for doesn’t exist.");
  });

  it("has a link to the homepage", async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [{ path: "/", component: {} }], // Mock home route
    });

    const wrapper = mount(NotFound, {
      global: {
        plugins: [router],
      },
    });

    const link = wrapper.find("a"); // Find the router-link
    expect(link.exists()).toBe(true);
    expect(link.attributes("href")).toBe("/");
  });
});
