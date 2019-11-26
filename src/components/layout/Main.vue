
<script>
export default {
  name: 'Main',

  render() {
    return <div class={`${prefix}-main`}>{this.$slots.default}</div>;
  },
};
</script>
