import Input from "./Input";
export default {
  name: "Select",
  model: {
    event: "change"
  },
  props: {
    value: {
      // type: String,
      default: ""
    },
    optionList: {
      type: Array,
      default: () => []
    },
    preset: {
      type: String
    },
    valueName: {
      type: String,
      default() {
        return this.$default.selectValueName;
      }
    },
    labelName: {
      type: String,
      default() {
        return this.$default.selectLabelName;
      }
    }
  },
  data() {
    return {
      showText: ""
    };
  },
  watch: {
    optionList() {
      this.renderText();
    },
    value() {
      this.renderText();
    }
  },
  methods: {
    renderText() {
      const list = this.preset
        ? this.$SELECT_OTPIONS_MAP[this.preset]
        : this.optionList;
      const option = list.find(({ [this.valueName]: value }) => {
        return value === this.value;
      });
      if (option) {
        this.showText = option[this.labelName] || "";
      }
    },

    handleSelect(id, label) {
      this.showText = label;
      this.$emit("change", id);
    }
  },
  mounted() {
    this.renderText();
  },
  render() {
    return (
      <div class={`${prefix}-select`}>
        <Input
          v-popper="select"
          popper-class={this.$attrs["popper-class"] || ""}
          value={this.showText}
          readonly
          iconAfter="caret-down"
        />
        <div class={`${prefix}-select-options`}>
          {(this.preset
            ? this.$SELECT_OTPIONS_MAP[this.preset]
            : this.optionList
          ).map(({ [this.labelName]: label, [this.valueName]: value }) => (
            <div
              onClick={() => this.handleSelect(value, label)}
              class={`${prefix}-select-options-item`}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    );
  }
};
