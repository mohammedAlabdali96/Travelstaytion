import { mount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue"; // Ensure correct path

describe("HelloWorld.vue", () => {
  it("renders the correct message from props", () => {
    const wrapper = mount(HelloWorld, {
      props: { msg: "Hello, Jest!" },
    });

    expect(wrapper.text()).toContain("Hello, Jest!");
  });
});
