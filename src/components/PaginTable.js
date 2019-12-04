import Table from "./Table";
import Pagination from "./Pagination";
import { reportQueryFnMixin } from "../mixins/tableMixins";
export default {
  name: "PaginTable",
  mixins: [reportQueryFnMixin],
  components: {
    Table,
    Pagination
  },
  props: {
    columns: {
      type: Array
    },
    paginSizeOptions: {
      type: Array,
      default() {
        return this.$default.paginSizeOptions;
      }
    },
    paginSize: {
      type: Number,
      default() {
        if (this.paginSizeOptions.includes(this.$default.paginSize)) {
          return this.$default.paginSize;
        }
        return this.paginSizeOptions[0];
      }
    },
    queryObj: {
      type: Object,
      default: () => ({})
    },
    loadFn: {
      type: Function
    }
  },
  data() {
    return {
      page: 0,
      size: this.paginSize,
      sizeOptions: this.paginSizeOptions,
      total: 0,
      tableData: [],
      sortArgs: {}
    };
  },
  mounted() {
    this.doRequest();
  },
  methods: {
    doRequest(isQuery) {
      const page = this.page;
      this.loadFn({
        // 查询参数
        ...this.queryObj,
        // 分页参数
        ...this.$default.paginArgsHandler({
          page: isQuery ? 1 : this.page || 1,
          size: this.size
        })
        // 排序参数 todo
      })
        .then(({ total, list }) => {
          // 渲染表格
          this.total = total;
          this.tableData = list;
          if (total > 0 && (page === 0 || isQuery)) {
            this.page = 1;
          }
        })
        .catch(() => {});
    },
    handlePageChange(page) {
      this.page = page;
      this.doRequest();
    }
  },
  render() {
    return (
      <div class={`${prefix}-pagintable`}>
        <Table columns={this.columns} data={this.tableData} />
        <Pagination
          currentPage={this.page}
          total={this.total}
          size={this.size}
          sizeOptions={this.sizeOptions}
          on={{
            "update:current-page": this.handlePageChange
          }}
        />
      </div>
    );
  }
};
