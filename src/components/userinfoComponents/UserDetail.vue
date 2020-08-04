<template>
    <div class="user-detail" v-if="userData">
        <div class="user-img">
            <img :src="userData.user_img" v-if="userData.user_img" @click="$router.push('editUserInfo')">
            <img src="../../assets/default_img.jpg" v-else @click="$router.push('editUserInfo')">
        </div>
        <div class="user-desc">
            <div class="desc-item fans">
                <span>0</span>
                <span>粉丝</span>
            </div>
            <div class="desc-item subscribers">
                <span>0</span>
                <span>关注</span>
            </div>
            <div class="desc-item likes">
                <span>0</span>
                <span>获赞</span>
            </div>
            <div class="edit" @click="$router.push('/editUserInfo')">编辑资料</div>
        </div>

        <div class="user-info">
            <div class="username">
                <span v-if="userData.username">{{userData.username}}</span>
                <span v-else>某某</span>
            </div>
            <div class="sign">
                <span v-if="userData.user_desc">{{userData.user_desc}}</span>
                <span v-else>这个人很懒，什么都留下……</span>
                
            </div>
            <div class="uid" v-show="!isCollapsed">
                uid:123456789
            </div>
            <div class="collapse" @click="isCollapsed = !isCollapsed">
                <span v-show="isCollapsed">详情</span>
                <span v-show="!isCollapsed">收起</span>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    props: {
        userData: Object,
    },
    data() {
        return {
            //true: collapsed
            isCollapsed: true,
        }
    },
}
</script>

<style lang='scss' scoped>
.user-detail {
    background-color: #fff;
    padding: 0 3.333vw;
    width: 100%;
    //height: 27.778vw;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    .user-img {
        width: 40%;
        height: 27.778vw;
        border-radius: 50%;
        position: relative;
        img {
            width: 16.889vw;
            height: 16.889vw;
            position: absolute;
            left: 0;
            top: -2.778vw;
            border-radius: 50%;
        }
    }

    .user-desc {
        width: 60%;
        height: 27.778vw;
        font-size: 4.167vw;

        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap;

        .desc-item {
            width: 33.33%;
            height: 40%;
            //border-radius: 2.778vw;
            //padding-top: 2.778vw;
            padding: 0 1.389vw;
            box-sizing: border-box;
        
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;

            span {
                width: 100%;
            }
            span:nth-child(2) {
                opacity: .5;
            }
        }
        .desc-item:nth-child(2) {
            border-left: 0.278vw solid #eee;
            border-right: 0.278vw solid #eee;
        }
        .edit {
            width: 90%;
            height: 40%;
            border: 0.278vw solid #fb7299 ;
            border-radius: 2.778vw;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
        }
    }

    .user-info {
        width: 100%;
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;

        text-align: left;

        .username {
            width: 100%;
            font-size: 5.556vw;
            font-weight: 900;
            padding: 1.389vw 0;
        }

        .sign {
            width: 100%;
            opacity: .5;
            font-size: 3.611vw;
            padding: 1.389vw 0;
        }

        .uid {
            font-size: 3.056vw;
            background-color: #ddd;
            color: black;
            padding: 1.389vw 1.389vw;
            border-radius: 1.389vw;
        }

        .collapse {
            position: absolute;
            right: 3vw;
            top: 11.111vw;
            font-size: 3.611vw;
            color: rgb(0, 162, 255);
        }

    }
}
</style>