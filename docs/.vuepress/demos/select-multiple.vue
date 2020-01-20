<template>
  <div>
    <d-select
      multiple
      v-model="value"
      :optionList="optionList"
      placeholder="abc"
    />
    value: {{ value }}
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: [],
      optionList: [
        { id: 1, name: "label 1" },
        { id: 2, name: "label 2" }
      ]
    };
  }
};
</script>
