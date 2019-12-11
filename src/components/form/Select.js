import Input from "./Input";
export default {
  name: "Select",
  props: {
    value: {
      // type: String,
      default: ""
    },
    optionList: {
      type: Array,
      default: () => []
    },
    valueName: {
      type: String,
      default: "id"
    },
    labelName: {
      type: String,
      default: "name"
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
      const option = this.optionList.find(({ [this.valueName]: value }) => {
        return value === this.value;
      });
      if (option) {
        this.showText = option[this.labelName] || "";
      }
    },

    handleSelect(id, label) {
      this.showText = label;
      this.$emit("input", id);
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
          value={this.showText}
          readonly
          iconAfter="caret-down"
        />
        <div class={`${prefix}-select-options`}>
          {this.optionList.map(
            ({ [this.labelName]: label, [this.valueName]: value }) => (
              <div
                onClick={() => this.handleSelect(value, label)}
                class={`${prefix}-select-options-item`}
              >
                {label}
              </div>
            )
          )}
        </div>
      </div>
    );
  }
};
