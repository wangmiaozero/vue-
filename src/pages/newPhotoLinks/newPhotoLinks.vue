<template>
    <div>
         <div id="slider" class="mui-slider ">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a :class="['mui-control-item',{'mui-active': item.id == 0}]" 
                        href="#item1mobile" 
                        data-wid="tab-top-subpage-1.html"
                        v-for="item in categories" 
                        :key="item.id"
                         @click="getImages(item.id)">
							{{item.title}}
						</a>
					</div>
				</div>

			</div>
            <!--图片展示-->
            <ul class="photo-list">
                <router-link v-for="item in photoList" :key="item.id" :to="'/home/photoInfo/' + item.id" tag="li">
                    <img v-lazy="item.img_url">
                    <div class="info">
                    <h1 class="info-title">{{ item.title }}</h1>
                    <div class="info-body">{{ item.zhaiyao }}</div>
                    </div>
                </router-link>
            </ul>

    </div>
</template>
<script>
import mui from '@/libs/mui/js/mui.min.js'
  
export default {
    created(){
        this.getCategories()
        this.getImages(0)
    },
    mounted(){
        // 初始化操作必须要放在mounted钩子中, 让DOM元素加载完毕后才可以初始化
        mui(".mui-scroll-wrapper").scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    data(){
        return {
            categories:[],
            photoList:[]
        }
    },
    methods:{
        // /api/getimgcategory 分类数据
        getCategories(){
            this.$http.get('api/getimgcategory')
            .then(result=>{
                this.categories = result.body.message;
                this.categories.unshift({id: 0,title: "全部"})
                //console.log(this.categories)

            })
        },
        // /api/getimages/   图片数据
        getImages(cateid){
            this.$http.get('api/getimages/'+cateid)
            .then(result=>{
               // console.log(result)
                this.photoList = result.body.message
            })
        }
    }

}

</script>
<style lang="less">
 //使用全局样式样式去掉
    * { touch-action: pan-y; } 
   .photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }

    .info {
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 84px;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>
