import Vue from 'vue'
import axios from 'axios'
import './plugins/element'
import App from './App.vue'
import router from './router/router'
import store from './store'
import './assets/global.css'

//请求拦截器，在请求路径中加入Authoration参数
axios.interceptors.request.use(config => {
  config.headers.Authoration = window.sessionStorage.getItem("token");
  config.baseURL='/api'
  return config;
})
Vue.prototype.$http = axios;

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
