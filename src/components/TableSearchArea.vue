<template>
  <component
    :key="key"
    :class="`${prefix}-table-search-area`"
    :is="`${prefix}-form-area`"
    v-model="value"
    v-bind="$props"
  >
    <component :is="`${prefix}-button-area`">
      <component :is="`${prefix}-button`" type="primary" @click="handleSubmit"
        >搜索</component
      >
      <component :is="`${prefix}-button`" @click="handleReset">重置</component>
    </component>
  </component>
</template>
<script>
import { formCollectMixin } from "@/mixins/formMixins";
export default {
  name: "TableSearchArea",
  mixins: [formCollectMixin],
  props: ["value", "items", "doQueryFn", "rules"],
  model: { prop: "value", event: "change" },
  data() {
    return { key: 0 };
  },
  methods: {
    handleSubmit() {
      this.formValidate().then(() => {
        this.doQueryFn(true);
      });
    },
    handleReset() {
      this.$emit("change", {}); // todo: custom init empty value
      this.$nextTick(() => {
        this.handleSubmit();
        this.key += 1;
      });
    }
  }
};
</script>
