import Input from "./form/Input";
export default {
  name: "SearchInput",

  // functional: true,
  // render(h, ctx) {
  //   console.log(ctx);
  //   return h(`${prefix}Input`, {
  //     class: `${prefix}-search-input`,
  //     ...ctx.data
  //   });
  // }
  methods: {
    handleEnter({ code }) {
      // console.log("input", code);
      if (code === "Enter") {
        this.$emit("submit", this.$attrs.value);
      }
    }
  },
  render() {
    return (
      <Input
        class={`${prefix}-search-input`}
        {...{
          attrs: this.$attrs,
          on: { ...this.$listeners }
        }}
        onKeyup={this.handleEnter}
      />
    );
  }
};
