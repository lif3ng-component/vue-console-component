import Pagination from "./components/Pagination";
import Icon from "./components/Icon";
import Button from "./components/Button";
import Input from "./components/form/Input";
import Container from "./components/layout/Container.vue";
import Header from "./components/layout/Header.vue";
import HeaderContainer from "./components/layout/HeaderContainer.vue";
import Footer from "./components/layout/Footer.vue";
import Sider from "./components/layout/Sider.vue";
import Main from "./components/layout/Main.vue";
import Menu from "./components/nav/Menu";
import Breadcrumb from "./components/nav/Breadcrumb";
import Table from "./components/Table.vue";
import DropdownMenu from "./components/popper/DropdownMenu";
// directives
import popper from "./components/popper/popper";
import container from "./components/layout/container";

import "./style/index.styl";

const directives = {
  popper,
  container
};
const components = [
  Button,
  Icon,
  Input,
  Pagination,
  Container,
  Header,
  HeaderContainer,
  Footer,
  Sider,
  Main,
  Menu,
  Breadcrumb,
  Table,
  DropdownMenu
];

const globalPrefix = prefix;

const install = (Vue, options = {}) => {
  const { prefix = globalPrefix } = options;
  Vue.prototype.prefix = prefix;
  components.forEach(component => {
    const { name } = component;
    Vue.component(
      `${prefix}${name}`,
      Object.assign(component, { name: `${prefix}${name}` })
    );
  });

  Object.keys(directives).forEach(key => {
    Vue.directive(key, directives[key]);
  });
};

const exportResult = {
  install
};

export default exportResult;
