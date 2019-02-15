import Vue from 'vue'
import App from './App'
import router from './router'
// css reset  css初始化
import './styles/common.css'
//导入mui的css文件
import './libs/mui/css/mui.css'
//引入mui扩展字体的css文件
import './libs/mui/css/icons-extra.css'
//按需引入
//顶部导航栏
import { Header } from 'mint-ui';
//导入轮播图与Button
import { Swipe, SwipeItem,Button } from 'mint-ui';
//注册轮播图
Vue.component(Button.name, Button);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem)
//发送请求
import VueResource from 'vue-resource'
//引入时间moment
//安装请求
Vue.use(VueResource)

import moment from 'moment'
//设置全局过滤器
Vue.filter('dateFormat',function(datestr,pattern="YYYY-MM-DD HH:mm:ss"){
  return moment(datestr).format(pattern)
})
//引入表单编辑器
import { Field } from 'mint-ui';
//安装表单编辑器
Vue.component(Field.name, Field);
//注册全局评论组件
import container from '@/components/container'
Vue.component('container',container)
//顶部导航栏
Vue.component(Header.name, Header);
// require('./config') // 表示引入config目录下的 :
// index.js index.json index.node index
Vue.config.productionTip = false
//设置vue-resource请求跟路径
Vue.http.options.root="http://www.lovegf.cn:8899/"
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  components: { App }
})
