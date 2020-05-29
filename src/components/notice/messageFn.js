import Vue from "vue";
import Message from "./Message.vue";

const MessageConstrunctor = Vue.extend(Message);

const $msg = options => {
  const data = typeof options === "string" ? { message: options } : options;
  const instance = new MessageConstrunctor({ data });
  Vue.nextTick(() => {
    instance.$mount();
    document.body.append(instance.$el);
  });
  return instance;
};

["success", "error"].forEach(type => {
  $msg[type] = options => {
    const data = typeof options === "string" ? { message: options } : options;
    data.type = type;
    return $msg(data);
  };
});

export default $msg;
