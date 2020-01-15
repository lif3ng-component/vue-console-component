export default {
  name: "Checkbox",
  props: ["value"],
  methods: {
    handleChange(e) {
      this.$emit("input", e.target.checked);
    }
  },
  render() {
    return (
      <label class={`${prefix}-checkbox-wrapper`}>
        <input
          type="checkbox"
          checked={this.value}
          onChange={this.handleChange}
        ></input>
        {this.$slots.default}
      </label>
    );
  }
};
