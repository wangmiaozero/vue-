<template>
    <div class="my-box">
        <h1 class="title">{{ newInfo.title }}</h1>
        <p>
            <span>发表时间: {{ newInfo.add_time | dateFormat }}</span>
            <span>点击: {{newInfo.click}}</span>
        </p>
        <hr>
       <div class="content" v-html="newInfo.content"></div>
       <conainer :id="id"></conainer>
    </div>
</template>
<script>
export default {
    data(){
        return{
            id: this.$route.params.id,
            newInfo: {}
        };
    },
    created(){
        this.getNewInfo();
    },
    methods:{
        getNewInfo(){
            this.$http.get('api/getnew/'+ this.id)
            .then(result=>this.newInfo = result.body.message[0])
        }
    }
}
</script>
<style lang="less">
    .my-box{
        padding: 0 4px;
        .title{
            font-size: 18px;
            text-align: center;
        }
        p{
            display: flex;
            justify-content: space-between;
            span{
                color: blue;
            }
        }
        .content{
            font-size: 14px;
            img {
                height: 100%;
                width: 100%;
            }
        }
    }
</style>
