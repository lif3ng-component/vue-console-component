import { createLocalVue } from "@vue/test-utils";

import lib from "@/lib";

let localVue;
beforeEach(() => {
  localVue = createLocalVue();
});

describe("select options value", () => {
  it("selectOptionsMap basic", () => {
    localVue.use(lib, {
      selectOptionsMap: {
        oneType: [
          { value: "v1", label: "l1" },
          { value: "v2", label: "l2" }
        ]
      }
    });

    expect(localVue.prototype.$SELECT_OTPIONS_MAP).toEqual({
      oneType: [
        { id: "v1", name: "l1" },
        { id: "v2", name: "l2" }
      ]
    });
  });

  it("selectOptionsMap with selectLabelName", () => {
    localVue.use(lib, {
      selectLabelName: "label",
      selectOptionsMap: {
        oneType: [
          { value: "v1", label: "l1" },
          { value: "v2", label: "l2" }
        ]
      }
    });

    expect(localVue.prototype.$SELECT_OTPIONS_MAP).toEqual({
      oneType: [
        { id: "v1", label: "l1" },
        { id: "v2", label: "l2" }
      ]
    });
  });

  it("selectOptionsMap with selectValueName", () => {
    localVue.use(lib, {
      selectValueName: "value",
      selectOptionsMap: {
        oneType: [
          { value: "v1", label: "l1" },
          { value: "v2", label: "l2" }
        ]
      }
    });

    expect(localVue.prototype.$SELECT_OTPIONS_MAP).toEqual({
      oneType: [
        { value: "v1", name: "l1" },
        { value: "v2", name: "l2" }
      ]
    });
  });

  it("selectOptionsMap with selectValueName marge to mapstring (different key)", () => {
    localVue.use(lib, {
      selectValueName: "value",
      stringMap: {
        anotherType: {
          kk1: "vv1"
        }
      },
      selectOptionsMap: {
        oneType: [
          { value: "v1", label: "l1" },
          { value: "v2", label: "l2" }
        ]
      }
    });

    expect(localVue.prototype.$STRING_MAP).toEqual({
      anotherType: {
        kk1: "vv1"
      },
      oneType: {
        v1: "l1",
        v2: "l2"
      }
    });
  });

  it("selectOptionsMap with selectValueName marge to mapstring (same key)", () => {
    localVue.use(lib, {
      selectValueName: "value",
      stringMap: {
        oneType: {
          kk1: "vv1"
        }
      },
      selectOptionsMap: {
        oneType: [
          { value: "v1", label: "l1" },
          { value: "v2", label: "l2" }
        ]
      }
    });

    expect(localVue.prototype.$STRING_MAP).toEqual({
      oneType: {
        kk1: "vv1"
      }
    });
  });
});
