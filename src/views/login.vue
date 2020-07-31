<template>
    <div class="rigister-wrap">
        <login-top middleMsg="登录">
            <div slot="rightMsg" style="font-size: 4.167vw" @click="$router.push('/register')">点击注册</div>    
        </login-top> 
        
        <login-text 
            label="账号" 
            class="login-text"
            placeholder="请输入账号"
            rule="^.{6,16}$"
            @inputChange="arg => username = arg"
        ></login-text>  
        <login-text 
            label="密码" 
            class="login-text"
            placeholder="请输入密码"
            type="password"
            rule="^.{6,16}$"
            @inputChange="arg => password = arg"
        ></login-text>  
        
        <login-btn btntext="登录" @submit="handleSubmit"></login-btn>

    </div>
</template>

<script>
import LoginTop from '@/components/common/LoginTop.vue';
import LoginText from '@/components/common/LoginText.vue';
import LoginBtn from '@/components/common/LoginBtn.vue';

export default {
    components: {
        LoginTop,
        LoginText,
        LoginBtn
    },
    data() {
        return {
            //用户名
            username: '',
            //密码
            password: '',
        }
    },
    methods: {
        /**
        * @func
        * @desc 
        * @param {String} arg - inputChange事件传入的参数
        */
        handleInputChange(arg) {
            this.name = arg;
        },
        /**
        * @func
        * @desc 登录按键按下，发送登录请求
        */
        handleSubmit() {
            if (this.username && this.password) {
                //正则全部通过,发送请求
                this.$http.post('/login', {
                    name: this.name,
                    username: this.username,
                    password: this.password
                }).then(res => {
                    console.log(res);
                    let data = res.data;

                    if (data) {
                        //返回了data
                        if (data.code === 302) {
                            //返回码302，登录失败
                            this.$toast.fail(data.msg);
                        }
                        else if (data.code === 200) {
                            //返回码200，登录成功
                            this.$toast.success(data.msg);
                        }
                        else {
                            //其余
                            this.$toast(data.msg);
                        }
                    }
                }).catch(err => {
                    console.log(err);
                });
            }
            else {
                this.$toast.fail("格式不正确，重新输入");
            }
        }
    }
}
</script>

<style lang='scss' scoped>
.rigister-wrap {
    .login-text {
        margin: 2.778vw 0;
        font-size: 4.167vw;
    }
}
</style>