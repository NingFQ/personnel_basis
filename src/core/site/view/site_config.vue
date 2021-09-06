<template>
  <div class="site_webconfig" v-loading="isLoading">
    <common-header />
    <div class="web-config_main">
      <div class="main">
        <el-row type="flex" justify="space-around" align="top">
          <div class="main_left">
            <el-row
              class="main_left_item"
              type="flex"
              justify="end"
              align="middle"
            >
              <span class="item_title">登录页标题</span>
              <el-input
                placeholder="请输入登录页标题"
                v-model="requestObj.title"
              >
              </el-input>
            </el-row>
            <el-row
              class="main_left_item"
              type="flex"
              justify="end"
              align="middle"
            >
              <span class="item_title">登录页logo</span>
              <div style="width: 460px">
                <el-upload
                  action=""
                  :multiple="false"
                  :show-file-list="false"
                  :http-request="selectLoginLogoUpload"
                >
                  <img
                    v-if="roleFrom.login_logo"
                    height="200px"
                    :src="roleFrom.login_logo"
                    class="avatar"
                  />
                  <i v-else>
                    <el-button icon="el-icon-upload">上传图片</el-button>
                  </i>
                </el-upload>
              </div>
            </el-row>
            <!-- <el-row
              class="main_left_item"
              type="flex"
              justify="end"
              align="middle"
            >
              <span class="item_title">浏览器图标</span>
              <el-button icon="el-icon-upload">上传图片</el-button>
            </el-row> -->
            <el-row
              class="main_left_item"
              type="flex"
              justify="end"
              align="middle"
            >
              <span class="item_title">网站名称</span>
              <el-input
                placeholder="请输入网站名称"
                v-model="requestObj.website_name"
              >
              </el-input>
            </el-row>
            <el-row
              class="main_left_item"
              type="flex"
              justify="end"
              align="middle"
            >
              <span class="item_title">网站logo</span>
              <div style="width: 460px">
                <el-upload
                  action=""
                  :multiple="false"
                  :show-file-list="false"
                  :http-request="selectSiteLogoUpload"
                >
                  <img
                    v-if="roleFrom.website_logo"
                    height="200px"
                    :src="roleFrom.website_logo"
                    class="avatar"
                  />
                  <i v-else>
                    <el-button icon="el-icon-upload">上传图片</el-button>
                  </i>
                </el-upload>
              </div>
            </el-row>
          </div>
          <div class="main_right">
            <el-row
              class="main_left_item"
              type="flex"
              justify="start"
              align="middle"
            >
              <span class="item_title">登录页背景</span>
              <el-upload
                action=""
                :multiple="false"
                :show-file-list="false"
                :http-request="selectLoginBgUpload"
              >
                <el-button icon="el-icon-upload">上传图片</el-button>
              </el-upload>
            </el-row>
            <el-row
              class="main_left_item"
              type="flex"
              justify="start"
              align="middle"
            >
              <span class="item_title">背景图预览</span>
              <div class="show">
                <img :src="roleFrom.logo_background" alt="" />
              </div>
            </el-row>
          </div>
        </el-row>
      </div>
      <el-button class="save_btn" type="primary" @click="saveData"
        >保 存</el-button
      >
    </div>
  </div>
</template>

<script>
import CommonHeader from "./components/common_header.vue";
import upFile from "../../../helpers/upFileHelper.js";

export default {
  name: "ZhilinFrontSiteConfig",

  components: { CommonHeader },

  data() {
    return {
      isLoading: false,
      roleFrom: {
        login_logo: "",
        icon: "",
        website_logo: "",
        logo_background: "",
      },
      requestObj: {
        title: "",
        login_logo: "",
        icon: "",
        website_name: "",
        website_logo: "",
        logo_background: "",
      },
    };
  },

  mounted() {
    this.initData();
  },
  computed: {},
  methods: {
    initData() {
      this.$appFetch(
        {
          url: "webConfigInfo",
          method: "POST",
        },
        (res) => {
          if (res.code == 200 && res.result != null) {
            this.requestObj.title = res.result.title;
            this.requestObj.website_name = res.result.website_name;

            this.roleFrom.login_logo = res.result.login_logo;
            this.roleFrom.icon = res.result.icon;
            this.roleFrom.website_logo = res.result.website_logo;
            this.roleFrom.logo_background = res.result.logo_background;
            this.$store.commit("UPDATA_CONFIG", res.result);
            if (this.isLoading) {
              this.isLoading = false;
            }
          }
        }
      );
    },
    selectLoginLogoUpload({ file }) {
      upFile(file, "image").then(
        (args) => {
          this.requestObj.login_logo = args.result.file_url;
          this.roleFrom.login_logo = args.result.image_url;
        },
        (req) => {}
      );
    },
    selectSiteLogoUpload({ file }) {
      upFile(file, "image").then(
        (args) => {
          this.requestObj.website_logo = args.result.file_url;
          this.roleFrom.website_logo = args.result.image_url;
        },
        (req) => {}
      );
    },
    selectLoginBgUpload({ file }) {
      upFile(file, "image").then(
        (args) => {
          this.requestObj.logo_background = args.result.file_url;
          this.roleFrom.logo_background = args.result.image_url;
        },
        (req) => {}
      );
    },

    saveData() {
      this.isLoading = true;
      this.$appFetch(
        {
          url: "saveWebConfig",
          method: "POST",
          data: this.requestObj,
        },
        (res) => {
          if (res.code == 200 && res.result != null) {
            this.initData();
          } else {
          }
        }
      );
    },
  },
};
</script>

<style lang="scss">
.site_webconfig {
  width: 100%;
  height: 100%;
  .web-config_main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .main {
      padding: 84px 0 130px;
      .main_left,
      .main_right {
        .main_left_item {
          margin-bottom: 40px;
          .item_title {
            font-size: 20px;
            font-weight: 400;
            color: #333333;
            margin-right: 30px;
          }
          input {
            width: 460px;
            height: 68px !important;
            font-size: 20px;
            font-weight: 400;
          }
          .el-input {
            width: 460px;
            height: 68px !important;
          }
          .el-button {
            width: 460px;
            height: 68px;
            font-size: 20px;
            font-weight: 400;
            color: #34428a;
          }
        }
      }
      .main_right {
        margin-left: 153px;
        .show {
          width: 460px;
          height: 300px;
          // background: #cccccc;
          opacity: 1;
          border-radius: 6px;
          border: 1px solid #ccc;
          img {
            width: 460px;
          }
        }
      }
    }
    .save_btn {
      width: 460px;
      height: 58px;
      font-size: 18px;
    }
  }
}
</style>