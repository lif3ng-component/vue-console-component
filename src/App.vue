<template>
  <div id="app">
    <p-button @click="dialogVisible = true">dialog</p-button>
    <p-dialog
      ref="dialog"
      v-if="dialogVisible"
      title="title xx"
      @submit="handleSubmit"
      @close="dialogVisible = false"
    >
      <p-form-area
        no-border
        v-model="form"
        :rules="rules"
        :items="dymFormItems"
      />
    </p-dialog>
    <img alt="Vue logo" src="./assets/logo.png" />
    <p-input icon-before="close" />
    <p-input icon-after="close" />
    <!-- <p-pagination
      :total="88"
      :current-page.sync="page"
      :size-options="[4, 5, 6]"
    />
    <p-pagination
      :total="88"
      :current-page.sync="page"
      :size-options="[5, 10, 15]"
      :size="10"
    /> -->
    <p-table-header>
      <!-- <p-button>aaa</p-button> -->
      some text
      <p-search-input
        placeholder="some text"
        v-model="queryObj.q"
        @submit="doQueryFn(true)"
      />
    </p-table-header>
    <p-pagin-table
      :columns="columns"
      :queryObj="queryObj"
      :pagin-size-options="[10, 20, 5]"
      :loadFn="this.loadHandler"
    >
      <template #col-oper="{row:{c1}}">--{{ c1 }}</template>
    </p-pagin-table>

    <p-form-area>xx</p-form-area>
    <p-form-area
      :items="areaItems"
      v-model="areaData"
      :rules="{ a: ['required'], c: ['required'] }"
    />
    <!-- <a v-popper>x</a>
    <p-dropdown-menu :items="[{ text: 'xx' }]" /> -->
    <p-input />
    <p-select preset="preset1" :optionList="optionList" v-model="selectV2" />
    <!-- <p-dialog>
      <p-form-area
        no-border
        :items="areaItems"
        v-model="areaData"
        :rules="{ a: ['required'], c: ['required'] }"
      />
    </p-dialog> -->
  </div>
</template>

<script>
import { mixins } from "./lib";
const { paginTableOuterMixin } = mixins;
export default {
  name: "app",
  mixins: [paginTableOuterMixin],
  computed: {
    isA() {
      return this.form.aOrb === "a";
    }
  },
  data() {
    return {
      dialogVisible: false,
      form: {},
      rules: {
        aOrb: ["required"],
        a1: ["required"]
      },
      dymFormItems: [
        {
          prop: "aOrb",
          label: "a or b",
          type: "select",
          optionList: [
            { name: "a", id: "a" },
            { name: "b", id: "b" }
          ]
        },
        // {label:'a1',prop:'a1',type:'input',show:()=>this.form.aOrb==='a'}
        { label: "a1", prop: "a1", type: "input", show: () => this.isA }
      ],
      page: 1,
      queryObj: {},
      areaData: { a: 1, b: 2, c: "" },
      optionList: [
        { id: 2, name: "abc" },
        { id: 4, name: "asd" }
      ],
      selectV2: 4,
      areaItems: [
        { label: "a", type: "input", prop: "a" },
        {
          label: "b",
          type: "select",
          prop: "b",
          optionList: [
            { id: 2, name: 222 },
            { id: 3, name: 333 }
          ],
          preset: "preset1"
        },
        {
          label: "a b template",
          prop: "xxx",
          type: "text",
          template: "{{a}}----{{b}}"
        },
        {
          label: "custom valueName",
          prop: "c",
          type: "select",
          optionList: [
            { k: 2, namex: "22ccccc" },
            { k: 3, namex: "33ccccc" }
          ],

          valueName: "k",
          labelName: "namex"
        }
      ],
      columns: [
        {
          prop: "c1",
          label: "column1"
          // click:()=>{}
        },
        { prop: "c2", label: "c2", template: "{{c1}}--{{c1}}" },
        // {
        //   prop: "link",
        //   label: "some link",
        //   link:true,
        //   template:'{{c1}}'
        // },
        {
          prop: "oper",
          label: "oper",
          slot: true
        }
      ]
    };
  },
  methods: {
    handleSubmit(data) {
      console.log("handleSubmit", data);
      this.$refs.dialog.formValidate().then(() => {
        console.log("validate done ");
      });
    },
    handleQuery(x) {
      console.log("handleQuery", x);
    },
    loadHandler({ page, size, ...args }) {
      console.log("loadHandler", { page, size, args });
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
