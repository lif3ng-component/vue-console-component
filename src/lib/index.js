import Pagination from "@/components/Pagination";
import Icon from "@/components/Icon";
import Button from "@/components/Button";
import ButtonArea from "@/components/ButtonArea";
import Container from "@/components/layout/Container.vue";
import Header from "@/components/layout/Header.vue";
import HeaderContainer from "@/components/layout/HeaderContainer.vue";
import Footer from "@/components/layout/Footer.vue";
import Sider from "@/components/layout/Sider.vue";
import Main from "@/components/layout/Main.vue";
import Menu from "@/components/nav/Menu";
import Breadcrumb from "@/components/nav/Breadcrumb";
import TableHeader from "@/components/TableHeader";
import Table from "@/components/Table.vue";
import SearchInput from "@/components/SearchInput";
import PaginTable from "@/components/PaginTable";
import DropdownMenu from "@/components/popper/DropdownMenu";
import Form from "@/components/form/Form";
import FormArea from "@/components/form/FormArea";
import FormItem from "@/components/form/FormItem";
import Input from "@/components/form/Input";
import Select from "@/components/form/Select";
import Switch from "@/components/form/Switch";
import Checkbox from "@/components/form/Checkbox";
import CheckboxGroup from "@/components/form/CheckboxGroup";
import Dialog from "@/components/Dialog";
// page
import LoginPage from "@/components/page/LoginPage";
// directives
import popper from "@/components/popper/popper";
import container from "@/components/layout/container";
// filters
import filters from "@/filters";
// prototype function
import messageFn from "@/components/notice/messageFn";
import confirmFn from "@/components/notice/confirmFn";
// mixins
import { formCollectMixin } from "@/mixins/formMixins";
import { paginTableOuterMixin } from "@/mixins/tableMixins";

import defaultOptions from "./defaultOptions";

import "@/style/index.styl";

const directives = {
  popper,
  container
};
const components = [
  Button,
  ButtonArea,
  Icon,
  Input,
  Select,
  Switch,
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
  TableHeader,
  SearchInput,
  PaginTable,
  DropdownMenu,
  Form,
  FormItem,
  FormArea,
  Checkbox,
  CheckboxGroup,
  Dialog,
  LoginPage
];

const globalPrefix = prefix;

const install = (Vue, options = {}) => {
  const {
    prefix = globalPrefix,
    formareaItemType,
    paginArgsHandler,
    paginSize,
    paginSizeOptions,
    selectValueName,
    selectLabelName,
    selectOptionsMap = defaultOptions.selectOptionsMap,
    stringMap = defaultOptions.stringMap
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

  Vue.prototype.$message = messageFn;
  Vue.prototype.$confirm = confirmFn;

  const selectOptionsMapResult = {};
  const stringMapFromSelectOptionsMap = {};

  const labelName = selectLabelName || defaultOptions.selectLabelName;
  const valueName = selectValueName || defaultOptions.selectValueName;
  Object.keys(selectOptionsMap).forEach(k => {
    selectOptionsMapResult[k] = selectOptionsMap[k].map(({ label, value }) => ({
      [labelName]: label,
      [valueName]: value
    }));

    stringMapFromSelectOptionsMap[k] = {};
    selectOptionsMap[k].forEach(({ label, value }) => {
      stringMapFromSelectOptionsMap[k][value] = label;
    });
  });
  Vue.prototype.$SELECT_OTPIONS_MAP = selectOptionsMapResult;

  Vue.prototype.$STRING_MAP = {
    ...stringMapFromSelectOptionsMap,
    ...stringMap
  };
  Vue.prototype.$default = {
    formarea: { type: formareaItemType || defaultOptions.formareaItemType },
    paginArgsHandler: paginArgsHandler || defaultOptions.paginArgsHandler,
    paginSize: paginSize || defaultOptions.paginSize,
    paginSizeOptions: paginSizeOptions || defaultOptions.paginSizeOptions,
    selectLabelName: selectLabelName || defaultOptions.selectLabelName,
    selectValueName: selectValueName || defaultOptions.selectValueName
  };
};

const exportResult = {
  install
};

export default exportResult;

export const mixins = {
  formCollectMixin,
  paginTableOuterMixin
};
