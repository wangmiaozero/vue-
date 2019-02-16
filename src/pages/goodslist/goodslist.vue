<template>
    <div class="goods">
        <div class="goods-list" v-for="item in goodslist" :key="item.id" @click="dataTO(item.id)">
            <img :src="item.img_url" alt="">
            <div class="box">
                    <h3>{{item.title}}</h3>
                <p class="inf">
                    <span class="now">
                        ￥ {{item.market_price}}
                    </span>

                    <span class="old">
                        ￥ {{item.sell_price}}
                    </span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩 {{item.stock_quantity}} 件</span>
                </p>
            </div>
        </div>
         <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            pageindex:1,
            goodslist:[]
        }
    },
    created(){
        this.getGoodsList()
    },
    methods:{
        //获取商品信息
        getGoodsList(){
            this.$http.get('api/getgoods?pageindex=' + this.pageindex)
            .then(result=>{
                if(result.body.status === 0){
                    this.goodslist = this.goodslist.concat(result.body.message)
                }else{
                    console.log("网络连接失败")
                }
            })
        },
        //加载更多商品信息
        getMore(){
            this.pageindex++;
            this.getGoodsList();
        },
        //前往详情页面
        dataTO(id){
            this.$router.push('/home/goodsinfo/' + id)
        }
    }
}
</script>
<style lang="less">
    .goods{
        display: flex;
        flex-wrap: wrap;
        padding: 8px;
        justify-content: space-between;
        .goods-list{
            width: 48%;
            display: flex;
            flex-direction: column;
            background-color: #fff;
            min-height: 290px;
            box-shadow: 0 0 7px black;
            border-radius: 10px;
            margin-bottom: 10px;
            img{
                padding: 5px;
                width: 100%;
            }
            .box{
               position: relative;
               bottom: 0;
               left: 0;;
                h3{
                    font-size: 16px;
                    list-style: none;
                    padding: 5px;
                    margin: 0;
                    white-space:nowrap;// 强制一行显示
		            overflow:hidden;  // 隐藏溢出
		            text-overflow:ellipsis;// 显示省略号
                }
                p{
                    padding: 5px;
                    margin: 0;
                }
                .inf{
                    .now{
                        font-size: 18px;
                        color: red;
                    }
                    .old{
                        font-size: 14px;
                        color: #ccc;
                        text-decoration: line-through;
                    }
                }
                .sell{
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
    }
</style>
