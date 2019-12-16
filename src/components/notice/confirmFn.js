import Vue from "vue";
import Confirm from "./Confirm.vue";

const ConfirmConstrunctor = Vue.extend(Confirm);

const $msg = options => {
  const data = typeof options === "string" ? { message: options } : options;

  return new Promise((resolve, reject) => {
    const instance = new ConfirmConstrunctor({
      data: {
        ...data,
        resolve,
        reject
      }
    });
    instance.$mount();
    document.body.append(instance.$el);
  });
};

export default $msg;
