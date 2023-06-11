import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './piugins/element'
import api from './api'
import 'normalize.css'
import '@/assets/css/base.css'
import JsonExcel from "vue-json-excel";
import Breadcrumb from "./components/Breadcrumb/Breadcrumb.vue";
Vue.component("downloadExcel", JsonExcel);
Vue.config.productionTip = false
/* 注册全局面包屑组件 */
Vue.component("Breadcrumb", Breadcrumb);
Vue.prototype.$api = api
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
