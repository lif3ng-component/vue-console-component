// 收集 form component
export const formCollectMixin = {
  // provide: {
  //   reportFormComponent: () => this.pushFormComponents,
  // },
  provide() {
    return {
      reportFormComponent: this.pushFormComponents,
      removeFormComponents: this.removeFormComponents
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
    },
    removeFormComponents(component) {
      const index = this.formComponents.indexOf(component);
      if (index === -1) return;
      this.formComponents.splice(index, 1);
    }
  }
};

// 上报 form component(this)
export const formReportMixin = {
  inject: {
    reportFormComponent: { default: null },
    removeFormComponents: { default: null }
  },
  mounted() {
    if (this.reportFormComponent) {
      this.reportFormComponent(this);
    }
  },
  beforeDestroy() {
    if (this.removeFormComponents) {
      this.removeFormComponents(this);
    }
  }
};
