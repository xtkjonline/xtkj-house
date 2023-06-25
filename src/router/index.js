import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from "../layout/index.vue"
import login from "../views/login/index.vue"
import { number } from 'echarts'


// 当从当前页面跳转至当前页面时，需要写下面这三段代码，才能不报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


Vue.use(VueRouter)

const constantRoutes = [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/layout',
    name: 'layout',
    component: layout,
    meta: { title: '首页', role: ['super', 'normal'], icon: 'icon-shouye1' },
    redirect: '/layout/home',
    children: [
      // 首页
      {
        path: '/layout/home',
        meta: { title: '主页', role: ['super', 'normal'], icon: 'icon-shouye1' },
        component() { return import("../views/home/index.vue") }
      },
    ]
  },
]

const dynamicRoutes = [
  {
    path: '/layout/order',
    component: layout,
    meta: { title: '订单管理', role: ['super'], icon: 'icon-dingdan' },
    redirect: '/layout/order',
    children: [
      // order
      {
        path: '/layout/order',
        meta: { title: '订单详情', role: ['super'] },
        component() { return import("../views/order/index.vue") }
      },
    ]
  },
  {
    path: '/layout/goods',
    component: layout,
    meta: { title: '商品管理', role: ['super', 'normal'], icon: 'icon-shangpin' },
    redirect: '/layout/goods',
    children: [
      // 商品
      {
        path: '/layout/goods',
        meta: { title: '商品列表', role: ['super', 'normal'] },
        component() { return import("../views/goods/index.vue") }
      },
      {
        path: '/layout/addgoods',
        meta: { title: '商品添加', role: ['super', 'normal'] },
        component() { return import("../views/goods/addgoods.vue") }
      },
      {
        path: '/layout/classfygoods',
        meta: { title: '商品分类', role: ['super', 'normal'] },
        component() { return import("../views/goods/classfydoods.vue") }
      },
      {
        path: '/layout/editgoods',
        meta: { title: '修改商品', role: ['super', 'normal'] },
        component() { return import("../views/goods/editgoods.vue") }
      },
    ]
  },
  {
    path: '/layout/shop',
    component: layout,
    meta: { title: '店铺管理', role: ['super'], icon: 'icon-dianpu' },
    redirect: '/layout/shop',
    children: [
      // 店铺
      {
        path: '/layout/shop',
        meta: { title: '店铺详情', role: ['super'] },
        component() { return import("../views/shop/index.vue") }
      },
    ]
  },
  {
    path: '/layout/account',
    component: layout,
    meta: { title: '账号管理', role: ['super', 'normal'], icon: 'icon-zhanghao' },
    redirect: '/layout/account',
    children: [
      // 账号
      {
        path: '/layout/account',
        meta: { title: '账号列表', role: ['super', 'normal'] },
        component: () => import("../views/account/index.vue")
      },
      {
        path: '/layout/addaccount',
        meta: { title: '添加账号', role: ['super'] },
        component() { return import("../views/account/addaccount.vue") }
      },
      {
        path: '/layout/updatepass',
        meta: { title: '修改密码', role: ['super', 'normal'] },
        component() { return import("../views/account/updatepass.vue") }
      },
      {
        path: '/layout/userinfo',
        meta: { title: '个人中心', role: ['super', 'normal'] },
        component() { return import("../views/account/userinfo.vue") }
      },
    ]
  },
  {
    path: '/layout/statygoods',
    component: layout,
    meta: { title: '销售统计', role: ['super', 'normal'], icon: 'icon-tongjifenxi-changguitongji' },
    redirect: '/layout/statygoods',
    children: [
      // statistics
      {
        path: '/layout/statygoods',
        meta: { title: '商品统计', role: ['super', 'normal'] },
        component() { return import("../views/statistics/goods.vue") }
      },
      {
        path: '/layout/statyorder',
        meta: { title: '订单统计', role: ['super', 'normal'] },
        component() { return import("../views/statistics/order.vue") }
      },
    ]
  },
]

const router = new VueRouter({
  routes: constantRoutes
})

export const filterroute = () => {
  let role = sessionStorage.getItem('role')
  let routeresult = dynamicRoutes.filter((v) => {
    return v.meta && v.meta.role && v.meta.role.includes(role)
  })
  routeresult.forEach((v) => {
    if (v.children) {
      v.children = v.children.filter((item) => {
        return item.meta && item.meta.role && item.meta.role.includes(role)
      })
    }
  })
  router.addRoutes(routeresult)
  sessionStorage.setItem('routemsg', JSON.stringify([
    {
      path: '/layout',
      name: 'layout',
      component: layout,
      meta: { title: '首页', role: ['super', 'normal'], icon: 'icon-shouye1' },
      redirect: '/layout/home',
      children: [
        // 首页
        {
          path: '/layout/home',
          meta: { title: '主页', role: ['super', 'normal'] },
          component() { return import("../views/home/index.vue") }
        },
      ]
    },
    ...routeresult
  ]))
}
filterroute()


router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next()
  }
  if (sessionStorage.getItem('token')) {
    next()
  } else {
    next('/login')
  }
})

export default router
