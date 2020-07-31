<template>
    <div class="login-btn-wrap">
        <div class="login-btn" @click="handleRigisterClicked">
            {{btntext}}
        </div>
    </div>
    
</template>

<script>
export default {
    props: {
        btntext: String
    },
    methods: {
        /**
        * @func
        * @desc 向父组件发送登录按钮点击事件
        */
        handleRigisterClicked() {
            this.$emit("submit");
        }
    }
}
</script>

<style lang='scss' scoped>
.login-btn-wrap {
    padding: 4.167vw 1.389vw;
}
.login-btn {
    height: 12.5vw;
    background-color: #ff9db5;
    color: #fff;
    border-radius: 6.25vw;

    display: flex;
    justify-content: center;
    align-items: center;
}
</style>