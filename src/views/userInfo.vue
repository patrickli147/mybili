<template>
    <div class="userinfo-wrap">
        <nav-bar></nav-bar>
        
        <img class="banner" src="../assets/bannerTop_new.png" alt="">

        <user-detail></user-detail>

    </div>
</template>

<script>
import NavBar from '@/components/common/NavBar.vue';
import UserDetail from '@/components/userinfoComponents/UserDetail.vue';

export default {
    components: {
        NavBar,
        UserDetail,
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