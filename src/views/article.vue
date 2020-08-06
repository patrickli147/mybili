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
          <div :class="{activeColor:collectionActive}" @click="handleCollectionClicked">
            <span class="icon-star-full"></span>
            <span>收藏</span>
          </div>
          <div :class="{activeColor:subscritionActive}" @click="handleSubClicked">
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

          <van-tab :title="`评论${lengthOfComments}`">
            <div class="comment">
              <Comment :length="lengthOfComments" @commitComment="handleCommitComment"></Comment>
              <CommentContent :commentData="commentData" @reply="handleReply"></CommentContent>
              <Comment
                @inputBlur="isReplyShown = false"
                v-if="isReplyShown"
                class="reply-comment"
                :username="replyUsername"
                :length="lengthOfComments"
                @commitComment="handleCommitComment"
              ></Comment>
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

          this.getInitData();
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
      this.commentParams.comment_date = this.getCurrentDate();
      this.commentParams.article_id = this.$route.params.id;

      this.sendComment();
    },
    /**
     * @func
     * @desc 处理时间
     */
    getCurrentDate() {
      const date = new Date();
      let month = date.getMonth();
      month++;
      let day = date.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      return "" + month + "-" + day;
    },
    /**
     * @func
     * @desc 发送评论
     */
    sendComment() {
      this.$http
        .post("/comment_post/" + localStorage.getItem("id"), this.commentParams)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.$toast.success("评论成功");

            //reset
            this.commentParams.parent_id = null;
            //重新获取comment数据
            this.getCommentData();
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.isReplyShown = false;
        });
    },
    /**
     * @func
     * @desc
     */
    getCommentData() {
      this.$http
        .get("/comment/" + this.$route.params.id)
        .then((res) => {
          //处理数据
          this.commentData = this.handleUserData(null, res.data);

          //向父组件传送评论长度
          this.lengthOfComments = res.data.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * @func
     * @desc 递归处理数据
     * @param {string} target - 目标
     * @param {array} data - 数据
     */
    handleUserData(target, data) {
      let data1 = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].parent_id == target) {
          let current = data[i];
          current.children = this.handleUserData(data[i].comment_id, data);
          data1.push(current);
        }
      }
      return data1;
    },
    /**
     * @func
     * @desc 回复评论
     * @param {string} commentId - 参数commentId
     */
    handleReply(commentId, username) {
      this.commentParams.parent_id = commentId;

      this.replyUsername = username;

      this.isReplyShown = true;
    },
    /**
     * @func
     * @desc 收藏
     */
    handleCollectionClicked() {
      if (!sessionStorage.getItem("token")) {
        this.$toast.fail("请先登录");
        this.$router.push("/login");
      }

      this.$http
        .post("/collection/" + localStorage.getItem("id"), {
          article_id: this.$route.params.id,
        })
        .then((res) => {
          if (res.data.code === 200) {
            let msg = res.data.msg;
            if (msg === "收藏成功") {
              this.collectionActive = true;
            }
            else {
              this.collectionActive = false;
            }
            
            this.$toast.success(msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
    * @func
    * @desc 
    * @param {string} a - 参数a
    * @returns {boolean} 返回值为true
    */
    handleSubClicked() {
      if (!sessionStorage.getItem("token")) {
        this.$toast.fail("请先登录");
        this.$router.push("/login");
      }

      this.$http
        .post("/sub_scription/" + localStorage.getItem("id"), {
          sub_id: this.articleData.userid,
        })
        .then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            let msg = res.data.msg;
            if (msg === "关注成功") {
              this.subscritionActive = true;
            }
            else {
              this.subscritionActive = false;
            }
            
            this.$toast.success(msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
    * @func
    * @desc 获取初始数据
    */
    getInitData() {
      if (sessionStorage.getItem("token")) {
        this.$http.get("/collection/" + localStorage.getItem("id"),{
          params: {
            article_id: this.$route.params.id,
          }
        })
        .then(res => {
          this.collectionActive = res.data.success;
        })
        .catch(err => {
          console.log(err);
        });

        this.$http.get('/sub_scription/' + localStorage.getItem("id"), {
          params: {
            sub_id: this.articleData.userid,
          }
        })
        .then(res => {
          console.log(res);
          this.subscritionActive = res.data.success;
        })
        .catch(err => {
          console.log(err);
        });
      }
    },
    /**
    * @func
    * @desc 初始化
    */
    initData() {
      this.getArticleData();
      this.getCommendData();
      this.getCommentData();
      if (this.articleData) {
        this.getInitData();
      }
    }
  },
  created() {
    this.initData();
  },
  data() {
    return {
      //article data
      articleData: null,
      //推荐内容
      commendData: [],
      //true: colleciton is active
      collectionActive: false,
      //true: subscrition is active
      subscritionActive: false,
      //true: show article
      isArticleShown: true,
      //van tab active item
      active: 0,
      //length of comments
      lengthOfComments: 0,
      //comment params
      commentParams: {
        comment_content: "",
        comment_date: "",
        article_id: null,
        parent_id: null,
      },
      //comment data
      commentData: [],
      //username to reply
      replyUsername: "",
      //true: reply is shown
      isReplyShown: false,
    };
  },
  watch: {
    $route() {
      //路由切换动画
      this.isArticleShown = false;
      setTimeout(() => {
        this.isArticleShown = true;
      }, 500);

      this.initData();
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

      .activeColor {
        color: rgb(251,114,153);
      }
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

    .comment {
      width: 100%;
      position: relative;
      .reply-comment {
        position: fixed;
        top: 400px;
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