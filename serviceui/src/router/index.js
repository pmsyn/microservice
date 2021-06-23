import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const constRouter = new VueRouter({
    mode: 'history', // 去掉url中的#
    routes: [
        {path: '/', redirect: '/login'},//重定向到login
        {path: '/login', component: () => import('@/components/Login.vue')},
        {
            path: '/home',
            component: () => import('@/components/Home.vue'),
            redirect: '/welcome',
            children: [
                {path: '/welcome', component: () => import('@/views/Welcome')},
                {path: '/UserList', component: () => import('@/views/users/UserList')}
            ]
        },
        {path: '/error', component: () => import('@/views/Error')},//404
    ]
})
/**
 * 挂载路由导航守卫
 * to 将要访问路径
 * from 从哪个页面跳转过来的
 * next 是一个函数
 *  next()表示放行 next('/login') 强制跳转到login页面
 */

constRouter.beforeEach((to, from, next) => {
    let token = window.sessionStorage.getItem("token");
    if (to.path == '/login') {
        if (token) {
            return next('/home');
        }
        return next();
    }
    if (!token) {
        return next('/login');
    }
    next();
});


export default constRouter
