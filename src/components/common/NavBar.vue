<template>
    <div class="nav-wrap">
        <div class="logo">
            <img src="../../assets/logo.png" alt="">
        </div>
        <div></div>
        <div></div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
.nav-wrap {
    height: 12.5vw;
    background-color: #fff;
    display: flex;

    .logo {
        width: 120px;

        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 80%;
        }
    }

    div:nth-child(3) {
        img {
            width: 120px;
        }
    }
}
</style>