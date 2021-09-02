<template>
  <div class="site_index" v-loading="isLoading">
    <common-header />
    <el-container style="width: 100%">
      <el-aside>
        <div class="search_content">
          <el-autocomplete
            class="inline-input"
            v-model="searchText"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
        </div>
        <el-tree
          node-key="id"
          :data="departmentListData"
          :props="{ children: '_child', label: 'name' }"
          :default-expanded-keys="[1]"
          :default-checked-keys="[1]"
          :highlight-current="true"
          :expand-on-click-node="true"
          @node-click="handleNodeClick"
        ></el-tree>
      </el-aside>
      <el-main>
        <!-- 搜索字段配置表单 -->
        <search-config-from @handleSearch="handleSearch" />
        <!-- 中间操作区域 -->
        <div class="main_center_wrap">
          <el-row class="main_center">
            <el-col :span="11" class="center_left">
              <span class="item_num"
                >已选择<b class="item_num_hint">{{
                  multipleSelection.length
                }}</b
                >条，共{{ allUserNum }}条</span
              >
              <el-button class="out_btn" icon="el-icon-folder-remove"
                >导出</el-button
              >
              <el-button
                icon="el-icon-delete"
                @click="dialogDeleteFormVisible = true"
                >删除</el-button
              >
            </el-col>
            <el-col :span="11" class="center_right">
              <el-button
                type="primary"
                icon="el-icon-folder-add"
                @click="dialogAddFormVisible = true"
                >添加</el-button
              >
              <el-button type="primary" icon="el-icon-folder-add"
                >导入</el-button
              >
            </el-col>
          </el-row>
        </div>
        <!-- 表格 -->
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
              fixed="left"
              type="selection"
              width="68"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="user_key"
              label="登录号"
              width="155"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="106"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="type_id"
              label="人员类型"
              width="155"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="identity_id"
              label="身份类型"
              width="155"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="identity_id"
              label="领导职务"
              width="155"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="card"
              label="身份证号"
              min-width="225"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="credentials"
              label="证件号"
              width="156"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="sexy_text"
              label="性别"
              width="80"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="nation_name"
              label="民族"
              width="155"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="birthday"
              label="出生日期"
              width="155"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="hometown"
              label="籍贯"
              width="149"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="office_at"
              label="入职时间"
              width="149"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="out_office_at"
              label="离职时间"
              width="149"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="qr_name"
              label="离职原因"
              width="149"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="center"
              fixed="right"
              prop=""
              label="操作"
              class-name="operate_col"
            >
              <template slot-scope="scope">
                <el-button
                  class="edit_btn"
                  @click="handleClickEdit(scope.row)"
                  type="text"
                  >编辑</el-button
                >
              </template></el-table-column
            >
          </el-table>
        </div>
        <el-pagination
          background
          layout="total, prev, pager, next, jumper"
          :total="allUserNum"
          :page-size="10"
          @current-change="currentPageChange"
        >
        </el-pagination>
      </el-main>
    </el-container>
    <!-- 新增用户弹窗 -->
    <el-dialog
      :width="600"
      center="true"
      :show-close="false"
      :visible.sync="dialogAddFormVisible"
      ><add-user title="新建用户"> </add-user>
    </el-dialog>
    <!-- 删除用户弹窗 -->
    <el-dialog
      :width="600"
      center="true"
      :show-close="false"
      :visible.sync="dialogDeleteFormVisible"
      ><delete-confirm> </delete-confirm>
    </el-dialog>
    <!-- 删除成功弹窗 -->
    <el-dialog
      :width="600"
      center="true"
      :show-close="false"
      :visible.sync="dialogDeteteSuccess"
      ><delete-success title="操作确认"> </delete-success>
    </el-dialog>
  </div>
</template>
<script>
import "@site/static/scss/index.scss";
import siteCon from "@site/controller/indexCon";
import CommonHeader from "../components/common_header.vue";
import SearchConfigFrom from "./search_from.vue";
import AddUser from "./add_user.vue";
import DeleteConfirm from "../components/delete_confirm.vue";
import DeleteSuccess from "../components/delete_success.vue";

export default {
  ...siteCon,
  components: {
    CommonHeader,
    SearchConfigFrom,
    AddUser,
    DeleteConfirm,
    DeleteSuccess,
  },
  data() {
    return {
      isLoading: false, // 页面loading
      currentDepartmentId: "", // 当前部门id
      searchText: "", // 搜索框内容
      departmentListData: [], // 部门级别树
      dialogAddFormVisible: false, // 是否弹出新增用户dialog
      dialogDeleteFormVisible: false, // 是否弹出删除dialog
      dialogDeteteSuccess: false, // 是否弹出删除成功的弹窗
      // 表格数据
      tableData: [],
      allUserNum: 100, // 表格数据总长度
      pageNum: 1, // 当前第几页数据
      multipleSelection: [], // 选中的表格数据
    };
  },
  methods: {
    querySearch(queryString, cb) {
      console.log("this.searchText=====>" + this.searchText);
      // 调用 callback 返回建议列表的数据
      // cb(results);
    },
    handleSelect(item) {
      console.log("搜索结果选中某一项=====>" + JSON.stringify(item));
    },
    handleNodeClick(data) {
      this.currentDepartmentId = data.id;
      this.getUserList();
    },
    currentPageChange(val) {
      this.pageNum = val;
      console.log(`当前页: ${val}`);
    },
    handleSelectionChange(val) {
      console.log("选中的表格数据=====" + JSON.stringify(val));
      this.multipleSelection = val;
    },
    // 新增用回调
    handleAddUser() {
      alert("新增了用户");
      this.dialogAddFormVisible = false;
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
    // 删除表格项回调
    deleteConfrimCallBack() {
      alert(
        "删除表格项===长度===" + this.multipleSelection,
        length + ">" + JSON.stringify(this.multipleSelection)
      );
      this.dialogDeleteFormVisible = false;
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        this.dialogDeteteSuccess = true;
      }, 1000);
    },
    // 搜索表格回调
    handleSearch(searchParm) {
      alert("执行搜索====>" + JSON.stringify(searchParm));
    },
    init() {
      // 获取部门列表
      this.$appFetch(
        {
          url: "departmentList",
          method: "POST",
        },
        (res) => {
          if (res.code == 200 && res.result != null) {
            this.departmentListData = res.result;
            this.currentDepartmentId = res.result[0].id;
            this.getUserList();
          }
        }
      );
    },
    getUserList() {
      // 获取用户列表
      this.$appFetch(
        {
          url: "userList",
          method: "POST",
          data: {
            department_id: this.currentDepartmentId,
          },
        },
        (res) => {
          if (res.code == 200 && res.result != null) {
            this.tableData = res.result.list;
            this.allUserNum = res.result.count;
          }
        }
      );
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
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="scss">
.site_index {
  width: 100%;
  height: 100%;
}

.el-container {
  width: 100%;
  height: 100%;
}

.el-aside {
  min-width: 360px;
  background: rgba(143, 159, 238, 0.05);
  border-radius: 0px;
  color: #333333;
  border-right: 1px solid #cccccc;
  .search_content {
    // height: 87px;
    border-bottom: 1px solid #cccccc;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-input {
      width: 300px;
      input {
        padding: 0px 20px;
      }
    }
  }
  .el-tree {
    font-size: 20px;
    color: #333333;
    background: transparent;
    .el-tree-node__content {
      height: 68px;
    }
  }
}

.el-main {
  background-color: white;
  padding: 0 !important;

  .main_center_wrap {
    width: 100%;
    height: 80px;
    padding: 0 72px;
    .main_center {
      width: 100%;
      height: 80px;
      .center_left {
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
      }
      .item_num {
        font-size: 16px;
        font-weight: 400;
        line-height: 0px;
        margin-right: 30px;
        color: #999999;
        .item_num_hint {
          font-size: 16px;
          font-weight: bold;
          line-height: 0px;
          color: #34428a;
        }
      }

      .center_right {
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
      }
    }
  }
  .main_table_wrap {
    padding-left: 50px;
    padding-right: 50px;
    .el-table {
      .double {
        background: #f9faff;
      }
      .single {
        background: #fff;
      }
      .operate_col {
        .edit_btn {
          font-size: 18px;
          font-weight: 500;
          color: #34428a;
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

.el-pagination {
  margin: 60px 50px;
  float: right;
}

.el-dialog__header {
  padding: 0 !important;
}
.el-dialog__body {
  padding: 0 !important;
}
</style>