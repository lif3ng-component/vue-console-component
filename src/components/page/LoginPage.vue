<template>
  <component
    :is="`${prefix}-full-screen-page`"
    :class="`${prefix}-login-page`"
    :bgSrc="bgSrc"
    :bgColor="bgColor"
    :showPromise="showPromise"
  >
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
  </component>
</template>
<script>
export default {
  name: "LoginPage",
  props: {
    logoSrc: String,
    logoText: String,
    bgSrc: String,
    bgColor: String,
    showPromise: {
      default: null
    }
  }
};
</script>
