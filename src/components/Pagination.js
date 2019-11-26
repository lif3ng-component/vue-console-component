import Icon from "./Icon";
import Button from "./Button";
import Input from "./form/Input";

const MAX_PAGE = 5;
export default {
  name: "Pagination",
  components: {
    Button,
    Icon,
    Input
  },
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    sizeOptions: {
      type: Array,
      default: () => [10, 20, 30]
    },
    size: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    },
    layout: {
      type: String,
      default: () => "pager, jumper, total, size",
      validator: s => {
        const arr = s.split(",").map(t => t.trim());
        return arr.every(item =>
          ["pager", "jumper", "total", "size"].includes(item)
        );
      }
    }
  },
  data() {
    return {
      pageInputValue: ""
    };
  },
  computed: {
    layoutArr() {
      return this.layout.split(",").map(t => t.trim());
    },
    totalPage() {
      return Math.ceil(this.total / this.size);
    },
    showPageList() {
      if (this.totalPage <= MAX_PAGE) {
        return Array.from({ length: this.totalPage }).map((_, i) => i + 1);
      } else {
        if (this.currentPage - Math.ceil(MAX_PAGE / 2) < 1) {
          // 从第一页开始
          return [
            ...Array.from({ length: MAX_PAGE }).map((_, i) => i + 1),
            "-"
          ];
        } else if (
          this.currentPage + Math.ceil(MAX_PAGE / 2) >
          this.totalPage
        ) {
          // 至最后一页结束
          return [
            "-",
            ...Array.from({ length: MAX_PAGE }).map(
              (_, i) => this.totalPage - MAX_PAGE + i + 1
            )
          ];
        } else {
          return [
            "-",
            ...Array.from({ length: MAX_PAGE }).map(
              (_, i) => this.currentPage - 2 + i
            ),
            "-"
          ];
        }
      }
    }
  },
  mounted() {
    if (this.currentPage > this.totalPage || this.currentPage < 0) {
      this.$emit("update:current-page", this.total === 0 ? 0 : 1);
    }
  },
  methods: {
    changePage(page) {
      if (page === this.currentPage || page < 1 || page > this.totalPage)
        return;
      this.$emit("update:current-page", page);
    },
    changePageToFirst() {
      if (this.totalPage !== 0) {
        this.changePage(1);
      }
    },
    changePageToLast() {
      if (this.totalPage !== 0) {
        this.changePage(this.totalPage);
      }
    },
    changePageNext() {
      this.changePage(this.currentPage + 1);
    },
    changePagePrev() {
      this.changePage(this.currentPage - 1);
    },
    jumpTo() {
      const pageNumber = parseInt(this.pageInputValue);
      if (!isNaN(pageNumber)) {
        this.changePage(pageNumber);
      }
      this.pageInputValue = "";
    }
  },
  render() {
    return (
      // eslint-disable-next-line no-undef
      <div class={`${prefix}-pagination`}>
        {this.layoutArr.map(type => {
          switch (type) {
            case "pager":
              return (
                <div class={`${prefix}-pagination-pager`}>
                  <div
                    class={{ disable: this.currentPage <= 1 }}
                    onClick={this.changePageToFirst}
                  >
                    首页
                  </div>
                  <div
                    class={{ disable: this.currentPage <= 1 }}
                    onClick={this.changePagePrev}
                  >
                    <icon type="arrowleft" />
                  </div>
                  {this.showPageList.map(page => (
                    <div
                      class={{
                        active: page === this.currentPage,
                        disable: page === "-"
                      }}
                      onClick={this.changePage.bind(
                        this,
                        page === "-" ? -1 : page
                      )}
                      // onClick={this.$emit(page)}
                    >
                      {page === "-" ? <Icon type="point" /> : page}
                    </div>
                  ))}
                  <div
                    class={{ disable: this.currentPage === this.totalPage }}
                    onClick={this.changePageNext}
                  >
                    <icon type="arrowright" />
                  </div>
                  <div
                    class={{ disable: this.currentPage === this.totalPage }}
                    onClick={this.changePageToLast}
                  >
                    末页
                  </div>
                </div>
              );
            case "jumper":
              return (
                <div class={`${prefix}-pagination-jumper`}>
                  <Input v-model={this.pageInputValue}>
                    <Button slot="append" type="primary" onClick={this.jumpTo}>
                      跳转
                    </Button>
                  </Input>
                </div>
              );
            case "total":
              return (
                <div class={`${prefix}-pagination-total`}>
                  共{this.totalPage}页/{this.total}
                  条数据
                </div>
              );
            case "size":
              return (
                <div class={`${prefix}-pagination-size`}>
                  每页显示{this.size}
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
    );
  }
};
