export default {
  name: "FormItem",
  inject: ["errObj", "hideLabel", "validateField"],
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

  mounted() {
    console.log("form item mounted");
  },
  methods: {
    emitBlur() {
      this.validateField(this.prop);
    },
    emitChange() {
      console.log("emit change");
      if (this.hasError) {
        this.validateField(this.prop);
      }
    }
  },
  computed: {
    hasError() {
      console.log(this.prop, this.errObj[this.prop]);
      console.log(JSON.stringify(this.errObj));
      return !!this.errObj[this.prop];
    }
  },
  render() {
    return (
      <div
        class={[`${prefix}-form-item`, { "has-error": this.hasError }]}
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
