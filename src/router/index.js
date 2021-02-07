import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 公共路由
export const constantRoutes = [
  {
    path: '/redirect',
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: (resolve) => require(['@/views/redirect'], resolve)
      }
    ]
  },
  {
    path: '/login',
    component: (resolve) => require(['@/views/login'], resolve),
    hidden: true
  },
  {
    path: '/register',
    component: (resolve) => require(['@/views/page/register'], resolve),
    hidden: true
  },
  {
    path: '/404',
    component: (resolve) => require(['@/views/error/404'], resolve),
    hidden: true
  },
  {
    path: '/401',
    component: (resolve) => require(['@/views/error/401'], resolve),
    hidden: true
  },
  {
    path: '/',
    name: 'PageView',
    component: resolve => require(['@/views/page/PageView'], resolve),
    children: [
      {
        path: '/',
        redirect: '/index'
      }, {
        path: '/index',
        name: 'index',
        component: resolve => require(['@/views/index'], resolve),
        meta: {
          title: '首页'
        }
      },
      {
        path:'/bonus',
        name: "积分商城",
        component: resolve => require(['@/views/page/bonus'], resolve),
        meta: {
          title: '积分商城'
        }
      },
      {
        path:'/join',
        name: "报名中心",
        component: resolve => require(['@/views/page/join'], resolve),
        meta: {
          title: '报名中心'
        }
      },
      {
        path:'/user',
        name: "个人中心",
        component: resolve => require(['@/views/page/user/index'], resolve),
        meta: {
          title: '个人中心'
        }
      }
    ]
  }
]

export default new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
