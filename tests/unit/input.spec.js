import { shallowMount } from "@vue/test-utils";
import Input from "@/components/form/Input";
it("render success", () => {
  const wrapper = shallowMount(Input);
  expect(wrapper.html()).toMatchInlineSnapshot(
    `<div class="t-input"><input spellcheck="false" class="t-input-inner"></div>`
  );
});
