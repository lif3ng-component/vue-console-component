export const paginTableOuterMixin = {
  provide() {
    return {
      setQueryFn: this.setQueryFn
    };
  },
  data() {
    return {
      doQueryFn: null
    };
  },
  methods: {
    setQueryFn(fn) {
      this.doQueryFn = fn;
    }
  }
};

export const reportQueryFnMixin = {
  inject: {
    setQueryFn: { default: null }
  },
  mounted() {
    this.setQueryFn && this.setQueryFn(this.doRequest);
  }
};
