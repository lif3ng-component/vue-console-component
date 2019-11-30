<script>
export default {
  name: "Footer",

  render() {
    return <div class={`${prefix}-footer`}>{this.$slots.default}</div>;
  }
};
</script>
