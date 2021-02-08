import router from './router'
import store from './store'
import {Message} from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {getToken} from '@/utils/auth'

NProgress.configure({showSpinner: false})

const whiteList = ['/index', '/login', '/auth-redirect', '/register', '/mobile/login', '/mobile/register','/mobile/index']

router.beforeEach((to, from, next) => {
  console.log("\n\n\n this is permission.js beforeEach function: >>> ")
  console.log("from.path -> to.path: >>> " + from.path + " -> " + to.path);

  let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)

  if (flag) {
    if (to.path.indexOf("mobile") === -1) {
      to = {
        path: "/mobile" + to.path
      }
      console.log(" new from.path -> to.path: >>> " + from.path + " -> " + to.path);
      if (to.path !== from.path) {
        router.replace(to.path).catch(e => ({}));
      }
    }
  }

  NProgress.start()
  if (getToken()) {
    if (to.path === '/login' || to.path === '/mobile/login') {
      next({path: '/'})
      NProgress.done()
    } else {
      if (Object.keys(store.getters.info).length === 0) {
        store.dispatch('GetUserId').then(res => {
          const userId = res.id
          store.dispatch('GetInfo', {userId}).then(accessRoutes => {
            next()
          })
        }).catch(err => {
          store.dispatch('LogOut').then(() => {
            Message.error(err)
            next({path: '/'})
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
