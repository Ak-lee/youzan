// 使用 Vuex 插件
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import Address from 'js/address_service.js'

// 创建 store 实例
const store = new Vuex.Store({
  state: {
    lists: null
  },
  mutations: {  // 同步的事件操作
    init(state,lists){
      state.lists = lists
    },
    add(state,instance){
      state.lists.push(instance)
    },
    remove(state,id){
      let lists = state.lists
      let index = lists.findIndex(item => {
        return item.id === id
      })
      lists.splice(index,1)
    },
    update(state,instance){
      let lists = JSON.parse(JSON.stringify(state.lists))
      let index = lists.findIndex(item => {
        return item.id === instance.id
      })
      lists[index] = instance
      state.lists = lists
    },
    setDefault(state,id){
      let lists = state.lists
      lists.forEach(item => {
        if(item.id === id){
          item.isDefault = true
        }else{
          item.isDefault = false
        }

      })
    }
  },
  actions: {    // 异步的事件操作
    // actions 不能直接对 state 修改，只能通过调用 mutations 来修改 state
    getLists({commit}){
      Address.list().then(res => {
        commit('init', res.data.lists)
      })
    },
    addAction({commit}, instance){
      // 模拟添加id，其实instance应该是有后台返回
      instance.id = parseInt(Math.random())*10000+500
      Address.add(instance)
        .then(res=>{
          commit('add',instance)
        })
    },
    removeAction({commit}, id){
      Address.remove(id).then(res => {
          commit('remove',id)
        })
    },
    updateAction({commit}, instance){
      Address.update(instance).then(res => {
        commit('update',instance)
      })
    },
    setDefaultAction({commit}, id){
      Address.setDefault(id).then(res => {
        commit('setDefault',id)
      })
    }
  }
})

export default store
