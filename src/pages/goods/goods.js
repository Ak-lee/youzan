import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'
import './goods_transition.css'
import Swipe from 'components/Swipe.vue'

import Vue from 'vue'
import axios from  'axios'
import url from 'js/api.js'
import mixin from 'js/mixin.js'
import qs from 'qs'

let id = qs.parse(location.search.substring(1))
let detailTab = ['商品详情','本店成交']

new Vue({
  el:'#app',
  data:{
    id,
    details:null,
    detailTab,
    tabIndex:0,
    dealLists:null,
    bannerLists:null,
    skuType: 1,
    showSku: false,
    skuNum:1,
    isAddCart:false,
    showAddMessage:false,
  },
  components:{
    Swipe
  },
  watch:{
    showSku(val,oldVal){
      document.body.style.overflow = val ? 'hidden': 'auto'
      document.querySelector('html').style.overflow =  val ? 'hidden': 'auto'
      document.body.style.height = val ? '100%': 'auto'
      document.querySelector('html').style.height =  val ? '100%': 'auto'
    }
  },
  methods:{
    chooseSku(type){
      this.skuType = type;
      this.showSku = true;
    },
    getDetails(){
      axios.post(url.details,{id})
        .then((res)=>{
          this.details = res.data.data;
          this.bannerLists = [];
          this.details.imgs.forEach((item)=>{
            this.bannerLists.push({
              clickUrl:'javascript:;',
              img:item,
            })
          })
        })
    },
    getDeal(){
      axios.post(url.deal,{id})
        .then((res)=>{
          this.dealLists = res.data.data.lists
        })
    },
    changeTab(index){
      this.tabIndex = index;
      if(index){
        // 如果是想看 本店成交
        this.getDeal()
      }
    },
    changeSkuNum(num){
      if(num < 0 && this.skuNum ===1){
        return
      }
      this.skuNum = this.skuNum + num;
    },
    addCart(){
      axios.post(url.cartAdd,{
        id,
        num:this.skuNum
      })
        .then(res=>{
          if(res.data.status === 200){
            this.showSku = false;
            this.isAddCart = true;
            this.showAddMessage = true;

            setTimeout(()=>{
              this.showAddMessage = false
              this.showAddMessage = false
            },1000)
          }else{

          }
        })
    }

  },
  created(){
    this.getDetails(id)
  },
  mixins:[mixin]
})
