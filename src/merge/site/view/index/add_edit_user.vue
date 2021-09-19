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
            label="所属部门"
            prop="department_id"
          >
            <el-select
              ref="selectTree"
              v-model="ruleForm.department_id"
              filterable
              placeholder="请选择部门"
            >
              <el-option
                :key="ruleForm.department_id"
                :value="ruleForm.department_id"
                :label="ruleForm.department_name"
                style="height: auto"
                hidden
              />
              <el-tree
                node-key="id"
                accordion
                :data="departmentListData"
                :props="{ children: '_child', label: 'name' }"
                :default-expanded-keys="[ruleForm.department_id]"
                :highlight-current="true"
                :expand-on-click-node="true"
                @node-click="handleNodeClick"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label-position="right" label="姓名" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入姓名"
            ></el-input>
          </el-form-item>
          <el-form-item :label-position="right" label="人员身份" prop="type_id">
            <el-cascader
              placeholder="请选择"
              :options="personnelTypeDictionary"
              v-model="selectedOptions"
              :props="{
                multiple: false,
                value: 'id',
                label: 'type_name',
                children: 'identity',
              }"
              @change="changeIdenType"
            ></el-cascader>
          </el-form-item>
          <el-form-item :label-position="right" label="领导职务" prop="job_id">
            <el-select v-model="ruleForm.job_id" placeholder="请选择">
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
          <el-form-item
            :label-position="right"
            label="证件号"
            prop="credentials"
          >
            <el-input
              v-model="ruleForm.credentials"
              placeholder="请输入证件号"
            ></el-input>
          </el-form-item>
          <el-form-item :label-position="right" label="性别" prop="sexy">
            <el-select v-model="ruleForm.sexy" placeholder="请选择">
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
          <!-- <div v-show="type == 'edit'">
            <el-form-item
              :label-position="right"
              label="出生日期"
              prop="birthday"
            >
              <el-date-picker
                disabled
                value-format="yyyy-MM-dd"
                v-model="ruleForm.birthday"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </div> -->
          <el-form-item
            :label-position="right"
            label="入职时间"
            prop="office_at"
          >
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="ruleForm.office_at"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
            :label-position="right"
            label="离职时间"
            prop="out_office_at"
          >
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="ruleForm.out_office_at"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
            :label-position="right"
            label="离职原因"
            prop="out_office_reason_id"
          >
            <el-select
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
            <el-button class="cancel_btn" @click="closeAddDialog()"
              >取消</el-button
            >
            <el-button class="confrim_btn" @click="submitForm('ruleForm')">{{
              type == "add" ? "添加" : "确定"
            }}</el-button>
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
        department_id: "", // 部门ID
        department_name: "", // 部门名称
        name: "", // 姓名
        type_id: "", // 人员类型
        identity_id: "", // 身份类型
        job_id: "", // 领导职务
        card: "", // 身份证号
        credentials: "", // 证件号
        sexy: "", // 性别
        nation_id: "", // 民族
        hometown: "", // 籍贯
        birthday: "", // 出生日期
        office_at: "", // 入职时间
        out_office_at: "", // 离职时间
        out_office_reason_id: "", // 离职原因
        is_office: "", // 是否在职
      },
      departmentListData: [], // 部门ID
      selectedOptions: [], // 人员类型身份选中结果
      personnelTypeDictionary: [], // 人员类型身份类型字典
      leaderPostDictionary: [], // 领导职务字典
      levelReasonDictionary: [], // 离职原因字典
      nationListDictionary: [], // 民族列表字典
      rules: {
        department_id: [
          {
            required: true,
            message: "请选择所属部门",
            trigger: "blur",
          },
        ],
        type_id: [
          {
            required: true,
            message: "请选择人员类型",
            trigger: "blur",
          },
        ],
        // identity_id: [
        //   {
        //     required: true,
        //     message: "请选择身份类型",
        //     trigger: "change",
        //   },
        // ],
        job_id: [
          {
            required: true,
            message: "请选择领导职务",
            trigger: "change",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
        ],
        card: [
          {
            required: true,
            message: " 请输入身份证号",
            trigger: "blur",
          },
          {
            min: 18,
            max: 18,
            message: "请输入18位合法身份证号",
            trigger: "blur",
          },
        ],
        // credentials: [
        //   {
        //     required: true,
        //     message: " 请输入证件号",
        //     trigger: "blur",
        //   },
        // ],
        sexy: [
          {
            required: true,
            message: " 请选择性别",
            trigger: "change",
          },
        ],
        nation_id: [
          {
            required: true,
            message: " 请选择民族",
            trigger: "change",
          },
        ],
        office_at: [
          {
            required: true,
            message: "请选择入职时间",
            trigger: "change",
          },
        ],
      },
    };
  },
  props: {
    type: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "标题",
    },
    parentData: {
      type: Object,
      default: () => {},
    },
  },
  components: {},
  methods: {
    // 关闭dialog
    closeAddDialog() {
      this.$parent.handleClose();
    },
    changeIdenType(value) {
      if (value.length > 1) {
        this.ruleForm.type_id = value[0];
        this.ruleForm.identity_id = value[1];
      } else {
        this.ruleForm.type_id = value[0];
        this.ruleForm.identity_id = 0;
      }
    },
    handleNodeClick(data) {
      this.ruleForm.department_name = data.name;
      this.ruleForm.department_id = data.id;
    },
    submitForm(formName) {
      console.log(this.ruleForm);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$parent.$parent.handleUserCallBack(this.type, this.ruleForm);
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    initData() {
      // 获取部门列表
      this.$appFetch(
        {
          url: "departmentList",
          method: "POST",
        },
        (res) => {
          if (res.code == 200 && res.result != null) {
            this.departmentListData = res.result;
          }
        }
      );
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
    if (this.$props.type == "edit") {
      this.ruleForm = Object.assign({}, this.$props.parentData);
      if (this.ruleForm.out_office_reason_id == 0) {
        this.ruleForm.out_office_reason_id = "";
      }
      if (this.ruleForm.out_office_at == 0) {
        this.ruleForm.out_office_at = "";
      }
      this.selectedOptions.push(this.$props.parentData.type_id);
      if (this.$props.parentData.identity_id != 0) {
        this.selectedOptions.push(this.$props.parentData.identity_id);
      }
      this.defaultId = this.ruleForm.department_id;
    }
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