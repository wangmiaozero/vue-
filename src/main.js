import Vue from 'vue'
import App from './App'
import router from './router'
//发送请求
import VueResource from 'vue-resource'
//安装请求
Vue.use(VueResource)
// css reset  css初始化
import './styles/common.css'
//导入mui的css文件
import './libs/mui/css/mui.css'
//引入mui扩展字体的css文件
import './libs/mui/css/icons-extra.css'
//设置vue-resource请求跟路径
Vue.http.options.root="http://www.lovegf.cn:8899/"
/* eslint-disable no-new */
//1.导入mint-ui和其样式文件
import { Lazyload } from 'mint-ui';
Vue.use(Lazyload);

// 1.导入mint-ui和其样式文件
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// 2.安装mint-ui(全局注册所有的组件)
Vue.use(MintUI)
// require('./config') // 表示引入config目录下的 :
// index.js index.json index.node index
Vue.config.productionTip = false
//注册全局评论组件
import container from '@/components/container'
Vue.component('container',container)
import moment from 'moment'
//设置全局过滤器
Vue.filter('dateFormat',function(datestr,pattern="YYYY-MM-DD HH:mm:ss"){
  return moment(datestr).format(pattern)
})
// 安装vue-pic-preview
import VuePreview from 'vue-pic-preview'
Vue.use(VuePreview)
//引入vue-scroller
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
//引入vuex
import Vuex from 'vuex'
Vue.use(Vuex)
//加入购物车的业务逻辑:
//    1.即将要加入的商品是否在购物车已存在
//    2.如果存在只需要更新数量信息即可
//    3.如果不存在只需要push进car数组即可
let car = JSON.parse(localStorage.getItem('car')||'[]')//页面加载时需要读取
let store = new Vuex.Store({
    state:{
      car:car,//{id,price,count,selected}
    },
    mutations:{
      addToCar(state,goodsinfo){
        //假设法
        // let flag =false
        // state.car.some(item =>{
        //   if(item.id === goodsinfo.id){
        //     item.count +=parseInt(goodsinfo.count)
        //     return true
        //   }
        // })
        // if(!flag){
        //   state.car.push(goodsinfo)   
        // }
        let index = state.car.findIndex(item=>item.id===goodsinfo.id)
        if(index === -1){
          //没有找到 不存在购物车
          state.car.push(goodsinfo)
        }else{
          state.car[index].count +=parseInt(goodsinfo.count)
        }
        localStorage.setItem('car',JSON.stringify(state.car))
      },
      updateCount(state,goodsinfo){
        state.car.some(item =>{
          if(item.id === goodsinfo.id){
            item.count = goodsinfo.count
            return true;
          }
        })
        //只要修改了数据,一定要重新设置下localStorage
        localStorage.setItem('car',JSON.stringify(state.car))
      },
      removeFromCar(state, id) {
        state.car.some((item, i) => {
          if (item.id === id) {
            state.car.splice(i, 1)
            return true
          }
        })
        localStorage.setItem('car', JSON.stringify(state.car))
      },
    },
    getters:{
      totalCount(state){
        let sum = 0;
        state.car.forEach(item=>{sum+=item.count})
        return sum
      },
      goodsCount(state){
        //手动创造一个 id对应count格式的对象
        //let o = {87:8,88:5}
        //o[88]
        let o = {}
        state.car.forEach(item =>{
         // console.log(item)
          o[item.id] = item.count
        })
        return o
      },
      goodsSelected(state){
        let o = {}
        state.car.forEach(item =>{
          o[item.id] = item.selected
        })
        return o
      }
    }
})
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  components: { App },
  store:store
})
