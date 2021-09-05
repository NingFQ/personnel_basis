<template>
  <div>
    <div slot="footer" class="dialog_header">
      <div class="dialog_header_title">
        <p class="title">{{ title }}</p>
        <div
          class="header_close_icon el-icon-close"
          @click="closeAddDialog"
        ></div>
      </div>
    </div>
    <div class="dialog_body_content">
      <el-steps
        :active="active"
        align-center
        :space="500"
        process-status="wait"
        finish-status="success"
      >
        <el-step title="上传文件" description="根据模板修改后上传"></el-step>
        <el-step title="执行导入" description="数据导入至服务器"></el-step>
        <el-step title="导入结果" description="完成数据批量导入"></el-step>
      </el-steps>
      <div v-show="active == 1">
        <div class="operate-content">
          <img
            class="operate-icon"
            src="../../static/images/download.png"
            alt=""
          />
          <div>
            <span class="operate-hint">下载excel模板</span>
            <span class="operate-intr">填写信息</span>
          </div>
        </div>
        <div class="operate-desc">
          请按照数据模板的格式准备导入数据，模板中的表头名称不可更改，表头行不能删除。
        </div>
        <div class="operate-content">
          <img
            class="operate-icon"
            src="../../static/images/upload.png"
            alt=""
          />
          <div>
            <span class="operate-hint">上传excel文件</span>
            <span class="operate-intr">部门数据xls</span>
            <span class="operate-delete">删除</span>
          </div>
        </div>
        <div class="operate-desc">文件后缀名必须为 xls 或 xlsx</div>
      </div>
      <div v-show="active == 2">
        <div class="operate-content" style="height: 200px">
          <el-row
            style="width: 100%"
            type="flex"
            justify="center"
            align="middle"
          >
            <img
              class="operate-file"
              src="../../static/images/file_icon.png"
              alt=""
            />
            <div class="file-info">
              <span>我是文件名我是文件名.xls</span>
              <span>234kB</span>
            </div>
            <el-progress :percentage="50" :color="'#409EFF'"></el-progress>
          </el-row>
        </div>
      </div>
      <div v-show="active == 3">
        <div class="operate-content" style="height: 200px; padding-left: 255px">
          <el-row
            style="width: 100%; margin-bottom: 34px"
            type="flex"
            justify="start"
            align="middle"
          >
            <img
              class="operate-stept3-file"
              src="../../static/images/file_icon.png"
              alt=""
            />
            <span class="operate-success-text">100条数据导入成功</span>
            <img
              class="operate-success-icon"
              src="../../static/images/success.png"
              alt=""
            />
          </el-row>
          <el-row
            style="width: 100%"
            type="flex"
            justify="start"
            align="middle"
          >
            <img
              class="operate-stept3-file"
              src="../../static/images/file_icon.png"
              alt=""
            />
            <span class="operate-error-text">33条数据导入失败</span>
            <img
              class="operate-error-icon"
              src="../../static/images/login_error.png"
              alt=""
            />
            <span class="operate-error-text operate-download"
              >下载失败数据</span
            >
          </el-row>
        </div>
      </div>
      <div v-show="active != 2">
        <el-button type="primary" @click="nextStept">{{
          active == 1 ? "下一步" : "关闭"
        }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonnelBasisImportFile",

  data() {
    return {
      active: 1,
    };
  },
  props: {
    title: {
      type: String,
      default: "标题",
    },
  },
  mounted() {},

  methods: {
    // 关闭dialog
    closeAddDialog() {
      this.$parent.handleClose();
    },
    nextStept() {
      if (this.active < 3) {
        this.active++;
      } else {
        if (this.active == 3) {
          this.$parent.handleClose();
        } else {
          this.active = 1;
        }
      }
    },
  },
};
</script>

<style lang="scss">
.dialog_body_content {
  width: 100%;
  height: 706px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .el-steps {
    width: 80%;
    margin-bottom: 60px;
  }
  .operate-content {
    width: 880px;
    height: 130px;
    margin-bottom: 10px;
    border: 1px dashed #34428a;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .operate-icon {
      width: 84px;
    }
    .operate-file {
      width: 36px;
      margin-right: 15px;
    }
    .operate-hint {
      font-size: 16px;
      font-weight: 500;
      line-height: 0px;
      color: #409eff;
      cursor: pointer;
      text-decoration: underline;
    }
    .operate-intr {
      font-size: 16px;
      font-weight: 400;
      line-height: 0px;
      color: #333333;
    }
    .operate-delete {
      font-size: 16px;
      font-weight: 500;
      line-height: 0px;
      cursor: pointer;
      color: #ff4e4e;
    }
    .file-info {
      display: flex;
      flex-direction: column;
    }
    .el-progress {
      width: 400px;
      margin-left: 40px;
    }
    .operate-stept3-file {
      width: 20px;
      margin-right: 15px;
    }
    .operate-success-text {
      font-size: 18px;
      font-weight: 400;
      line-height: 0px;
      color: #333333;
      width: 200px;
      text-align: left;
    }
    .operate-error-text {
      font-size: 18px;
      font-weight: 400;
      line-height: 0px;
      color: #ff4e4e;
      width: 200px;
      text-align: left;
    }
    .operate-success-icon {
      width: 20px;
    }
    .operate-download {
      margin-left: 20px;
      text-decoration: underline;
    }
  }
  .operate-desc {
    width: 880px;
    text-align: left;
    font-size: 14px;
    font-weight: 400;
    line-height: 0px;
    color: #cccccc;
    margin-top: 20px;
    margin-bottom: 35px;
  }
}
.el-step__head.is-success {
  color: #409eff !important;
  border-color: #409eff !important;
}
.el-step__title.is-success {
  font-weight: bold !important;
  color: #409eff !important;
}
.el-step__description.is-success {
  color: #409eff !important;
}
</style>