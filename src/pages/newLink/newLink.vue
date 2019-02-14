<template>
    <div>
       <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newLinks" :key="item.id">
					<router-link :to="'/home/newInfo/' + item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							{{item.title}}
							<p class='mui-ellipsis my-ellipsis'>
                                <span>发表时间: {{item.add_time | dateFormat}}</span>
                                <span>点击:  {{item.click}}次</span>
                            </p>
						</div>
					</router-link>
				</li>
			</ul>
    </div>
</template>
<script>
export default {
    data(){
        return {
            newLinks:[]
        };
    },
    created(){
        this.getNewLinks()
    },
    methods:{
       getNewLinks(){
           this.$http.get('api/getnewslist')
           .then(result=>this.newLinks=result.body.message)
       }
    }
}
</script>
<style lang="less" >
    .my-ellipsis{
        display: flex;
        justify-content: space-between;
        span{
            color: blue;
            font-size: 10px;
        }
    }
</style>