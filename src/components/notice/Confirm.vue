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
      resolve: null,
      reject: null
    };
  },
  methods: {
    handleConfirm() {
      this.resolve();
      this.doDestroy();
    },
    handleClose() {
      this.reject();
      this.doDestroy();
    },
    doDestroy() {
      this.$destroy();
      document.body.removeChild(this.$el);
    }
  }
};
</script>
