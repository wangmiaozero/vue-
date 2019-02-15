<template>
    <div class="my-comments">
        <h1>发表评论</h1>
        <hr>
         <!-- <textarea placeholder="请输入要BB的内容（做多吐槽120字）" maxlength="120"></textarea> -->
        <mt-field placeholder="发表评论(120字)" type="textarea" maxlength="120" v-model="msg" rows="4"></mt-field>
        <mt-button type="primary" size="large"  class="my-button" @click="clicksend">发表评论</mt-button>
        <div class="my-comments-box" v-for="(item, index) in comments" :key="index">
            <div class="my-container">
                <span>
                    第 {{index + 1}} 楼 用户: {{item.user_name}}    
                </span> 
                <span>
                    发表时间: {{item.add_time | dateFormat}}
                </span>
            </div>
            <div class="my-content-body">
                {{item.content==='undefined'?'此用户很懒,没有发表任何评论':item.content}}
            </div>
        </div>
         <mt-button type="danger" size="large" plain @click="getMoreclick">加载更多</mt-button>
    </div>
</template>
<script>
//引入Toast
import { Toast } from 'mint-ui';
export default {
    data(){
        return{
          //  id: this.$route.params.id,
            pageIndex: 1,//默认展示第一页
            comments: [],//所有评论
            msg:""
        };
    },
    created(){
        this.getContent()
    },
    methods:{
        getContent(){
            //获取评论
            this.$http.get('api/getcomments/' + this.id + "?pageindex=" +this.pageIndex)
            .then(result=>this.comments = this.comments.concat(result.body.message))//连接之前的数据
        },
        clicksend(){
             if(this.msg.trim().length=== 0){
                    return Toast("评论不能为空")
                }
            this.$http.post('api/postcomment/' + this.id,{content:this.msg.trim()})
            .then(result=>{  
                //  let cmt = {
                //     user_name: "匿名用户",
                //     add_time: Date.now(),
                //     content: this.msg.trim()
                // };
                //this.comments.unshift(cmt);
                this.pageIndex=1;
                this.comments=[];
                this.getContent();
                this.msg = "";
                
            })
        },
        getMoreclick(){
            //点击 加载更多评论
            this.pageIndex++;
            this.getContent();
        }
    },
    props:['id']
}
</script>
<style lang="less">
    .my-comments{
        padding: 0 5px;
        h1{
            font-size: 18px;
        }
        .my-button{
            margin: 10px 0;
        }
        .my-comments-box{
            font-size: 12px;
            .my-container{
                border-radius: 5px;
                padding: 0 5px;
                background-color: #ccc;
                line-height: 30px;
                
                display: flex;
                justify-content: space-between;
            }
            .my-content-body{
               text-indent: 2em;
            }
        }
    }
</style>
