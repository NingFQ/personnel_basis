<template>
  <div>
    <div slot="footer" class="dialog_header">
      <div class="dialog_header_title">
        <p class="title">{{ title }}</p>
        <div
          class="header_close_icon el-icon-close"
          @click="closeDeleteDialog"
        ></div>
      </div>
      <div class="dialog_body_content">
        <div class="content_text_error">
          <div class="content_text">
            <img src="../../static/images/login_error.png" alt="" />
            <span>数据删除失败</span>
          </div>
          <p class="error_hint">（该部门下有数据，请清空数据后再删除）</p>
        </div>

        <el-form>
          <el-form-item class="top_btns">
            <el-button @click="closeDeleteDialog()">关闭</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ZhilinFrontDelete",

  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: "标题",
    },
  },
  components: {},
  mounted() {},
  methods: {
    // 关闭dialog
    closeDeleteDialog() {
      this.$parent.handleClose();
    },
  },
};
</script>

<style lang="scss">
.dialog_header_title {
  position: relative;
  width: 100%;
  height: 64px;
  background: #34428a;
  .title {
    width: 100%;
    text-align: center;
    line-height: 64px;
    font-size: 22px;
    font-weight: 400;
    color: #ffffff;
  }
  .header_close_icon {
    position: absolute;
    right: 0;
    top: 0;
    height: 64px;
    width: 64px;
    color: #fff;
  }
  .el-icon-close:before {
    content: "\e6db";
    font-size: 30px;
    font-weight: 600;
    line-height: 64px;
    text-align: center;
    cursor: pointer;
  }
}
.dialog_body_content {
  width: 100%;
  height: auto !important;
  overflow-y: scroll;
  padding: 50px 0;
  background: #fff;
  .content_text {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 50px 0 80px;
    img {
      width: 20px;
      height: 20px;
    }
    span {
      font-size: 18px;
      font-weight: 400;
      color: #333333;
      margin-left: 10px;
    }
    .error_hint {
      font-size: 14px;
      font-weight: 400;
      color: #999999;
    }
  }
  .content_text_error {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 50px 0 80px;
    .content_text {
      margin-bottom: 10px;
    }
    .error_hint {
      font-size: 14px;
      font-weight: 400;
      color: #999999;
    }
  }

  .el-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .el-form-item {
      width: 400px;
      .el-form-item__label {
        width: 100px !important;
        font-size: 16px;
        font-weight: 400;
        color: #333333;
      }
      .el-input {
        width: 300px;
        height: 44px;
        border-color: rgba(204, 204, 204, 1);
      }
      .el-select {
        width: 300px;
        height: 44px;
        border-color: rgba(204, 204, 204, 1);
      }
    }
    .top_btns {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .confrim_btn {
        width: 160px;
        height: 44px;
        background: #34428a;
        opacity: 1;
        font-size: 16px;
        border-radius: 2px;
        color: #fff;
      }

      .cancel_btn {
        width: 160px;
        height: 44px;
        background: #e5e7f3;
        opacity: 1;
        font-size: 16px;
        border-radius: 2px;
        color: #34428a;
      }
    }
  }
}
</style>