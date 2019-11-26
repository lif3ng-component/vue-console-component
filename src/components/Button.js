import Icon from "./Icon";

export default {
  name: "Button",
  components: {
    Icon
  },
  props: {
    type: {
      type: String,
      default: ""
    },
    icon: String,
    block: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    if (this.block) {
      this.$el.style.display = "block";
      this.$el.style.width = "100%";
    }
  },
  render() {
    return (
      <button
        onClick={() => this.$emit("click")}
        class={[
          `${prefix}-button`,
          { [`${prefix}-button-${this.type}`]: this.type },
          ...(this.$attrs.class ? this.$attrs.class.split(" ") : [])
        ]}
      >
        {this.icon && <icon type={this.icon} />}
        {this.$slots.default && <span>{this.$slots.default}</span>}
      </button>
    );
  }
};
