import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [
  {path:'/',redirect:'/login'},//重定向到login
  {path:'/login',component:Login},
  {path:'/home',component:Home},
  {path: '*', redirect: '/error'},//404
]

const router = new VueRouter({
  routes
})
/**
 * 挂载路由导航守卫
 * to 将要访问路径
 * from 从哪个页面跳转过来的
 * next 是一个函数
 *  next()表示放行 next('/login') 强制跳转到login页面
 */

router.beforeEach((to,from,next)=>{
  if(to.path == '/login'){
    return next();
  }
  let token = window.sessionStorage.getItem("token");
  if(!token){
    return next('/login');
  }
  next();
});


export default router
