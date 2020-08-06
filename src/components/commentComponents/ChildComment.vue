<template>
  <div class="child-comment-wrap">
    <div class="comment-cover" v-if="!parent.parent_id">
      <div class="total" v-show="!isCommentShown">
        <span @click="isCommentShown = true">共{{data.length}}条回复 ></span>
      </div>
      <div class="collapse" v-show="isCommentShown">
        <span @click="isCommentShown = false">收起评论 ^</span>
      </div>
    </div>
    <van-list :class="!parent.parent_id ? 'my-van-list' : '' " v-show="!parent.parent_id && isCommentShown">
        <div v-for="(child, index) in data" :key="index" class="comment-parent">
          <div class="comment-img">
              <img v-if="child.userinfo && child.userinfo.user_img" :src="child.userinfo.user_img" alt />
              <img v-else src="../../assets/default_img.jpg" alt />
          </div>
          <div class="comment-detail">
              <div class="comment-info">
              <div v-if="child.userinfo" class="comment-username">{{child.userinfo.name}}</div>
              <div v-else class="comment-username">匿名</div>
              <div class="comment-date">{{child.comment_date}}</div>
              </div>
              <div class="subscribe">+关注</div>

              <div class="comment-content">
              <p v-if="parent.parent_id">
                  回复
                  <span class="reply">@{{parent.userinfo.name}}:</span>
                  {{child.comment_content}}
              </p>
              <p v-else>{{child.comment_content}}</p>
              </div>

              <div class="comment-data">
              <div class="like">
                  <img src="../../assets/comment-icons/like.png" alt />
                  <span>12</span>
              </div>
              <div class="dis like">
                  <img src="../../assets/comment-icons/like.png" alt />
                  <span>1</span>
              </div>
              <div class="share">
                  <img src="../../assets/comment-icons/share.png" alt />
              </div>
              <div class="comment">
                  <img src="../../assets/comment-icons/pinglun.png" alt />
              </div>
              </div>
          </div>
          <div v-if="child.children.length > 0" class="child-comment">
              <child-comment :data="child.children" :parent="child"></child-comment>
          </div>  
        </div> 
    </van-list>
  </div>
</template>

<script>
import ChildComment from "@/components/commentComponents/ChildComment.vue";

export default {
  components: {
    ChildComment,
  },
  name: "childComment",
  props: {
    data: Array,
    parent: Object,
  },
  data() {
    return {
      //true: comment is shown
      isCommentShown: false,
    };
  },
};
</script>

<style lang='scss' scoped>
.child-comment-wrap {
  width: 100%;
  padding-bottom: 10px;

  .comment-cover {
    width: 100%;
    text-align: left;
    .total {
      color: rgb(0, 162, 255);
    }

    .collapse {
      color: rgb(0, 162, 255);
      padding-bottom: 10px;
    }
  }

  .my-van-list {
      height: 500px;
      overflow: scroll;
  }

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
        opacity: 0.5;
      }

      .subscribe {
        flex: 1;
        color: rgb(251, 114, 153);
        text-align: right;
      }

      .comment-content {
        width: 100%;
        text-align: left;

        .reply {
          color: rgb(0, 162, 255);
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
          align-items: center;

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
            opacity: 0.5;
          }
        }

        .dis {
          img {
            transform: rotateX(180deg) scale(1.2);
          }
        }
      }
    }

    .child-comment {
      width: 100%;
    }
  }
}
</style>