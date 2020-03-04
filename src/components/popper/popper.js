// import { throttle } from "lodash/fp";
import tippy from "tippy.js";
// import "tippy.js/dist/tippy.css";

export default {
  inserted(el) {
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
      flipOnUpdate: true,
      maxWidth: 10000,
      trigger: "click",
      hideOnClick: true,
      interactive: true,
      appendTo: document.body
    });
  },

  unbind({ _tippy: tippyInstance }) {
    tippyInstance.destroy();
  }
};
