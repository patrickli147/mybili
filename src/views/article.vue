<template>
  <div class="article-wrap">
    <nav-bar></nav-bar>

    <transition name="fade">
      <div class="article-detail" v-if="articleData" v-show="isArticleShown">
        <div class="video-wrap">
          <video controls :src="articleData.content"></video>
        </div>

        <div class="video-desc">
          <div class="name">
            <span>{{articleData.category.title}}</span>
            {{articleData.name}}
          </div>
          <div class="detail">
            <span>{{articleData.userinfo.name}}</span>
            <span>666弹幕</span>
            <span>1234次观看</span>
            <span>{{articleData.date}}</span>
          </div>
        </div>

        <div class="sanlian">
          <div :class="{activeColor:collectionActive}">
            <span class="icon-star-full"></span>
            <span>收藏</span>
          </div>
          <div :class="{activeColor:subscritionActive}">
            <span class="icon-bubble"></span>
            <span>关注</span>
          </div>
          <div>
            <span class="icon-redo2"></span>
            <span>分享</span>
          </div>
        </div>

        <van-tabs v-model="active">
          <van-tab title="推荐">
            <div class="commend">
              <article-detail
                v-for="(item, index) in commendData"
                :key="index"
                :articleData="item"
                class="commend-item"
              ></article-detail>
            </div>
          </van-tab>

          <van-tab :title='`评论${lengthOfComments}`'>
            <div class="comment">
              <Comment 
                :length="lengthOfComments" 
                @commitComment="handleCommitComment"
              ></Comment>
              <CommentContent @commentLength="length => lengthOfComments = length"></CommentContent>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </transition>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar.vue";
import ArticleDetail from "@/components/homePageComponents/ArticleDetail.vue";
import Comment from "@/components/articleComponents/Comment.vue";
import CommentContent from "@/components/articleComponents/CommentContent.vue";

export default {
  components: {
    NavBar,
    ArticleDetail,
    Comment,
    CommentContent,
  },
  methods: {
    /**
     * @func
     * @desc 获取article数据
     */
    getArticleData() {
      this.$http
        .get("/article/" + this.$route.params.id)
        .then((res) => {
          this.articleData = res.data[0];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * @func
     * @desc 获取article数据
     */
    getCommendData() {
      this.$http
        .get("/commend/")
        .then((res) => {
          this.commendData = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
    * @func
    * @desc 
    * @param {string} commentContent - 评论内容
    */
    handleCommitComment(commentContent) {
      this.commentParams.comment_content = commentContent;

      const date = new Date();
      let month = date.getMonth();
      month ++;
      let day = date.getDate();
      if (month < 10) {
        month = '0' + month;
      }
      if (day < 10) {
        day = '0' + day;
      }

      let data1 = '' + month + '-' + day;

      this.comment_date = data1;
    }
  },
  created() {
    this.getArticleData();
    this.getCommendData();
  },
  data() {
    return {
      //article data
      articleData: null,
      //推荐内容
      commendData: [],
      //
      collectionActive: null,
      //
      subscritionActive: null,
      //true: show article
      isArticleShown: true,
      //van tab active item
      active: 1,
      //length of comments
      lengthOfComments: 0,
      //comment params
      commentParams: {
        comment_content: '',
        comment_date: ''
      }
    };
  },
  watch: {
    $route() {
      //路由切换动画
      this.isArticleShown = false;
      setTimeout(() => {
        this.isArticleShown = true;
      }, 500);

      this.getArticleData();
      this.getCommendData();
    },
  },
};
</script>

<style lang='scss' scoped>
.article-wrap {
  background-color: #fff;
  width: 100%;
  font-size: 15px;
  .article-detail {
    width: 100%;

    .video-wrap {
      width: 100%;
      video {
        width: 100%;
      }
    }

    .video-desc {
      padding: 5px;

      .name {
        text-align: left;
        span {
          padding: 5px;
          background-color: #eee;
          color: rgb(251, 114, 153);
          border-radius: 10px;
        }
      }

      .detail {
        padding-top: 10px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: nowrap;
        span:nth-child(1) {
          font-weight: bold;
          opacity: 1;
        }
        span:nth-child(1):hover {
          text-decoration: underline;
        }
        span {
          font-size: 12px;
          opacity: 0.8;
          padding-right: 20px;
        }
      }
    }

    .sanlian {
      padding: 5px 10px;
      font-size: 15px;
      border-bottom: 2px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .commend {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
      .commend-item {
        width: 45%;
      }
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>