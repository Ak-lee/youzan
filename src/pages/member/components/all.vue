<template>
  <div class="container " style="min-height: 597px;">
    <div @click="toEdit" v-if="lists && lists.length"
      class="block-list address-list section section-first js-no-webview-block">
      <a class="block-item js-address-item address-item"
         :class="{
            'address-item-default':item.isDefault
         }"
         v-for="item in lists"
         :key="item.id"
      >
        <div class="address-title">{{item.name}} {{item.tel}}</div>
        <p>{{item.provinceName}}{{item.cityName}}{{item.districtName}}{{item.address}}</p>
        <a class="address-edit">修改</a>
      </a>
    </div>
    <div v-if="lists && !lists.length">
      暂无地址，请添加
    </div>
    <div class="block stick-bottom-row center">
      <router-link class="btn btn-blue js-no-webview-block js-add-address-btn" to="/address/form">
        新增地址
      </router-link>
    </div>
  </div>
</template>

<script>
  import Address  from 'js/address_service.js'
  export default {
    data() {
      return {
        lists:null
      }
    },
    created(){
      Address.list()
        .then(res=>{
          this.lists = res.data.lists
        })
    },
    methods:{
      toEdit() {
        this.$router.push({
          path:'/address/form'
        })
      }
    }
  }
</script>

<style>
  @import './address_base.css';
  @import './address.css';
</style>
``
