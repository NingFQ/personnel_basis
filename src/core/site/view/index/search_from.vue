<template>
  <div class="main_top_wrap">
    <div class="main_top">
      <el-form :model="ruleForm" ref="ruleForm">
        <el-row type="flex">
          <el-col :span="8">
            <el-form-item
              :label-position="right"
              label="是否在职"
              prop="isWork"
            >
              <el-select
                v-model="ruleForm.isWork"
                placeholder="请选择"
                @change="changeIsWorkValue($event)"
              >
                <el-option
                  v-for="(item, key) in isWorkData"
                  :key="key"
                  :label="item.value"
                  :value="item.key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
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
          </el-col>
          <el-col :span="8">
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
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="8">
            <el-form-item :label-position="right" label="姓名" prop="userName">
              <el-input
                v-model="ruleForm.userName"
                placeholder="请输入姓名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8"
            ><el-form-item
              :label-position="right"
              label="身份证号"
              prop="idCode"
            >
              <el-input
                v-model="ruleForm.idCode"
                placeholder="请输入身份证号"
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="8">
            <el-form-item
              :label-position="right"
              label="证件号"
              prop="idNumber"
            >
              <el-input
                v-model="ruleForm.idNumber"
                placeholder="请输入证件号"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="8">
            <el-form-item :label-position="right" label="性别" prop="sex">
              <el-select v-model="ruleForm.sex" placeholder="请选择">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label-position="right" label="民族" prop="nation">
              <el-select v-model="ruleForm.nation" placeholder="请选择">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label-position="right" label="籍贯" prop="originate">
              <el-input
                v-model="ruleForm.originate"
                placeholder="请输入籍贯"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              :label-position="right"
              label="出生日期"
              prop="birthday"
            >
              <el-date-picker
                v-model="ruleForm.birthday"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              :label-position="right"
              label="入职时间"
              prop="entrantTime"
            >
              <el-date-picker
                v-model="ruleForm.entrantTime"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              :label-position="right"
              label="离职时间"
              prop="leaveTime"
              ><el-date-picker
                v-model="ruleForm.leaveTime"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="12">
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
          </el-col>
          <el-col :span="10">
            <el-form-item class="top_btns">
              <el-button
                type="primary"
                class="top_btn_item"
                @click="submitForm('ruleForm')"
                >搜索</el-button
              >
              <el-button
                type="primary"
                class="top_btn_item"
                @click="resetForm('ruleForm')"
                >重置</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "WorkspaceJsonSearchFrom",

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
    };
  },
  computed: {},
  mounted() {},

  methods: {
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
    submitForm(formName) {
      console.log(this.ruleForm);
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     alert("submit!");
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss">
.main_top_wrap {
  width: 100%;
  padding-top: 40px;
  // padding-bottom: 20px;
  padding-left: 72px;
  .main_top {
    width: 100%;
    .el-form-item {
      .el-form-item__label {
        width: 86px !important;
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
      .el-date-editor {
        width: 300px;
        height: 44px;
        border-color: rgba(204, 204, 204, 1);
      }
    }
    .top_btns {
      float: right;
      .top_btn_item {
        width: 160px;
        height: 44px;
      }
    }
  }
}
</style>