import { mount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";
import { useErrorStore } from "@/store/errorStore";
import GlobalError from "@/components/GlobalError.vue";

describe("GlobalError.vue", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("displays the error message when an error exists", () => {
    const errorStore = useErrorStore();
    errorStore.setError("Test Error Message");

    const wrapper = mount(GlobalError);

    expect(wrapper.text()).toContain("Error");
    expect(wrapper.text()).toContain("Test Error Message");
  });

  it("hides when no error is set", () => {
    const errorStore = useErrorStore();
    errorStore.clearError(); // Ensure no error is set

    const wrapper = mount(GlobalError);

    expect(wrapper.find(".error-overlay").exists()).toBe(false);
  });

  it("clears the error when dismiss button is clicked", async () => {
    const errorStore = useErrorStore();
    errorStore.setError("Another Error");

    const wrapper = mount(GlobalError);
    const button = wrapper.find("button");

    await button.trigger("click"); // Simulate button click

    expect(errorStore.globalError).toBe(null);
  });
});
