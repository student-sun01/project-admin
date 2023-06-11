<template>
  <el-dialog
    :beforeClose="beforeClose"
    :title="info.title"
    :visible="dialogVisible"
    width="30%"
  >
    <strong>请输入类目名称：</strong>
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitHandle">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ["info", "type"],
  data() {
    return {
      dialogVisible: false,
      input: "",
    };
  },
  methods: {
    beforeClose() {
      this.dialogVisible = false;
    },
    /* 确定 */
    submitHandle() {
      if (this.type == 1) {
        console.log("新增", this.input);
        this.insertItemCategory({ cid: this.info.cid, name: this.input });
      } else if (this.type == 2) {
        console.log("修改", this.input);
        this.updateCategory({ id: this.info.id, name: this.input });
      } else {
        this.insertCategory({ name: this.input });
      }
    },
    /* 一级分类 */
    async insertCategory(params) {
      let res = await this.$api.insertCategory(params);
      console.log("修改---", res.data);
      if (res.data.status === 200) {
        this.$message({
          message: "新增一级分类成功",
          type: "success",
        });
        //隐藏弹框
        this.dialogVisible = false;
        this.$emit("updateView");
      }
    },
    /* 修改类目 */
    async updateCategory(params) {
      let res = await this.$api.updateCategory(params);
      console.log("修改---", res.data);
      if (res.data.status === 200) {
        this.$message({
          message: "恭喜你，新增成功",
          type: "success",
        });
        //隐藏弹框
        this.dialogVisible = false;
        this.$emit("updateView");
      }
    },
    /*  新增子级类目
    params={cid name} */
    async insertItemCategory(params) {
      let res = await this.$api.insertItemCategory(params);
      console.log("@@@", res.data);
      if (res.data.status === 200) {
        this.$message({
          message: "恭喜你，新增成功",
          type: "success",
        });
        //隐藏弹框
        this.dialogVisible = false;
        this.$emit("updateView");
      }
    },
  },
};
</script>

<style>
</style>