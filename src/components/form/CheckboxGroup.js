export default {
  name: 'CheckboxGroup',
  prop: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      innerValue: this.value || [],
    };
  },
  methods: {
    handleCheckboxItemToggle() {

    },
  },
  render() {
    return (
      <div class={`${prefix}-checkbox-group`}>
        {this.$slots.default}
      </div>
    );
  },
};
