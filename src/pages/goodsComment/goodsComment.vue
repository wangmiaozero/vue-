<template>
    <div>
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
                </div>
			</div>
        <container :id="id"></container>
    </div>
</template>
<script>
export default {
    data(){
        return{
            id:this.$route.params.id,
            goodsinfo:{}
        }
    },
    created(){
        this.getGoodsInfo()
    },
    methods:{
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
    }
}
</script>
<style lang="less">

</style>

