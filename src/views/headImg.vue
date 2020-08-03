<template>
    <div class="haed-img-wrap">
        <nav-bar class="nav-bar"></nav-bar>
        
        <div class="main-img">
            <img v-if="url.length > 0" :src="url" alt="">
            <img v-else src="../assets/default_img.jpg" alt="">
        </div>

        <div class="update-img">
            <van-uploader :after-read="afterRead">
                <van-button class="update-btn" color="#fb7299">上传头像</van-button>
            </van-uploader>
        </div>

        <div class="back-btn">
            <van-button @click="$router.push('editUserInfo')" style="border-radius: 2.778vw;width: 88px;" type="default">返回</van-button>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/common/NavBar.vue';

export default {
    mounted() {
        //get url
        const userData = this.$route.params.userData;

        if (userData) {
            this.userData = userData;
            this.url = userData.user_img;
        }
    },
    data() {
        return {
            //头像 url
            url: '',
            //用户数据
            userData: {}
        }
    },
    methods: {
        /**
        * @func
        * @desc after file read
        * @param {File} file 读取的文件
        */
        afterRead(file) {

            //将文件数据中的file发送给后端
            const formdata = new FormData();
            formdata.append('file', file.file);

            this.$http.post('upload', formdata)
            .then(res => {
                let data = res.data;
                this.url = data.url;
                this.userData.user_img = data.url;

                //后台更新
                this.$http.post('/update/' + localStorage.getItem("id"), this.userData)
                .then(res => {
                    if (res.data.code === 200) {
                        this.$toast.success("更换成功");
                    }
                    else {
                        this.$toast.fail("更换失败，请稍后再试");
                    }
                }).catch(err => {
                    console.log(err);
                })

            })
            .catch(err => {
                console.log(err);
            })
        }
    },
    components: {
        NavBar,
    }
}
</script>

<style lang='scss' scoped>
.haed-img-wrap {
    .nav-bar {
        margin-bottom: 2.778vw;
    }

    .main-img {
        width: 100%;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .update-img {
        margin-top: 5.556vw;
        margin-bottom: 3vw;
        .update-btn {
            border-radius: 2.778vw;
        }
    }
}
</style>