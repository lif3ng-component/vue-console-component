import { getParameters } from "codesandbox/lib/api/define";

const mainJs = `
import Vue from "vue";
import lib from "lif3ng-console-vue-component";
import 'lif3ng-console-vue-component/lib/lib.css';
import App from "./App.vue";

Vue.use(lib)
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");`;
const appVueSrc = `
<template>
  <div id="app">
    <Demo/>
  </div>
</template>

<script>
import Demo from "./components/Demo";
export default {
  name: "App",
  components: {
    Demo
  }
};
</script>

<style>
</style>
`;
const getSanboxParameters = vueContent =>
  getParameters({
    files: {
      "package.json": {
        content: {
          // scripts: {
          //   "serve": "vue-cli-service serve",
          // },
          dependencies: {
            // "core-js": "^3.3.2",
            vue: "^2.6.10",
            // "@vue/cli-plugin-babel": "^4.1.1",
            // "@vue/cli-plugin-eslint": "^4.1.1",
            // "@vue/cli-plugin-unit-jest": "^4.1.1",
            // "@vue/cli-service": "^4.1.1",
            "lif3ng-console-vue-component":'0.1.26'
          }
        }
      },
      "src/main.js":{
        content:mainJs
      },
      "src/App.vue":{
        content:appVueSrc
      },
      "src/components/Demo.vue":{
        content:vueContent
      }
    }
  });
export const getSandboxUrl = vue => {
  const parameters = getSanboxParameters(vue)
  console.log(parameters)
  window.open(`https://codesandbox.io/api/v1/sandboxes/define?parameters=${parameters}`)
  return "getSandbox" + vue.substr(0, 100);
};
