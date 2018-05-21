import 'css/common.css'
import './index.css'

import Vue from 'vue'
import axios from 'axios'
import url from '../../modules/js/api.js'
import { InfiniteScroll } from 'mint-ui';
import Foot from 'components/Foot.vue';
import Swipe from 'components/Swipe.vue';


Vue.use(InfiniteScroll);

let app = new Vue({
  el: '#app',
  data: {
    lists: null,
    pageNum: 1,
    loading: false,
    allLoaded: false,
    pageSize: 6,
    bannerLists: null,
  },
  created() {
    this.getLists();
    this.getBanner();
  },
  methods: {
    getLists(){
      if(this.allLoaded){
        return
      }
      this.loading = true
      axios.post(url.hotLists, {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      }).then((res) => {
        let curLists = res.data.lists;
        if(curLists.length < this.pageSize){
          // 判断商品项目是否加载完毕
          this.allLoaded = true;
        }
        if(this.lists){
          this.lists = this.lists.concat(curLists)
        }else{
          // 第一次请求数据
         this.lists = curLists
        }
        this.pageNum++;
        this.loading = false
      })
    },
    getBanner(){          // 轮播图
      axios.get(url.banner).then((res)=>{
        this.bannerLists = res.data.lists;
      })
    }
  },
  components: {
    Foot,
    Swipe,
  }
})
