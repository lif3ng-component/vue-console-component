import Pagination from "@/components/Pagination";
import Icon from "@/components/Icon";
import Button from "@/components/Button";
import Container from "@/components/layout/Container.vue";
import Header from "@/components/layout/Header.vue";
import HeaderContainer from "@/components/layout/HeaderContainer.vue";
import Footer from "@/components/layout/Footer.vue";
import Sider from "@/components/layout/Sider.vue";
import Main from "@/components/layout/Main.vue";
import Menu from "@/components/nav/Menu";
import Breadcrumb from "@/components/nav/Breadcrumb";
import Table from "@/components/Table.vue";
import PaginTable from "@/components/PaginTable";
import DropdownMenu from "@/components/popper/DropdownMenu";
import Form from "@/components/form/Form";
import FormArea from "@/components/form/FormArea";
import FormItem from "@/components/form/FormItem";
import Input from "@/components/form/Input";
import Checkbox from "@/components/form/Checkbox";
import CheckboxGroup from "@/components/form/CheckboxGroup";
import Dialog from "@/components/Dialog";
// directives
import popper from "@/components/popper/popper";
import container from "@/components/layout/container";
// filters
import filters from "@/filters";
// prototype function
import $message from "@/components/notice/messageFn";

import defaultOptions from "./defaultOptions";

import "@/style/index.styl";

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
  PaginTable,
  DropdownMenu,
  Form,
  FormItem,
  FormArea,
  Checkbox,
  CheckboxGroup,
  Dialog
];

const globalPrefix = prefix;

const install = (Vue, options = {}) => {
  const {
    prefix = globalPrefix,
    formareaItemType,
    paginArgsHandler,
    paginSize,
    paginSizeOptions,
    stringMap = {}
  } = options;
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

  Object.keys(filters).forEach(key => {
    if (key === "mapString") {
      Vue.filter(key, filters[key].bind(Vue));
      // Vue.filter(key, function (...args) { return filters[key].call(this, ...args); });
    } else {
      Vue.filter(key, filters[key].bind(filters));
    }
  });

  Vue.prototype.$message = $message;
  Vue.prototype.$STRING_MAP = stringMap;
  Vue.prototype.$default = {
    formarea: { type: formareaItemType || defaultOptions.formareaItemType },
    paginArgsHandler: paginArgsHandler || defaultOptions.paginArgsHandler,
    paginSize: paginSize || defaultOptions.paginSize,
    paginSizeOptions: paginSizeOptions || defaultOptions.paginSizeOptions
  };
};

const exportResult = {
  install
};

export default exportResult;
