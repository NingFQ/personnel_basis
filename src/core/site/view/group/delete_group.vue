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
        <div class="content_text">
          <img src="../../static/images/waring.png" alt="" />
          <span>是否确认删除，删除后无法恢复！</span>
        </div>
        <el-form>
          <el-form-item class="top_btns">
            <el-button class="btn_item" @click="closeDeleteDialog()"
              >取消</el-button
            >
            <el-button type="primary" class="btn_item" @click="deleteOperate()"
              >删除</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ZhilinFrontDelete",

  data() {},
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
    // 删除操作
    deleteOperate() {
      this.$parent.$parent.handleDeleteData();
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
      .btn_item {
        width: 160px;
        height: 44px;
      }
    }
  }
}
</style>