import Vue from 'vue'
import Router from 'vue-router'
import homeComponent from '@/pages/home/home'
import menderComponent from '@/pages/mender'
import searchComponent from '@/pages/search/search'
import shopcarComponent from '@/pages/shopcar/shopcar'
import newLinkComponent from '@/pages/newLink/newLink'
import newInfoComponen from  '@/pages/newInfo/newInfo'
import newphotolinksComponent from '@/pages/newPhotoLinks/newPhotoLinks'
import photolinksComponent from '@/pages/photoInfo/photoInfo'
import goodslistComponent from '@/pages/goodslist/goodslist'
import goodsinfoComponent from '@/pages/goodsinfo/goodsinfo'
import goodsDescComponent from '@/pages/goodsDesc/goodsDesc'
import goodsCommentComponent from '@/pages/goodsComment/goodsComment'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',redirect:'/home'},
    {path: '/home',component:homeComponent},
    {path: '/mender',component:menderComponent},
    {path: '/search',component:searchComponent},
    {path: '/shopcar',component:shopcarComponent},
    {path: '/home/newLink',component:newLinkComponent},
    {path: '/home/newInfo/:id',component:newInfoComponen},
    {path: '/home/photolinks',component:newphotolinksComponent},
    {path: '/home/photoInfo/:id',component:photolinksComponent},
    {path: '/home/goodslist',component:goodslistComponent},
    {path: '/home/goodsinfo/:id',component:goodsinfoComponent},
    {path: '/home/goodsDesc/:id',component:goodsDescComponent},
    {path: '/home/goodsComment/:id',component:goodsCommentComponent}

  ],
  linkActiveClass:'mui-active'//替换类名 类库
})
