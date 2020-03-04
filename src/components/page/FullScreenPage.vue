<template>
  <div :class="`${prefix}-fullscreen-page`">
    <transition name="fullscreen-container" appear>
      <div :class="`${prefix}-fullscreen-page-container`" v-if="show">
        <slot />
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "FullScreenPage",
  props: {
    bgSrc: String,
    bgColor: String,
    showPromise: {
      default: null
    }
  },
  data() {
    return {
      show: true
    };
  },
  created() {
    if (this.showPromise) {
      this.show = false;
      this.showPromise().then(() => {
        this.show = true;
      });
    }
  },
  mounted() {
    const bgImage = this.bgSrc ? `url(${this.bgSrc})` : "";
    const bgColor = this.bgColor || "";
    this.$el.style.backgroundImage = bgImage;
    this.$el.style.backgroundColor = bgColor;
  }
};
</script>
