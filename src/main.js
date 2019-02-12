import Vue from 'vue'
import App from './App'
import router from './router'
// import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'
// Vue.use(MintUI)//这是全部引入
//导入mui的css文件
import './libs/mui/css/mui.css'
//引入mui扩展字体的css文件
import './libs/mui/css/icons-extra.css'
//按需引入
//顶部导航栏
import { Header } from 'mint-ui';

//顶部导航栏
Vue.component(Header.name, Header);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  components: { App }
})
