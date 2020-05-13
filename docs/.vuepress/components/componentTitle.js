const typeMap = {
  // formarea: "表单"
  dialog: "弹窗",
};
const globalNameMap = {
  basic: "基础",
};
const nameMap = {
  formarea: {
    "all-item": "各种表单项",
  },
  select: {
    "empty-text": "空值",
    async: "异步",
    multiple: "多选",
  },
  dialog: {
    nested: "嵌套",
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
