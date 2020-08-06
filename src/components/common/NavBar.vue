<template>
    <div class="nav-wrap">
        <div class="logo" @click="$router.push('/')">
            <img src="../../assets/logo.png" alt="">
        </div>
        <div>
            <p>
                请输入您要搜索的内容
                <van-icon name="search" class="search-icon"></van-icon>
            </p>
        </div>
        <div>
            <img v-if="headimg" :src="headimg" alt="" @click="$router.push('/userinfo')">
            <img v-else src="../../assets/default_img.jpg" alt="" @click="$router.push('/userinfo')" >
            <p>下载APP</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['headimg']
}
</script>

<style lang='scss' scoped>
.nav-wrap {
    height: 12.5vw;
    background-color: #fff;
    display: flex;

    .logo {
        width: 25vw;

        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 80%;
        }
    }

    div:nth-child(2) {
        flex: 1;

        display: flex;
        justify-content: center;
        align-items: center;

        p {
            background-color: #f4f4f4;
            height: 8.333vw;
            padding-left: 5.556vw;
            font-size: 3vw;
            width: 90%;
            border-radius: 2.778vw;
            position: relative;
            margin: 0 2.778vw;
            line-height: 8.333vw;

            .search-icon {
                position: absolute;
                padding: 0;
                margin: 0;
                left: 2.778vw;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }

    div:nth-child(3) {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            width: 6.667vw;
            height: 6.667vw;
            border-radius: 50%;
        }
        p {
            padding: 1.389vw 2.778vw;
            background-color: #fb7299;
            color: #fff;
            font-size: 3.611vw;
            margin: 0 1.389vw;
            border-radius: 1.389vw;
        }
    }
}
</style>