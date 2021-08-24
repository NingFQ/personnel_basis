<template>
  <div class="site_group" v-loading="isLoading">
    <common-header />
    <div class="main_container">
      <el-row type="flex" class="container_top">
        <el-col :span="15">
          <el-input
            v-model="searchData"
            placeholder="请输入部门名称"
            suffix-icon="el-icon-search"
          ></el-input>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
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
            <el-button icon="el-icon-arrow-down">全部展开</el-button>
            <el-button icon="el-icon-arrow-up">全部折叠</el-button>
          </el-row>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
        :header-cell-style="getRowClass"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column align="center" prop="name" label="部门名称">
        </el-table-column>
        <el-table-column align="center" prop="id" label="部门编号">
        </el-table-column>
        <el-table-column align="center" prop="status" label="状态">
          <template slot-scope="scope">
            <div class="status_style">
              <span
                :class="[
                  scope.row.status == 1
                    ? 'status_cricle status_green'
                    : 'status_cricle status_red',
                ]"
              ></span>
              <span class="status_text">{{
                scope.row.status == 1 ? "启用" : "禁用"
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="number" label="成员数量">
        </el-table-column>
        <el-table-column align="center" prop="desc" label="部门描述">
        </el-table-column>
        <el-table-column
          align="center"
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
            <el-button
              class="dele_btn"
              type="text"
              @click="handleClickDelete(scope.row)"
              >删除</el-button
            >
          </template></el-table-column
        >
      </el-table>
    </div>
    <!-- 新增弹窗 -->
    <el-dialog
      :width="600"
      center="true"
      :show-close="false"
      :visible.sync="dialogAddFormVisible"
      ><add-group title="新增部门"> </add-group>
    </el-dialog>
    <!-- 编辑弹窗 -->
    <el-dialog
      :width="600"
      center="true"
      :show-close="false"
      :visible.sync="dialogEditFormVisible"
      ><edit-group title="编辑部门" :editingData="editData"> </edit-group>
    </el-dialog>
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
  },

  data() {
    return {
      isLoading: false,
      searchData: "",
      tableData: [
        {
          name: "炊事班",
          id: "001",
          status: 0,
          number: 100,
          desc: "我是部门描述我是部门描述",
        },
        {
          name: "后勤部",
          id: "002",
          status: 1,
          number: 100,
          desc: "我是部门描述我是部门描述",
          children: [
            {
              name: "洗袜子",
              id: "003",
              status: 0,
              number: 100,
              desc: "我是部门描述我是部门描述",
            },
            {
              name: "刷鞋子",
              id: "004",
              status: 1,
              number: 100,
              desc: "我是部门描述我是部门描述",
            },
          ],
        },
        {
          name: "炊事班",
          id: "005",
          status: 0,
          number: 100,
          desc: "我是部门描述我是部门描述",
        },
      ],
      dialogAddFormVisible: false,
      dialogEditFormVisible: false, // 编辑控制
      dialogDeleteFormVisible: false, // 删除控制
      dialogDeleteSuccess: false, // 删除成功
      dialogDeleteFailed: false, // 删除失败
      editData: {}, // 被编辑的数据
      deleteData: {}, // 要删除的数据
    };
  },
  computed: {},
  mounted() {},

  methods: {
    handleSearch() {},
    handleResetInput() {
      this.searchData = "";
    },
    // 设置表头颜色
    getRowClass({ rowIndex }) {
      if (rowIndex == 0) {
        return "background:#E5E7F3";
      } else {
        return "";
      }
    },
    // 新增一个部门
    handleAddNewGroup() {
      this.dialogAddFormVisible = true;
    },
    // 点击编辑
    handleClickEdit(data) {
      this.editData = Object.assign({}, data);
      this.dialogEditFormVisible = true;
    },
    // 编辑完成
    editCompltet(_type, _data) {
      if (_type == "edit") {
        alert("编辑完成的数据======>" + JSON.stringify(_data));
        this.dialogEditFormVisible = false;
      }
      if (_type == "add") {
        alert("新增的数据======>" + JSON.stringify(_data));
        this.dialogAddFormVisible = false;
      }
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
    // 点击删除
    handleClickDelete(data) {
      this.deleteData = data;
      this.dialogDeleteFormVisible = true;
    },
    // 执行了删除操作
    deleteConfrimCallBack() {
      this.dialogDeleteFormVisible = false;
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        // this.dialogDeleteFailed = true; //删除失败
        this.dialogDeleteSuccess = true; // 删除成功
      }, 1000);
    },
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
    .el-table {
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
  .el-dialog__header {
    padding: 0 !important;
  }
  .el-dialog__body {
    padding: 0 !important;
  }
}
</style>