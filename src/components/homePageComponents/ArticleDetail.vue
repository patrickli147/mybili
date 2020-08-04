<template>
    <div class="article-detail-wrap" @click="pushPath">
        <img :src="articleData.img" alt="">
        <div class="data-wrap">
            <div class="icon-play2"><span class="video">{{play}}</span></div>
            <div class="icon-file-text"> <span class="comment">{{!articleData.commentlen ? 66 : articleData.commentlen}}</span> </div>
        </div>
        
        <p>{{title}}</p>
    </div>
</template>

<script>
import Mock from 'mockjs';

export default {
    props: ['articleData'],
    computed: {
        //title
        title() {
            return Mock.Random.ctitle(3, 12);
        },
        //播放量
        play() {
            return Mock.Random.natural(100, 9999);
        }
    },
    methods: {
        /**
        * @func
        * @desc 处理路由
        */
        pushPath() {
            if (this.$route.path === '/article/' + this.articleData.id) {
                //重复路由
                return;
            }
            else {
                this.$router.push('/article/' + this.articleData.id)
            }

            
        }
    }
}
</script>

<style lang='scss' scoped>
.article-detail-wrap {
    width: 100%;
    padding-top: 5px;
    //padding-bottom: 10px;
    border-bottom: 2px solid #eee;

    img {
        width: 100%;
        height: 100px;
    }

    .data-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: nowrap;
    }

    p {
        font-size: 12px;
        font-weight: bold;
        //margin: 0;
        //padding: 0;
    }
}
</style>