export default {
  name: "ButtonArea",
  // functional: true,
  render() {
    return (
      <div class={`${this.prefix}-button-area`}>{this.$slots.default}</div>
    );
  }
};
