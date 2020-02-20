import Input from "./Input";
export default {
  name: "Select",
  model: {
    event: "change"
  },
  props: {
    value: {
      default: ""
    },
    multiple: Boolean,
    optionList: {
      // type: Array,
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
  computed: {
    list() {
      return this.preset
        ? this.$SELECT_OTPIONS_MAP[this.preset]
        : this.optionList instanceof Array
        ? this.optionList
        : this.optionList();
    },
    valueLabelMap() {
      const result = {};
      this.list.forEach(
        ({ [this.valueName]: value, [this.labelName]: label }) => {
          result[value] = label;
        }
      );
      return result;
    }
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
      if (this.multiple) {
        return (this.showText = this.value
          .map(v => this.valueLabelMap[v])
          .join(", "));
      }

      const option = this.list.find(({ [this.valueName]: value }) => {
        return value === this.value;
      });
      if (option) {
        this.showText = option[this.labelName] || "";
      }
    },

    handleSelect(value, label, e) {
      if (this.multiple) {
        e.stopPropagation();
        if (this.value.indexOf(value) === -1) {
          this.$emit("change", [...this.value, value]);
        } else {
          const valueCopy = [...this.value];
          const index = valueCopy.indexOf(value);
          valueCopy.splice(index, 1);
          this.$emit("change", valueCopy);
        }
        return;
      }
      this.showText = label;
      if (this.value !== value) {
        this.$emit("change", value);
      }
    }
  },
  mounted() {
    if (this.multiple && !this.value) {
      this.$emit("change", []);
    }
    this.$nextTick(this.renderText);
  },
  render() {
    return (
      <div class={`${prefix}-select`}>
        <Input
          v-popper="select"
          attrs={this.$attrs ? this.$attrs.attrs || this.$attrs : {}}
          popper-class={this.$attrs["popper-class"] || ""}
          value={this.showText}
          readonly
          iconAfter="caret-down"
        />
        <div class={`${prefix}-select-options`}>
          {this.list.map(
            ({ [this.labelName]: label, [this.valueName]: value }) => (
              <div
                onClick={$event => this.handleSelect(value, label, $event)}
                class={[
                  `${prefix}-select-options-item`,
                  { selected: this.multiple && this.value.includes(value) }
                ]}
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
