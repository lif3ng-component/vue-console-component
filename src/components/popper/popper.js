// import { throttle } from "lodash/fp";
import tippy from "tippy.js/headless";
// import "tippy.js/dist/tippy.css";

export default {
  inserted(el, { value = {} }) {
    const { preset, ...options } = value;
    const presetMap = {
      dropdown: { hideOnClick: true },
      tooltip: {}
    };
    const refEle = el.$el || el;
    const popEle = el.nextElementSibling;

    if (!popEle) {
      throw new Error(
        "popper element must be next element with an element with v-popper"
      );
    }

    if (el.getAttribute("popper-style") && !popEle.getAttribute("style")) {
      popEle.setAttribute("style", el.getAttribute("popper-style"));
    }
    if (el.getAttribute("popper-class")) {
      popEle.classList.add(el.getAttribute("popper-class"));
    }

    // const refEleHeight = window.getComputedStyle(refEle).height;
    tippy(refEle, {
      content: popEle,
      // distance: -10,
      duration: 0,
      offset: 0,
      // offset: `0, -1`, //${refEleHeight}`,
      placement: "bottom-start",
      maxWidth: 10000,
      trigger: "click",
      hideOnClick: true,
      interactive: true,
      appendTo: document.body,
      render() {
        const box = document.createElement("div");
        box.append(popEle);
        return {
          popper: box
        };
      },

      ...(preset ? presetMap[preset] : {}),
      ...options
    });
  },

  unbind({ _tippy: tippyInstance }) {
    tippyInstance.destroy();
  }
};
