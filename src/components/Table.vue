<template>
  <div :class="`${prefix}-table`">
    <template v-if="$slots.header">
      <slot name="header" />
    </template>
    <table>
      <colgroup>
        <col
          v-for="(column, index) in filteredColumns"
          :key="index"
          :ref="`col-${index}`"
          :style="{
            width: column.width || (column.noWrap && '10px') || '200px'
          }"
        />
      </colgroup>
      <thead>
        <tr>
          <th
            v-for="(column, index) in filteredColumns"
            :key="index"
            :ref="`th-${index}`"
            @click="column.sort && handleSort(column.sortProp || column.prop)"
            :class="{
              sort: column.sort
            }"
          >
            <span>{{ column.label }}</span>
            <div
              v-if="column.sort"
              :class="[
                'sort-status',
                {
                  'sort-up': sort[column.sortProp || column.prop] === 'asc',
                  'sort-down': sort[column.sortProp || column.prop] === 'desc'
                }
              ]"
            >
              <component :is="`${prefix}-icon`" type="caret-up" />
              <component :is="`${prefix}-icon`" type="caret-down" />
            </div>
          </th>
        </tr>
      </thead>
      <tbody ref="tbody">
        <tr
          v-for="(row, rowIndex) in data"
          :key="rowIndex"
          :class="calRowClass({ row, rowIndex })"
          :style="calRowStyle({ row, rowIndex })"
        >
          <td
            v-for="(column, index) in filteredColumns"
            v-bind="{
              ...(column.tooltip ? { tooltip: column.tooltip } : {})
            }"
            :key="index"
            :style="{
              ...getColStyles(column),
              ...calCellStyle({
                row,
                rowIndex,
                columnIndex: index,
                prop: column.prop
              })
            }"
            :class="[
              {
                noWrap: column.noWrap,
                multiLine: column.multiLine
              },
              calCellClass({
                row,
                rowIndex,
                columnIndex: index,
                prop: column.prop
              })
            ]"
            v-on="tdEvents({ prop: column.prop, rowIndex })"
          >
            <template v-if="column.slot">
              <slot :name="`col-${column.prop}`" :row="row" :index="rowIndex" />
            </template>
            <template v-else-if="column.template">
              <!-- utils fn -->
              {{ renderTpl({ index: rowIndex, ...row }, column.template) }}
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
      </tbody>
    </table>

    <div class="empty-line" v-if="data.length === 0">{{ emptyText }}</div>
  </div>
</template>

<script>
import renderTpl from "@/utils/renderTpl";
import { delegate } from "tippy.js";
import "tippy.js/dist/tippy.css";

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
    },
    rowClassName: [Function, String],
    rowStyle: [Function, Object],
    cellClassName: [Function, String],
    cellStyle: [Function, Object]
  },
  data() {
    return {
      sort: {},
      tdTooltipText: "",
      propTooltipFnMap: {},
      tdEvents: ({ prop, rowIndex }) => ({
        mouseenter: ({ target: td }) => {
          // const customTooltipContent = td.getAttribute("tooltip");
          if (this.propTooltipFnMap[prop]) {
            this.tdTooltipText = this.propTooltipFnMap[prop](
              this.data[rowIndex]
            );
            // }
            // if (customTooltipContent) {
            //   this.tdTooltipText = customTooltipContent;
          } else if (td.clientWidth < td.scrollWidth) {
            this.tdTooltipText = td.innerText;
          } else {
            this.tdTooltipText = "";
          }
        }
      }),
      tooltipInstance: null,
      lastCalColWidthData: {}
    };
  },
  watch: {
    // filteredColumns: "filteredColumns",
    filteredColumns: {
      handler() {
        this.calculateNoWrapColumnWidth();
      }
    },
    data: {
      // immediate: true,
      handler() {
        this.$nextTick(() => {
          this.calculateNoWrapColumnWidth();
        });
      }
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
  mounted() {
    this.filteredColumns.forEach(({ prop, tooltip }) => {
      if (tooltip) {
        this.propTooltipFnMap[prop] = tooltip;
      }
    });
    this.tippyInstance = delegate(this.$refs.tbody, {
      target: "td",
      // flipOnUpdate: true,
      theme: "nq-tooltip",
      delay: 100,
      onShow: instance => {
        if (this.tdTooltipText) {
          instance.setContent(this.tdTooltipText);
        } else {
          return false;
        }
      }
    });
    this.calculateNoWrapColumnWidth();
  },
  beforeDestroy() {
    this.tippyInstance.destroy();
  },
  methods: {
    renderTpl,
    calRowClass({ row, rowIndex }) {
      if (this.rowClassName) {
        if (typeof this.rowClassName === "string") {
          return this.rowClassName;
        }
        return this.rowClassName({ row, rowIndex });
      }
      return "";
    },
    calRowStyle({ row, rowIndex }) {
      if (this.rowStyle) {
        if (typeof this.rowStyle === "object") {
          return this.rowStyle;
        }
        return this.rowStyle({ row, rowIndex });
      }
      return {};
    },
    calCellClass({ row, rowIndex, prop, columnIndex }) {
      if (this.cellClassName) {
        if (typeof this.cellClassName === "string") {
          return this.cellClassName;
        }
        return this.cellClassName({ row, rowIndex, columnIndex, prop });
      }
      return "";
    },
    calCellStyle({ row, rowIndex, columnIndex, prop }) {
      if (this.cellStyle) {
        if (typeof this.cellStyle === "object") {
          return this.cellStyle;
        }
        return this.cellStyle({ row, rowIndex, columnIndex, prop });
      }
      return {};
    },
    getColStyles({ align }) {
      const styleMap = {
        align: {
          textAlign: align
        }
      };
      return {
        ...(align ? styleMap.align : {})
      };
    },
    handleSort(prop) {
      if (this.sort[prop]) {
        if (this.sort[prop] === "desc") {
          this.sort = { [prop]: "asc" };
        } else {
          this.sort = {};
        }
      } else {
        this.sort = { [prop]: "desc" };
      }
      this.$emit("do-sort", prop, this.sort[prop]);
    },
    calculateNoWrapColumnWidth() {
      const noWrapColumnsIndexArr = [];
      const noWrapColumnsWidth = {};
      const data = this.data;
      const columns = this.filteredColumns;
      const refreshRenderWidth = () => {
        Object.entries(noWrapColumnsWidth).forEach(([colIndex, width]) => {
          if (width) {
            this.$refs[`col-${colIndex}`][0].style.width = `${width + 20}px`;
          }
        });
      };
      // if (data.length === 0 || !this.$refs.tbody) {
      //   return;
      // }

      // 筛选 noWrap 列，设置初始宽度
      columns.forEach(({ noWrap }, index) => {
        if (noWrap) {
          noWrapColumnsIndexArr.push(index);
          this.$refs[`col-${index}`][0].style.width = 0;
          noWrapColumnsWidth[index] = this.$refs[`th-${index}`][0].scrollWidth;
        }
      });
      // 没有 noWrap 列，不需要处理宽度
      if (noWrapColumnsIndexArr.length === 0) {
        return;
      }
      // only th width
      // refreshRenderWidth();

      this.lastCalColWidthData = {
        columns: this.filteredColumns,
        data: this.data
      };

      for (let i = 0; i < data.length; i++) {
        const tr = this.$refs.tbody.children[i];
        noWrapColumnsIndexArr.forEach(colIndex => {
          const td = tr.children[colIndex];
          if (
            td.clientWidth !== td.scrollWidth &&
            td.scrollWidth > noWrapColumnsWidth[colIndex]
          ) {
            noWrapColumnsWidth[colIndex] = td.scrollWidth;
          }
        });
      }

      refreshRenderWidth();
    }
  }
};
</script>
