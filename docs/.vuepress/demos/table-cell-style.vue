<template>
  <div>
    通过 <strong>函数</strong> 设置 className, style
    <d-table
      :columns="columns"
      :data="data"
      :cell-class-name="cellClassFn"
      :cell-style="cellStyleFn"
    />
    通过 <strong>常量值</strong> 设置 className, style
    可以使用，目前没有想到必要的业务场景，不在 Demo 中演示。
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        { prop: "index", label: "index", template: "{{index}}", width: "50px" },
        { prop: "gray", label: "灰色列", template: "这列是灰色" },
        { prop: "count", label: "根据值显示" },
      ],

      data: [
        { text: "每行相同行样式", count: 6 },
        { text: "每行相同行样式" },
        { text: "每行相同行样式" },
        { text: "每行相同行样式", count: 3 },
      ],
    };
  },
  methods: {
    cellClassFn({ prop, ...args }) {
      console.log({ prop, ...args });
      return prop === "gray" ? "row-color-gray" : "";
    },
    cellStyleFn({ row: { count }, prop, ...args }) {
      console.log({ args });
      return prop === "count" && count
        ? {
            background: "green",
            color: "#fff",
            fontSize: "30px",
            fontWidth: 600,
          }
        : {};
    },
  },
};
</script>
<style lang="stylus" scoped>
div
  >>> .row-color-gray
    background gray
    color #eee
    border-right 10px solid #abc
</style>
