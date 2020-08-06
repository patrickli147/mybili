<template>
    <div class="comment-content-wrap" v-if="commentData.length > 0">
        <div class="comment-parent"
            v-for="(parent, index) in commentData"
            :key="index"
        >
            <div class="comment-img">
                <img v-if="parent.userinfo && parent.userinfo.user_img" :src="parent.userinfo.user_img" alt="">
                <img v-else src="../../assets/default_img.jpg" alt="">
            </div>
            <div class="comment-detail">
                <div class="comment-info">
                    <div v-if="parent.userinfo" class="comment-username">{{parent.userinfo.name}}</div>
                    <div v-else class="comment-username">匿名</div>
                    <div class="comment-date">{{parent.comment_date}}</div>
                </div>
                <div class="subscribe">
                    +关注
                </div>
                
                <div class="comment-content" @click="handleReply(parent.comment_id, parent.userinfo.name)">
                    <p>{{parent.comment_content}}</p>
                </div>

                <div class="comment-data">
                    <div class="like">
                        <img src="../../assets/comment-icons/like.png" alt="">
                        <span>12</span>
                    </div>
                    <div class="dis like">
                        <img src="../../assets/comment-icons/like.png" alt="">
                        <span>1</span>
                    </div>
                    <div class="share">
                        <img src="../../assets/comment-icons/share.png" alt="">
                    </div>
                    <div class="comment">
                        <img src="../../assets/comment-icons/pinglun.png" alt="">
                    </div>
                </div>

                <div class="comment-cover" v-if="!parent.parent_id">
                    <div class="total" v-show="currentIndex !== index">
                        <span @click="currentIndex = index">共{{parent.children.length}}条回复 ></span>
                    </div>
                    <div class="collapse" v-show="currentIndex === index">
                        <span @click="currentIndex = -1">收起评论 ^</span>
                    </div>
                </div>

                <van-list class="my-van-list" v-show="currentIndex === index">
                    <div v-if="parent.children.length > 0" class="child-comment">
                        <child-comment @reply="handleReply" :data="parent.children" :parent="parent"></child-comment>
                    </div>
                </van-list>

            </div>
                
        </div>

    </div>
</template>

<script>
import ChildComment from '@/components/commentComponents/ChildComment.vue';

export default {
    props: {
        commentData: Array,
    },
    methods: {
        /**
        * @func
        * @desc 回复评论
        * @param {string} commentId - 参数commentId
        */
        handleReply(commentId, username) {
            this.$emit("reply", commentId, username);
        }
    },
    created() {
        
    },
    data() {
        return {
            //current shown comment
            currentIndex: -1,
        }
    },
    components: {
        ChildComment,
    }
}
</script>

<style lang='scss' scoped>
.comment-content-wrap {
    width: 100%;
    padding: 5px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    .comment-parent {
        width: 100%;
        font-size: 10px;
        border-bottom: 1px solid #eee;
        display: flex;
        flex-wrap: wrap;

        .comment-img {
            width: 30px;
            height: 30px;
            img {
                width: 30px;
                height: 30px;
                border-radius: 50%;
            }
        }

        .comment-detail {
            padding: 0 2px;
            flex: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;

            .comment-info {
                flex: 1;
                text-align: left;
                opacity: .5;
            }

            .subscribe {
                flex: 1;
                color: rgb(251,114,153);
                text-align: right;
            }

            .comment-content {
                width: 100%;
                text-align: left;
                p {
                    word-break: break-word;
                }
            }

            .comment-data {
                width: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                
                div {
                    width: 15%;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;;

                    img {
                        width: 20px;
                        height: 20px;

                    }
                }

                .like {
                    font-size: 10px;

                    img {
                        transform: scale(1.2);
                    }

                    span {
                        opacity: .5;
                    }
                }

                .dis {
                    img {
                        transform: rotateX(180deg) scale(1.2);
                    }
                }
            }

            .comment-cover {
                width: 100%;
                padding-bottom: 10px;
                text-align: left;
                .total {
                    color: rgb(0, 162, 255);
                }

                .collapse {
                    color: rgb(0, 162, 255);
                    
                }   
            }

            .my-van-list {
                width: 100%;
                max-height: 500px;
                overflow: scroll;
            }

            .child-comment {
                width: 100%;
            }
        }

            
    }
}
</style>