<template>
  <div class="home">
    <!--1.  顶部区域布局---------- -->
    <div class="header">
      <div class="item">
        总销售额
        <div class="num">{{ totalData.saleTotal | num }}</div>
        <div class="bottom">今日销售额：{{ totalData.sale | num }}</div>
      </div>
      <div class="item">
        总访问量
        <div class="num">{{ totalData.viewsTotal | num }}</div>
        <div class="bottom">今日访问量：{{ totalData.views | num }}</div>
      </div>
      <div class="item">
        总收藏量
        <div class="num">{{ totalData.collectTotal | num }}</div>
        <div class="bottom">今日销售额：{{ totalData.collect | num }}</div>
      </div>
      <div class="item">
        总支付量
        <div class="num">{{ totalData.payTotal | num }}</div>
        <div class="bottom">今日支付量：{{ totalData.pay | num }}</div>
      </div>
    </div>

    <!--2. 访问数据统计 ----------------->
    <div class="content">
      <div class="time-info" id="box13">
        <div class="title">月销售额</div>
        <div id="charts" style="width: 100%; height: 300px"></div>
      </div>
      <div class="area" id="box1">
        <div class="title">产品销售比例</div>
        <div id="pie" style="width: 100%; height: 300px"></div>
      </div>
    </div>

    <!-- 3.  -->
    <!-- 最新内容 -->
    <div class="home-footer">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>今日订单</span>
        </div>
        <div class="text item">
          <el-row>
            <el-col :span="8">
              <div class="title">今日订单数</div>
              <div>{{ orderData.curOrderCount }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">汇总确认订单</div>
              <div>{{ orderData.curCollect }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">今日金额</div>
              <div>{{ orderData.curMoney }}</div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>本月订单</span>
        </div>
        <div class="text item">
          <el-row>
            <el-col :span="8">
              <div class="title">本月订单数</div>
              <div>{{ orderData.orderCount }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">汇总确认订单</div>
              <div>{{ orderData.collect }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">累计金额</div>
              <div>{{ orderData.money }}</div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>快捷入口</span>
        </div>
        <div class="text item">
          <el-button type="primary">产品管理</el-button>
          <el-button>消息管理</el-button>
          <el-button>内容管理</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      totalData: {},
      orderData: {},
    };
  },
  created() {
    this.totalInfo();
    this.orderInfo();
    this.format();
  },
  mounted() {
    // this.line();
    // this.pie();
  },
  methods: {
    // 首页数据统计
    async totalInfo() {
      const res = await this.$api.totalInfo();
      console.log("@@@", res.data.data.list);
      this.totalData = res.data.data.list;
    },
    // 首页订单数据
    async orderInfo() {
      const res = await this.$api.orderInfo();
      // console.log("@@", res.data);
      this.orderData = res.data.list;
    },
    //首页折线图数据统计 月销量、月销售额
    async format() {
      const res = await this.$api.format();
      console.log(res.data.result.data);
      let arr = res.data.result.data.sale_money;
      let arrx = [];
      let money = [];
      let total = [];
      // 饼图 对象数据
      let pieData = [];
      arr.forEach((ele) => {
        arrx.push(ele.name);
        money.push(ele.total_amount);
        total.push(ele.num);
        let obj = {};
        obj.name = ele.name;
        obj.value = ele.total_amount;
        pieData.push(obj);
      });
      // console.log(arrx);
      // console.log(money);
      // console.log(total);
      console.log(pieData);
      this.line(arrx, money, total);
      this.pie(pieData);
    },
    // 折线图
    line(arrx, money, total) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("charts"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          //提示框组件
          trigger: "axis",
        },
        legend: {},
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          data: arrx,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "销售额",
            data: money,
            type: "line",
            smooth: true, //表示平滑曲线
          },
          {
            name: "销售量",
            data: total,
            type: "bar",
          },
        ],
      });
    },
    // 饼图
    pie(pieData) {
      var chartDom = document.getElementById("pie");
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "产品销售额",
            type: "pie",
            radius: "50%",
            data: pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },
    // 柱状图
    // line2() {
    //   // 基于准备好的dom，初始化echarts实例
    //   var myChart = echarts.init(document.getElementById("charts"));
    //   myChart.setOption = {
    //     xAxis: {
    //       type: "category",
    //       data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    //     },
    //     yAxis: {
    //       type: "value",
    //     },
    //     series: [
    //       {
    //         data: [120, 200, 150, 80, 70, 110, 130],
    //         type: "bar",
    //       },
    //     ],
    //   };
    // },
  },
  filters: {
    num(value) {
      if (!value) return;
      return value.toLocaleString();
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  margin: 10px;
}
.header {
  display: flex;
  padding-right: 30px;
  .item {
    flex: 1;
    height: 100px;
    padding: 10px;
    background: #fff;
    border-radius: 10px;
    margin-left: 20px;
    margin-right: 20px;
    font-weight: bold;
    color: #fff;
    // text-align: center;
    position: relative;
    .num {
      font-size: 22px;
      margin: 10px;
      color: #fff;
    }
    .bottom {
      position: absolute;
      border-top: 1px solid rgb(246, 245, 245);
      padding: 10px 20px;
      bottom: 0;
      right: 0;
      left: 0;
      color: #fff;
      font-weight: normal;
    }
  }
  .item:nth-child(1) {
    background-image: linear-gradient(#df887d, #88554d);
  }
  .item:nth-child(2) {
    background-image: linear-gradient(#409eff, #2e556e);
  }
  .item:nth-child(3) {
    background-image: linear-gradient(#b54fa8, #713c7a);
  }
  .item:nth-child(4) {
    background-image: linear-gradient(#1cd2f1, #39717a);
  }
}

// 图表

.content {
  margin: 20px;
  display: flex;
  height: 320px;
  .time-info {
    flex: 2;
    background: #fff;
    margin-right: 20px;
    padding: 10px;
  }
  .area {
    flex: 1;
    background: #fff;
    padding: 10px;
  }
}

//内容

.home-footer {
  display: flex;
  padding-left: 20px;
  margin-bottom: 20px;
  .box-card {
    flex: 1;
    margin-right: 30px;
    span {
      font-weight: 600;
    }
    .item {
      text-align: center;
      font-size: 24px;
      color: #333;
      .el-col {
        border-right: 1px solid #eee;
      }
      .el-col:last-child {
        border-right: none;
      }
      .title {
        margin-bottom: 10px;
        font-size: 14px;
      }
    }
  }
}
</style>
