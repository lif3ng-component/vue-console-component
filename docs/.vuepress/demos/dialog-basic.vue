<template>
  <div>
    <d-button @click="dialogVisible = true">show dialog</d-button>
    <d-dialog
      title="test dialog"
      v-if="dialogVisible"
      @submit="handleSubmit"
      @close="handleClose"
      >some text</d-dialog
    >
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false
    };
  },
  methods: {
    handleClose() {
      console.log("handleClose");
      this.dialogVisible = false;
    },
    handleSubmit() {
      console.log("handleSubmit");
      this.handleClose();
    }
  }
};
</script>
