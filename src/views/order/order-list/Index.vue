<template>
  <div>
     <!-- 面包屑导航-->
    <Breadcrumb></Breadcrumb>
    <!-- 产品顶部搜索 -->
    <div class="header">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="预定编号">
          <el-input
            size="small"
            v-model="formInline.name"
            placeholder="请输入编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="预定时间">
          <el-date-picker
            v-model="formInline.date"
            size="small"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 添加商品 删除商品 -->
      <div class="group">
        <el-button size="small" type="warning" @click="handleCollect"
          >订单汇总</el-button
        >
        <!-- 导出当前表格的数据 -->
        <download-excel
          class="export-excel-wrapper"
          :data="tableData"
          :fields="json_fields"
          :header="title"
          name="来日方长pdd订单表.xls"
        >
          <!-- 导出选中的订单编号数据 -->
          <!-- <download-excel
          class="export-excel-wrapper"
          :data="DetailsForm"
          :fields="json_fields"
          :header="title"
          name="来日方长pdd订单表.xls"
        > -->
          <el-button size="small" type="warning">导出</el-button>
        </download-excel>
      </div>
    </div>
    <!-- 表格区域 -->
    <div class="content">
      <el-table
        @select="select"
        cell-class-name="table-center"
        header-cell-class-name="active-header"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column type="selection" width="55" :selectable="selectable">
        </el-table-column>
        <el-table-column prop="code" label="订单编号">
          <template slot-scope="scope">
            <span
              style="color: blue; cursor: pointer"
              @click="OrderDecs(scope.row)"
            >
              {{ scope.row.code }}</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="ordername" label="下单人"> </el-table-column>
        <el-table-column prop="company" label="所属单位"> </el-table-column>
        <el-table-column prop="phone" label="联系电话"> </el-table-column>
        <el-table-column prop="yudingTime" label="预定时间">
          <!-- <template slot-scope="scope">
            {{ dayjs(scope.row.yudingTime).format("YYYY-MM-DD") }}
          </template> -->
        </el-table-column>
        <el-table-column prop="price" label="订单总价格"> </el-table-column>
        <el-table-column prop="huizongStatus" label="汇总状态">
          <!-- <template slot-scope="scope">{{
            scope.row.huizongStatus === 1 ? "未汇总" : "已汇总"
          }}</template> -->
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <Pagination
        :total="total"
        :pageSize="pageSize"
        @currentChange="currentChange"
      ></Pagination>
    </div>
    <!-- 抽屉组件 -->
    <OrderDecs ref="child"></OrderDecs>
  </div>
</template>

<script>
import Pagination from "@/components/pagination/Pagination.vue";
import dayjs from "dayjs";
import OrderDecs from "./OrderDecs.vue";
export default {
  components: {
    Pagination,
    OrderDecs,
  },
  data() {
    return {
      formInline: {
        name: "",
        date: "",
      },
      tableData: [],
      total: 10,
      pageSize: 1,
      ids: [],
      json_fields: {
        //映射字段值
        // "订单编号": 'code',
        //数字处理--
        订单编号: {
          field: "code",
          callback: (value) => {
            return "&nbsp;" + value;
          },
        },
        下单人: "ordername",
        所属单位: "company",
        联系电话: {
          field: "phone",
          callback: (value) => {
            return "&nbsp;" + value;
          },
        },
        预定时间: "yudingTime",
        订单总价格: "price",
        汇总状态: "huizongStatus",
      },
      title: "蓝海后台管理系统订单列表", //
      DetailsForm: [], //需要导出的数据 [{},{}]
    };
  },
  methods: {
    dayjs,
    /* 点击订单编号进入订单详情 */
    OrderDecs() {
      this.$refs.child.drawer = true;
    },
    /* 点击订单汇总按钮 */
    handleCollect() {
      if (this.ids.length >= 2) {
        this.$api.changeStatus({ ids: this.ids.join(",") }).then((res) => {
          console.log("汇总了----", res.data);
          if (res.data.status === 200) {
            this.$message({
              type: "success",
              message: "汇总成功",
            });
            this.orderList(1);
          }
        });
      } else {
        this.$alert("汇总订单至少需要2条订单信息", "汇总订单", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$message({
              type: "info",
              message: `取消汇总`,
            });
          },
        });
      }
    },
    /* 点击选择框 */
    select(selection, row) {
      console.log(selection, row);
      let arr = [];
      selection.forEach((ele) => {
        arr.push(ele.id);
      });
      this.ids = arr;
      /* 存储勾选行信息 */
      this.DetailsForm = selection;
    },
    /* 禁用checkbox */
    selectable(row, index) {
      if (row.huizongStatus == "未汇总") {
        return true;
      } else {
        return false;
      }
    },
    currentChange(page) {
      console.log("33333");
      this.orderList(page);
    },
    /* 订单列表数据 */
    async orderList(page) {
      let res = await this.$api.orderList({ page });
      console.log("订单列表---", res.data);
      if (res.data.status === 200) {
        // this.tableData = res.data.data;
        let arr = res.data.data;
        arr.forEach((ele) => {
          ele.huizongStatus = ele.huizongStatus == 1 ? "未汇总" : "已汇总";
          ele.yudingTime = dayjs(ele.yudingTime).format("YYYY-MM-DD");
        });
        this.tableData = arr;
        this.total = res.data.total;
        this.pageSize = res.data.pageSize;
      } else {
        this.tableData = [];
        this.total = 1;
        this.pageSize = 1;
      }
    },
  },
  created() {
    this.orderList(1);
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
.export-excel-wrapper {
  display: inline-block;
  margin-left: 10px;
  button {
    padding-left: 30px;
    padding-right: 30px;
  }
}
</style>
