<template>
  <div>
    <d-table-search-area
      :items="items"
      :rules="rules"
      v-model="queryObj"
      :doQueryFn="doQueryFn"
    />
    <d-pagin-table
      ref="table"
      :loadFn="loadFn"
      :columns="columns"
      :queryObj="queryObj"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      queryObj: {},
      rules:{
        s1:['required']
      },
      items: [
        { label: "s1", prop: "s1", type: "input" },
        { label: "time", prop: "time", type: "datepicker" }
      ],
      columns: [{ label: "mock response", prop: "col" }],
      doQueryFn: null
    };
  },
  mounted() {
    // can replace by mixin
    this.doQueryFn = this.$refs.table.doRequest;
  },
  methods: {
    loadFn(args) {
      return new Promise(resolve => {
        resolve({
          total: 1,
          list: [{ col: `srarch by ${JSON.stringify(args)}` }]
        });
      });
    }
  }
};
</script>
