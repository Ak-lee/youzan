let  url ={
  hotLists: '/index/hotLists',
  banner: '/index/banner',
}

// 开发环境和真实上线环境的切换 只需修改下面的host即可
let host = 'http://rap2api.taobao.org/app/mock/7058'
for (let key in url){
  if(url.hasOwnProperty(key)){
    url[key] = host + url[key]
  }
}


export default url
