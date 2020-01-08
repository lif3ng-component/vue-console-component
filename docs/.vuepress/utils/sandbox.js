import { getParameters } from "codesandbox/lib/api/define";

const mainJs = `import Vue from "vue";
import lib from "pkgname";
import 'pkgname/lib/lib.css';
import App from "./App.vue";

Vue.use(lib)
Vue.config.productionTip = false;

new Vue({
	render: h => h(App)
}).$mount("#app");`;
const appVueSrc = `<template>
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
          dependencies: {
            vue: "^2.6.10",
            pkgname: "pkgversion"
          }
        }
      },
      "src/main.js": {
        content: mainJs
      },
      "src/App.vue": {
        content: appVueSrc
      },
      "src/components/Demo.vue": {
        content: vueContent
      }
    }
  });
export const getSandboxUrl = vue => {
  const parameters = getSanboxParameters(vue);
  window.open(
    `https://codesandbox.io/api/v1/sandboxes/define?parameters=${parameters}`
  );
  return "getSandbox" + vue.substr(0, 100);
};
