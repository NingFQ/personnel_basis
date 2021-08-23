<template>
  <div class="site_group">
    <common-header />
    <div class="main_container">
      <el-row type="flex" class="container_top">
        <el-col :span="15">
          <el-input
            v-model="searchData"
            placeholder="请输入部门名称"
            suffix-icon="el-icon-search"
          ></el-input>
          <el-button class="search_btn" @click="handleSearch">搜索</el-button>
          <el-button class="reset_btn" @click="handleResetInput"
            >重置</el-button
          >
        </el-col>
        <el-col :span="9">
          <el-row type="flex" justify="end">
            <el-button
              class="right_btn"
              icon="el-icon-folder-add"
              @click="handleAddNewGroup"
              >新建</el-button
            >
            <el-button class="expand_btn" icon="el-icon-arrow-down"
              >全部展开</el-button
            >
            <el-button class="expand_btn" icon="el-icon-arrow-up"
              >全部折叠</el-button
            >
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
                  scope.row.status == 0
                    ? 'status_cricle status_green'
                    : 'status_cricle status_red',
                ]"
              ></span>
              <span class="status_text">{{
                scope.row.status == 0 ? "启用" : "禁用"
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
    <!-- 编辑弹窗 -->
    <el-dialog
      :width="600"
      center="true"
      :show-close="false"
      :visible.sync="dialogEditFormVisible"
      ><edit-group title="编辑" :editingData="editData" :editType="editType">
      </edit-group>
    </el-dialog>
    <!-- 删除弹窗 -->
    <el-dialog
      :width="600"
      center="true"
      :show-close="false"
      :visible.sync="dialogDeleteFormVisible"
      destroy-on-close="true"
      ><delete-group title="操作确认"> </delete-group>
    </el-dialog>
  </div>
</template>

<script>
import CommonHeader from "../components/common_header.vue";
import EditGroup from "./edit_group.vue";
import DeleteGroup from "./delete_group.vue";

export default {
  name: "ZhilinFrontGroupConfig",

  components: { CommonHeader, EditGroup, DeleteGroup },

  data() {
    return {
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
      dialogEditFormVisible: false, // 编辑控制
      dialogDeleteFormVisible: false, // 删除控制
      editData: {}, // 被编辑的数据
      deleteData: {}, // 要删除的数据
      editType: "",
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
    // 点击编辑
    handleClickEdit(data) {
      this.editData = data;
      this.editType = "edit";
      this.dialogEditFormVisible = true;
    },
    // 点击删除
    handleClickDelete(data) {
      this.deleteData = data;
      this.dialogDeleteFormVisible = true;
    },
    // 执行了删除操作
    handleDeleteData() {
      this.dialogDeleteFormVisible = false;
    },
    // 关闭弹窗 key
    handleCloseDialog(type) {
      switch (type) {
        case "edit":
          this.dialogEditFormVisible = false;
          break;
        case "delete":
          this.dialogDeleteFormVisible = false;
          break;
      }
    },
    // 新增一个部门
    handleAddNewGroup() {
      this.editType = "add";
      this.editType = {};
      this.dialogEditFormVisible = true;
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
      .el-checkbox__input.is-checked .el-checkbox__inner,
      .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background-color: #34428a;
        border-color: #34428a;
      }
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