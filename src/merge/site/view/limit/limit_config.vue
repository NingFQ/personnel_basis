<template>
  <div class="site_limit_config">
    <common-header />
    <el-container>
      <el-aside width="300px">
        <div class="aside_title">权限组</div>
        <div class="aside_list">
          <div
            v-for="(item, index) in limtNameList"
            :key="index"
            :class="[
              'aside_item',
              item.id == currentDepartmentId ? 'active_item' : '',
            ]"
            @click="handleCurrentDepartment(item.id)"
          >
            {{ item.type_name }}
          </div>
        </div>
      </el-aside>
      <el-main>
        <div class="main_header">
          <el-row type="flex" align="middle" justify="space-between">
            <span class="header_title">人员</span>
            <el-button type="primary" @click="dialogAddVisible = true"
              >添加管理员</el-button
            >
          </el-row>
        </div>
        <div class="main_table_wrap">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            border
            @selection-change="handleSelectionChange"
            :row-class-name="tableRowClassName"
            :header-cell-style="getRowClass"
          >
            <el-table-column
              prop="name"
              label="姓名"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="idCode"
              label="身份证号"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop=""
              label="操作"
              class-name="operate_col"
            >
              <template slot-scope="scope">
                <el-button
                  class="dele_btn"
                  type="text"
                  @click="handleClickRemove(scope.row)"
                  >移出</el-button
                >
              </template></el-table-column
            >
          </el-table>
        </div>
      </el-main>
    </el-container>
    <!-- 删除弹窗 -->
    <el-dialog
      :width="600"
      center="true"
      :show-close="false"
      :visible.sync="dialogRemoveFormVisible"
      ><delete-confirm
        hintTitle="是否确认移除，移除后无法恢复！"
        btnText="移出"
      >
      </delete-confirm>
    </el-dialog>
    <!--  删除成功弹窗-->
    <el-dialog
      :width="600"
      center="true"
      :show-close="false"
      :visible.sync="dialogDeleteSuccess"
      ><delete-success title="操作确认"> </delete-success>
    </el-dialog>
    <!-- 新增 -->
    <el-dialog
      :width="600"
      center
      destroy-on-close
      :show-close="false"
      :visible.sync="dialogAddVisible"
      ><addManager></addManager>
    </el-dialog>
  </div>
</template>

<script>
import CommonHeader from "../components/common_header.vue";
import DeleteSuccess from "../components/delete_success.vue";
import DeleteConfirm from "../components/delete_confirm.vue";
import AddManager from "./add_manager.vue";

export default {
  name: "ZhilinFrontLimtConfig",

  components: { CommonHeader, DeleteSuccess, DeleteConfirm, AddManager },

  data() {
    return {
      limtNameList: [],
      currentDepartmentId: null,
      // 表格数据
      tableData: [],
      deleteData: {},
      dialogRemoveFormVisible: false, // 移除弹窗
      dialogDeleteSuccess: false, // 移除成功
      dialogAddVisible: false, // 新增
    };
  },

  mounted() {},

  methods: {
    handleCurrentDepartment(id) {
      this.currentDepartmentId = id;
      this.getUserList();
    },
    handleClickRemove(data) {
      this.deleteData = data;
      this.dialogRemoveFormVisible = true;
    },
    // 移除
    deleteConfrimCallBack() {
      this.dialogRemoveFormVisible = false;
      this.$appFetch(
        {
          url: "removeAdmin",
          method: "POST",
          data: {
            id: this.deleteData.id,
          },
        },
        (res) => {
          if (res.code == 200 && res.result != null) {
            this.dialogDeleteSuccess = true;
          }
        }
      );
    },
    // 新增
    addConfrimCallBack(addIpuStr) {
      this.$appFetch(
        {
          url: "addAdmin",
          method: "POST",
          data: {
            keyword: addIpuStr.toString(),
            type_id: this.currentDepartmentId,
          },
        },
        (res) => {
          console.log(res);
          if (res.code == 200 && res.result != null) {
            this.initData();
            this.$notify({
              type: "success",
              title: "添加成功",
              message: res.msg,
            });
          } else {
            this.$notify.error({
              title: "添加失败",
              message: res.msg,
            });
          }
        }
      );
      this.dialogAddVisible = false;
    },
    // 表格赋值className
    tableRowClassName({ row, rowIndex }) {
      if ((rowIndex + 1) % 2 === 0) {
        return "double";
      } else {
        return "single";
      }
    },
    // 设置表头颜色
    getRowClass({ rowIndex }) {
      if (rowIndex == 0) {
        return "background:#E5E7F3";
      } else {
        return "";
      }
    },
    initData() {
      this.$appFetch(
        {
          url: "adminList",
          method: "POST",
        },
        (res) => {
          console.log(res);
          if (res.code == 200 && res.result != null) {
            this.limtNameList = res.result;
            this.currentDepartmentId = res.result[0].id;
            this.getUserList();
          }
        }
      );
    },
    getUserList() {
      this.$appFetch(
        {
          url: "adminUserList",
          method: "POST",
          data: {
            type_id: this.currentDepartmentId,
          },
        },
        (res) => {
          if (res.code == 200 && res.result != null) {
            this.tableData = res.result;
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
.site_limit_config {
  width: 100%;
  height: 100%;
  .el-container {
    width: 100%;
    height: 100%;
  }
  .el-aside {
    min-width: 300px;
    height: 100%;
    background: rgba(143, 159, 238, 0.05);
    border-right: 1px solid #cccccc;
    .aside_title {
      width: 100%;
      height: 68px;
      line-height: 68px;
      padding-left: 40px;
      font-size: 20px;
      font-weight: bold;
      color: #333333;
      border-bottom: 1px solid #cccccc;
    }
    .aside_list {
      width: 100%;
      padding: 40px 0;
      .aside_item {
        height: 68px;
        line-height: 68px;
        padding: 0 40px;
        font-size: 20px;
        font-weight: 400;
        color: #333333;
        cursor: pointer;
      }
      .active_item {
        background: rgba(52, 66, 138, 0.1);
        color: #34428a;
      }
    }
  }
  .el-main {
    padding: 0px;
    .main_header {
      width: 100%;
      height: 68px;
      padding: 0 50px;
      border-bottom: 1px solid #cccccc;
      .el-row {
        height: 100%;
        width: 100%;
      }
      .header_title {
        font-size: 20px;
        font-weight: bold;
        color: #333333;
      }
    }
    .main_table_wrap {
      padding: 50px;
      .el-table {
        .double {
          background: #f9faff;
        }
        .single {
          background: #fff;
        }
        .dele_btn {
          font-size: 18px;
          font-weight: 500;
          color: #ff4e4e;
        }
      }
    }
  }
}
.el-dialog__header {
  padding: 0 !important;
}
.el-dialog__body {
  padding: 0 !important;
}
</style>