<template>
  <div>
    <d-select placeholder="default" />
    <d-select placeholder="by slot">
      <template #empty>empty slot content</template>
    </d-select>
    <d-select placeholder="by 'emptyText' prop" emptyText="empty text" />
    <d-form-area :items="items" v-model="emptyData" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      emptyData: {},
      items: [
        { prop: "a", label: "字段 A", type: "select" },
        { prop: "b", label: "Label B", type: "select" },
        {
          prop: "c",
          label: "字段 C",
          type: "select",
          emptyText: "自定义空值占位文字"
        }
      ]
    };
  }
};
</script>
<style lang="stylus" scoped>
.d-select {
  & + & {
    margin-top: 10px;
  }
}

.d-form-area {
  margin-top: 10px;
}
</style>