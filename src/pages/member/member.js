
//  1. 使用 vue-router 插件
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)       //  使用路由插件

//  2. 创建 router 实例
let routes = [{
  path: '/',
  component: require('./components/member.vue').default
}]
let router = new Router({
  routes
})

//  3.根组件的注入
new Vue({
  el: '#app',
  router,
  data:{

  },
  methods:{

  }
})
