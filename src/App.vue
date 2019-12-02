<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <p-pagination :total="88" :current-page.sync="page" />
    <p-pagin-table :columns="columns" :loadFn="this.loadHandler" />
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      page: 1,
      columns: [
        {
          prop: "c1",
          label: "column1"
        },
        // {
        //   prop: "link",
        //   label: "some link",
        //   link:true,
        //   template:'{{c1}}'
        // },
        {
          prop: "oper",
          label: "oper"
        }
      ]
    };
  },
  methods: {
    loadHandler({ page, size }) {
      console.log("loadHandler", { page, size });
      let list;
      // mock data
      const total = 33;
      if (page * size < total) {
        // 有内容，不是末页
        list = Array.from({ length: size }).map((_, i) => ({
          c1: (page - 1) * size + i + 1
        }));
      } else {
        list = Array.from({ length: total % size }).map((_, i) => ({
          c1: (page - 1) * size + i + 1
        }));
      }
      return Promise.resolve({ total, list });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
