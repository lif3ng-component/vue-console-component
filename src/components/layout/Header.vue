<script>
export default {
  name: "Header",

  render() {
    return <div class={`${prefix}-header`}>{this.$slots.default}</div>;
  }
};
</script>
