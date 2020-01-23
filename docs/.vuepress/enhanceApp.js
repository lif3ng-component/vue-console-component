import lib from "../../src/lib";
import demoComponents from "./demosComponents";
export default ({ Vue }) => {
  Vue.use(lib);
  demoComponents.forEach(k => {
    Vue.component(k, () => import(`@demo/${k}`));
    Vue.component(`${k}-src`, () =>
      import(`!raw-loader!@demo/${k}`).then(({ default: str }) => {
        return {
          render() {
            return (
              <pre>
                <code>{str}</code>
              </pre>
            );
          }
        };
      })
    );
  });
};
