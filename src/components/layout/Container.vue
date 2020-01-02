<script>
export default {
  name: "Container",
  props: { reverse: Boolean },
  computed: {
    childComponentsNames() {
      return this.$slots.default
        .map(({ tag }) => {
          const result = tag
            ? tag.match("[A-Z][a-z]*$") || tag.match("[a-z]*$")
            : "";
          return result && result[0];
        })
        .filter(name => name)
        .map(name => name.toLowerCase())
        .join("-");
    }
  },
  mounted() {
    const flexDirection = window.getComputedStyle(this.$el)["flexDirection"];
    if (this.reverse) {
      this.$el.style.flexDirection =
        flexDirection === "column" ? "column-reverse" : "row-reverse";
    }
  },
  render() {
    return (
      <div
        class={`${prefix}-container`}
        children-names={this.childComponentsNames}
      >
        {this.$slots.default}
      </div>
    );
  }
};
</script>
