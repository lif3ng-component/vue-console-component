// 收集 form component
export const formCollectMixin = {
  // provide: {
  //   reportFormComponent: () => this.pushFormComponents,
  // },
  provide() {
    return {
      reportFormComponent: this.pushFormComponents
    };
  },
  data() {
    return {
      formComponents: []
    };
  },
  computed: {
    formValidate() {
      return () =>
        Promise.all(this.formComponents.map(({ validate }) => validate()));
    }
  },
  methods: {
    pushFormComponents(component) {
      this.formComponents.push(component);
    }
  }
};

// 上报 form component(this)
export const formReportMixin = {
  inject: {
    reportFormComponent: { default: null }
  },
  mounted() {
    if (this.reportFormComponent) {
      this.reportFormComponent(this);
    }
  }
};
