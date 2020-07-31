<template>
    <div class="login-top">
        <div></div>
        <div>{{middleMsg}}</div>
        <div>
            <slot name="rightMsg"></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        middleMsg: String,
    }
}
</script>

<style lang='scss' scoped>
.login-top {
    height: 12.5vw;
    background-color: #fff;

    display: flex;
    div {
        flex: 1;
        font-size: 4.444vw;

        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>