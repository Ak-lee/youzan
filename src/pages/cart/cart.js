import './cart_base.css'
import './cart_trade.css'
import './cart.css'

import Vue from 'vue'
import axios from 'axios'
import mixin from 'js/mixin.js'
import url from 'js/api.js'
import Velocity from 'velocity-animate'

new Vue({
  el:'.container',
  data:{
    lists:null,
    total:0,
    editingShop:null,
    editingShopIndex:-1,
    removePopup: false,
    removeMsg:'确定要删除该商品吗？',
    removeData:null
  },
  computed:{
    allSelected: {
      get(){
        if(this.lists && this.lists.length){
          return this.lists.every(shop=>{
            return shop.checked
          })
        }
        return false
      },
      set(newValue){
        this.lists.forEach(shop=>{
          shop.checked = newValue
          shop.goodsList.forEach(good=>{
            good.checked = newValue
          })
        })
      }
    },
    allRemoveSelected:{
      get(){
        if(this.editingShop){
          return this.editingShop.removeChecked
        }else{
          return false
        }
      },
      set(newValue){
        if(this.editingShop){
          this.editingShop.removeChecked = newValue
          this.editingShop.goodsList.forEach(good=>{
            good.removeChecked = newValue
          })
        }
      }
    },
    selectLists(){
      if(this.lists && this.lists.length){
        let arr = []
        let total = 0
        this.lists.forEach(shop=>{
          shop.goodsList.forEach(good=>{
            if(good.checked){
              arr.push(good)
              total += good.price * good.number
            }
          })
        })
        this.total = total
        return arr
      }else{
        return []
      }
    },
    removeLists(){
      if(this.editingShop){
        let arr = []
        this.editingShop.goodsList.forEach(good=>{
          if(good.removeChecked){
            arr.push(good)
          }
        })
        return arr
      }else{
        return []
      }
    }
  },
  created(){
    this.getList()
  },
  methods:{
    getList(){
      axios.post(url.cartLists)
        .then(res=>{
          let temp = res.data.cartList
          temp.forEach(shop =>{
            shop.checked = true;
            shop.removeChecked = false;
            shop.editing = false;
            shop.editingMsg = '编辑'
            shop.goodsList.forEach(good=>{
              good.checked = true
              good.removeChecked = false
            })
          })
          this.lists = temp;
        })
    },
    selectGood(shop,good){
      if(!this.editingShop){
        good.checked = !good.checked
        shop.checked = shop.goodsList.every(good=>{
          return good.checked
        })
      }else{
        if(this.editingShop === shop){
          good.removeChecked = !good.removeChecked
          shop.removeChecked = shop.goodsList.every(good=>{
            return good.removeChecked
          })
        }
      }
    },
    selectShop(shop){
      if(!this.editingShop){
        shop.checked = !shop.checked
        shop.goodsList.forEach(good=>{
          good.checked = shop.checked
        })
      }else{
        if(this.editingShop === shop){
          shop.removeChecked = !shop.removeChecked
          shop.goodsList.forEach(good=>{
            good.removeChecked = shop.removeChecked
          })
        }
      }
    },
    selectAll(){
      let isChecked = this.editingShop ? 'allRemoveSelected' : 'allSelected'
      this[isChecked] = !this[isChecked]
    },
    edit(shop,shopIndex){
      shop.editing = !shop.editing
      shop.editingMsg=shop.editing ? '完成':'编辑'
      this.lists.forEach((item,i)=>{
        if(shopIndex !== i ){
          item.editing = false
          item.editingMsg=shop.editing ? '' : '编辑'
        }
      })
      this.editingShop = shop.editing ? shop : null
      this.editingShopIndex = shop.editing? shopIndex : -1
      if(shop.editing){
        this.lists.forEach(shop=>{
          shop.removeChecked = false
          shop.goodsList.forEach(good=>{
            good.removeChecked = false
          })
        })
      }
    },
    add(good){
      axios.post(url.cartAdd,{
        id: good.id,
        number: 1
      }).then(res=>{
        good.number ++
      })
    },
    reduce(good){
      if(good.number === 1){
        return
      }else{
        axios.post(url.cartReduce,{
          id:good.id,
          number: 1
        }).then(res=>{
          good.number --
        })
      }
    },
    removeConfirm() {
      if(this.removeMsg === '确定要删除该商品吗？'){
        let {shop,shopIndex,good,goodIndex} = this.removeData
        fetch(url.cartRemove,{
          id: good.id
        }).then(res => {
          shop.goodsList.splice(goodIndex, 1)
          if(!shop.goodsList.length) {
            this.lists.splice(shopIndex, 1)
            this.removeShop()
          }
          this.removePopup  = false
          // this.$refs[`goods-${shopIndex}-${goodIndex}`][0].style.left = '0px'
        })
      }else {
        let ids = []
        this.removeLists.forEach(good => {
          ids.push(good.id)
        })
        axios.post(url.cartMremove, {
          ids
        }).then(res => {
          let arr = []
          this.editingShop.goodsList.forEach(good => {
            let index = this.removeLists.findIndex(item => {
              return item.id == good.id
            })
            if(index === -1) {    // 若removeLists 中没有这件商品，则把这件商品push到arr中
              arr.push(good)
            }
          })
          if(arr.length) {
            this.editingShop.goodsList = arr
          } else {
            this.removeShop(this.editingShopIndex)
          }
          this.removePopup  = false
        })
      }
    },
    remove(shop,shopIndex,good,goodIndex){
      this.removePopup = true
      this.removeData = {shop, shopIndex, good, goodIndex}
    },
    removeShop(shopIndex){
      this.lists.splice(shopIndex,1)
      this.editingShop = null
      this.editingShopIndex = -1
      this.lists.forEach((shop)=>{
        shop.editing = false
        shop.editingMsg='编辑'
      })
    },
    removeList(){
      this.removePopup = true
      this.removeMsg = `确定将所选 ${this.removeLists.length} 个商品删除？`
    },
    start(e,good){
      good.startX = e.changedTouches[0].clientX
    },
    end(e,shopIndex,good,goodIndex){
      let endX =  e.changedTouches[0].clientX
      let left = '0px'
      if(good.startX - endX > 100){
        left='-60px'
      }
      if(endX - good.startX > 100){
        left='0px'
      }
      Velocity(this.$refs[`goods-${shopIndex}-${goodIndex}`],{
        left
      })
    }
  },
  mixins:[mixin]
})
