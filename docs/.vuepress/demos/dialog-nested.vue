<template>
  <div>
    <d-button @click="dialogVisible = true">show dialog</d-button>
    <d-dialog
      title="dialog 1"
      v-if="dialogVisible"
      @submit="handleSubmit"
      @close="handleClose"
      >click to show dialog 2<br /><br />
      <d-button @click="dialogVisible2 = true">show dialog</d-button>
      <d-dialog
        title="dialog 2"
        v-if="dialogVisible2"
        @close="dialogVisible2 = false"
        >dialog 2</d-dialog
      >
    </d-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      dialogVisible2: false
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
