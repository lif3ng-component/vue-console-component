import Popper from "popper.js";
import { throttle } from "lodash/fp";

const refPopMap = new Map();
const refPopperMap = new Map();
export default {
  inserted(el, { value }) {
    // let refHover = 0;
    // let popHover = 0;
    const refEle = el.$el || el;
    const popEle = el.nextElementSibling;

    refPopMap.set(refEle, popEle);
    if (!popEle) {
      throw new Error(
        "popper element must be next element with an element with v-popper"
      );
    }

    if (el.getAttribute("popper-style") && !popEle.getAttribute("style")) {
      popEle.setAttribute("style", el.getAttribute("popper-style"));
    }
    if (el.getAttribute("popper-class")) {
      // console.log(el, el.getAttribute("popper-class"));
      popEle.classList.add(el.getAttribute("popper-class"));
    }
    setTimeout(() => {
      document.body.append(popEle);
      instance.scheduleUpdate();
    }, 500);

    const handleUpdate = ({ instance: { reference, popper } }) => {
      if (value === "select") {
        popper.style.width = window.getComputedStyle(reference).width;
      }
      instance.scheduleUpdate();
    };
    const instance = new Popper(refEle, popEle, {
      positionFixed: true,
      placement: value === "bottom-end" ? value : "bottom-start",
      modifiers: {
        offset: "10, 10"
      },
      onCreate({ instance: { reference, popper } }) {
        refPopperMap.set(reference, instance);
        if (value === "select") {
          popper.style.background = window.getComputedStyle(
            reference.querySelector("input")
          ).background;
          popper.style.width = window.getComputedStyle(reference).width;
        }
      },
      onUpdate: throttle(100, handleUpdate)
    });

    // popEle.style.visibility = "hidden";

    const show = () => {
      instance.update();
      // instance.enableEventListeners();
      popEle.style.visibility = "visible";

      refEle.removeEventListener("click", show);
      setTimeout(() => {
        document.body.addEventListener("click", hide);
      }, 10);
    };
    const hide = () => {
      // instance.disableEventListeners();

      popEle.style.visibility = "hidden";
      document.body.removeEventListener("click", hide);
      setTimeout(() => {
        if (!refEle.getAttribute("disabled")) {
          refEle.addEventListener("click", show);
        }
      }, 10);
    };

    hide();
    // if (!refEle.getAttribute("disabled")) {
    //   refEle.addEventListener("click", show);
    // }

    // refEle.addEventListener("mouseenter", () => {
    //   refHover = 1;
    //   popEle.style.visibility = "visible";
    // });
    // refEle.addEventListener("mouseleave", () => {
    //   refHover = 0;
    //   setTimeout(() => {
    //     if (!popHover && !refHover) {
    //       popEle.style.visibility = "hidden";
    //     }
    //   }, 300);
    // });
    // popEle.addEventListener("mouseenter", () => {
    //   popHover = 1;
    // });
    // popEle.addEventListener("mouseleave", () => {
    //   popHover = 0;
    //   setTimeout(() => {
    //     if (!popHover && !refHover) {
    //       popEle.style.visibility = "hidden";
    //     }
    //   }, 300);
    // });
  },
  unbind(el) {
    const popEle = refPopMap.get(el);
    if (popEle.isConnected) {
      document.body.removeChild(popEle);
    }
    const popperInstance = refPopperMap.get(el);
    popperInstance.destroy();
  }
};
