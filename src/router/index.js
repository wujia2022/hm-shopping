import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'
import Login from '@/views/login'
import Myorder from '@/views/myorder'
import Pay from '@/views/pay'
import Search from '@/views/search'
import Home from '@/views/layout/home'
import Cart from '@/views/layout/cart'
import User from '@/views/layout/user'
import Category from '@/views/layout/category'
import store from '@/store'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        { path: '/home', component: Home },
        { path: '/cart', component: Cart },
        { path: '/user', component: User },
        { path: '/category', component: Category }
      ]
    },
    { path: '/login', component: Login },
    { path: '/myorder', component: Myorder },
    { path: '/pay', component: Pay },
    { path: '/search', component: Search }
  ]
})
// 所有的路由在真正被访问之前（解析渲染对应组件页面前），都会经过全局前置守卫
// 只有全局前置守卫放行了，才会到达对应的页面
// to: 到哪去，完整路由信息对象（路径，参数）
// from: 从哪来，完整路由信息对象（路径，参数）
// next():是否放行
// （1）next() 直接放行到to要去的路径
// （2）next(路径) 进行拦截，拦截到next里面配置的路径
const authUrls = ['/myorder', '/pay']
router.beforeEach((to, from, next) => {
  // 非权限页面，直接放行
  if (!authUrls.includes(to.path)) {
    next()
    return
  }
  // 权限页面，需要判断token
  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})
export default router
