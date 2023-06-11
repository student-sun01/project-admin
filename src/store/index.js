import Vue from "vue";
import Vuex from "vuex";
import product from "./modules/product";
import createPersistedstate from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse: false,
  },
  getters: {},
  mutations: {
    changeIsCollapse(state, bool) {
      state.isCollapse = bool;
    },
  },
  actions: {},
  modules: {
    product,
  },
  //plugins:[] vuex插件-持久化 数组语法 多个插件名称
  plugins: [
    createPersistedstate({
      key: "info", //存储vuex数据的任意键名--本地存储里面 localStorage
      paths: ["product"], //存储的模块名称一级全局state数据  不写默认存储所有内容
    }),
    //...
  ],
});
