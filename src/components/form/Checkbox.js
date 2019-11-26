export default {
  name: 'Checkbox',
  props: ['value'],
  // model:{
  //   event:'changexx'
  // },
  methods: {
    handleChange(e) {
      console.log('checkbox change', e.target.checked);
      this.$emit('input', e.target.checked);
    },
  },
  render() {
    return (
      <label class={`${prefix}-checkbox-wrapper`}>
        <input type="checkbox" checked={this.value} onChange={this.handleChange}></input>
        {this.$slots.default}
      </label>
    );
  },
};
