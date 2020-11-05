const typeMap = {
  table: "表格",
  formarea: "表单",
  dialog: "弹窗",
  headercontainer: "头部容器",
  datepicker: "日期时间选择器",
  tree: "树形控件",
  popper: "弹出层",
  dropdownmenu: "下拉菜单",
  switch: "开关",
};
const globalNameMap = {
  basic: "基础",
};
const nameMap = {
  table: {
    "column-style": "列文字溢出",
    sort: "列排序",
    "toggle-column": "显示隐藏列",
    "row-style": "行样式设置",
    "cell-style": "列样式设置",
  },
  formarea: {
    "all-item": "各种表单项",
    "header-extra": "头部扩展",
  },
  select: {
    "empty-text": "空值",
    async: "异步",
    "async-with-value": "异步回填",
    multiple: "多选",
  },
  dialog: {
    nested: "嵌套",
  },
  datepicker: {
    "in-form": "表单中的",
  },
  switch: {
    "loading-promise": "Promise 控制的",
  },
};
export default (filename) => {
  const [type, ...key] = filename.split("-");
  const name = key.join("-");
  const spacePadding = (str) => {
    const re = /^[a-zA-Z]/;
    return re.test(str) ? " " : "";
  };
  return `${(nameMap[type] || {})[name] ||
    globalNameMap[name] ||
    name}${spacePadding(typeMap[type] || type)}${typeMap[type] || type}`;
};
