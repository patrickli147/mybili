<template>
    <div class="home-page-wrap">
        <nav-bar class="nav-bar" :headimg="userData.user_img"></nav-bar>

        <van-tabs v-model="active" swipeable>

            <van-tab 
                v-for="(item, index1) in categories"
                :key="index1"
                :title="item.title"
            >   
                <van-list
                    v-model="item.loading"
                    :finished="item.finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    :immediate-check="false"
                >
                    <div class="article-wrap">
                        <article-detail
                            v-for="(article, index2) in item.list"
                            :key="index2"
                            :articleData="article"
                            class="article-item"
                        >
                        </article-detail>
                    </div>
                </van-list>
            </van-tab>
        </van-tabs>
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
    created() {
        this.getCategories();
    },
    data() {
        return {
            //用户数据
            userData: {},
            //active nav page
            active: 0,
            //categories array
            categories: [],

        }
    },
    methods: {
        /**
        * @func
        * @desc 获取category
        */
        getCategories() {
            this.$http.get('/category')
            .then(res => {
                if (res.status === 200) {
                    //获取数据成功
                    let data = res.data.map((item) => {
                        //封装数据
                        item.list = [];
                        item.page = 0;
                        item.pagesize = 10;
                        item.finished = false;
                        item.loading = false;

                        return item;
                    });
                    this.categories = data;

                    this.getArticles();
                }
            })
            .catch(err => {
                console.log(err);
            });
        },
        /**
        * @func
        * @desc 获取article数据
        */
        getArticles() {
            let currentItem = this.categories[this.active];
            this.$http.get('/detail/' + currentItem._id, {
                params: {
                    page: currentItem.page,
                    pagesize: currentItem.pagesize,
                }
            })
            .then(res => {
                this.categories[this.active].list = [...this.categories[this.active].list, ...res.data];
                this.categories[this.active].loading = false;
                if (res.data.length < 10) {
                    this.categories[this.active].finished = true;
                }
            })
            .catch(err => {
                console.log(err);
            })
        },
        /**
        * @func
        * @desc 加载
        */
        onLoad() {
            let currentItem = this.categories[this.active];
            setTimeout(() => {
                currentItem.page ++;
                this.getArticles();
            }, 1000);
            
            console.log("Daodi")
        }
    },
    watch: {
        active() {
            this.getArticles();
        }
    }
    
}
</script>

<style lang='scss' scoped>
.home-page-wrap {
    background-color: #fff;

    .article-wrap {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
        .article-item {
            width: 45%;
        }
    }
}
</style>