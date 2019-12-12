import Vue from "vue";
import moment from "moment";
import renderTpl from "./utils/renderTpl";

export default {
  renderTpl,
  mapString(originStr, type) {
    return this.prototype.$STRING_MAP[type][originStr] || originStr;
  },
  datetime(t) {
    if (!t) return "";
    return moment(t).format("YYYY/MM/DD HH:mm:ss");
  },
  date(t) {
    if (!t) return "";
    return moment(t).format("YYYY/MM/DD");
  },
  handleFilter(data, filter) {
    // filter:
    // - string: flitername
    // - array: [filtername, ...args]
    // const filtername = typeof filter === 'string' ? filter : filter[0];

    // const args = typeof filter === 'string' ? [], filter
    const [filtername, ...args] =
      typeof filter === "string" ? [filter] : filter;
    if (filtername === "mapString") {
      return this[filtername].bind(Vue, data, ...args)();
    }
    return this[filtername](data, ...args);
  }
};
