<template>
  <div :class="`${prefix}-login-page`">
    <div :class="`${prefix}-form-container`">
      <div v-if="logoSrc" :class="`${prefix}-login-page-logo`">
        <img :src="logoSrc" />
      </div>
      <p
        v-if="logoText"
        :class="`${prefix}-login-page-logo-text`"
        v-html="logoText"
      />
      <div :class="`${prefix}-login-page-form-slot`">
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "LoginPage",
  props: {
    logoSrc: String,
    logoText: String,
    bgSrc: String,
    bgColor: String
  },
  mounted() {
    const bgImage = this.bgSrc ? `url(${this.bgSrc})` : "";
    const bgColor = this.bgColor || "";
    this.$el.style.backgroundImage = bgImage;
    this.$el.style.backgroundColor = bgColor;
  }
};
</script>
