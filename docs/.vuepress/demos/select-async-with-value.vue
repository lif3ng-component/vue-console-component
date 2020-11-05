<template>
  <table>
    <colgroup>
      <col style="width:60px" />
    </colgroup>
    <thead>
      <tr>
        <th></th>
        <th colspan="2">->list ->value</th>
        <th colspan="2">->value ->list</th>
      </tr>
      <tr>
        <th></th>
        <th>by arr</th>
        <th>by fn</th>
        <th>by arr</th>
        <th>by fn</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td></td>
        <td><d-select v-model="v1" :optionList="list1" /></td>
        <td><d-select v-model="v1" :optionList="optionList1" /></td>
        <td><d-select v-model="v2" :optionList="list2" /></td>
        <td><d-select v-model="v2" :optionList="optionList2" /></td>
      </tr>
      <tr>
        <td>list</td>
        <td
          colspan="2"
          :style="{ background: list1.length ? 'green' : 'transparent' }"
        />
        <td
          colspan="2"
          :style="{ background: list2.length ? 'green' : 'transparent' }"
        />
      </tr>
      <tr>
        <td>value</td>
        <td colspan="2" :style="{ background: v1 ? 'green' : 'transparent' }" />
        <td colspan="2" :style="{ background: v2 ? 'green' : 'transparent' }" />
      </tr>
    </tbody>
  </table>
</template>
<script>
const list = [
  { id: 1, name: "label 1" },
  { id: 2, name: "label 2" },
];
const value = 1;
export default {
  data() {
    return {
      v1: "",
      v2: "",
      list1: [],
      list2: [],
      optionList1: () => this.list1,
      optionList2: () => this.list2,
    };
  },
  mounted() {
    // list, value
    this.delaySet(1, "list1", list).then(() => {
      this.delaySet(1, "v1", value);
    });
    // value, list
    this.delaySet(1, "v2", value).then(() => {
      this.delaySet(1, "list2", list);
    });
  },
  methods: {
    delaySet(sec, propertyName, value) {
      return new Promise((resolve) => {
        setTimeout(() => {
          this[propertyName] = value;
          resolve();
        }, sec * 1000);
      });
    },
  },
};
</script>
