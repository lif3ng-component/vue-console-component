<template>
  <d-select v-model="value" :optionList="optionList" placeholder="abc" />
</template>
<script>
export default {
  data() {
    return {
      value: "",
      list: [],
      optionList: () => this.list
    };
  },
  mounted() {
    setTimeout(() => {
      this.list = [
        { id: 1, name: "label 1" },
        { id: 2, name: "label 2" }
      ];
    }, 1000);
  }
};
</script>
