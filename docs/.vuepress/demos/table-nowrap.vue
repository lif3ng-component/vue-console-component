<template>
  <div>
    <d-button @click="cycleData">{{ toggleDataBtnText }}</d-button>
    <d-table :key="key" :columns="columns" :data="data" />
  </div>
</template>
<script>
// RowDataCycle 自定义迭代器，用于模拟表格数据状态轮转
// index
// 0: []
// 1: [{short item}]
//    asc -> 2
//    desc -> 0
// 2: [{long item}]

class RowDataCycle {
  constructor() {
    this.dir = "asc";
    this.data = [];
    this.index = 0;
  }
  next() {
    const done = false;
    if (this.index === 0) {
      this.data = [
        { col1: "abc" },
        { col2: "456" },
        {
          col3:
            "too long text content. aaa bbb ccc ddd eee fff ggg hhh iii jjj.",
        },
        { col4: "short" },
      ];
      this.index++; // 1
    } else if (this.index === 1 && this.dir === "asc") {
      Object.assign(this.data, {
        0: { col1: "123 abc def xxx" },
        1: { col2: "456 ghi kl; xxx" },
      });
      this.index++; //2
    } else if (this.index === 1 && this.dir === "desc") {
      this.data = [];
      this.index--; //0
    } else if (this.index === 2) {
      Object.assign(this.data, { 0: { col1: "123" }, 1: { col2: "456" } });
      this.index--;
    }

    if (this.index === 0) {
      this.dir = "asc";
    } else if (this.index === 2) {
      this.dir = "desc";
    }

    return {
      done,
      value: { dir: this.dir, data: this.data, index: this.index },
    };
  }
  [Symbol.iterator]() {
    return this;
  }
}
export default {
  data() {
    const dataCycle = new RowDataCycle();
    const { data, dir, index } = dataCycle;
    return {
      key: 0,
      data,
      dataCycleDir: dir,
      dataCycleIndex: index,
      dataCycle,
      columns: [
        { prop: "col1", label: "nowrap1", sort: true, noWrap: true },
        { prop: "col2", label: "noWrap2", noWrap: true },
        { prop: "col3", label: "normal1" },
        { prop: "col4", label: "noWrap last", noWrap: true },
      ],
    };
  },
  methods: {
    cycleData() {
      const {
        value: { data, dir, index },
      } = this.dataCycle.next();
      this.data.splice(0, 4, ...data);
      this.dataCycleDir = dir;
      this.dataCycleIndex = index;
    },
  },
  computed: {
    toggleDataBtnText() {
      switch (this.dataCycleIndex) {
        case 0:
          return "加载数据";
        case 1:
          if (this.dataCycleDir === "asc") {
            return "noWrap 列变宽";
          }
          return "清空数据";
        case 2:
          return "noWrap 列变窄";
        default:
          return "error";
      }
    },
  },
};
</script>
