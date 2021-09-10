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
            <a
              class="operate-hint"
              href="http://personal.dripm.cn/user.xlsx"
              download="人员信息.xlsx"
              >下载excel模板</a
            >
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
          <div class="upload-file-info">
            <el-upload
              action=""
              :multiple="false"
              :show-file-list="false"
              :http-request="selectExcelUpload"
            >
              <span class="operate-hint">上传excel文件</span>
            </el-upload>
            <span class="operate-intr">{{ fileName }}</span>
            <span
              class="operate-delete"
              v-show="fileName != ''"
              @click="deleteFile"
              >删除</span
            >
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
            <span class="operate-success-text"
              >{{ successNum }}条数据导入成功</span
            >
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
            <span class="operate-error-text">{{ errorNum }}条数据导入失败</span>
            <img
              class="operate-error-icon"
              src="../../static/images/login_error.png"
              alt=""
            />
            <span
              class="operate-error-text operate-download"
              @click="downloadFile()"
              >下载失败数据</span
            >
          </el-row>
        </div>
      </div>
      <div v-show="active != 2">
        <el-button
          type="primary"
          :disabled="!nextDisable"
          @click="nextStept()"
          >{{ active == 1 ? "下一步" : "关闭" }}</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import upFile from "../../../../helpers/upFileHelper.js";

export default {
  name: "PersonnelBasisImportFile",

  data() {
    return {
      active: 1,
      fileName: "",
      fileKey: "",
      fileSize: "",
      successNum: "",
      errorNum: "",
      downloadUrl: "",
    };
  },
  props: {
    title: {
      type: String,
      default: "标题",
    },
  },
  mounted() {},
  computed: {
    nextDisable() {
      return this.fileName != "" && this.fileKey != "";
    },
  },
  methods: {
    // 关闭dialog
    closeAddDialog() {
      if (this.active != 3) {
        this.$parent.handleClose();
      } else {
        this.$parent.$parent.importExcelCallBack();
      }
    },
    // 选取文件上传
    selectExcelUpload({ file }) {
      console.log(file);
      this.fileName = file.name;
      this.fileSize = file.size;
      upFile(file, "excel").then(
        (args) => {
          this.fileKey = args.result.key;
        },
        (req) => {}
      );
    },
    deleteFile() {
      this.fileName = "";
      this.fileKey = "";
    },
    downloadFile() {
      // var a = document.createElement("a");
      // a.href = "http://personal.dripm.cn/user.xlsx";
      // a.download = "test.xlsx";
      // a.click();
      // this.downloadUrlFile("http://personal.dripm.cn/员工.xlsx");
      // window.open("http://personal.dripm.cn/员工.xlsx");
      // window.location.href =
      //   "http://personal.dripm.cn/upload/Upload/2021/09/09/32471631185885.xlsx";
    },
    downloadUrlFile(url) {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "blob";
      xhr.setRequestHeader("token", window.sessionStorage.getItem("token"));
      xhr.onload = () => {
        if (xhr.status === 200) {
          this.saveAs(xhr.response, fileInfo.name);
        }
      };
      xhr.send();
    },
    saveAs(data, name) {
      var urlObject = window.URL || window.webkitURL || window;
      var export_blob = new Blob([data]);
      var save_link = document.createElementNS("", "a");
      save_link.href = urlObject.createObjectURL(export_blob);
      save_link.download = name;
      save_link.click();
    },
    nextStept() {
      if (this.active == 1) {
        this.active = 2;
        this.$appFetch(
          {
            url: "importResult",
            method: "POST",
            data: {
              key: this.fileKey,
            },
          },
          (res) => {
            if (res.code == 200 && res.result != null) {
              this.active = 3;
              this.successNum = res.result.success_num;
              this.errorNum = res.result.error_num;
              this.downloadUrl = res.result.download_url;
            }
            this.active = 3;
          }
        );
      } else if (this.active == 3) {
        this.closeAddDialog();
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
    .upload-file-info {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
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
      margin-right: 10px;
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
      margin-left: 10px;
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