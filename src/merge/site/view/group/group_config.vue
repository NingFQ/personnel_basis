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
      <el-table
        ref="dragTable"
        :data="tableData"
        style="width: 100%"
        node-key="id"
        row-key="id"
        current-row-key="id"
        border
        default-expand-all
        @row-click="handleRowClick"
        :highlight-current="true"
        :expand-on-click-node="true"
        :row-class-name="tableRowClassName"
        :header-cell-style="getRowClass"
        :tree-props="{ children: '_child', hasChildren: 'hasChildren' }"
      >
        <el-table-column align="left" prop="name" label="部门名称">
        </el-table-column>
        <el-table-column align="center" prop="depart_key" label="部门编号">
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
        <el-table-column align="center" prop="user_num" label="成员数量">
        </el-table-column>
        <el-table-column align="center" prop="depart_desc" label="部门描述">
        </el-table-column>
        <el-table-column align="center" prop="" label="排序">
          <div v-show="scope.row.is_base != 1" slot-scope="scope">
            <img
              style="width: 26px"
              src="../../static/images/order.png"
              alt=""
            />
          </div>
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="操作"
          class-name="operate_col"
        >
          <template slot-scope="scope">
            <el-row type="flex" justify="start">
              <el-button
                class="edit_btn"
                @click="handleClickEdit(scope.row)"
                type="text"
                >编辑</el-button
              >
              <el-button
                v-show="scope.row.is_base != 1"
                class="dele_btn"
                type="text"
                @click="handleClickDelete(scope.row)"
                >删除</el-button
              >
            </el-row>
          </template></el-table-column
        >
      </el-table>
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
import Sortable from "sortablejs";
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
      searchText: "",
      tableData: [],
      activeRows: [],
      dialogAddFormVisible: false,
      dialogEditFormVisible: false, // 编辑控制
      dialogDeleteFormVisible: false, // 删除控制
      dialogDeleteSuccess: false, // 删除成功
      dialogDeleteFailed: false, // 删除失败
      editData: {}, // 被编辑的数据
      deleteData: {}, // 要删除的数据
      sortable: {}, // 拖拽数据
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
    // 点击某行
    handleRowClick(row) {
      this.$refs.dragTable.toggleRowExpansion(row);
    },
    // 设置表头颜色
    getRowClass({ row, rowIndex }) {
      if (rowIndex == 0) {
        return `background:#E5E7F3;text-align: center;`;
      } else {
        return "";
      }
    },
    // 表格赋值className
    tableRowClassName({ row, rowIndex }) {
      if (row.is_base == 1) {
        return `data-id=${row.id} disable-drag`;
      } else {
        return `data-id=${row.id} allow-drag`;
      }
    },
    // 全部展开 全部收起
    toggleRowExpansion(isExpansion) {
      this.toggleRowExpansion_forAll(this.tableData, isExpansion);
    },
    toggleRowExpansion_forAll(data, isExpansion) {
      data.forEach((item) => {
        this.$refs.dragTable.toggleRowExpansion(item, isExpansion);
        if (item._child != undefined && item._child != null) {
          this.toggleRowExpansion_forAll(item._child, isExpansion);
        }
      });
    },
    // 排序
    rowDrop() {
      const tbody = document.querySelector(".el-table__body-wrapper tbody");
      this.$nextTick(function () {
        let _this = this;
        _this.sortable = Sortable.create(tbody, {
          filter: ".disable-drag",
          draggable: ".allow-drag",
          dataIdAttr: "data-id",
          onMove({ dragged, related }) {
            _this.$set(
              _this,
              "tableData",
              _this.arrayTreeSetLevel(_this.tableData)
            ); // 树形结构数据添加level
            _this.$set(_this, "activeRows", _this.treeToTile(_this.tableData)); // 把树形的结构转为列表再进行拖拽
            console.log(_this.activeRows);
            // const oldRow = _this.activeRows[dragged.rowIndex];
            // const newRow = _this.activeRows[related.rowIndex];
            // if (oldRow.level !== newRow.level && oldRow.pid !== newRow.pid) {
            //   //不能跨级拖拽
            //   return false;
            // }
          },
          onEnd({ oldIndex, newIndex }) {
            const oldRow = _this.activeRows[oldIndex]; // 移动的那个元素
            const newRow = _this.activeRows[newIndex]; // 新的元素

            if (oldIndex !== newIndex) {
              alert(1);
              const modelProperty = _this.activeRows[oldIndex];
              const changeIndex = newIndex - oldIndex;
              const index = _this.activeRows.indexOf(modelProperty);
              if (index < 0) {
                return;
              }
              _this.activeRows.splice(index, 1);
              _this.activeRows.splice(index + changeIndex, 0, modelProperty);
              // _this.sortMenuData(); //把排列的数据重新返回给后台
              console.log(_this.activeRows);
            }
          },
        });
      });
    },
    // 给树形的数据去添加每一层的层级
    arrayTreeSetLevel(array, levelName = "level", childrenName = "_child") {
      if (!Array.isArray(array)) {
        return [];
      }
      const recursive = (array, level = 0) => {
        level++;
        return array.map((v) => {
          v[levelName] = level;
          const child = v[childrenName];
          if (child && child.length) {
            recursive(child, level);
          }
          return v;
        });
      };
      return recursive(array);
    },
    treeToTile(treeData, childKey = "_child") {
      // 将树数据转化为平铺数据
      const arr = [];
      const expanded = (data) => {
        if (data && data.length > 0) {
          data
            .filter((d) => d)
            .forEach((e) => {
              arr.push(e);
              expanded(e[childKey] || []);
            });
        }
      };
      expanded(treeData);
      return arr;
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
            if (this.isLoading) {
              this.isLoading = false;
            }
          }
        }
      );
    },
  },
  mounted() {
    this.initData();
    this.rowDrop();
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
  }
  .el-dialog__header {
    padding: 0 !important;
  }
  .el-dialog__body {
    padding: 0 !important;
  }
}
</style>