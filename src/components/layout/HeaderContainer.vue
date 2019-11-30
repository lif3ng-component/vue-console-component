<template>
  <div :class="`${prefix}-header-container`">
    <div class="logo" ref="logoPlace">
      <slot name="logo" />
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
    const parentHeight = this.$el.parentElement.clientHeight;
    const { default: defaultSlots } = this.$slots;
    const { logoPlace } = this.$refs;
    logoPlace.style.lineHeight = `${parentHeight}px`;
    logoPlace.style.fontSize = `${parentHeight / 2}px`;
    const aTagVnodes = defaultSlots.filter(({ tag }) => tag === "a");
    aTagVnodes.forEach(
      ({ elm }) => (elm.style.lineHeight = `${parentHeight}px`)
    );
    const drowdownMenuVnodes = defaultSlots.filter(
      ({ componentOptions }) =>
        componentOptions && componentOptions.tag === `${prefix}-dropdown-menu`
    );
    drowdownMenuVnodes.forEach(({ elm }) => (elm.style.margin = 0));
    const logoTextArr = [];
    Array.from(logoPlace.childNodes).forEach(node => {
      const { nodeName, textContent } = node;
      if (nodeName === "#text") {
        logoTextArr.push(textContent.trim());
        node.remove();
      }
    });
    if (logoTextArr.length > 0) {
      const newSpan = document.createElement("span");
      newSpan.innerHTML = logoTextArr.join("");
      newSpan.className = "logo-text";
      logoPlace.appendChild(newSpan);
    }
  },
  data() {
    return {
      prefix
    };
  }
};
</script>
