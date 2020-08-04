<template>
    <div class="userinfo-wrap">
        <nav-bar :headimg="userData.user_img"></nav-bar>
        
        <img class="banner" src="../assets/bannerTop_new.png" alt="">

        <user-detail :userData="userData"></user-detail>

    </div>
</template>

<script>
import NavBar from '@/components/common/NavBar.vue';
import UserDetail from '@/components/userinfoComponents/UserDetail.vue';

export default {
    components: {
        NavBar,
        UserDetail,
    },
    methods: {
        /**
        * @func
        * @desc 获取用户数据
        */
        getUserInfoData() {
            this.$http.get('/user/' + localStorage.getItem("id"))
            .then(res => {
                console.log(res);

                this.userData = res.data[0];
            })
            .catch(err => {
                console.log(err);
            })
        }
    },
    created() {
        //获取用户数据
        this.getUserInfoData();
    },
    data() {
        return {
            //用户data
            userData: {}
        }
    }
}
</script>

<style lang='scss' scoped>
.userinfo-wrap {
    .banner {
        width: 100%;
        height: 100px;
    }
}
</style>