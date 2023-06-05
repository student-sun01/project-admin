<template>
  <el-row :gutter="20">
    <el-col :span="4"><div class="nav"><div class="title">产品类型列表</div></div></el-col>
    <el-col :span="20"><div class="wrapper"><div class="mytitle">商品添加</div></div></el-col>
  </el-row>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.nav {
  height: 600px;
  background-color: #fff;
  .title{
    background-color: skyblue;
    padding:20px;
    color: #fff;
  }
}
.wrapper {
  height: 900px;
  background-color: #fff;
  .mytitle{
    background-color: #eee;
    color:#fff;
    padding:14px;
    color:#333;
    font-weight: 700;
  }
}
</style>
