import 'css/common.css'
import './category.css'

import Vue from 'vue'
import axios from 'axios'
import url from '../../modules/js/api.js'
import mixin from 'js/mixin.js'

new Vue({
  el: '#app',
  data:{
    topLists: null,
    topIndex: 0,
    subData: null,
    rankData: null,
  },
  created(){
    this.getTopList();
    this.getSubList(0);
  },
  methods:{
    getTopList(){
      axios.post(url.topList).then((res)=>{
        this.topLists = res.data.lists
      })
    },
    getSubList(index,id){
      this.topIndex = index;
      if(index === 0 ){
        this.getRank()
      }else{
        axios.post(url.subList,{id}).then((res)=>{
          this.subData = res.data.data
        })
      }
    },
    getRank(){
      axios.post(url.rank).then((res)=>{
        this.rankData = res.data.data
      })
    },
    toSearch(item){
      location.href=`search.html?keyword=${item.name}&id=${item.id}`
    },
  },
  mixins:[mixin]
})
