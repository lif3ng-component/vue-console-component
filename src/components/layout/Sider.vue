<script>
export default {
  name: "Sider",
  mounted() {
    if (this.$attrs.width) {
      this.$el.style.width = this.$attrs.width;
    }
  },
  render() {
    return <div class={`${prefix}-sider`}>{this.$slots.default}</div>;
  }
};
</script>
