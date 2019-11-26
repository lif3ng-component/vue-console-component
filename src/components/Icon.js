import "../assets/iconfont/iconfont.css";

export default {
  name: "Icon",
  props: {
    type: String
  },
  render() {
    return <i class={`${prefix}-icons ${prefix}-icon-${this.type}`}></i>;
  }
};
