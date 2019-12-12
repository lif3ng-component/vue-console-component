export default (value, tpl) => {
  return tpl.replace(/\{\{([\w.]+?)\}\}/g, (_, propStr) => {
    if (propStr.indexOf(".") === -1) {
      return typeof value[propStr] === "undefined" ? "" : value[propStr];
    }
    const propsArr = propStr.split(".");
    let innerValue = value;
    while (propsArr.length && innerValue) {
      const prop = propsArr.shift();
      innerValue = innerValue[prop];
    }
    return innerValue || "";
  });
};
