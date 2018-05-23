import './cart_base.css'
import './cart_trade.css'
import './cart.css'

import Vue from 'vue'
import axios from 'axios'
import mixin from 'js/mixin.js'
import url from 'js/api.js'

new Vue({
  el:'.container',
  data:{
    lists:null
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
            shop.goodsList.forEach(good=>{
              good.checked = true
            })
          })
          this.lists = temp;
        })
    },
    selectGood(shop,good){
      good.checked = !good.checked;
      shop.checked = shop.goodsList.every(good=>{
        return good.checked
      })
    },
    selectShop(shop){
      shop.checked = !shop.checked
      shop.goodsList.forEach(good=>{
        good.checked = shop.checked
      })
    },
    selectAll(){
      this.allSelected = !this.allSelected
    }
  },
  mixins:[mixin]
})
