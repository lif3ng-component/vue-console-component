<script>
export default {
  name: "Message",
  data() {
    return {
      message: "",
      type: "success"
    };
  },
  mounted() {
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
      <div class={`${prefix}-message ${prefix}-message-${this.type}`}>
        {this.message}
      </div>
    );
  }
};
</script>
