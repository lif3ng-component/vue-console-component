import Vue from "vue";
import App from "./App.vue";
import lib from "./lib";

Vue.config.productionTip = false;
Vue.use(lib, {
  selectOptionsMap: {
    preset1: [
      { label: "l1", value: "v1" },
      { label: "l2", value: "v2" }
    ]
  }
});

new Vue({
  render: h => h(App)
}).$mount("#app");
