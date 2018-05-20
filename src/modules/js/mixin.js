import Foot from 'components/Foot.vue'
let mixin = {
  filters:{
    currency(price){
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
  },
  components:{
    Foot,
  }
}

export default mixin
