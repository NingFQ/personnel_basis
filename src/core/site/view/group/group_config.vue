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
            placeholder="请输入部门名称"
            :trigger-on-focus="false"
            @select="handleSelect"
            ><i class="el-icon-search el-input__icon" slot="suffix"> </i
          ></el-autocomplete>
          <el-button type="primary" @click="resetStatus">重置</el-button>
        </el-col>
        <el-col :span="9">
          <el-row type="flex" justify="end">
            <el-button
              type="primary"
              width="100"
              icon="el-icon-folder-add"
              @click="dialogAddFormVisible = true"
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
        border
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
import orderImg from "../../static/images/order.png";
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
      orderImg, // 排序图片
      searchText: "", // 搜索框关键词
      dialogAddFormVisible: false, // 新增
      dialogEditFormVisible: false, // 编辑控制
      dialogDeleteFormVisible: false, // 删除控制
      dialogDeleteSuccess: false, // 删除成功
      dialogDeleteFailed: false, // 删除失败
      editData: {}, // 被编辑的数据
      deleteData: {}, // 要删除的数据
      currentHightLightId: "", // 当前高亮显示的行
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
            width: 300,
            align: "left",
          },
          {
            title: "部门编号",
            field: "depart_key",
            width: 210,
            align: "center",
          },
          {
            title: "状态",
            field: "status",
            width: 210,
            align: "center",
            formatter: (item) => {
              if (item.status == 1) {
                return '<span class="status_green"></span><span class="status_text">启用</span>';
              }
              if (item.status == 0) {
                return '<span class="status_red"></span><span class="status_text">禁用</span>';
              }
            },
          },
          {
            title: "成员数量",
            field: "user_num",
            width: 210,
            align: "center",
          },
          {
            title: "部门描述",
            field: "depart_desc",
            align: "center",
            flex: 1,
          },
          {
            title: "排序",
            width: 110,
            align: "center",
            formatter: (item) => {
              return (
                '<img class="order-img" src="' + orderImg + '" alt="图片" />'
              );
            },
          },
          {
            title: "操作",
            type: "action",
            width: 300,
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
                var str = "";
                if (searchData[i]["pname"] == null) {
                  str += searchData[i]["name"];
                } else {
                  str = `${searchData[i]["pname"]} > ${searchData[i]["name"]}`;
                }
                arr.push({
                  name: str,
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
    // 点击搜索结果的某项
    handleSelect(item) {
      this.toggleRowHightLight(false);
      this.searchText = "";
      this.currentHightLightId = item.id;
      this.toggleRowExpansion(true);
      this.toggleRowHightLight(true);
    },
    // 重置
    resetStatus() {
      this.searchText = "";
      this.toggleRowHightLight(false);
    },
    // 高亮某行 取消高亮
    toggleRowHightLight(flag) {
      this.$refs.dragTree.HighlightRow(this.currentHightLightId, flag, false);
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
    onTreeDataChange(lists, from, to, where) {
      if (lists[0].is_base == 1) {
        this.isLoading = true;
        this.$appFetch(
          {
            url: "departmentSort",
            method: "POST",
            data: {
              departments: lists,
            },
          },
          (res) => {
            if (res.code == 200 && res.result != null) {
              this.initData();
            } else {
              this.isLoading = false;
              this.$notify({
                title: "失败",
                message: res.msg,
                type: "error",
              });
            }
          }
        );
      } else {
        this.$notify({
          title: "失败",
          message: "只能有一个根部门",
          type: "error",
        });
      }
    },
    beforeDragOver(e) {
      // console.log(e);
      if (e.is_base == 1) {
        return false;
      }
    },
    // 点击编辑
    handleClickEdit(data) {
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
              this.dialogEditFormVisible = false;
              this.initData();
            } else {
              this.$notify({
                title: "失败",
                message: res.msg,
                type: "error",
              });
            }
          }
        );
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
              this.dialogAddFormVisible = false;
              this.initData();
            } else {
              this.$notify({
                title: "失败",
                message: res.msg,
                type: "error",
              });
            }
          }
        );

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
            this.initData();
          } else {
            this.isLoading = false;
            this.dialogDeleteFailed = true; //删除失败
          }
        }
      );
    },
    // 获取部门列表
    initData() {
      this.isLoading = true;
      // 获取部门列表
      this.$appFetch(
        {
          url: "departmentList",
          method: "POST",
        },
        (res) => {
          if (res.code == 200 && res.result != null) {
            this.dragTableData.lists = res.result;
            if (this.isLoading) {
              this.isLoading = false;
              this.$refs.dragTree.OpenAll();
            }
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
      .drag-tree-table-header {
        height: 44px;
        line-height: 44px;
        background: #e5e7f3;
        opacity: 1;
        .tree-column {
          padding: 0;
          span {
            font-size: 16px;
            font-weight: 400;
            color: #34428a;
          }
        }
      }
      .drag-tree-table-body {
        .tree-row {
          height: 68px;
          line-height: 68px;
          .colIndex0 {
            padding-left: 50px;
          }
        }
        .tree-column {
          padding: 0;
        }
        .highlight-row {
          background: rgba(52, 66, 138, 0.4);
        }
        .status_style {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }
        .status_cricle {
          display: inline-block;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          margin-right: 10px;
        }
        .status_green {
          display: inline-block;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          margin-right: 10px;
          background: #5cbc79;
        }
        .status_red {
          display: inline-block;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          margin-right: 10px;
          background: #ff4e4e;
        }
        .order-img {
          width: 18px;
          height: 18px;
        }
        .edit_btn {
          display: inline-block;
          // width: 50%;
          font-size: 18px;
          font-weight: 500;
          color: #34428a;
          margin-right: 30px;
        }
        .dele_btn {
          display: inline-block;
          // width: 50%;
          font-size: 18px;
          font-weight: 500;
          color: #ff4e4e;
        }
      }
      .border {
        border: none !important;
        border-right: 1px solid #eee !important;
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