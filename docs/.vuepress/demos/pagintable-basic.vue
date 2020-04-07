<template>
  <div>
    <d-pagin-table :columns="columns" :loadFn="loadFn" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          prop: "c1",
          label: "c1",
          sort: true,
        },
        {
          prop: "c2",
          label: "c2",
          sort: true,
          sortProp: "c2.custom.name",
        },
      ],
    };
  },
  methods: {
    loadFn({ page, size, ...args }) {
      console.log(args);
      let list;
      // mock data
      const total = 33;
      if (page * size < total) {
        // 有内容，不是末页
        list = Array.from({ length: size }).map((_, i) => ({
          c1: (page - 1) * size + i + 1,
        }));
      } else {
        list = Array.from({ length: total % size }).map((_, i) => ({
          c1: (page - 1) * size + i + 1,
        }));
      }
      return Promise.resolve({ total, list });
    },
  },
};
</script>
