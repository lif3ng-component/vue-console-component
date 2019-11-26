import Pagination from "./components/Pagination";
import Icon from "./components/Icon";
import Button from "./components/Button";
import Input from "./components/form/Input";
import "./style/index.styl";

const components = [Button, Icon, Input, Pagination];

const globalPrefix = prefix;

const install = (Vue, options = {}) => {
  const { prefix = globalPrefix } = options;
  components.forEach(component => {
    const { name } = component;
    Vue.component(
      `${prefix}${name}`,
      Object.assign(component, { name: `${prefix}${name}` })
    );
  });
};

const exportResult = {
  install
};

export default exportResult;
