// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'

import "@/common/stylus/index.styl"

Vue.use(VueResource)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app', //要被替换的index.html中的元素
  router,
  components: {
    App
  },
  template: '<App/>' //等于在index.html文件里面id=app的div里面插入一个<App/>
})
