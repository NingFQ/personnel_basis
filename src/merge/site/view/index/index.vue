<template>
  <div class="site_index" v-loading="isLoading">
    <common-header />
    <el-container style="width: 100%">
      <el-aside>
        <div class="search_content">
          <el-autocomplete
            value-key="name"
            class="inline-input"
            v-model="searchText"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
        </div>
        <el-tree
          ref="departTree"
          node-key="id"
          :data="departmentListData"
          :props="{ children: '_child', label: 'name' }"
          :default-expanded-keys="defaultExpandNodes"
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
            <el-col :span="12" class="center_left">
              <span class="item_num"
                >已选择<b class="item_num_hint">{{
                  multipleSelection.length
                }}</b
                >条，共{{ allUserNum }}条</span
              >
              <el-button
                class="out_btn"
                icon="el-icon-folder-remove"
                @click="exportUser"
                >导出</el-button
              >
              <el-button icon="el-icon-delete" @click="deleteUser"
                >删除</el-button
              >
            </el-col>
            <el-col :span="12" class="center_right">
              <el-button
                type="primary"
                icon="el-icon-folder-add"
                @click="handleAddUser"
                >添加</el-button
              >
              <el-button
                type="primary"
                icon="el-icon-folder-add"
                @click="dialogImportFile = true"
                >导入</el-button
              >
            </el-col>
          </el-row>
        </div>
        <!-- 隐藏的表格 -->
        <div style="display: none">
          <el-table id="out-table" :data="multipleSelection">
            <!-- <el-table-column
              type="selection"
              width="68"
              align="center"
            ></el-table-column> -->
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
              prop="type_name"
              label="人员类型"
              width="155"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="identity_name"
              label="身份类型"
              width="155"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="job_name"
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
            <!-- <el-table-column
              align="center"
              prop=""
              label="操作"
              class-name="operate_col"
            >
              <template slot-scope="scope">
                <el-button
                  class="edit_btn"
                  @click="handleEditUser(scope.row)"
                  type="text"
                  >编辑</el-button
                >
              </template></el-table-column
            > -->
          </el-table>
        </div>
        <!-- 表格 -->
        <div class="main_table_wrap">
          <el-table
            :data="tableUserData"
            border
            @selection-change="multipleSelection = $event"
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
              prop="type_name"
              label="人员类型"
              width="155"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="identity_name"
              label="身份类型"
              width="155"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="job_name"
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
              fixed="right"
              align="center"
              label="操作"
              class-name="operate_col"
            >
              <template slot-scope="scope">
                <el-button
                  class="edit_btn"
                  @click="handleEditUser(scope.row)"
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
          :page-size="pageSize"
          @current-change="changePageNum"
        >
        </el-pagination>
      </el-main>
    </el-container>
    <!-- 新增或编辑用户弹窗 -->
    <div v-if="dialogAddFormVisible">
      <el-dialog
        :width="600"
        center="true"
        :show-close="false"
        :visible.sync="dialogAddFormVisible"
        ><add-edit-user
          :title="addOrEdit == 'add' ? '新增用户' : '编辑用户'"
          :type="addOrEdit"
          :parentData="paramData"
        >
        </add-edit-user>
      </el-dialog>
    </div>
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
    <!-- 导入文件弹窗 -->
    <div v-if="dialogImportFile">
      <el-dialog
        :width="'80%'"
        center="true"
        :show-close="false"
        :visible.sync="dialogImportFile"
        ><import-file title="导入文件" />
      </el-dialog>
    </div>
  </div>
</template>
<script>
import "@site/static/scss/index.scss";
import siteCon from "@site/controller/indexCon";
import CommonHeader from "../components/common_header.vue";
import SearchConfigFrom from "./search_from.vue";
import AddEditUser from "./add_edit_user.vue";
import DeleteConfirm from "../components/delete_confirm.vue";
import DeleteSuccess from "../components/delete_success.vue";
import importFile from "./import_file.vue";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import apiHelper from "apiHelper";

export default {
  ...siteCon,
  components: {
    CommonHeader,
    SearchConfigFrom,
    AddEditUser,
    DeleteConfirm,
    DeleteSuccess,
    importFile,
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
      dialogImportFile: false, // 导入文件dialog
      tableUserData: [], // 表格数据
      allUserNum: 0, // 表格数据总长度
      pageSize: 20, // 每页多少条数据
      multipleSelection: [], // 选中的表格数据
      paramData: {}, // 新增或编辑时传递数据
      addOrEdit: "", // 新增还是编辑
      requestParams: {}, // 请求用户列表参数
      requestSearchParams: {}, // 请求用户列表检索条件参数
      defaultExpandNodes: [], // 默认展开的id集合
    };
  },
  methods: {
    querySearch(queryString, cb) {
      this.$appFetch(
        {
          url: "departmentSerarch",
          method: "POST",
          data: {
            keywords: this.searchText,
          },
        },
        (res) => {
          if (res.code == 200 && res.result != null) {
            if (res.result != null && res.result.length != undefined) {
              var arr = [];
              var searchData = res.result;
              for (var i = 0, len = searchData.length; i < len; i++) {
                arr.push({
                  name: `${searchData[i]["pname"]} > ${searchData[i]["name"]}`,
                  id: searchData[i]["id"],
                });
              }
              cb(arr);
            } else {
              cb([]);
            }
          }
        }
      );
    },
    handleSelect(item) {
      this.currentDepartmentId = item.id;
      this.searchText = "";
      this.requestParams.department_id = item.id;
      this.$nextTick(function () {
        this.$refs.departTree.setCurrentKey(item.id);
        this.expandNodes(this.$refs.departTree.store.nodesMap[item.id]);
      });
      this.getUserList();
    },
    expandNodes(node) {
      if (null != node.parent) {
        this.expandNodes(node.parent);
      }
      node.expanded = true;
    },
    // 点击树节点回调
    handleNodeClick(data) {
      this.currentDepartmentId = data.id;
      this.requestParams.department_id = data.id;
      this.getUserList();
    },
    // 新增用户
    handleAddUser() {
      this.addOrEdit = "add";
      this.paramData = {};
      this.dialogAddFormVisible = true;
    },
    // 编辑用户
    handleEditUser(data) {
      this.addOrEdit = "edit";
      this.paramData = Object.assign({}, data);
      this.dialogAddFormVisible = true;
    },
    // 新增或编辑用户回调
    handleUserCallBack(type, data) {
      // alert("type====" + type + "===data===" + JSON.stringify(data));
      this.isLoading = true;
      if (type == "add") {
        var obj = {
          department_id: this.currentDepartmentId,
        };
        var requestObj = Object.assign(obj, data);
        this.$appFetch(
          {
            url: "userAdd",
            method: "POST",
            data: requestObj,
          },
          (res) => {
            if (res.code == 200 && res.result != null) {
              this.dialogAddFormVisible = false;
              this.getUserList();
            } else {
              this.$notify({
                title: "新增失败",
                message: res.msg,
                type: "error",
              });
            }
          }
        );
      }
      if (type == "edit") {
        var obj = {
          user_id: data.id,
        };
        var requestObj = Object.assign(obj, data);
        this.$appFetch(
          {
            url: "userEdit",
            method: "POST",
            data: requestObj,
          },
          (res) => {
            if (res.code == 200 && res.result != null) {
              this.dialogAddFormVisible = false;
              this.getUserList();
            } else {
              this.$notify({
                title: "编辑失败",
                message: res.msg,
                type: "error",
              });
            }
          }
        );
      }
      this.isLoading = false;
    },
    //  导入回调
    importExcelCallBack() {
      this.dialogImportFile = false;
      this.getUserList();
    },
    // 导出用户
    exportUser() {
      var y = new Date().getFullYear();
      var m = new Date().getMonth() + 1;
      var d = new Date().getDate();
      var dateStr =
        "人员信息" +
        y +
        `${m < 10 ? "0" + m : m}` +
        `${d < 10 ? "0" + d : d}` +
        ".xlsx";
      if (this.multipleSelection.length > 0) {
        var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
        var wbout = XLSX.write(wb, {
          bookType: "xlsx",
          bookSST: true,
          type: "array",
        });
        try {
          FileSaver.saveAs(
            new Blob([wbout], { type: "application/octet-stream" }),
            dateStr
          );
        } catch (e) {
          if (typeof console !== "undefined") console.log(e, wbout);
        }
        return wbout;
      } else {
        this.requestParams.type = 2;
        var paramObj = Object.assign(
          this.requestParams,
          this.requestSearchParams
        );
        this.$appFetch(
          {
            url: "userList",
            method: "POST",
            data: paramObj,
          },
          (res) => {
            if (res.code == 200 && res.result != null) {
              var queryParams = res.result.query;
              const xhr = new XMLHttpRequest();
              xhr.open(
                "GET",
                `${apiHelper.getApi("exportUser")}?${queryParams}`,
                true
              );
              xhr.setRequestHeader(
                "token",
                window.localStorage.getItem("token")
              );
              xhr.onload = (e) => {
                var resultObj = JSON.parse(xhr.response);
                var save_link = document.createElement("a");
                save_link.href = resultObj.result.url;
                save_link.download = dateStr;
                save_link.click();
              };
              xhr.send();
            }
          }
        );
      }
    },
    // 删除用户
    deleteUser() {
      if (this.multipleSelection.length == 0) {
        this.$notify({
          title: "删除失败",
          message: "请先选择用户",
          type: "error",
        });
      } else {
        this.dialogDeleteFormVisible = true;
      }
    },
    // 删除表格项回调
    deleteConfrimCallBack() {
      this.dialogDeleteFormVisible = false;
      this.isLoading = true;
      var len = this.multipleSelection.length;
      var str = [];
      for (let i = 0; i < len; i++) {
        str.push(this.multipleSelection[i].id);
      }
      this.$appFetch(
        {
          url: "deleteUser",
          method: "POST",
          data: {
            user_id: str,
          },
        },
        (res) => {
          if (res.code == 200 && res.result != null) {
            this.isLoading = false;
            this.dialogDeteteSuccess = true;
            this.getUserList();
          } else {
            this.isLoading = false;
            this.$notify({
              title: "删除失败",
              message: res.msg,
              type: "error",
            });
          }
        }
      );
    },
    // 搜索回调
    handleSearch(searchParm) {
      this.requestSearchParams = Object.assign({}, searchParm);
      this.getUserList();
    },
    getDepartmentLis() {
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
            this.requestParams.department_id = res.result[0].id;
            this.defaultExpandNodes.push(res.result[0].id);
            this.$nextTick(function () {
              this.$refs.departTree.setCurrentKey(res.result[0].id);
            });
            this.getUserList();
          }
        }
      );
    },
    // 下一页
    changePageNum(val) {
      this.requestParams.page = val;
      this.getUserList();
    },
    getUserList() {
      var paramObj = Object.assign(
        this.requestParams,
        this.requestSearchParams
      );
      console.log(paramObj);
      // 获取用户列表
      this.$appFetch(
        {
          url: "userList",
          method: "POST",
          data: paramObj,
        },
        (res) => {
          if (res.code == 200 && res.result != null) {
            this.tableUserData = res.result.list;
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
    this.getDepartmentLis();
    this.requestParams.page = 1;
    this.requestParams.limit = this.pageSize;
    this.requestParams.type = 1;
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
    height: 87px;
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
    padding: 0 52px;
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