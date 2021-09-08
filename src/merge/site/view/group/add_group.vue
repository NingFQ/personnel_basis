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
        <el-form :model="editingData" ref="editingData" :rules="rules">
          <el-form-item :label-position="right" label="部门名称" prop="name">
            <el-input
              v-model="editingData.name"
              placeholder="请输入部门名称"
              maxlength="60"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label-position="right"
            label="部门编号"
            prop="depart_key"
          >
            <el-input
              v-model="editingData.depart_key"
              maxlength="60"
            ></el-input>
          </el-form-item>
          <el-form-item :label-position="right" label="上级部门">
            <el-select
              ref="selectTree"
              v-model="editingData.pid"
              filterable
              placeholder="请选择部门"
            >
              <el-option
                :key="editingData.pid"
                :value="editingData.pid"
                :label="parentDepartmentName"
                style="height: auto"
                hidden
              />
              <el-tree
                node-key="id"
                accordion
                :data="departmentListData"
                :props="{ children: '_child', label: 'name' }"
                :default-expanded-keys="[defaultId]"
                :highlight-current="true"
                :expand-on-click-node="true"
                @node-click="handleNodeClick"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label-position="right" label="状态" prop="status">
            <el-select
              v-model="editingData.status"
              placeholder="请选择"
              @change="changeStatusValue($event)"
            >
              <el-option
                v-for="(item, key) in [
                  { name: '启用', id: 1 },
                  { name: '禁用', id: 0 },
                ]"
                :key="key"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label-position="right" label="描述" prop="depart_desc">
            <el-input
              type="textarea"
              rows="3"
              v-model="editingData.depart_desc"
              placeholder="请输入部门描述"
              maxlength="200"
            ></el-input>
          </el-form-item>
          <el-form-item class="top_btns">
            <el-button class="btn_item" @click="closeAddDialog()"
              >取消</el-button
            >
            <el-button type="primary" class="btn_item" @click="editComplete()"
              >完成</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ZhilinFrontEditGroup",

  data() {
    return {
      parentDepartmentName: "",
      departmentListData: [],
      defaultId: "",
      editingData: {
        name: "",
        depart_key: "",
        status: 1,
        depart_desc: "",
        pid: "",
      },
      rules: {
        name: [
          {
            required: true,
            type: "string",
            message: "请输入部门名称",
            trigger: "blur",
          },
        ],
        depart_key: [
          {
            required: true,
            type: "string",
            message: "请输入部门编号",
            trigger: "blur",
          },
        ],
        status: [
          {
            required: true,
            message: " 请选择状态",
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
  methods: {
    // 关闭dialog
    closeAddDialog() {
      this.$parent.handleClose();
    },
    // 修改状态
    changeStatusValue(value) {
      console.log(value);
      this.editingData.status = value;
    },
    handleNodeClick(data) {
      this.parentDepartmentName = data.name;
      this.editingData.pid = data.id;
    },
    editComplete() {
      this.$refs["editingData"].validate((valid) => {
        if (valid) {
          this.$parent.$parent.operateCompltet("add", this.editingData);
        } else {
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
            this.defaultId = res.result[0].id;
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
  // height: 420px;
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
      .el-textarea {
        width: 300px;
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