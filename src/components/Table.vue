<template>
  <div :class="`${prefix}-table`">
    <template v-if="$slots.header">
      <slot name="header" />
    </template>
    <table style="width:100%">
      <tr>
        <th v-for="(column, index) in filteredColumns" :key="index">
          {{ column.label }}
        </th>
      </tr>
      <tr v-for="(row, rowIndex) in data" :key="rowIndex">
        <td
          v-for="(column, index) in filteredColumns"
          :key="index"
          :style="getColStyles(column)"
        >
          <template v-if="column.slot">
            <slot :name="`col-${column.prop}`" :row="row" :index="rowIndex" />
          </template>
          <template v-else-if="column.template">
            <!-- utils fn -->
            {{ renderTpl(row, column.template) }}
            <!-- filter -->
            <!-- {{ row | renderTpl(column.template) }} -->
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

    <div class="empty-line" v-if="data.length === 0">{{ emptyText }}</div>
  </div>
</template>

<script>
import renderTpl from "@/utils/renderTpl";

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
    },
    emptyText: {
      default: "暂无数据"
    }
  },
  computed: {
    filteredColumns() {
      return this.columns.filter(({ show }) => {
        if (show && !show()) {
          return false;
        }
        return true;
      });
    }
  },
  methods: {
    renderTpl,
    getColStyles({ noWrap, align }) {
      const styleMap = {
        noWrap: {
          whiteSpace: "nowrap"
        },
        align: {
          textAlign: align
        }
      };
      return {
        ...(noWrap ? styleMap.noWrap : {})
      };
    }
  }
};
</script>
