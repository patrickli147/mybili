<template>
  <div class="edit-userinfo-wrap">
    <nav-bar class="nav-bar" :headimg="userData.user_img"></nav-bar>

    <div class="edit-headImg" @click="$router.push({name: 'headImg', params: headImgParams})">
      <edit-item leftMsg="头像">
        <div v-if="userData.user_img" class="user-img">
          <img :src="userData.user_img" alt />
        </div>
        <div v-else class="user-img">
          <img src="../assets/default_img.jpg" alt />
        </div>
      </edit-item>
    </div>

    <div class="edit-name" @click="editItem('name')">
      <edit-item leftMsg="昵称">{{userData.name}}</edit-item>
    </div>

    <div class="edit-username">
      <edit-item leftMsg="账号">{{userData.username}}</edit-item>
    </div>

    <div class="edit-gender" @click="editItem('gender')">
      <edit-item leftMsg="性别">{{gender}}</edit-item>
    </div>

    <div class="edit-birthdate" @click="editItem('birthdate')">
      <edit-item leftMsg="出生日期">1997-01-01</edit-item>
    </div>

    <div class="edit-user_desc" @click="editItem('user_desc')">
      <edit-item leftMsg="个性签名">></edit-item>
    </div>

    <div class="back">
      <span @click="$router.push('/userinfo')">返回</span>
    </div>

    <van-dialog
      :title="items[itemToEdit]"
      show-cancel-button
      v-model="isDialogShown"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <van-field
        v-show="!isGenderPickShown"
        v-model="text"
        rows="1"
        autosize
        autofocus
        input-align="center"
        type="textarea"
        :placeholder="'请输入' + items[itemToEdit]"
      />
      <van-picker
        :columns="genders"
        @change="onGenderChange"
        class="gender-picker"
        v-show="isGenderPickShown"
      />
    </van-dialog>

  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar.vue";
import EditItem from "@/components/common/EditItem.vue";

export default {
  components: {
    NavBar,
    EditItem,
  },
  created() {
    //获取用户信息
    this.getUserInfo();
  },
  methods: {
    /**
     * @func
     * @desc 获取用户信息
     */
    getUserInfo() {
      this.$http.get("/user/" + localStorage.getItem("id")).then((res) => {
        //设置数据
        this.userData = res.data[0];
      });
    },
    /**
     * @func
     * @desc 编辑条目
     * @param {string} item - 待编辑的条目
     */
    editItem(item) {
      this.itemToEdit = item;
      this.isDialogShown = true;

      //单独处理gender
      if (item === "gender") {
        this.isGenderPickShown = true;
      } else {
        this.text = this.userData[item];
      }
    },
    /**
     * @func
     * @desc 用户点击确认
     */
    handleConfirm() {
      if (this.itemToEdit === "gender") {
        this.userData.gender = this.genderValue;
      } else {
        this.userData[this.itemToEdit] = this.text;
      }

      this.isGenderPickShown = false;

      this.updateUserInfo();
    },
    /**
     * @func
     * @desc 用户点击取消
     */
    handleCancel() {
      this.isGenderPickShown = false;
    },
    /**
     * @func
     * @desc
     * @param {object} picker - picker
     * @param {string} value - 选择的内容
     */
    onGenderChange(picker, value) {
      this.genderValue = value === "男" ? "1" : "2";
    },
    /**
     * @func
     * @desc 后台更新数据
     */
    updateUserInfo() {
      //后台更新
      this.$http
        .post("/update/" + localStorage.getItem("id"), this.userData)
        .then((res) => {
          if (res.data.code !== 200) {
            this.$toast.fail("修改失败，稍后再试");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  data() {
    return {
      //用户数据
      userData: {},
      //input 双向绑定数据
      text: "",
      //true: dialog is shown
      isDialogShown: false,
      //item to edit
      itemToEdit: "",
      //Chinese of items
      items: {
        name: "昵称",
        username: "账号",
        birthdate: "出生日期",
        user_desc: "个性签名",
        gender: "性别",
      },
      //gender
      genderValue: 1,
      //genders to select
      genders: ["男", "女"],
      //true: gender picker is shown
      isGenderPickShown: false,
    };
  },
  computed: {
    //gender
    gender() {
      if (this.userData.gender) {
        if (this.userData.gender === "1") {
          return "男";
        } else {
          return "女";
        }
      } else {
        return "未知";
      }
    },
    //头像params
    headImgParams() {
      return { userData: this.userData };
    },
  },
};
</script>

<style lang='scss' scoped>
.edit-userinfo-wrap {
  position: relative;
  .nav-bar {
    margin-bottom: 2.778vw;
  }

  .user-img {
    img {
      width: 13.889vw;
      height: 13.889vw;
      border-radius: 50%;
    }
  }

  .back {
    width: 100%;

    font-size: 3.5vw;
    height: 22.222vw;
    margin-top: 8.333vw;

    display: flex;
    justify-content: center;
    align-items: center;
    span {
      height: 12.222vw;
      width: 24.444vw;
      //padding: 2.778vw;
      border: 0.278vw solid #fb7299;
      border-radius: 2.778vw;
      background-color: #fff;

      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .gender-picker {
    width: 100%;
    background-color: #fff;
  }
}
</style>