<template>
  <div class="site_password" v-loading="isLoading">
    <common-header />
    <div class="site_password_main">
      <el-form
        class="login_dialog_wrap"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
      >
        <div class="login_input">
          <img
            class="pre_icon"
            src="../static/images/login_password.png"
            alt=""
          />
          <el-input
            type="password"
            class="login_input"
            placeholder="请填写登录密码"
            v-model="ruleForm.nowPassword"
          ></el-input>
        </div>

        <div class="login_input">
          <img
            class="pre_icon"
            src="../static/images/login_password.png"
            alt=""
          />
          <el-input
            type="password"
            class="login_input"
            placeholder="请输入新的登录密码"
            v-model="ruleForm.newPassword"
          ></el-input>
        </div>
        <div class="login_input">
          <img
            class="pre_icon"
            src="../static/images/login_password.png"
            alt=""
          />
          <el-input
            type="password"
            class="login_input"
            placeholder="请输入新的登录密码"
            v-model="ruleForm.newConfirmPassword"
          ></el-input>
        </div>
        <div v-show="isShowHint" class="login_hint">
          <img class="hint_icon" src="../static/images/waring.png" alt="" />
          <span class="hint_text">{{ hintStr }}</span>
        </div>
        <el-button type="primary" class="login_btn" @click="handleConfirm"
          >确认</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
import CommonHeader from "./components/common_header.vue";
export default {
  name: "ZhilinFrontPasswordConfig",

  components: { CommonHeader },

  data() {
    return {
      isLoading: false,
      ruleForm: {
        nowPassword: "",
        newPassword: "",
        newConfirmPassword: "",
      },
      isShowHint: false,
      hintStr: "",
    };
  },

  mounted() {},

  methods: {
    handleConfirm() {
      var fromData = this.ruleForm;
      if (fromData.nowPassword == "" || fromData.nowPassword.length == 0) {
        this.isShowHint = true;
        this.hintStr = "请填写登录密码";
      } else if (
        fromData.newPassword == "" ||
        fromData.newPassword.length == 0
      ) {
        this.isShowHint = true;
        this.hintStr = "请输入新的登录密码";
      } else if (
        fromData.newConfirmPassword == "" ||
        fromData.newConfirmPassword.length == 0
      ) {
        this.isShowHint = true;
        this.hintStr = "请再次输入新的登录密码";
      } else if (fromData.newPassword != fromData.newConfirmPassword) {
        this.isShowHint = true;
        this.hintStr = "两次密码输入不一致，请重新输入";
        fromData.newPassword = "";
        fromData.newConfirmPassword = "";
      } else {
        var that = this;
        this.isLoading = true;
        this.$appFetch(
          {
            url: "changePassword",
            method: "POST",
            data: {
              password_old: this.fromData.nowPassword,
              password: this.fromData.newPassword,
              password_confirm: this.fromData.newConfirmPassword,
            },
          },
          (res) => {
            if (res.code == 200 && res.result != null) {
              that.isLoading = false;
              that.$notify({
                title: "成功",
                message: "密码修改成功",
                type: "success",
              });
              fromData.nowPassword = "";
              fromData.newPassword = "";
              fromData.newConfirmPassword = "";
            }
          }
        );
      }
      console.log();
    },
  },
};
</script>

<style lang="scss">
.site_password {
  width: 100%;
  height: 100%;
}
.site_password_main {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  .login_dialog_wrap {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 70px 70px 0px;
    width: 660px;
    height: 660px;
    border-radius: 20px;
    box-shadow: 0px 20px 30px rgba(0, 15, 64, 0.3);
    background: white;
    .login_input {
      position: relative;
      width: 460px;
      height: 68px;
      display: inline-block;
      margin-bottom: 26px;
      input {
        position: absolute;
        width: 100%;
        height: 100%;
        font-size: 18px;
        opacity: 1;
        padding: 0 72px;
      }
      .pre_icon {
        position: absolute;
        left: 40px;
        top: 23px;
        z-index: 99;
        height: 22px;
        width: 22px;
      }
    }
    .login_hint {
      width: 460px;
      height: 44px;
      background: #ffe5e5;
      opacity: 1;
      border-radius: 6px;
      margin-bottom: 39px;
      padding-left: 42px;
      line-height: 44px;
      .hint_icon {
        width: 18px;
        height: 18px;
        margin-right: 12px;
      }
      .hint_text {
        font-size: 16px;
        font-weight: 400;
        line-height: 0px;
        color: #ff4e4e;
        opacity: 1;
      }
    }

    .login_btn {
      width: 460px;
      height: 58px;
    }
  }
}
</style>