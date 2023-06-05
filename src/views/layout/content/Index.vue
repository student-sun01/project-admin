<template>
  <div>
    <!-- 顶部区域 -->
    <div class="header">
      <div class="open">
        <span
          v-if="!isCollapse"
          class="iconfont icon-right-indent"
          @click="changeMenu"
        ></span>
        <span
          v-else
          class="iconfont icon-left-indent"
          @click="changeMenu"
        ></span>
      </div>
    </div>
    <!-- 内容区 -->
    <div class="wrapper">
      <router-view></router-view>
    </div>  
  </div>
</template>

<script>
export default {
  props: ["isCollapse"],
  methods: {
    changeMenu() {
      this.$emit('changeShow');
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper{
  padding: 10px;
}
.header {
  height: 50px;
  background-color: #1e78bf;
  color: #fff;
  line-height: 50px;
  .open {
    .iconfont {
      font-size: 22px;
      cursor: pointer;
    }
  }
}
</style>
