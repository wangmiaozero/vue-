<template>
    <div class="home-container">
        <!--轮播图-->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item,index) in banners" :key="index">
                <a :href="item.url">
                    <img :src="item.img">
                </a>
            </mt-swipe-item>
        </mt-swipe>
        <!--九空格-->
         <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                   
		                    <div class="mui-media-body">新闻资讯</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                  
		                    <div class="mui-media-body">图片分享</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                 
		                    <div class="mui-media-body">商品购买</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                  
		                    <div class="mui-media-body">留言反馈</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                 
		                    <div class="mui-media-body">视频专区</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                 
		                    <div class="mui-media-body">联系我们</div></a></li>
		        </ul> 
    </div>
</template>
<script>
export default {
    data(){
        return {
            banners: []
        };
    },
    created(){
        this.getBanner()
    },
    methods: {
       getBanner(){
            this.$http.get('http://www.lovegf.cn:8899/api/getlunbo')
            .then(res=>this.banners=res.body.message)
       }
    }
}
</script>
<style lang="less">
    .home-container {
        .mint-swipe {
            height: 200px;
            .mint-swipe-item {
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
</style>