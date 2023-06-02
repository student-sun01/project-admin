import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './piugins/element'
import 'normalize.css'
import '@/assets/css/base.css'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
