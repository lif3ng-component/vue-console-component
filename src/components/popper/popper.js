import Popper from "popper.js";

export default {
  inserted(el, { value }) {
    // let refHover = 0;
    // let popHover = 0;
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
      // console.log(el, el.getAttribute("popper-class"));
      popEle.classList.add(el.getAttribute("popper-class"));
    }
    setTimeout(() => {
      document.body.append(popEle);
      instance.scheduleUpdate();
    }, 500);
    const instance = new Popper(refEle, popEle, {
      positionFixed: true,
      placement: value === "bottom-end" ? value : "bottom-start",
      modifiers: {
        offset: "10, 10"
      },
      onCreate({ instance: { reference, popper } }) {
        if (value === "select") {
          popper.style.background = window.getComputedStyle(
            reference.querySelector("input")
          ).background;
          popper.style.width = window.getComputedStyle(reference).width;
        }
      },
      onUpdate({ instance: { reference, popper } }) {
        if (value === "select") {
          popper.style.width = window.getComputedStyle(reference).width;
        }
        instance.scheduleUpdate();
      }
    });

    popEle.style.visibility = "hidden";

    const show = () => {
      popEle.style.visibility = "visible";

      refEle.removeEventListener("click", show);
      setTimeout(() => {
        document.body.addEventListener("click", hide);
      }, 10);
    };
    const hide = () => {
      popEle.style.visibility = "hidden";
      document.body.removeEventListener("click", hide);
      setTimeout(() => {
        refEle.addEventListener("click", show);
      }, 10);
    };

    refEle.addEventListener("click", show);

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
  }
};
