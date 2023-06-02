import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './piugins/element'
import api from './api'
import 'normalize.css'
import '@/assets/css/base.css'
Vue.config.productionTip = false
Vue.prototype.$api = api
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
