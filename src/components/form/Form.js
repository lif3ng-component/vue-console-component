import schema from "async-validator";
import { formReportMixin } from "@/mixins/formMixins";

export default {
  name: "Form",
  mixins: [formReportMixin],
  props: {
    value: Object,
    rules: {
      type: Object,
      default: () => ({})
    },
    hideLabel: {
      type: Boolean,
      default: false
    },
    enterSubmit: {
      type: Boolean,
      default: false
    },
    submitFn: {
      type: Function
    }
  },

  provide() {
    return {
      errObj: this.errObj,
      validateField: this.validateField,
      hideLabel: this.hideLabel,
      requiredMap: this.requiredMap
    };
  },
  data() {
    const initErrObj = {};
    const requiredMap = {};
    for (const key in this.rules) {
      initErrObj[key] = "";
      const requiredRule = this.rules[key].find(rule => {
        if (typeof rule === "string") {
          return rule === "required";
        } else {
          return rule.required;
        }
      });
      if (requiredRule) {
        requiredMap[key] = true;
      }
    }
    return {
      validator: null,
      errObj: initErrObj,
      requiredMap
    };
  },
  mounted() {
    this.validator = new schema(this.rules);
  },
  methods: {
    handleKeyup({ keyCode }) {
      if (keyCode === 13 && this.enterSubmit && this.submitFn) {
        this.submitFn();
      }
    },
    validateField(field) {
      const rule = this.rules[field];
      const fieldRules = rule ? { [field]: rule } : {};
      // console.log(new schema(fieldRules))
      new schema(fieldRules)
        .validate(this.value)
        .then(() => {
          this.errObj[field] = "";
        })
        .catch(({ fields }) => {
          // console.log(`validate field [${field}]`, fields);
          this.errObj[field] = fields[field][0].message;
        });
    },
    validate() {
      return this.validator
        .validate(this.value)
        .then(() => {
          for (const propName in this.errObj) {
            this.errObj[propName] = "";
          }
        })
        .catch(e => {
          const { fields } = e;
          const newErrObj = {};
          for (const propName in fields) {
            newErrObj[propName] = fields[propName][0].message;
          }

          for (const propName in this.errObj) {
            if ({}.hasOwnProperty.call(this.errObj, propName)) {
              this.errObj[propName] = newErrObj[propName] || "";
            }
          }
          // this.errObj = newErrObj;
          // Object.assign(this.errObj,newErrObj)
          throw e;
        });
    }
  },
  render() {
    return (
      <div
        class={`${prefix}-form`}
        hide-label={this.hideLabel}
        onKeyup={this.handleKeyup}
      >
        {this.$slots.default}
      </div>
    );
  }
};
