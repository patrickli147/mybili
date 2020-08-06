<template>
    <div class="comment-wrap">
        <div class="comment-total" v-if="!username">
            <span>评论</span>
            <span>{{(length)}}</span>
        </div>

        <div class="commenter">
            <img v-if="userData && userData.user_img" :src="userData.user_img" alt="" @click="$router.push('/userinfo')">
            <img v-else src="../../assets/default_img.jpg" alt="" @click="$router.push('/userinfo')">

            <input @blur="handleInputBlur" ref="commenter" type="text" :placeholder="username ? `回复@${username}` : '请输入评论...'" @focus="handleInputFocus" v-model="commentInput">

            <button @click="commitComment">发表</button>
        </div>

    </div>
</template>

<script>
export default {
    methods: {
        /**
        * @func
        * @desc 获取用户数据
        */
        getUserData() {
            this.$http.get('/user/' + localStorage.getItem("id"))
            .then(res => {
                this.userData = res.data[0];
            })
            .catch(err => {
                console.log(err);
            })
        },
        /**
        * @func
        * @desc 处理input focus事件
        */
        handleInputFocus() {
            if (!sessionStorage.getItem("token")) {
                this.$toast.fail("请先登录");
                this.$router.push("/login");
            }
        },
        /**
        * @func
        * @desc 发表评论
        */
        commitComment() {
            if (this.commentInput === '') {
                this.$toast.fail("评论不能为空");
                return;
            }

            this.$emit("commitComment", this.commentInput);

            //clear
            this.commentInput = '';
        },
        /**
        * @func
        * @desc focus input
        */
        focusInput() {
            this.$refs.commenter.focus();
        },
        /**
        * @func
        * @desc input blur
        */
        handleInputBlur() {
            //blur 的同时可以 点击button 之后才触发inputBlur
            setTimeout(() => {
                console.log("blur")
                this.$emit("inputBlur");
            }, 100);
            
        }
    },
    data() {
        return {
            //user data
            userData: {},
            //comment input
            commentInput: '',

        }
    },
    created() {
        if (sessionStorage.getItem("token")) {
            this.getUserData();
        }
        
    },
    props: ['length', 'username'],
    mounted() {
        if (this.username) {
            this.focusInput();
        }
    }
}
</script>

<style lang='scss' scoped>
.comment-wrap {
    width: 100%;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;

    .comment-total {
        width: 100%;
        text-align: left;
        padding: 5px 10px;
        font-size: 15px;
        font-weight: bold;
    }

    .commenter {
        width: 100%;
        padding: 5px 10px;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 10px;
        }
        
        input {
            flex: 1;
            outline: none;
            border: 1px solid rgb(251,114,153);
            border-radius: 5px;
            background-color: #eee;
            height: 25px;
            font-size: 15px;
        }

        button {
            margin-left: 10px;
            outline: none;
            background-color: rgb(251,114,153);
            height: 25px;
            border: none;
            border-radius: 5px;
            font-size: 15px;
        }
    }
}
</style>