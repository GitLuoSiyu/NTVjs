import api from "./api";

export default {
  install: (Vue, options) => {
    Vue.prototype.$api = api;
    // 需要挂载的都放在这里
  }
};
