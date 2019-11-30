<template>
  <table style="width:100%" :class="`${prefix}-table`">
    <tr>
      <th v-for="(column, index) in columns" :key="index">
        {{ column.label }}
      </th>
    </tr>
    <tr v-for="(row, rowIndex) in data" :key="rowIndex">
      <td v-for="(column, index) in columns" :key="index">
        <template v-if="column.slot">
          <slot :name="`col-${column.prop}`" :row="row" :index="rowIndex" />
        </template>
        <template v-else-if="column.click">
          <a @click="column.click(row)">
            {{ row[column.prop] }}
          </a>
        </template>
        <!-- <template v-else-if="column.filterName">{{row[column.prop] | column.filterName }}</template> -->
        <template v-else-if="column.filter">{{
          row[column.prop] | handleFilter(column.filter)
        }}</template>
        <template v-else>{{ row[column.prop] }}</template>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "Table",
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      prefix
    };
  },
  mounted() {}
};
</script>
