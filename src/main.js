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

import { getDicts } from "@/api/dict";
import { parseTime , resetForm , selectDictLabel} from "@/utils/common";

Vue.prototype.getDicts = getDicts
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.selectDictLabel = selectDictLabel

import Header from './components/Header'
Vue.component(Header.name,Header)


import Footer from './components/Footer'
Vue.component(Footer.name,Footer)

import GoTop from './components/GoTop'
Vue.component(GoTop.name,GoTop)

Vue.prototype.msgSuccess = function (msg) {
  this.$message({ showClose: true, message: msg, type: "success" });
}

Vue.prototype.msgError = function (msg) {
  this.$message({ showClose: true, message: msg, type: "error" });
}

Vue.prototype.msgInfo = function (msg) {
  this.$message.info(msg);
}

Vue.prototype.msgWarn = function (msg) {
  this.$message({ showClose: true, message: msg, type: "warning" });
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
  render: h => h(App)
})
