<template>
  <div>
    <d-table :columns="columns" :data="data">
      <template #col-oper="{row}">
        <a @click="handleEdit(row)">edit</a>
        <a danger @click="handleDelete(row)">delete</a>
        <a class="danger">delete</a>
      </template>
    </d-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        { prop: "c1", label: "column1", sort: true },
        { prop: "c2", label: "column2", sort: true, template: "--{{c1}}--" },
        { prop: "oper", label: "oper", slot: true, noWrap: true }
      ],
      data: [{ c1: 123 }, { c1: 456 }]
    };
  },
  methods: {
    handleEdit(row) {
      console.log("edit", row);
    }
  }
};
</script>
