<script>
export default {
  name: "Message",
  data() {
    return {
      message: "",
      type: "success",
      top: false
    };
  },
  mounted() {
    try {
      const isHeaderTop = document
        .elementFromPoint(1, 1)
        .closest(`.${this.prefix}-header`);
      if (!isHeaderTop) {
        this.top = true;
      }
      // eslint-disable-next-line no-empty
    } catch (e) {}
    setTimeout(() => {
      this.handleClose();
    }, 1500);
  },
  computed: {},
  methods: {
    handleClose() {
      this.$destroy();
      document.body.removeChild(this.$el);
    }
  },
  render() {
    return (
      <div
        class={[
          `${prefix}-message`,
          `${prefix}-message-${this.type}`,
          { top: this.top }
        ]}
      >
        {this.message}
      </div>
    );
  }
};
</script>
