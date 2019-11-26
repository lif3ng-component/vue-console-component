import schema from 'async-validator';
import { formReportMixin } from '@/mixins/formMixins';

export default {
  name: 'Form',
  mixins: [formReportMixin],
  props: {
    value: Object,
    rules: {
      type: Object,
      default: () => ({}),
    },
    hideLabel: {
      type: Boolean,
      default: false,
    },
    enterSubmit: {
      type: Boolean,
      default: false,
    },
    submitFn: {
      type: Function,
    },
  },

  provide() {
    return {
      errObj: this.errObj,
      validateField: this.validateField,
      hideLabel: this.hideLabel,
    };
  },
  data() {
    const initErrObj = {};
    for (const key in this.rules) {
      initErrObj[key] = '';
    }
    return {
      validator: null,
      errObj: initErrObj,
    };
  },
  mounted() {
    console.log('form mounted');
    this.validator = new schema(this.rules);
    console.log(this.$el.outerHTML);
  },
  methods: {
    handleKeyup({ keyCode }) {
      console.log('handleKeyup', keyCode);
      if (keyCode === 13 && this.enterSubmit && this.submitFn) {
        this.submitFn();
      }
    },
    validateField(field) {
      const rule = this.rules[field];
      const fieldRules = rule ? { [field]: rule } : {};
      console.log({ fieldRules });
      // console.log(new schema(fieldRules))
      new schema(fieldRules)
        .validate(this.value)
        .then(() => {
          this.errObj[field] = '';
        })
        .catch(({ fields }) => {
          console.log(`validate field [${field}]`, fields);
          this.errObj[field] = fields[field][0].message;
        });
    },
    validate() {
      console.log(this.validator);
      return this.validator.validate(this.value)
        .then(() => {
          for (const propName in this.errObj) {
            this.errObj[propName] = '';
          }
        })
        .catch((e) => {
          console.log('catch in Form', e);
          const { fields } = e;
          console.log(fields);
          const newErrObj = {};
          for (const propName in fields) {
            console.log(propName);
            newErrObj[propName] = fields[propName][0].message;
          }
          console.log(newErrObj);

          for (const propName in this.errObj) {
            if ({}.hasOwnProperty.call(this.errObj, propName)) {
              this.errObj[propName] = newErrObj[propName] || '';
            }
          }
          // this.errObj = newErrObj;
          // Object.assign(this.errObj,newErrObj)
          throw e;
        });
    },
  },
  render() {
    return (
      <div class={`${prefix}-form`} hide-label={this.hideLabel} onKeyup={this.handleKeyup}>
        { this.$slots.default }
      </div>
    );
  },
};
