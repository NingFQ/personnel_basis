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
      <div class="dialog_body_content">
        <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
          <el-form-item
            :label-position="right"
            label="人员类型"
            prop="personnelType"
          >
            <el-select
              v-model="ruleForm.personnelType"
              placeholder="请选择"
              @change="changePersonValue($event)"
            >
              <el-option
                v-for="(item, index) in personnelData"
                :key="index"
                :label="item"
                :value="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            :label-position="right"
            label="身份类型"
            prop="identityType"
          >
            <el-select
              v-model="ruleForm.identityType"
              placeholder="请选择"
              @change="changeIdentityValue($event)"
            >
              <el-option
                v-for="(item, key) in identityTypeData"
                :key="key"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label-position="right" label="姓名" prop="userName">
            <el-input
              v-model="ruleForm.userName"
              placeholder="请输入姓名"
            ></el-input>
          </el-form-item>
          <el-form-item :label-position="right" label="身份证号" prop="idCode">
            <el-input
              v-model="ruleForm.idCode"
              placeholder="请输入身份证号"
            ></el-input>
          </el-form-item>
          <el-form-item :label-position="right" label="证件号" prop="idNumber">
            <el-input
              v-model="ruleForm.idNumber"
              placeholder="请输入证件号"
            ></el-input>
          </el-form-item>
          <el-form-item :label-position="right" label="性别" prop="sex">
            <el-select v-model="ruleForm.sex" placeholder="请选择">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label-position="right" label="民族" prop="nation">
            <el-select v-model="ruleForm.nation" placeholder="请选择">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label-position="right" label="籍贯" prop="originate">
            <el-input
              v-model="ruleForm.originate"
              placeholder="请输入籍贯"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label-position="right"
            label="出生日期"
            prop="birthday"
          >
            <el-date-picker
              :disabled="true"
              v-model="ruleForm.birthday"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item
            :label-position="right"
            label="入职时间"
            prop="entrantTime"
          >
            <el-date-picker
              v-model="ruleForm.entrantTime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
            :label-position="right"
            label="离职时间"
            prop="leaveTime"
          >
            <el-date-picker
              v-model="ruleForm.leaveTime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
            :label-position="right"
            label="离职原因"
            prop="levelReason"
          >
            <el-select
              v-model="ruleForm.levelReason"
              placeholder="请选择"
              @change="changeLevelReason($event)"
            >
              <el-option
                v-for="(item, key) in levelReasonData"
                :key="key"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="top_btns">
            <el-button class="cancel_btn" @click="closeAddDialog()"
              >取消</el-button
            >
            <el-button class="confrim_btn" @click="submitForm()"
              >导入</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ZhilinFrontAdd",

  data() {
    return {
      ruleForm: {
        isWork: "", // 是否在职
        personnelType: "", // 人员类型
        identityType: "", // 身份类型
        userName: "", // 姓名
        idCode: "", // 身份证号
        idNumber: "", // 证件号
        sex: "", // 性别
        nation: "", // 民族
        originate: "", // 籍贯
        birthday: "", // 生日
        entrantTime: "", // 入职时间
        leaveTime: "", // 离职时间
        levelReason: "", // 离职原因
      },
      isWorkData: [
        { key: true, value: "是" },
        { key: false, value: "否" },
      ],
      personnelData: ["现役军官", "文职人员", "现役士兵", "社聘人员"],
      identityTypeData: [],
      identityTypeOriginData: [
        ["行管干部", "专业技术"],
        ["行管干部", "专业技术"],
        [],
        ["社聘", "公勤", "职工"],
      ],
      levelReasonData: ["退休", "转业", "调动", "复员", "解聘", "其他"],
      rules: {
        personnelType: [
          {
            required: true,
            type: "string",
            message: "请选择人员类型",
            trigger: "blur",
          },
        ],
        identityType: [
          {
            required: true,
            type: "string",
            message: "请选择身份类型",
            trigger: "change",
          },
        ],
        userName: [
          {
            required: true,
            type: "string",
            message: "请输入姓名",
            trigger: "blur",
          },
        ],
        idCode: [
          {
            required: true,
            message: " 请输入身份证号",
            trigger: "blur",
          },
        ],
        idNumber: [
          {
            required: true,
            message: " 请输入证件号",
            trigger: "blur",
          },
        ],
        sex: [
          {
            required: true,
            message: " 请选择性别",
            trigger: "change",
          },
        ],
        nation: [
          {
            required: true,
            message: " 请选择民族",
            trigger: "change",
          },
        ],
        // originate: [
        //   {
        //     required: true,
        //     message: " 请选择籍贯",
        //     trigger: "change",
        //   },
        // ],
        entrantTime: [
          {
            type: "date",
            required: true,
            message: "请选择入职时间",
            trigger: "change",
          },
        ],
        leaveTime: [
          {
            type: "date",
            required: true,
            message: "请选择离职时间",
            trigger: "change",
          },
        ],
        levelReason: [
          {
            type: "string",
            required: true,
            message: "请选择离原因",
            trigger: "change",
          },
        ],
      },
    };
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
    closeAddDialog() {
      this.$parent.handleClose();
    },
    // 选择是否在职时
    changeIsWorkValue(value) {
      console.log(value);
    },
    // 人员类型 切换 身份类型联动
    changePersonValue(value) {
      this.identityTypeData = [];
      this.ruleForm.identityType = "";
      this.identityTypeData = this.identityTypeOriginData[value];
    },
    // 身份类型选择时
    changeIdentityValue(value) {
      console.log(value);
    },
    // 离职原因
    changeLevelReason(value) {
      console.log(value);
    },
    submitForm() {
      // console.log(this.ruleForm);
      this.$parent.$parent.handleAddUser();
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
  height: 420px;
  overflow-y: scroll;
  padding: 40px 0;
  background: #fff;

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