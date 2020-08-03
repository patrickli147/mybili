<template>
    <div class="rigister-wrap">
        <login-top middleMsg="注册bilibili" >
            <div slot="rightMsg" style="font-size: 4.167vw" @click="$router.push('/login')">点击登录</div>
        </login-top>
        <login-text 
            label="姓名" 
            class="login-text"
            placeholder="请输入姓名"
            rule="^.{1,10}$"
            @inputChange="arg => name = arg"
        ></login-text>  
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
        
        <login-btn btntext="注册" @submit="handleSubmit"></login-btn>
    </div>
</template>

<script>
import LoginTop from '@/components/common/LoginTop.vue';
import LoginText from '@/components/common/LoginText.vue';
import LoginBtn from '@/components/common/LoginBtn.vue';

export default {
    mounted() {
        //this.$dialog.confirm({
        //    title: "是否立即跳转？"
        //});
    },
    components: {
        LoginTop,
        LoginText,
        LoginBtn
    },
    data() {
        return {
            //用户姓名
            name: '',
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
        * @desc 注册按键按下，发送注册请求
        */
        handleSubmit() {
            if (this.name && this.username && this.password) {
                //正则全部通过,发送请求
                this.$http.post('/register', {
                    name: this.name,
                    username: this.username,
                    password: this.password
                }).then(res => {
                    let data = res.data;

                    if (data) {
                        //返回了data
                        if (data.code === 302 || data.code === 301) {
                            //返回码302，注册失败账号已经存在
                            this.$toast.fail(data.msg);
                        }
                        else if (data.code === 200) {
                            //返回码200，注册成功
                            this.$toast.success(data.msg);

                            //存储id和token
                            localStorage.setItem("id", data.id);
                            sessionStorage.setItem("token", data.objtoken);

                            //跳转到登录
                            setTimeout(() => {
                                this.$router.push('/login');
                            }, 1000);

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