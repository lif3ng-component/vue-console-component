<template>
  <div :class="`${prefix}-header-container`">
    <div class="logo" ref="logoPlace">
      <!-- <slot name="logo" /> -->
    </div>
    <div class="links">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: "HeaderContainer",
  mounted() {
    this.logoReLayout();
    this.linksReLayout();
  },
  updated() {
    this.logoReLayout();
    this.linksReLayout();
  },
  methods: {
    linksReLayout() {
      const { default: defaultSlots } = this.$slots;
      const parentHeight = this.$el.parentElement.clientHeight;

      if (!defaultSlots) return;
      const aTagVnodes = defaultSlots.filter(({ tag }) => tag === "a");
      aTagVnodes.forEach(
        ({ elm }) => (elm.style.lineHeight = `${parentHeight}px`)
      );
      const drowdownMenuVnodes = defaultSlots.filter(
        ({ componentOptions }) =>
          componentOptions && componentOptions.tag === `${prefix}-dropdown-menu`
      );
      drowdownMenuVnodes.forEach(({ elm }) => (elm.style.margin = 0));
    },
    logoReLayout() {
      const logoSlot = this.$slots.logo;
      const parentHeight = this.$el.parentElement.clientHeight;
      const { logoPlace } = this.$refs;

      const imgVnodes = logoSlot.filter(({ tag }) => tag === "img");
      const textVnodes = logoSlot.filter(({ text }) => text);

      logoPlace.style.lineHeight = `${parentHeight}px`;
      logoPlace.style.fontSize = `${parentHeight / 2}px`;
      const fragment = document.createDocumentFragment();
      let handleClick = null;
      let imgElement = null;
      imgVnodes.forEach(
        ({
          data: {
            attrs: { src },
            on
          }
        }) => {
          const img = document.createElement("img");
          img.setAttribute("src", src);
          fragment.appendChild(img);

          imgElement = img;
          if (on && on.click) {
            handleClick = on.click;
          }
        }
      );
      const textContent = textVnodes.map(({ text }) => text.trim()).join("");
      const span = document.createElement("span");
      span.className = "logo-text";
      span.innerHTML = textContent;
      fragment.appendChild(span);

      logoPlace.innerHTML = "";
      logoPlace.appendChild(fragment);

      if (this.lastListener) {
        logoPlace.removeEventListener("click", this.lastListener);
        logoPlace.classList.remove("can-click");
      }
      if (handleClick) {
        logoPlace.addEventListener("click", handleClick);
        logoPlace.classList.add("can-click");
        this.lastListener = handleClick;
      }
    }
  }
};
</script>
