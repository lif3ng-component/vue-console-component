import Vue from "vue";
import App from "./App.vue";
import lib from "./lib";

Vue.config.productionTip = false;
Vue.use(lib);

new Vue({
  render: h => h(App)
}).$mount("#app");
