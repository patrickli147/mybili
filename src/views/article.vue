<template>
  <div class="article-wrap">
    <nav-bar></nav-bar>

    <div class="article-detail" v-if="articleData">
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

      <div class="commend">
          <article-detail
            v-for="(item, index) in commendData"
            :key="index"
            :articleData="item"
            class="commend-item"
          >

          </article-detail>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar.vue";
import ArticleDetail from "@/components/homePageComponents/ArticleDetail.vue";

export default {
  components: {
    NavBar,
    ArticleDetail,
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
    };
  },
  watch: {
      $route() {
        this.getArticleData();
        this.getCommendData();
      }
  }
};
</script>

<style lang='scss' scoped>
.article-wrap {
  background-color: #fff;
  width: 100%;
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
}
</style>