import 'css/common.css'
import './category.css'

import Vue from 'vue'
import axios from 'axios'
import url from '../../modules/js/api.js'
import Foot from 'components/Foot.vue'

new Vue({
  el: '#app',
  components:{
    Foot,
  },
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
  },
  filters:{
    number(price){
      function toDecimal2(x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
          return false;
        }
        var f = Math.round(x*100)/100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
          rs = s.length;
          s += '.';
        }
        while (s.length <= rs + 2) {
          s += '0';
        }
        return s;
      }
      return toDecimal2(price)
    }
  }
})
