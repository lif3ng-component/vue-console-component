import Table from "./Table";
import Pagination from "./Pagination";

export default {
  name: "PaginTable",
  components: {
    Table,
    Pagination
  },
  props: {
    columns: {
      type: Array
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
      size: 10,
      total: 0,
      tableData: [],
      sortArgs: {}
    };
  },
  mounted() {
    this.doRequest();
  },
  methods: {
    doRequest() {
      const page = this.page;
      this.loadFn({
        // 查询参数
        ...this.queryObj,
        // 分页参数
        ...this.$default.paginArgsHandler({
          page: this.page || 1,
          size: this.size
        })
        // 排序参数 todo
      })
        .then(({ total, list }) => {
          // 渲染表格
          this.total = total;
          this.tableData = list;
          if (total > 0 && page === 0) {
            this.page = 1;
          }
        })
        .catch(() => {});
    },
    handlePageChange(page) {
      console.log("handlePageChange", page);
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
          on={{
            "update:current-page": this.handlePageChange
          }}
        />
      </div>
    );
  }
};
