export default {
  name: "Switch",
  props: {
    value: { default: false }
  },
  model: {
    event: "change"
  },
  methods: {
    handleChange({ target }) {
      this.$emit("change", target.checked);
    }
  },
  render() {
    return (
      <label class={`${prefix}-switch`}>
        <input
          type="checkbox"
          checked={this.value}
          onChange={this.handleChange}
        />
        <div class={[`${prefix}-switch-wrapper`, { enable: this.value }]}></div>
      </label>
    );
  }
};
