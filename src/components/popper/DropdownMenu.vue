<script>
export default {
  name: "DropdownMenu",
  props: {
    items: {
      type: Array,
      required: true
    },
    offset: {
      type: Number,
      default: 10
    }
  },
  mounted() {
    this.$el.style.margin = `${this.offset}px 0`;
  },
  methods: {
    handleHide() {
      const tippyRoot = this.$el.closest("[data-tippy-root]");
      if (tippyRoot && tippyRoot._tippy) {
        const tippyInstance = tippyRoot._tippy;
        tippyInstance.hide();
      }
    }
  },
  render() {
    return (
      <div class={`${prefix}-dropdown-menu`} onClick={this.handleHide}>
        {this.items.map(({ split, text, fn }) =>
          split ? (
            <div class={`${prefix}-dropdown-menu-split`} />
          ) : (
            <div class={`${prefix}-dropdown-menu-item`} onClick={fn}>
              {text}
            </div>
          )
        )}
      </div>
    );
  }
};
</script>
