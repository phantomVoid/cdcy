import Vue from 'vue'

import Cookies from 'js-cookie'

import Element from 'element-ui'
import './assets/styles/element-variables.scss'

import '@/assets/styles/reset.min.css'
import '@/assets/styles/index.scss'
import '@/assets/styles/common.scss'
import App from './App'
import store from './store'
import router from './router'
import './permission'

import './assets/icons'
import Pagination from "@/components/Pagination";

import {getDicts} from "@/api/dict";
import {parseTime, resetForm, selectDictLabel} from "@/utils/common";

Vue.prototype.getDicts = getDicts
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.selectDictLabel = selectDictLabel

import Header from './components/Header'

import MobileHeader from './components/mobile/Header'


Vue.component(Header.name, Header)

Vue.component(MobileHeader.name, MobileHeader)



import Footer from './components/Footer'

Vue.component(Footer.name, Footer)

import GoTop from './components/GoTop'

Vue.component(GoTop.name, GoTop)

Vue.prototype.msgSuccess = function (msg) {
  this.$message({showClose: true, message: msg, type: "success"});
}

Vue.prototype.msgError = function (msg) {
  this.$message({showClose: true, message: msg, type: "error"});
}

Vue.prototype.msgInfo = function (msg) {
  this.$message.info(msg);
}

Vue.prototype.msgWarn = function (msg) {
  this.$message({showClose: true, message: msg, type: "warning"});
}

Vue.component('Pagination', Pagination)


Vue.use(Element, {
  size: 'medium'
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  // methods: {
  //   //判断
  //   _isMobile() {
  //     let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  //     console.log("this is _isMobile function flag: >>> " + flag);
  //     return flag;
  //   }
  // },
  // created() {
  //   if (this._isMobile()) {
  //     //手机端
  //     this.ismOrpc = 'Moperation'
  //     // //设置rem
  //     window.onload = function () {
  //       getRem(1920, 100)
  //     };
  //     window.onresize = function () {
  //       getRem(1920, 100)
  //     };
  //
  //     function getRem(pwidth, prem) {
  //       var html = document.getElementsByTagName("html")[0];
  //       var oWidth = document.body.clientWidth || document.documentElement.clientWidth;
  //       html.style.fontSize = oWidth / pwidth * prem + "px";
  //       console.log("html: >>> ");
  //       console.log(html.style.fontSize)
  //       console.log("oWidth: >>> " + oWidth)
  //
  //     }
  //   } else {
  //     //pc端
  //     this.ismOrpc = 'PCoperation'
  //   }
  // }
})
