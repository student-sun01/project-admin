<template>
  <div>
    <!-- 面包屑导航-->
    <Breadcrumb></Breadcrumb>
    <!-- 产品顶部搜索 -->
    <div class="header">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="产品名称">
          <el-input
            size="small"
            v-model="formInline.name"
            placeholder="产品名称"
            @blur="blur"
          ></el-input>
        </el-form-item>
        <el-form-item label="添加时间">
          <el-date-picker
            v-model="formInline.date"
            size="small"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onSubmit"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
      <!-- 添加商品 删除商品 -->
      <div class="group">
        <el-button
          size="small"
          type="warning"
          icon="el-icon-circle-plus"
          @click="toProductPage"
          >添加商品</el-button
        >
        <el-button
          size="small"
          type="danger"
          icon="el-icon-delete"
          @click="deleteAll"
          >批量删除</el-button
        >
      </div>
    </div>
    <!-- 表格列表区 -->
    <div class="content">
      <el-table
        :data="tableData"
        cell-class-name="table-center"
        stripe
        border
        style="width: 100%"
        header-cell-class-name="active-header"
        @select="selectHandle"
        @select-all="selectHandle"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="id" label="商品编号" width="100">
        </el-table-column>
        <el-table-column prop="title" label="商品名称" width="100">
          <template slot-scope="scope">
            <span
              style="color: blue; cursor: pointer"
              @click="handleLook(scope.$index, scope.row)"
            >
              {{ scope.row.title }}</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="price" label="商品价格" width="100">
        </el-table-column>
        <el-table-column prop="category" label="商品类目"> </el-table-column>
        <el-table-column label="添加时间">
          <template slot-scope="scope">
            <span>{{
              moment(scope.row.create_time).format("YYYY-MM-DD HH:mm:ss")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sellPoint" label="商品卖点"> </el-table-column>
        <el-table-column label="商品描述" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ removeHTMLTag(scope.row.descs) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-plus"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagenation">
        <Pagenation
          :pageSize="pageSize"
          :total="total"
          @currentChange="currentChange"
        ></Pagenation>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Pagenation from "@/components/pagination/Pagination.vue";
import { removeHTMLTag } from "@/utils/common.js";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      formInline: {
        name: "",
        date: "",
      },
      tableData: [], //列表数据
      pageSize: 6,
      total: 1,
      current: 1,
      ids: [], //存储批量删除id
    };
  },

  methods: {
    moment,
    removeHTMLTag,
    ...mapMutations("product", ["changeRowData", "changeTitle"]),
    onSubmit() {
      console.log("submit!", this.formInline.name);
      this.search(this.formInline.name);
    },
    /* 商品详情 */
    handleLook(index, row) {
      this.changeRowData(row);
      this.changeTitle("详情");
      // 跳转到编辑页面
      this.$router.push("/product/add-product");
    },
    /* 编辑操作 */
    handleEdit(index, row) {
      console.log(index, row);
      // 把当前行的数据存储在vuex中
      this.changeRowData(row);
      this.changeTitle("编辑");
      // 跳转到编辑页面
      this.$router.push("/product/add-product");
    },
    /* 批量删除 */
    deleteAll() {
      console.log("ids---批量删除", this.ids);
      // 传递的ids必须是字符串
      let idStr = this.ids.join(",");
      // console.log(idStr);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 请求批量删除的接口
          this.$api.batchDelete({ ids: idStr }).then((res) => {
            console.log("批量删除-------", res.data);
            if (res.data.status === 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              // 获取当前是否在最后一页数据操作
              let maxPage = Math.ceil(this.total / this.pageSize);
              console.log("最大页码数----", maxPage);
              // 获取当前选中的个数
              let len = this.ids.length;
              console.log("选中的个数", len);
              if (maxPage == this.current) {
                let num =
                  this.total % this.pageSize == 0
                    ? this.pageSize
                    : this.total % this.pageSize;
                console.log("最后一页条数-----", num);
                if (num === len) {
                  this.current = this.current - 1 > 0 ? this.current - 1 : 1;
                }
              }
              this.projectList(this.current);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    /* 点击单选框操作 */
    selectHandle(select) {
      console.log("select", select);
      let arr = [];
      select.forEach((ele) => {
        arr.push(ele.id);
      });
      this.ids = arr;
    },
    /* 点击添加商品跳转 */
    toProductPage() {
      console.log("添加商品哈哈哈哈哈");
      this.changeTitle("添加");
      this.$router.push("/product/add-product");
    },
    /* 删除 */
    handleDelete(index, row) {
      // console.log(index, row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteItemById(row.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    currentChange(val) {
      console.log("$$$", val);
      this.projectList(val);
      this.current = val;
    },
    // 失去焦点
    blur() {
      if (!this.formInline.name) {
        this.projectList(1);
        console.log("!!!");
      }
    },
    async projectList(page) {
      const res = await this.$api.projectList({ page });
      // console.log(res.data.data);
      // this.tableData = res.data.data;
      this.tableData = res.data.data;
      this.pageSize = res.data.pageSize;
      this.total = res.data.total;
    },
    //搜索接口-----------------------------------------
    async search(search) {
      let res = await this.$api.search({ search });
      console.log("搜索数据--", res.data);
      if (res.data.status === 200) {
        //有数据
        this.tableData = res.data.result;
        // 分页处理
        this.total = res.data.result.length;
        this.pageSize = res.data.result.length;
      } else {
        //查无数据
        this.tableData = [];
        this.total = 1;
        this.pageSize = 1;
      }
    },
    /* 删除功能 */
    async deleteItemById(id) {
      let res = await this.$api.deleteItemById({ id });
      console.log("删除", res.data);
      if (res.data.status === 200) {
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        //重新渲染视图-----------------------------
        //删除视图---如果当前是最后一页的最后一条数据-删除后--获取上一页的数据
        //判断 this.total总数目
        if (this.total % this.pageSize === 1) {
          this.current = this.current - 1 > 0 ? this.current - 1 : 1;
        }
        this.projectList(this.current);
      }
    },
  },
  created() {
    this.projectList(1);
  },
  components: {
    Pagenation,
  },
};
</script>

<style lang="less" scoped>
.header {
  background-color: #fff;
  padding: 8px;
  margin-bottom: 20px;
}
.group {
  border: 1px solid #eee;
  padding: 10px;
}
/deep/.active-header {
  color: #333;
  text-align: center;
}
/deep/ .table-center {
  text-align: center;
}
.el-form-item {
  margin-bottom: 16px;
}
.content {
  background-color: #fff;
}
.pagenation {
  padding: 10px;
}
</style>
