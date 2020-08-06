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
                
                <div class="comment-content">
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

                <div v-if="parent.children.length > 0" class="child-comment">
                    <child-comment :data="parent.children" :parent="parent"></child-comment>
                </div>
            </div>
                
        </div>

    </div>
</template>

<script>
import ChildComment from '@/components/commentComponents/ChildComment.vue';

export default {
    methods: {
        /**
        * @func
        * @desc 
        */
        getCommentData() {
            this.$http.get('/comment/' + this.$route.params.id)
            .then(res => {

                //处理数据
                this.commentData = this.handleUserData(null, res.data);

                //向父组件传送评论长度
                this.$emit("commentLength", res.data.length);
            })
            .catch(err => {
                console.log(err);
            })
        },
        /**
        * @func
        * @desc 递归处理数据
        * @param {string} target - 目标
        * @param {array} data - 数据
        */
        handleUserData(target, data) {
            let data1 = [];
            for (let i = 0; i < data.length; i ++) {
                if (data[i].parent_id == target) {
                    let current = data[i];
                    current.children = this.handleUserData(data[i].comment_id, data);
                    data1.push(current);
                }
            }
            return data1;
        }
    },
    created() {
        this.getCommentData();
    },
    data() {
        return {
            //comment data
            commentData: []
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

            .child-comment {
                width: 100%;
            }
        }

            
    }
}
</style>