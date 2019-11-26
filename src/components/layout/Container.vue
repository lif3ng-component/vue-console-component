
<script>
export default {
  name: 'Container',
  computed: {
    childComponentsNames() {
      console.log('children VNode List:', this.$slots.default);
      console.log(
        'childNames',
        this.$slots.default
          .map(({ tag }) => {
            const result = tag.match('[A-Z][a-z]*$');
            return result && result[0];
          })
          .filter(name => name)
          .map(name => name.toLowerCase())
          .join('-'),
      );
      return this.$slots.default
        .map(({ tag }) => {
          const result = tag.match('[A-Z][a-z]*$') || tag.match('[a-z]*$');
          console.log(result && result[0]);
          return result && result[0];
        })
        .filter(name => name)
        .map(name => name.toLowerCase())
        .join('-');
    },
  },
  render() {
    return (
      <div class={`${prefix}-container`} children-names={this.childComponentsNames}>
        {this.$slots.default}
      </div>
    );
  },
};
</script>
