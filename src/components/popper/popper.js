import Popper from "popper.js";

export default {
  inserted(el) {
    let refHover = 0;
    let popHover = 0;
    const refEle = el.$el || el;
    const popEle = el.nextElementSibling;
    if (!popEle) {
      throw new Error(
        "popper element must be next element with an element with v-popper"
      );
    }
    new Popper(refEle, popEle);

    popEle.style.visibility = "hidden";
    refEle.addEventListener("mouseenter", () => {
      refHover = 1;
      popEle.style.visibility = "visible";
    });
    refEle.addEventListener("mouseleave", () => {
      refHover = 0;
      setTimeout(() => {
        if (!popHover && !refHover) {
          popEle.style.visibility = "hidden";
        }
      }, 300);
    });
    popEle.addEventListener("mouseenter", () => {
      popHover = 1;
    });
    popEle.addEventListener("mouseleave", () => {
      popHover = 0;
      setTimeout(() => {
        if (!popHover && !refHover) {
          popEle.style.visibility = "hidden";
        }
      }, 300);
    });
  }
};
