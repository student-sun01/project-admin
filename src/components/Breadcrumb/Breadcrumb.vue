<template>
  <el-breadcrumb separator="/" class="bread">
    <el-breadcrumb-item
      :to="{ path: item.path }"
      v-for="item in navs"
      :key="item.path"
      >{{ item.meta.title }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>

<script>
export default {
  computed: {
    navs() {
      console.log("路由信息", this.$route.matched);
      let routes = this.$route.matched;
      //   处理第一个路由的信息
      routes[0].path = "/";
      return routes;
    },
  },
  created() {
    console.log(this.$route);
  },
};
</script>

<style lang="less" scoped>
.bread {
  margin-bottom: 10px;
}
</style>