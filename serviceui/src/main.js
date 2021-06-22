import Vue from 'vue'
import App from './App.vue'
import store from './store'
import index from './router'
import axios from 'axios'
import './plugins/element'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import './assets/global.css'
import './assets/icon/iconfont/iconfont.css'

//请求拦截器，在请求路径中加入Authoration参数
axios.interceptors.request.use(config => {
  config.headers.Authoration = window.sessionStorage.getItem("token");
  config.baseURL='/api'
  NProgress.start();//显示进度条
  return config;
})

axios.interceptors.response.use(config=>{
  NProgress.done();//隐藏进度条
  return config;
})
Vue.prototype.$http = axios;
Vue.config.productionTip = false


new Vue({
  router: index,
  store,
  render: h => h(App)
}).$mount('#app')
