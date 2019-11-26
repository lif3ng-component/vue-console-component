import { shallowMount } from "@vue/test-utils";
import Pagination from "@/components/Pagination";

describe("pagination 分页", () => {
  it("render success", () => {
    const wrapper = shallowMount(Pagination, {});
    expect(wrapper.html()).toMatchInlineSnapshot(`
      <div class="t-pagination">
        <div class="t-pagination-pager">
          <div class="disable">首页</div>
          <div class="disable">
            <icon-stub type="arrowleft"></icon-stub>
          </div>
          <div class="">
            <icon-stub type="arrowright"></icon-stub>
          </div>
          <div class="">末页</div>
        </div>
        <div class="t-pagination-jumper">
          <input-stub value="">
            <button-stub type="primary">跳转</button-stub>
          </input-stub>
        </div>
        <div class="t-pagination-total">共0页/0条数据</div>
        <div class="t-pagination-size">每页显示10</div>
      </div>
    `);
  });

  it("init default props check", () => {
    const wrapper = shallowMount(Pagination);
    expect(wrapper.vm.$props.currentPage).toBe(1);
    expect(wrapper.vm.$props.sizeOptions).toEqual([10, 20, 30]);
    expect(wrapper.vm.$props.size).toBe(10);
    expect(wrapper.vm.$props.total).toEqual(0);
  });

  it("layout prop check fail", () => {
    const error = (console.error = jest.fn());
    shallowMount(Pagination, {
      propsData: {
        layout: "nextx, prev"
      }
    });
    expect(error.mock.calls[0][0]).toMatch("Invalid prop");
  });

  it("layout prop check pass", () => {
    const error = (console.error = jest.fn());
    shallowMount(Pagination, {
      propsData: {
        layout: "jumper"
      }
    });
    expect(error.mock.calls.length).toBe(0);
  });

  describe("total = 0, 0 pages", () => {
    // let wrapper;
    // beforeEach(() => {
    //   wrapper = shallowMount(Pagination, {
    //     propsData: {
    //       total: 0
    //     }
    //   });
    // });
    // it.only("all pager items is disable", () => {
    //   const itemsLen = wrapper.findAll(".t-pagination-pager > div").length;
    //   const disableItemsLen = wrapper.findAll(
    //     ".t-pagination-pager > div.disable"
    //   ).length;
    //   console.log({ itemsLen, disableItemsLen });
    //   // need parent component .sync
    //   expect(itemsLen).toBe(disableItemsLen);
    // });
  });
  describe("total = 5, 1 pages", () => {
    let wrapper;
    wrapper = shallowMount(Pagination, {
      propsData: {
        total: 5
      }
    });
    it("page 1 active, other disable", () => {
      const itemsLen = wrapper.findAll(".t-pagination-pager > div").length;
      const disableItemsLen = wrapper.findAll(
        ".t-pagination-pager > div.disable"
      ).length;
      expect(itemsLen).toBe(5);
      expect(disableItemsLen).toBe(4);
    });
  });
  describe("total = 15, 2 pages", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallowMount(Pagination, {
        propsData: {
          total: 15
        }
      });
    });

    it("two page render 6 pager item", () => {
      expect(wrapper.findAll(".t-pagination-pager > div").length).toBe(6);
    });

    it("the 3rd item is show page 1", () => {
      expect(
        wrapper
          .findAll(".t-pagination-pager>div")
          .at(2)
          .text()
      ).toBe("1");
    });

    it("click page number '2' to emit updata:currentPage '2' event", () => {
      wrapper
        .findAll(".t-pagination-pager>div")
        .at(3)
        .trigger("click");
      expect(wrapper.emitted()["update:current-page"]).toEqual([[2]]);
    });
  });
});
