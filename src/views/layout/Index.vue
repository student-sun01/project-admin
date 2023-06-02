<template>
  <div class="layout">
    <!-- 左侧菜单 -->
    <div class="menu">
      <Menu :isCollapse="isCollapse"></Menu>
    </div>
    <!-- 右侧内容 -->
    <div class="content" :class="{ small: isCollapse }">
      <Content @changeShow="changeShow" :isCollapse="isCollapse"></Content>
    </div>
  </div>
</template>

<script>
import Menu from "@/views/layout/menu/Index.vue";
import Content from "@/views/layout/content/Index.vue";
export default {
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    changeShow() {
      this.isCollapse = !this.isCollapse;
    },
  },
  components: {
    Menu,
    Content,
  },
};
</script>

<style lang="less" scoped>
.layout {
  .menu {
    // width: 200px;
    background-color: #112f50;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
  }
  .content {
    padding-left: 200px;
  }
  .small {
    padding-left: 64px;
  }
}
</style>
