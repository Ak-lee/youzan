import Address from 'js/address_service.js'

export default {
  data(){
    return{
      name:'',
      tel:'',
      provinceValue: -1,
      cityValue: -1,
      districtValue: -1,
      address:'',
      id:'',
      type:'',
      instance:'',
      addressData:require('js/address.json'),
      cityList: null,
      districtList: null,
      firstTime: true
    }
  },
  created(){
    let query = this.$route.query
    this.type= query.type
    this.instance= query.instance

    if(this.type === 'edit'){
      let address = this.instance
      this.provinceValue = parseInt(address.provinceValue)
      this.name = address.name
      this.tel = address.tel
      this.address = address.address
      this.id=address.id
    }
  },
  methods:{
    save () {
      // 需要做合法性和非空校验
      let {name, tel, provinceValue, cityValue, distictValue} = this
      let data = {name, tel, provinceValue, cityValue, distictValue}
      if (this.type === 'add') {
        Address.add(data)
          .then(res => {
            this.$router.go(-1)
          })
      }
      if (this.type === 'edit') {
        data.id = this.id
        Address.update(data)
          .then(res => {
            this.$router.go(-1)
          })
      }
    },
    remove(){
      if(window.confirm('确认删除吗？')){
        Address.remove(this.id)
          .then(res => {
            this.$router.go(-1)
          })
      }
    },
    setDefault(){
      Address.setDefault(this.id)
        .then( res => {
          this.$router.go(-1)
        })
    },
  },
  watch: {
    provinceValue(value,oldValue){
      if(value === -1){
        this.cityValue = -1
        this.districtValue = -1
        return
      }
      let list = this.addressData.list
      let index = list.findIndex(item => {
        return item.value === value
      })
      this.cityList = list[index].children
      if(this.firstTime){
        this.cityValue = parseInt(this.instance.cityValue)
      }else{
        this.cityValue = -1
      }
    },
    cityValue(value,oldValue){
      if(value === -1){
        return -1
      }
      let list = this.cityList
      let index = list.findIndex(item => {
        return item.value === value
      })
      this.districtList = list[index].children
      if(this.firstTime){
        this.districtValue = parseInt(this.instance.districtValue)
      }else{
        this.districtValue = -1
      }
      this.firstTime = false
    }
  }
}
