
//  1. 使用 vue-router 插件
import Vue from 'vue'
import Router from 'vue-router'
// import member from './components/member.vue'
Vue.use(Router)       //  使用路由插件

//  2. 创建 router 实例
let routes = [{
  path: '/',
  component: require('./components/member.vue').default
  // component: member
},{
  path:'/address',
  component: require('./components/address.vue').default,
  children:[{
      path:'',
      redirect: 'all'
    },
    {
    path:'all',
    component:require('./components/all.vue').default
  },{
    path:'form',
    component:require('./components/form.vue').default
  }]
}
]
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
