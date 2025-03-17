import { mount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";
import { useFakeUserStore } from "@/store/fakeUserStore";
import NavBar from "@/components/Navbar.vue";

describe("NavBar.vue", () => {
  beforeEach(() => {
    // Initialize Pinia
    setActivePinia(createPinia());
  });

  it("displays user information correctly", () => {
    const fakeUser = useFakeUserStore();

    // Mock fake user data
    fakeUser.user = {
      name: "John Doe",
      jobTitle: "Software Engineer",
      avatar: "https://example.com/avatar.jpg",
    };

    const wrapper = mount(NavBar);

    expect(wrapper.text()).toContain("John Doe");
    expect(wrapper.text()).toContain("Software Engineer");

    // Ensure avatar is displayed correctly
    const img = wrapper.find("img");
    expect(img.exists()).toBe(true);
    expect(img.attributes("src")).toBe("https://example.com/avatar.jpg");
  });

  it("calls refreshUser when Refresh button is clicked", async () => {
    const fakeUser = useFakeUserStore();
    fakeUser.refreshUser = jest.fn(); // Mock function

    const wrapper = mount(NavBar);
    const button = wrapper.find("button");

    await button.trigger("click"); // Simulate button click

    expect(fakeUser.refreshUser).toHaveBeenCalled();
  });
});
