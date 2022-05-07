import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // internationalization
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

if (process.env.NODE_ENV !== 'production') {
  require('../mock')
}

import { storage } from '@/utils/storage'
import * as utils from '@/utils'
import api from '@/api'
Vue.prototype.$utils = utils
Vue.prototype.$storage = storage
Vue.prototype.$api = api

// 全局组件注册
import Components from '@/components'

// mixin 混入方法
import Mixin from '@/mixin'

Vue.use(Mixin)

Vue.use(Components)

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
