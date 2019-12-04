export default {
  name: "TableHeader",
  mounted() {
    const searchInputComponents = this.$slots.default.filter(
      // ({ fnOptions }) => fnOptions && fnOptions.name === `${prefix}SearchInput` // 函数式组件
      ({ componentOptions }) =>
        componentOptions && componentOptions.tag === `${prefix}-search-input`
    );
    // const expendEl = this.$el.children[0];
    searchInputComponents.forEach(({ elm }) => {
      this.$el.append(elm);
    });
    // this.$el.appendChild()
  },
  render() {
    return (
      <div class={`${prefix}-table-header`}>
        <div class="expend-area">{this.$slots.default}</div>
      </div>
    );
  }
};
