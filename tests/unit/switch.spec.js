import { shallowMount } from "@vue/test-utils";
import Switch from "@/components/form/Switch";

Object.assign(Switch, { name: "TSwitch" });

it("render", () => {
  const wrapper = shallowMount(Switch);
  expect(wrapper.html()).toMatchInlineSnapshot(`
    <label class="t-switch"><input type="checkbox">
      <div class="t-switch-wrapper"></div>
    </label>
  `);
});

it("render on", () => {
  const wrapper = shallowMount(Switch, {
    propsData: { value: true }
  });
  expect(wrapper.find("div").classes("enable")).toBe(true);
});

it("render off", () => {
  const wrapper = shallowMount(Switch, {
    propsData: { value: false }
  });
  expect(wrapper.find("div").classes("enable")).toBe(false);
});

// it("on -> off", () => {
//   const wrapper = shallowMount(Switch, {
//     propsData: { value: true }
//   });
//   wrapper.find("input").setChecked(false);
//   wrapper.find("input").trigger("change");
//   console.log(wrapper.vm.value);
// });
