<template>
  <component
    :is="`${prefix}-dialog`"
    :title="title"
    @submit="handleConfirm"
    @close="handleClose"
    >{{ message }}</component
  >
</template>
<script>
export default {
  name: "Confirm",
  data() {
    return {
      title: "确认",
      message: "",
      confirmCb: null,
      closeCb: null
    };
  },
  methods: {
    setConfirmFn(fn) {
      this.confirmCb = fn;
      return {
        catch: f => this.setCloseFn(f)
      };
    },
    setCloseFn(fn) {
      this.closeCb = fn;
      return {
        then: f => this.setConfirmFn(f)
      };
    },
    handleConfirm() {
      this.confirmCb();
      this.doDestroy();
    },
    handleClose() {
      this.closeCb();
      this.doDestroy();
    },
    doDestroy() {
      this.$destroy();
      document.body.removeChild(this.$el);
    }
  }
};
</script>
