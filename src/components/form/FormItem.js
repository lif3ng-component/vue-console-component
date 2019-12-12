export default {
  name: "FormItem",
  inject: ["errObj", "hideLabel", "validateField", "requiredMap"],
  provide() {
    return {
      emitBlur: this.emitBlur,
      emitChange: this.emitChange
    };
  },
  props: {
    label: {
      default: ""
    },
    prop: {
      required: true,
      type: String
    },
    errorMsg: {
      default: ""
    }
  },

  mounted() {},
  methods: {
    emitBlur() {
      setTimeout(() => {
        this.validateField(this.prop);
      }, 200);
    },
    emitChange() {
      if (this.hasError) {
        this.validateField(this.prop);
      }
    }
  },
  computed: {
    hasError() {
      return !!this.errObj[this.prop];
    }
  },
  render() {
    return (
      <div
        class={[
          `${prefix}-form-item`,
          { "has-error": this.hasError, required: this.requiredMap[this.prop] }
        ]}
        data-field-name={this.prop}
      >
        {!this.hideLabel && (
          <div class={`${prefix}-form-item-label`}>{this.label}</div>
        )}
        <div class={`${prefix}-form-item-field`}>
          {this.$slots.default}
          {this.hasError && (
            <div class={`${prefix}-form-item-errormsg`}>
              {this.errObj[this.prop]}
            </div>
          )}
        </div>
      </div>
    );
  }
};
