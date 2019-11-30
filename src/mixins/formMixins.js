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
      console.log("formValidate by formMixins", this.formComponents.length);
      return () =>
        Promise.all(this.formComponents.map(({ validate }) => validate()));
    }
  },
  methods: {
    pushFormComponents(component) {
      console.log("get form by formMixins");
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
