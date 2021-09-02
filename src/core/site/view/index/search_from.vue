<template>
  <div class="main_top_wrap">
    <div class="main_top">
      <el-form :model="ruleForm" ref="ruleForm">
        <el-form-item :label-position="right" label="是否在职" prop="isWork">
          <el-select
            multiple
            v-model="ruleForm.isWork"
            placeholder="请选择"
            @change="changeIsWorkValue($event)"
          >
            <el-option
              v-for="(item, key) in isWorkDictionary"
              :key="key"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label-position="right"
          label="人员类型"
          prop="personnelTypeList"
        >
          <el-select
            multiple
            v-model="ruleForm.personnelTypeList"
            placeholder="请选择"
            @change="changePersonValue($event)"
          >
            <el-option
              v-for="(item, index) in personnelTypeDictionary"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label-position="right"
          label="身份类型"
          prop="identityTypeList"
        >
          <el-select
            multiple
            v-model="ruleForm.identityTypeList"
            placeholder="请选择"
            @change="changeIdentityValue($event)"
          >
            <el-option
              v-for="(item, key) in identityTypeDictionary"
              :key="key"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label-position="right"
          label="领导职务"
          prop="leaderPost"
        >
          <el-select
            multiple
            v-model="ruleForm.leaderPost"
            placeholder="请选择"
            @change="changeIdentityValue($event)"
          >
            <el-option
              v-for="(item, key) in leaderPostDictionary"
              :key="key"
              :label="item.name"
              :value="item.id"
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
          <el-autocomplete
            value-key="name"
            class="inline-input"
            v-model="ruleForm.nation"
            :fetch-suggestions="querySearchNation"
            placeholder="请选择或搜索"
            @select="handleSelectNation"
          ></el-autocomplete>
          <!-- <el-select v-model="ruleForm.nation" placeholder="请选择">
                <el-option
                  v-for="(item, key) in nationListDictionary"
                  :key="key"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select> -->
        </el-form-item>
        <el-form-item :label-position="right" label="籍贯" prop="originate">
          <el-input
            v-model="ruleForm.originate"
            placeholder="请输入籍贯"
          ></el-input>
        </el-form-item>
        <el-form-item :label-position="right" label="出生日期" prop="birthday">
          <el-date-picker
            v-model="ruleForm.birthday"
            @change="changeTimer"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
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
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item :label-position="right" label="离职时间" prop="leaveTime"
          ><el-date-picker
            v-model="ruleForm.leaveTime"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item
          :label-position="right"
          label="离职原因"
          prop="levelReason"
        >
          <el-select
            multiple
            v-model="ruleForm.levelReason"
            placeholder="请选择"
            @change="changeLevelReason($event)"
          >
            <el-option
              v-for="(item, key) in levelReasonDictionary"
              :key="key"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
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
        isWork: [], // 是否在职
        personnelTypeList: [], // 人员类型
        identityTypeList: [], // 身份类型
        leaderPost: [], // 领导职务
        userName: "", // 姓名
        idCode: "", // 身份证号
        idNumber: "", // 证件号
        sex: "", // 性别
        nation: "", // 民族
        originate: "", // 籍贯
        birthday: "", // 生日
        entrantTime: [], // 入职时间
        leaveTime: [], // 离职时间
        levelReason: [], // 离职原因
      },
      // 是否在职字典
      isWorkDictionary: [
        { key: 1, value: "是" },
        { key: 0, value: "否" },
      ],
      personnelTypeDictionary: [], // 人员类型字典
      identityTypeDictionary: [], // 身份类型字典
      leaderPostDictionary: [], // 领导职务字典
      levelReasonDictionary: [], // 离职原因字典
      nationListDictionary: [], // 民族列表字典
    };
  },
  computed: {},
  mounted() {},

  methods: {
    changeTimer(a) {
      console.log(a);
    },
    // 选择民族搜索
    querySearchNation(queryString, cb) {
      var restaurants = this.nationListDictionary;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return restaurant.name.indexOf(queryString) === 0;
      };
    },
    // 选择民族后
    handleSelectNation(item) {
      console.log(item);
    },
    // 选择是否在职时
    changeIsWorkValue(value) {
      console.log("选中的是否在职=====>" + value);
    },
    // 人员类型 切换 身份类型联动
    changePersonValue(value) {
      console.log("选中的人员类型=====>" + value);
    },
    // 身份类型选择时
    changeIdentityValue(value) {
      console.log("选中的身份类型=====>" + value);
    },
    // 离职原因
    changeLevelReason(value) {
      console.log("选中的离职原因=====>" + value);
    },
    // 搜索
    submitForm(formName) {
      console.log(this.ruleForm);
      this.$emit("handleSearch", this.ruleForm);
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    initData() {
      // 获取民族字典
      this.$appFetch(
        {
          url: "nationList",
          method: "POST",
        },
        (res) => {
          if (res.code == 200 && res.result != null) {
            this.nationListDictionary = res.result;
          }
        }
      );
      // 获取离职原因列表
      this.$appFetch(
        {
          url: "levelReasonList",
          method: "POST",
        },
        (res) => {
          if (res.code == 200 && res.result != null) {
            this.levelReasonDictionary = res.result;
          }
        }
      );
    },
  },
  mounted() {
    this.initData();
  },
};
</script>

<style lang="scss">
.main_top_wrap {
  width: 100%;
  padding-top: 40px;
  padding-left: 72px;
  .main_top {
    width: 100%;
    overflow: hidden;
    .el-form-item {
      float: left;
      margin-right: 50px;
      .el-form-item__label {
        float: left;
        width: 86px !important;
        font-size: 16px;
        font-weight: 400;
        color: #333333;
      }
      .el-form-item__content {
        float: left;
      }
      // .el-input {
      // float: left;
      // width: 400px;
      // height: 44px;
      // border-color: rgba(204, 204, 204, 1);
      // }
      // .el-select {
      // float: left;
      // width: 400px;
      // height: 44px;
      // border-color: rgba(204, 204, 204, 1);
      // }
      // .el-date-editor {
      // float: left;
      // width: 400px;
      // height: 44px;
      // border-color: rgba(204, 204, 204, 1);
      // }
    }
    // .top_btns {
    //   float: right;
    //   .top_btn_item {
    //     width: 160px;
    //     height: 44px;
    //   }
    // }
  }
}
</style>