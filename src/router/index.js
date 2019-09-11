import Vue from 'vue'
import Router from 'vue-router'
import goods from 'components/goods/content/goods/goods' //在webpack.base.conf.js中resolve可以设置引用路径
import ratings from '@/components/goods/content/ratings/ratings'
import seller from '@/components/goods/content/seller/seller'

Vue.use(Router)

export default new Router({
  linkActiveClass:'active',
  routes: [{
      path: '/',
      redirect: {
        name: 'goods'
      }, //初始重定向加载页面，此处的‘/’是让页面加载进来的第一个页面是goods的内容
    }, {
      path: '/goods',
      name: 'goods',
      component: goods
    },
    {
      path: "/ratings",
      name: 'ratings',
      component: ratings
    },
    {
      path: "/seller",
      name: "seller",
      component: seller
    }
  ]
})
