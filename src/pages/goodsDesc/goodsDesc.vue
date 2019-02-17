<template>
    <div class="desc-container">
        <div class="mui-card">
            <!--页眉，放置标题-->
            <div class="mui-card-header">{{desc.title}}</div>
            <!--内容区-->
            <div class="mui-card-content">
                <div v-html="desc.content"></div>
            </div>
            <!--页脚，放置补充信息或支持的操作-->
            <div class="mui-card-footer">时间: {{new Date() | dateFormat}}</div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            desc:{}
        }
    },
    created(){
        this.getGoodsDesc()
    },
    methods:{
        getGoodsDesc(){
            this.$http.get('api/goods/getdesc/' + this.$route.params.id)
            .then(result=>{
                if(result.body.status === 0){
                   // console.log(result)
                    this.desc = result.body.message[0]
                }
            })
        }
    }
}
</script>
<style lang="less">
    .desc-container{
        .mui-card-header{
            color: blue;
        }
        .mui-card-content{
            div{
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
</style>

