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
//导入轮播图
import { Swipe, SwipeItem } from 'mint-ui';
//发送请求
import VueResource from 'vue-resource'
//安装请求
Vue.use(VueResource)
//安装轮播图
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem)
//顶部导航栏
Vue.component(Header.name, Header);
// require('./config') // 表示引入config目录下的 :
// index.js index.json index.node index
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  components: { App }
})
