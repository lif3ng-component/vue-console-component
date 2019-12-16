import Vue from "vue";
import Confirm from "./Confirm.vue";

const ConfirmConstrunctor = Vue.extend(Confirm);

const $msg = options => {
  const data = typeof options === "string" ? { message: options } : options;
  const instance = new ConfirmConstrunctor({ data });
  instance.$mount();
  document.body.append(instance.$el);
  return {
    then: instance.setConfirmFn,
    catch: instance.setCloseFn
  };
};

export default $msg;
