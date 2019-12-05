import "../assets/iconfont/iconfont.css";

export default {
  name: "Icon",
  props: {
    type: String
  },
  render() {
    return (
      <i
        onClick={() => this.$emit("click")}
        class={`${prefix}-icons ${prefix}-icon-${this.type}`}
      ></i>
    );
  }
};
