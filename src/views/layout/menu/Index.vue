<template>
  <div>
    <el-menu
      :default-active="active"
      class="el-menu-vertical-demo"
      background-color="#112f50"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :collapse="isCollapse"
    >
      <el-menu-item>
        <span slot="title" class="xitong">蓝海后台管理系统</span>
      </el-menu-item>
      <!-- 首页 -->
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <!-- 产品 -->
      <el-submenu index="/product">
        <template slot="title">
          <i class="el-icon-trophy-1"></i>
          <span>产品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/product/list">
            <i class="el-icon-setting"></i>
            产品列表</el-menu-item
          >
          <el-menu-item index="/product/category">
            <i class="el-icon-setting"></i>产品分类</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
      <!-- 订单 -->
      <el-submenu index="/order">
        <template slot="title">
          <i class="el-icon-s-claim"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/order/order-list">
            <i class="el-icon-setting"></i>
            订单列表</el-menu-item
          >
          <el-menu-item index="/order/collect">
            <i class="el-icon-setting"></i>订单汇总</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
      <!-- 消息管理 -->
      <el-submenu index="/news">
        <template slot="title">
          <i class="el-icon-chat-line-round"></i>
          <span>消息管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/news/news-list">
            <i class="el-icon-setting"></i>
            消息列表</el-menu-item
          >
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/news/news-collect">
            <i class="el-icon-setting"></i>
            消息收藏</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
      <!-- 广告 -->
      <el-submenu index="/advert">
        <template slot="title">
          <i class="el-icon-s-opportunity"></i>
          <span>广告管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/advert/advert-list">
            <i class="el-icon-setting"></i>
            广告分类</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
      <!-- 系统管理 -->
       <el-submenu index="/systemanage">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/systemanage/department">
            <i class="el-icon-setting"></i>
            部门管理</el-menu-item
          >
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/systemanage/role">
            <i class="el-icon-setting"></i>
            角色管理</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ["isCollapse"],
  data() {
    return {
      active:''
    }
  },
  created(){
    /* 刷新后产品libiao列表不会高亮 是因为watch不会立即执行 */
    if(this.$route.meta.activeMenu){
        this.active = this.$route.meta.activeMenu
      }else{
        this.active = this.$route.path
      }
  },
   watch: {
    // 监听路由的变化--切换页面组件
    $route(to, from) {
      // 对路由变化作出响应...
      console.log('watch---to',to);
      /* 判断当前的路由里面 meta:{activeMenu:'/product/list'} */
      let {meta,path} = to
      if(meta.activeMenu){
        this.active = meta.activeMenu
      }else{
        this.active = path
      }
    }
  }
};
</script>

<style lang="less" scoped>
.el-menu {
  border-right: 0;
}
.el-menu-item .xitong{
  font-size: 17px;
}
/deep/ .is-active {
  background-color: #1e78bf !important;
  color: #fff !important;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
