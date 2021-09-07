<template>
  <div
    class="site_login"
    :style="{ backgroundImage: 'url(' + loginBgUrl + ')' }"
  >
    <el-form
      class="login_dialog_wrap"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
    >
      <div class="site_logo">
        <img class="logo_img" :src="loginIcon" alt="" />
      </div>
      <p class="site_name">{{ loginTitle }}</p>
      <div class="login_input">
        <img class="pre_icon" src="../static/images/login_user.png" alt="" />
        <el-input
          class="login_input"
          v-model="ruleForm.name"
          placeholder="请输入用户名"
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
          v-model="ruleForm.password"
          placeholder="请输入登录密码"
        ></el-input>
      </div>
      <div class="login_code">
        <div class="login_input">
          <img class="pre_icon" src="../static/images/login_code.png" alt="" />
          <el-input
            type="text"
            class="login_code"
            v-model="ruleForm.code"
            placeholder="请输入验证码"
          ></el-input>
        </div>
        <div class="code_show" @click="getCaptchaCode">
          <img :src="verifyCodeSrc" alt="" />
        </div>
      </div>
      <div v-show="isShowLoginHint" class="login_hint">
        <img class="hint_icon" src="../static/images/waring.png" alt="" />
        <span class="hint_text">{{ hintStr }}</span>
      </div>
      <div v-show="isShowRequestHint" class="login_hint">
        <img class="hint_icon" src="../static/images/login_error.png" alt="" />
        <span class="hint_text">{{ hintStr }}</span>
      </div>
      <el-button type="primary" class="login_btn" @click="handleLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>
<script>
import "@site/static/scss/index.scss";
import siteCon from "@site/controller/indexCon";

export default {
  ...siteCon,
  data() {
    return {
      loginBgUrl: "",
      loginIcon: "", // 登录logo
      loginTitle: "", // 登录title
      ruleForm: {
        name: "",
        password: "",
        code: "",
      },
      verifyCodeSrc: "", // 验证码图片地址
      isShowLoginHint: false, // 登录输入提示
      isShowRequestHint: false, // 登录接口错误提示
      hintStr: "", // 提示文案
      verifyCodeHash: "", // 验证码哈希值
      verifyCodeTime: "", // 验证码过期时间
    };
  },
  methods: {
    handleLogin() {
      var fromData = this.ruleForm;
      if (fromData.name == "" || fromData.name.length == 0) {
        this.isShowRequestHint = false;
        this.isShowLoginHint = true;
        this.hintStr = "请填写用户名";
      } else if (fromData.password == "" || fromData.password.length == 0) {
        this.isShowLoginHint = true;
        this.isShowRequestHint = false;
        this.hintStr = "请填写登录密码";
      } else if (fromData.code == "" || fromData.code.length == 0) {
        this.isShowLoginHint = true;
        this.hintStr = "请填写验证吗";
        this.isShowRequestHint = false;
      } else {
        this.$appFetch(
          {
            url: "loginIn",
            method: "POST",
            data: {
              username: this.ruleForm.name,
              password: this.ruleForm.password,
              code: this.ruleForm.code,
              verifyCodeTime: this.verifyCodeTime,
              verifyCodeHash: this.verifyCodeHash,
            },
          },
          (res) => {
            if (res.code == 200) {
              window.sessionStorage.setItem("userName", res.result.name);
              window.sessionStorage.setItem("token", res.result.token);
              setTimeout(() => {
                this.$router.push({ path: "/site/index" });
              }, 10);
            } else {
              this.isShowLoginHint = false;
              this.isShowRequestHint = true;
              this.hintStr = res.msg;
            }
          }
        );
      }
    },
    getCaptchaCode() {
      this.$appFetch(
        {
          url: "loginImgCode",
          method: "POST",
        },
        (res) => {
          if (res.code == 200 && res.result != null) {
            this.verifyCodeSrc = res.result.verifyCode;
            this.verifyCodeHash = res.result.verifyCodeHash;
            this.verifyCodeTime = res.result.verifyCodeTime;
          }
        }
      );
    },
    getSiteConfig() {
      this.$appFetch(
        {
          url: "webConfigInfo",
          method: "POST",
        },
        (res) => {
          if (res.code == 200 && res.result != null) {
            this.loginIcon = res.result.login_logo;
            this.loginTitle = res.result.title;
            this.loginBgUrl = res.result.logo_background;
            this.$store.commit("UPDATA_CONFIG", res.result);
          }
        }
      );
    },
  },
  mounted() {
    this.getCaptchaCode();
    this.getSiteConfig();
  },
};
</script>

<style lang="sass">
.site_login
  width: 100%
  height: 100%
  display: flex
  justify-content: center
  align-items: center
  background-size: cover
  background-repeat: no-repeat
  .login_dialog_wrap
    display: flex
    flex-direction: column
    justify-content: flex-start
    align-items: center
    padding: 70px 70px 0px
    width: 600px
    height: 800px
    border-radius: 20px
    box-shadow: 0px 20px 30px rgba(0, 15, 64, 0.3)
    background: white
    .site_logo
      width: 100px
      height: 100px
      border-radius: 50%
      margin-bottom: 20px
      overflow: hidden
      display: inline-block
      .logo_img
        display: block
        width: 100px
        height: 100px
    .site_name
      font-size: 26px
      color: #101C51
      font-weight: 400
    .login_input
      position: relative
      width: 460px
      height: 68px
      display: inline-block
      margin-bottom: 26px
      input
        position: absolute
        width: 100%
        height: 100%
        font-size: 18px
        opacity: 1
        padding: 0 72px

      .pre_icon
        position: absolute
        left: 40px
        top: 23px
        z-index: 99
        height: 22px
        width: 22px

    .login_code
      width: 100%
      height: 68px
      display: flex
      flex-direction: row
      justify-content: space-between
      margin-bottom: 26px
      .code_show
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        width: 160px
        height: 68px
        margin-left: 10px
        border: 1px solid #ccc
        border-radius: 6px
        cursor: pointer
        img
          width: 100%
  .login_hint
    width: 460px
    height: 44px
    background: #FFE5E5
    opacity: 1
    border-radius: 6px
    margin-bottom: 39px
    padding-left: 42px
    line-height: 44px
    .hint_icon
      width: 18px
      height: 18px
      margin-right: 12px
    .hint_text
      font-size: 16px
      font-weight: 400
      line-height: 0px
      color: #FF4E4E
      opacity: 1
  .login_btn
    width: 460px
    height: 58px
</style>