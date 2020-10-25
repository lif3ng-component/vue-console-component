<template>
  <div>
    <div>
      <d-switch v-model="v1" />
      value: {{ v1 }}
      <d-button @click="toggleValue">toggle value</d-button>
    </div>
    <div>
      <d-switch v-model="v2" :disabled="v2Disabled" />
      disabled: {{ v2Disabled }}
      <d-button @click="toggleDisalbed">toggle disalbed</d-button>
    </div>
    <div>
      <d-switch v-model="v3" :loading="v3Loading" />
      loading: {{ v3Loading }}
      <d-button @click="toggleLoading">toggle loading</d-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      v1: true,
      v2: true,
      v2Disabled: true,
      v3: true,
      v3Loading: true
    };
  },
  methods: {
    toggleValue() {
      this.v1 = !this.v1;
    },
    toggleDisalbed() {
      this.v2Disabled = !this.v2Disabled;
    },
    toggleLoading() {
      this.v3Loading = !this.v3Loading;
    }
  }
};
</script>
<style lang="stylus" scoped>
div {
  user-select: none;
}
</style>