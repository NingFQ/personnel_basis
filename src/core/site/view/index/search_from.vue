<template>
  <div class="main_top_wrap">
    <div class="main_top">
      <el-form :model="ruleForm" ref="ruleForm">
        <el-form-item :label-position="right" label="登录号" prop="user_key">
          <el-input
            v-model="ruleForm.user_key"
            placeholder="请输入登录号"
          ></el-input>
        </el-form-item>
        <el-form-item :label-position="right" label="姓名" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item :label-position="right" label="人员身份">
          <el-cascader
            ref="typeInde"
            placeholder="请选择"
            clearable
            :options="personnelTypeDictionary"
            :props="{
              multiple: true,
              value: 'id',
              label: 'type_name',
              children: 'identity',
            }"
            @change="changeIdenType"
          ></el-cascader>
        </el-form-item>
        <el-form-item :label-position="right" label="领导职务" prop="job_id">
          <el-select multiple v-model="ruleForm.job_id" placeholder="请选择">
            <el-option
              v-for="(item, key) in leaderPostDictionary"
              :key="key"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label-position="right" label="身份证号" prop="card">
          <el-input
            v-model="ruleForm.card"
            placeholder="请输入身份证号"
            maxlength="18"
          ></el-input>
        </el-form-item>
        <el-form-item :label-position="right" label="证件号" prop="credentials">
          <el-input
            v-model="ruleForm.credentials"
            placeholder="请输入证件号"
          ></el-input>
        </el-form-item>
        <el-form-item :label-position="right" label="性别" prop="sexy">
          <el-select clearable v-model="ruleForm.sexy" placeholder="请选择">
            <el-option
              v-for="(item, key) in [
                { name: '男', id: 1 },
                { name: '女', id: 2 },
              ]"
              :key="key"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label-position="right" label="民族" prop="nation_id">
          <el-select
            v-model="ruleForm.nation_id"
            filterable
            multiple
            placeholder="请选择(可搜索)"
          >
            <el-option
              v-for="(item, key) in nationListDictionary"
              :key="key"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label-position="right" label="籍贯" prop="hometown">
          <el-input
            v-model="ruleForm.hometown"
            placeholder="请输入籍贯"
          ></el-input>
        </el-form-item>
        <el-form-item :label-position="right" label="出生日期">
          <el-date-picker
            v-model="birthdayList"
            @change="changeBirthdayTime"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item :label-position="right" label="入职时间">
          <el-date-picker
            v-model="entrantTimeList"
            @change="changeEntrantTime"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item :label-position="right" label="离职时间"
          ><el-date-picker
            v-model="leaveTimeList"
            @change="changeLevelTime"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item :label-position="right" label="是否在职" prop="is_office">
          <el-select
            clearable
            v-model="ruleForm.is_office"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, key) in [
                { name: '在职', id: 1 },
                { name: '离职', id: 2 },
              ]"
              :key="key"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label-position="right"
          label="离职原因"
          prop="out_office_reason_id"
        >
          <el-select
            multiple
            v-model="ruleForm.out_office_reason_id"
            placeholder="请选择"
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
          <el-button type="primary" class="top_btn_item" @click="submitForm()"
            >搜索</el-button
          >
          <el-button type="primary" class="top_btn_item" @click="resetForm()"
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
      birthdayList: [], // 生日区间
      entrantTimeList: [], // 入职时间
      leaveTimeList: [], // 离职时间
      ruleForm: {
        user_key: "", // 登录号
        name: "", // 姓名
        type_id: "", // 人员类型
        identity_id: [], // 身份类型
        job_id: [], // 领导职务
        card: "", // 身份证号
        credentials: "", // 证件号
        sexy: "", // 性别
        nation_id: [], // 民族
        hometown: "", // 籍贯
        birthday_start: "", // 出生日期开始时间
        birthday_end: "", // 出生日期结束时间
        office_at_start: "", // 入职开始时间
        office_at_end: "", // 入职结束时间
        out_office_at_start: "", // 离职开始时间
        out_office_at_end: "", // 离职结束时间
        out_office_reason_id: "", // 离职原因
        is_office: 1, // 是否在职
      },
      personnelTypeDictionary: [], //人员类型身份类型字典
      leaderPostDictionary: [], // 领导职务字典
      levelReasonDictionary: [], // 离职原因字典
      nationListDictionary: [], // 民族列表字典
    };
  },
  computed: {},
  mounted() {},
  methods: {
    changeBirthdayTime(t) {
      this.ruleForm.birthday_start = t[0];
      this.ruleForm.birthday_end = t[1];
    },
    changeEntrantTime(t) {
      this.ruleForm.office_at_start = t[0];
      this.ruleForm.office_at_end = t[1];
    },
    changeLevelTime(t) {
      this.ruleForm.out_office_at_start = t[0];
      this.ruleForm.out_office_at_end = t[1];
    },
    changeIdenType(value) {
      this.ruleForm.type_id = "";
      this.ruleForm.identity_id = [];
      var len = value.length;
      for (let i = 0; i < len; i++) {
        if (value[i].length == 1) {
          this.ruleForm.type_id = value[i][0];
        } else {
          this.ruleForm.identity_id.push(value[i][1]);
        }
      }
    },
    // 搜索
    submitForm() {
      // console.log(this.ruleForm);
      this.$emit("handleSearch", this.ruleForm);
    },
    // 重置
    resetForm() {
      this.birthdayList = []; // 生日区间
      this.entrantTimeList = []; // 入职时间
      this.leaveTimeList = []; //离职时间
      this.ruleForm.birthday_start = ""; // 出生日期开始时间
      this.ruleForm.birthday_end = ""; // 出生日期结束时间
      this.ruleForm.office_at_start = ""; // 入职开始时间
      this.ruleForm.office_at_end = ""; // 入职结束时间
      this.ruleForm.out_office_at_start = ""; // 离职开始时间
      this.ruleForm.out_office_at_end = ""; // 离职结束时间
      this.ruleForm.type_id = ""; // 清空人员类型选择
      this.ruleForm.identity_id = []; // 清空身份类型的选择
      this.$refs.typeInde.$refs.panel.clearCheckedNodes(); // 清空选中的节点
      this.$refs.typeInde.$refs.panel.activePath = []; // 设置为空可以让节点不高亮显示
      this.$refs["ruleForm"].resetFields();
      this.ruleForm.is_office = ""; // 是否在职清空
      this.$emit("handleSearch", this.ruleForm);
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
      // 领导职务字典项
      this.$appFetch(
        {
          url: "leaderList",
          method: "POST",
        },
        (res) => {
          if (res.code == 200 && res.result != null) {
            this.leaderPostDictionary = res.result;
          }
        }
      );
      // 人员类型字典
      this.$appFetch(
        {
          url: "idenType",
          method: "POST",
        },
        (res) => {
          if (res.code == 200 && res.result != null) {
            this.personnelTypeDictionary = res.result;
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
  padding: 40px 50px 0;
  .main_top {
    width: 100%;
    overflow: hidden;
    .el-form-item {
      float: left;
      // margin-right: 50px;
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
      //   float: left;
      //   width: 400px;
      //   height: 44px;
      //   border-color: rgba(204, 204, 204, 1);
      // }
      // .el-select {
      //   float: left;
      //   width: 400px;
      //   height: 44px;
      //   border-color: rgba(204, 204, 204, 1);
      // }
      // .el-date-editor {
      //   float: left;
      //   width: 400px;
      //   height: 44px;
      //   border-color: rgba(204, 204, 204, 1);
      // }
    }
    .top_btns {
      float: right;
      // .top_btn_item {
      //   width: 160px;
      //   height: 44px;
      // }
    }
  }
}
</style>