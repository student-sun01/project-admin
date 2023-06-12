<template>
  <div>
    <!-- 顶部区域 -->
    <div class="header">
      <!-- 折叠按钮 -->
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
      <!-- 右侧区域 -->
      <div class="right">
        <span>{{ currentTime }}</span> |
        <el-dropdown @command="changeLanguage">
          <span class="el-dropdown-link" style="color: #fff">
            语言环境<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh">中文</el-dropdown-item>
            <el-dropdown-item command="en">English</el-dropdown-item>
          </el-dropdown-menu> </el-dropdown
        >|

        <span>欢迎{{ userInfo.username }}</span
        >|
        <span class="el-icon-switch-button icon" @click="loginOut"></span>
      </div>
    </div>
    <!-- 内容区 -->
    <div class="wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState("login", ["userInfo"]),
  },
  data() {
    return {
      currentTime: "",
    };
  },
  props: ["isCollapse"],
  methods: {
    ...mapMutations("menu", ["removeMenuList"]),
    ...mapMutations('login',['removeUser']),
    changeMenu() {
      this.$emit("changeShow");
    },
    /* 退出登录逻辑 */
    loginOut() {
      this.$router.replace("/login");
      // 清空菜单导航
      this.removeMenuList();
      /* 清空登录 */
      this.removeUser()
      localStorage.removeItem("info");
      localStorage.removeItem("login");
    },
    /* 点击下拉框菜单切换语言 */
    changeLanguage(val) {
      console.log(val);
      console.log(this);
      this.$i18n.locale = val;
    },
  },
  created() {
    console.log("dayjs-----", dayjs().format("YYYY年MM月DD日 HH:mm:ss"));
    this.currentTime = dayjs().format("YYYY年MM月DD日 HH:mm:ss");
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  padding: 10px;
}
.header {
  display: flex;
  height: 50px;
  background-color: #1e78bf;
  color: #fff;
  line-height: 50px;
  .open {
    flex: 1;
    .iconfont {
      font-size: 22px;
      cursor: pointer;
    }
  }
  .right {
    width: 400px;
    span {
      font-size: 14px;
      padding: 0 4px;
    }
    .icon {
      font-size: 17px;
    }
  }
}
</style>
