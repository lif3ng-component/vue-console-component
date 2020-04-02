const dialogList = [];

const dialogMixin = {
  data() {
    return {
      commonDialogList: dialogList
    };
  },
  mounted() {
    this.commonDialogList.push(this.$el);
  },
  beforeDestroy() {
    this.commonDialogList.pop();
  },
  computed: {
    dialogListLen() {
      return this.commonDialogList.length;
    },
    lastDialogEl() {
      if (this.dialogListLen > 0) {
        return this.commonDialogList[this.commonDialogList.length - 1];
      }
      return null;
    }
  }
};

export default dialogMixin;
