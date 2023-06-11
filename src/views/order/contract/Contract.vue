<template>
  <div>
    <!-- 面包屑导航 -->
    <Breadcrumb></Breadcrumb>
    <!--  -->
    <div class="content">
      订单合同：
      <el-button @click="dialogVisible = true">查看合同</el-button>
    </div>
    <!-- dialog -->
    <el-dialog
      title="查看合同内容"
      :visible="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
    BUG:暂时先注释掉 不是node版本过高的问题 应该要修改源码
      <!-- <VuePdf></VuePdf> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
      
    </el-dialog>
  </div>
</template>

<script>
// import VuePdf from "./VuePdf.vue";
export default {
  component: {
    // VuePdf,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>


<style lang="less" scoped>
.content {
  background-color: #fff;
  padding: 20px;
  // color: #14e78f;
  
}
</style>