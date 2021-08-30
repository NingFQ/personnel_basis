<template>
  <el-header style="height: 88px">
    <div class="header_left">
      <div class="site_logo" v-show="siteLogo != null">
        <img class="logo_img" :src="siteLogo" alt="" />
      </div>
      <span class="site_name">{{ siteName }}</span>
    </div>
    <div class="header_right">
      <div class="navigator_item" @click="jumpPage('/site/index')">
        <img class="navigator_icon" src="../../static/images/home.png" alt="" />
        <span class="navigator_name">首页</span>
      </div>
      <div class="navigator_item" @click="jumpPage('/site/site')">
        <img
          class="navigator_icon"
          src="../../static/images/setting.png"
          alt=""
        />
        <span class="navigator_name">网站配置</span>
      </div>
      <div class="navigator_item" @click="jumpPage('/site/group')">
        <img
          class="navigator_icon"
          src="../../static/images/group.png"
          alt=""
        />
        <span class="navigator_name">组织架构</span>
      </div>
      <div class="navigator_item" @click="jumpPage('/site/limit')">
        <img
          class="navigator_icon"
          src="../../static/images/limit.png"
          alt=""
        />
        <span class="navigator_name">权限管理</span>
      </div>
      <div class="navigator_item" @click="jumpPage('/site/password')">
        <img class="navigator_icon" src="../../static/images/lock.png" alt="" />
        <span class="navigator_name">修改密码</span>
      </div>
      <div class="user_avatar">
        <img class="avatar_img" :src="userAvator" alt="" />
      </div>
      <span class="user_name">{{ userName }}</span>
      <div class="logout_btn" @click="handleLogout">退出</div>
    </div>
  </el-header>
</template>

<script>
import userAvator from "../../static/images/avatar.png";
export default {
  name: "CommonHeader",

  data() {
    return {
      userAvator,
    };
  },
  computed: {
    userName() {
      return window.sessionStorage.getItem("userName");
    },
    siteName() {
      return this.$store.state.site.siteConfig.website_name;
    },
    siteLogo() {
      return this.$store.state.site.siteConfig.website_logo;
    },
  },

  mounted() {},
  methods: {
    handleLogout() {
      this.$appFetch(
        {
          url: "loginOut",
          method: "POST",
        },
        (res) => {
          window.sessionStorage.removeItem("userName");
          window.sessionStorage.removeItem("token");
          this.$router.push({ path: "/site/login" });
        }
      );
    },
    jumpPage(name) {
      this.$router.push({ path: name });
    },
  },
};
</script>

<style lang="sass" scoped>
.el-header
  width: 100%
  height: 88px
  background: rgba(52, 66, 138, 1)
  opacity: 1
  border-radius: 0px
  color: white
  .header_left
    float: left
    height: 100%
    display: flex
    flex-direction: row
    justify-content: flex-start
    align-items: center
    .site_logo
      width: 46px
      height: 46px
      border-radius: 50%
      overflow: hidden
      .logo_img
        display: block
        width: 46px
        height: 46px
    .site_name
      height: 100%
      font-size: 20px
      font-family: Source Han Sans CN
      font-weight: 400
      color: #FFFFFF
      line-height: 88px
      margin-left: 40px
  .header_right
    float: right
    height: 100%
    display: flex
    flex-direction: row
    justify-content: flex-end
    align-items: center
    .navigator_item
      height: 100%
      display: flex
      justify-content: center
      align-items: center
      margin-right: 74px
      cursor: pointer
      .navigator_icon
        width: 20px
        height: 20px
        margin-right: 6px
      .navigator_name
        font-size: 20px
        font-weight: 400
        color: #FFFFFF
    .user_avatar
      width: 38px
      height: 38px
      .avatar_img
        width: 38px
        height: 38px
    .user_name
      font-size: 17px
      font-weight: 400
      color: #FFFFFF
      opacity: 1
      margin-left: 10px
    .logout_btn
      width: 80px
      height: 38px
      margin-left: 30px
      margin-right: 70px
      line-height: 38px
      text-align: center
      color: #fff
      border: 1px solid #FFFFFF
      opacity: 1
      border-radius: 19px
      cursor: pointer
</style>