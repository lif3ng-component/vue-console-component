<template>
  <div>
    通过 <strong>函数</strong> 设置 className, style
    <d-table
      :columns="columns"
      :data="data1"
      :row-class-name="rowClassFn1"
      :row-style="rowStyleFn1"
    />
    通过 <strong>常量值</strong> 设置 className, style
    <d-table
      :columns="columns"
      :data="data2"
      row-class-name="row-color-blue"
      :row-style="{ background: 'lightgray' }"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: [{ prop: "text", label: "行样式" }],
      data1: [
        { text: "没样式" },
        { text: "通过 row-style 传入 函数 设置红字", styleTargetColumn: true },
        {
          text: "通过 row-class-name 传入 函数 设置蓝字",
          classTargetColumn: true,
        },
      ],
      data2: [
        { text: "每行相同行样式" },
        { text: "每行相同行样式" },
        { text: "每行相同行样式" },
      ],
    };
  },
  methods: {
    rowClassFn1({ row: { classTargetColumn }, rowIndex }) {
      console.log({ rowIndex, classTargetColumn });
      return classTargetColumn ? "row-color-blue" : "";
    },
    rowStyleFn1({ row: { styleTargetColumn }, rowIndex }) {
      console.log({ rowIndex, styleTargetColumn });
      return styleTargetColumn ? { color: "red" } : {};
    },
  },
};
</script>
<style lang="stylus" scoped>
div
  >>> .row-color-blue
    color blue
</style>
