<template>
    <div class="goodsinfo-container">
        <!--加入购物车小球动画-->
        <transition name="my-ball"  @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" ref="ball" v-show="ballflag"></div>
        </transition>
       		<!--轮播图-->
			<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <myswiper :banner="banner"></myswiper>
					</div>
				</div>
			</div>

			<div class="mui-card">
				<div class="mui-card-header">{{goodsinfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        
						<p class="my-price">
                            <span class="now">市场价: ￥{{goodsinfo.market_price}}</span>
                             <span class="old">销售价: ￥{{goodsinfo.sell_price}}</span> 
                        </p>
                        <div class="price">
                            <span class="price-title">购买数量 : </span> 
                            <input type="button" value="-" @click="count >=2 &&count--" :disabled="count == 1">
                            <input type="numer" name="count" v-model="count" @change="filterMaxCount">
                            <input type="button" value="+" @click="count++" :disabled="count == goodsinfo.stock_quantity">
                        </div>
                        <p>
                             <mt-button type="primary" size="small">立即购买</mt-button>
                            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                        </p>
					</div>
				</div>
			</div>
            <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号: {{ goodsinfo.goods_no }}</p>
                        <p>库存数量: {{ goodsinfo.stock_quantity }} 件</p>
                        <p>上架时间: {{ goodsinfo.add_time | dateFormat }}</p>
					</div>
				</div>
				<div class="mui-card-footer">
                     <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                    <mt-button type="danger" size="large" plain @click="mygoComment(id)">商品评论</mt-button>
                </div>
			</div>					
    </div>
</template>
<script>
//引入轮播图组件
import swiper from '@/components/swiper'
export default {
    data(){
        return{
            id:this.$route.params.id,
            count:1,
            goodsinfo:{},
            banner:[],
            ballflag:false
        }
    },
    created(){
        this.getBanner()
        this.getGoodsInfo()
    },
    methods:{
        //获取轮播图
        getBanner(){
            this.$http.get('api/getthumimages/'+ this.id)
            .then(result=>{
                this.banner = result.body.message
            })
        },
        //商品参数
        getGoodsInfo(){
            this.$http.get('api/goods/getinfo/'+ this.id)
            .then(result=>{
                if(result.body.status === 0){
                   // console.log(result)
                    this.goodsinfo = result.body.message[0]
                }
            })
        },
        //修改数量
        filterMaxCount(){
            if(this.count > this.goodsinfo.stock_quantity){
                this.count = this.goodsinfo.stock_quantity
            }
        },
        //跳转详情页面
        goDesc(id){
            this.$router.push('/home/goodsDesc/' + id);
        },
        //goods评论页面
        mygoComment(id){
            //console.log(id)
            //this.$router.push({path: '/home/goodsComment/' + id})
            this.$router.push('/home/goodsComment/' + id)
        },
        //加入购物车
        addToShopCar(){
            this.ballflag = !this.ballflag
            this.$store.commit('addToCar',{
                id:this.goodsinfo.id,
                count:this.count,
                price:this.goodsinfo.sell_price,
                selected:true
            })
        },
        beforeEnter(el){
            el.style.transform="translate(0,0)"
        },
        enter(el,done){
            el.offsetWidth;//必须加
            //获取小球位置
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            //获取购物车位置
            const shopcarPosition = document.getElementById("shopcar").getBoundingClientRect();
            const distX = shopcarPosition.left - ballPosition.left;
            const distY = shopcarPosition.top - ballPosition.top;
            //执行动画
            el.style.transform = `translate(${distX}px,${distY}px)`
            el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)"
            done()
        },
        afterEnter(el){
            this.ballflag = !this.ballflag
        }
    },
    components:{'myswiper': swiper}
}
//props:['id']
</script>
<style lang="less">
    .goodsinfo-container{
      background-color: #eee; 
      .my-price{
          .now{
              text-decoration: line-through;
          }
          .old{
              font-size: 20px;
              color: red;
          }
      }
      .price{
        display: flex;
        height: 40px;  
        align-items: center;
        .price-title{
            padding-right: 5px;
        }
        input{
            height: 30px;
            width: 30px;
            text-align: center;
            padding: 0;
            margin: 0;
            font-size: 14px
        }
        &[type="number"]{
            border-left: 0;
            border-right: 0;
            color: black;
        }
      } 
      .mui-card-footer{
          display: block;
          button {
              margin: 15px 0;
          }
      }
      .ball{
          width: 15px;
          height: 15px;
          background-color: red;
          border-radius: 50%;
          position: absolute;
          z-index: 99;
          top: 411px;
          left: 133px;
      }
    }
</style>


