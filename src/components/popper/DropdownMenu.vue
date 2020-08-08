<script>
import Icon from "../Icon";
export default {
  name: "DropdownMenu",
  props: {
    width: {
      type: String
    },
    align: {
      validator: function(value) {
        return ["left", "right", "center"].indexOf(value) !== -1;
      },
      default: "center"
    },
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
      <div
        class={`${prefix}-dropdown-menu`}
        onClick={this.handleHide}
        style={{ width: this.width }}
      >
        {this.items.map(({ slot, slim, split, text, icon, fn }) =>
          slot ? (
            slim ? (
              this.$slots[slot]
            ) : (
              <div
                class={`${prefix}-dropdown-menu-custom-block`}
                style={{ textAlign: this.align }}
              >
                {this.$slots[slot]}
              </div>
            )
          ) : split ? (
            <div class={`${prefix}-dropdown-menu-split`} />
          ) : (
            <div
              class={`${prefix}-dropdown-menu-item`}
              style={{ textAlign: this.align }}
              onClick={fn}
            >
              {icon && <Icon type={icon} />}
              {text}
            </div>
          )
        )}
      </div>
    );
  }
};
</script>
