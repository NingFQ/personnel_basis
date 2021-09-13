<template>
  <div class="site_group" v-loading="isLoading">
    <common-header />
    <div class="main_container">
      <el-row type="flex" class="container_top">
        <el-col :span="15">
          <el-autocomplete
            value-key="name"
            class="inline-input"
            v-model="searchText"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
          <!-- <el-input
            v-model="searchData"
            placeholder="请输入部门名称"
            suffix-icon="el-icon-search"
          ></el-input> -->
          <!-- <el-button type="primary" @click="handleSearch">搜索</el-button> -->
          <el-button type="primary" @click="handleResetInput">重置</el-button>
        </el-col>
        <el-col :span="9">
          <el-row type="flex" justify="end">
            <el-button
              type="primary"
              width="100"
              icon="el-icon-folder-add"
              @click="handleAddNewGroup"
              >新建</el-button
            >
            <el-button
              icon="el-icon-arrow-down"
              @click="toggleRowExpansion(true)"
              >全部展开</el-button
            >
            <el-button
              icon="el-icon-arrow-up"
              @click="toggleRowExpansion(false)"
              >全部折叠</el-button
            >
          </el-row>
        </el-col>
      </el-row>
      <dragTreeTable
        ref="dragTree"
        :data="dragTableData"
        hightRowChange
        :beforeDragOver="beforeDragOver"
        :onDrag="onTreeDataChange"
      >
      </dragTreeTable>
    </div>
    <!-- 新增弹窗 -->
    <div v-if="dialogAddFormVisible">
      <el-dialog
        :width="600"
        center="true"
        :show-close="false"
        :visible.sync="dialogAddFormVisible"
        ><add-group title="新增部门"> </add-group>
      </el-dialog>
    </div>
    <!-- 编辑弹窗 -->
    <div v-if="dialogEditFormVisible">
      <el-dialog
        :width="600"
        center="true"
        :show-close="false"
        :visible.sync="dialogEditFormVisible"
        ><edit-group title="编辑部门" :editingData="editData"> </edit-group>
      </el-dialog>
    </div>
    <!-- 删除弹窗 -->
    <el-dialog
      :width="600"
      center="true"
      :show-close="false"
      :visible.sync="dialogDeleteFormVisible"
      ><delete-confirm> </delete-confirm>
    </el-dialog>
    <!--  删除成功弹窗-->
    <el-dialog
      :width="600"
      center="true"
      :show-close="false"
      :visible.sync="dialogDeleteSuccess"
      ><delete-success title="操作确认"> </delete-success>
    </el-dialog>
    <!--删除失败弹窗 -->
    <el-dialog
      :width="600"
      center="true"
      :show-close="false"
      :visible.sync="dialogDeleteFailed"
      ><delete-failed title="操作确认"> </delete-failed>
    </el-dialog>
  </div>
</template>

<script>
import dragTreeTable from "drag-tree-table";
import CommonHeader from "../components/common_header.vue";
import EditGroup from "./edit_group.vue";
import AddGroup from "./add_group.vue";
import DeleteConfirm from "../components/delete_confirm.vue";
import DeleteSuccess from "../components/delete_success.vue";
import DeleteFailed from "./delete_group_failed.vue";

export default {
  name: "ZhilinFrontGroupConfig",
  components: {
    CommonHeader,
    AddGroup,
    EditGroup,
    DeleteConfirm,
    DeleteSuccess,
    DeleteFailed,
    dragTreeTable,
  },
  data() {
    return {
      isLoading: false,
      searchText: "",
      tableData: [],
      dialogAddFormVisible: false,
      dialogEditFormVisible: false, // 编辑控制
      dialogDeleteFormVisible: false, // 删除控制
      dialogDeleteSuccess: false, // 删除成功
      dialogDeleteFailed: false, // 删除失败
      editData: {}, // 被编辑的数据
      deleteData: {}, // 要删除的数据
      dragTableData: {
        lists: [],
        custom_field: {
          id: "id",
          order: "sort",
          lists: "_child",
          parent_id: "pid",
        },
        columns: [
          {
            type: "selection",
            title: "部门名称",
            field: "name",
            width: 400,
            align: "center",
          },
          {
            title: "部门编号",
            field: "depart_key",
            width: 200,
            align: "center",
          },
          {
            title: "状态",
            field: "status",
            width: 200,
            align: "center",
            formatter: (item) => {
              return (
                '<div class="status_style">' +
                `<span class="${
                  item.status == 1
                    ? "status_cricle status_green"
                    : "status_cricle status_red"
                }></span>` +
                `<span class="status_text">${
                  item.status == 1 ? "启用" : "禁用"
                }</span>` +
                "</div>"
              );
            },
          },
          {
            title: "成员数量",
            field: "user_num",
            width: 200,
            align: "center",
          },
          {
            title: "部门描述",
            field: "depart_desc",
            width: 200,
            align: "center",
            flex: 1,
          },
          {
            title: "排序",
            field: "depart_desc",
            width: 200,
            align: "center",
            formatter: (item) => {
              return `<img style="width: 26px"
              src="../../static/images/order.png"
              alt=""
            />`;
            },
          },
          {
            title: "操作",
            type: "action",
            width: 200,
            // align: "center",
            actions: [
              {
                text: "编辑",
                onclick: this.handleClickEdit,
                formatter: (item) => {
                  return `<span class="edit_btn"
                >编辑</span>`;
                },
              },
              {
                text: "删除",
                onclick: this.handleClickDelete,
                formatter: (item) => {
                  return `<span class="dele_btn"
                >删除</span>`;
                },
              },
            ],
          },
        ],
      },
    };
  },
  computed: {},
  mounted() {},
  methods: {
    handleSearch() {},
    handleResetInput() {
      this.searchText = "";
    },
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
      this.searchText = "";
    },
    // 全部展开 全部收起
    toggleRowExpansion(isExpansion) {
      if (isExpansion) {
        this.$refs.dragTree.OpenAll();
      } else {
        this.$refs.dragTree.ZipAll();
      }
    },
    // 排序
    onTreeDataChange(lists) {
      console.log(JSON.stringify(lists));
      this.dragTableData.lists = lists;
      // var rowList = document.getElementsByClassName("tree-row");
      // var arr = [];
      // for (let i = 0, len = rowList.length; i < len; i++) {
      //   var row_id = rowList[i].getAttribute("tree-id");
      //   var row_pid = rowList[i].getAttribute("tree-p-id");
      //   arr.push({
      //     id: row_id,
      //     pid: row_pid,
      //   });
      // }
      // console.log(JSON.stringify(arr));
    },
    beforeDragOver(e) {
      console.log(e);
      if (e.is_base == 1) {
        return false;
      }
      // console.log(e);
    },
    // 新增一个部门
    handleAddNewGroup() {
      this.dialogAddFormVisible = true;
    },
    // 点击编辑
    handleClickEdit(data) {
      console.log(data);
      this.editData = Object.assign({}, data);
      this.dialogEditFormVisible = true;
    },
    // 编辑完成
    operateCompltet(_type, _data) {
      this.isLoading = true;
      if (_type == "edit") {
        this.$appFetch(
          {
            url: "departmentEdit",
            method: "POST",
            data: _data,
          },
          (res) => {
            if (res.code == 200 && res.result != null) {
              this.initData();
            }
          }
        );
        this.dialogEditFormVisible = false;
        this.isLoading = false;
      }
      if (_type == "add") {
        this.$appFetch(
          {
            url: "departmentAdd",
            method: "POST",
            data: _data,
          },
          (res) => {
            if (res.code == 200 && res.result != null) {
              this.initData();
            }
          }
        );
        this.dialogAddFormVisible = false;
        this.isLoading = false;
      }
    },
    // 点击删除
    handleClickDelete(data) {
      this.deleteData = Object.assign({}, data);
      this.dialogDeleteFormVisible = true;
    },
    // 执行了删除操作
    deleteConfrimCallBack() {
      this.isLoading = true;
      this.dialogDeleteFormVisible = false;
      this.$appFetch(
        {
          url: "departmentDelete",
          method: "POST",
          data: {
            dep_id: this.deleteData.id,
          },
        },
        (res) => {
          if (res.code == 200 && res.result != null) {
            this.isLoading = false;
            this.dialogDeleteSuccess = true; // 删除成功
          } else {
            this.isLoading = false;
            this.dialogDeleteFailed = true; //删除失败
          }
          this.initData();
        }
      );
    },
    // 获取部门列表
    initData() {
      // 获取部门列表
      this.$appFetch(
        {
          url: "departmentList",
          method: "POST",
        },
        (res) => {
          if (res.code == 200 && res.result != null) {
            this.tableData = res.result;
            this.dragTableData.lists = res.result;
            if (this.isLoading) {
              this.isLoading = false;
            }
            this.$refs.dragTree.OpenAll();
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
.site_group {
  width: 100%;
  height: 100%;
  .main_container {
    width: 100%;
    padding: 40px 50px 0;
    .container_top {
      width: 100%;
      margin-bottom: 40px;
      .el-input {
        width: 500px;
        margin-right: 40px;
      }
      .search_btn {
        width: 160px;
        height: 44px;
        background: #34428a;
        opacity: 1;
        font-size: 16px;
        border-radius: 2px;
        color: #fff;
      }
      .reset_btn {
        width: 160px;
        height: 44px;
        background: #e5e7f3;
        opacity: 1;
        font-size: 16px;
        border-radius: 2px;
        color: #34428a;
      }
      .right_btn {
        width: 100px;
        background: #34428a;
        opacity: 1;
        border-radius: 2px;
        color: #fff;
        font-size: 16px;
      }
      .expand_btn {
        width: 130px;
        background: #ffffff;
        border: 1px solid #34428a;
        opacity: 1;
        border-radius: 2px;
      }
    }
    .drag-tree-table {
      font-size: 18px !important;
      .status_style {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .status_cricle {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          margin-right: 10px;
        }
        .status_green {
          background: #5cbc79;
        }
        .status_red {
          background: #ff4e4e;
        }
      }
      .edit_btn {
        width: 50%;
        font-size: 18px;
        font-weight: 500;
        color: #34428a;
      }
      .dele_btn {
        width: 50%;
        font-size: 18px;
        font-weight: 500;
        color: #ff4e4e;
      }
    }
  }
  .el-dialog__header {
    padding: 0 !important;
  }
  .el-dialog__body {
    padding: 0 !important;
  }
}
</style>