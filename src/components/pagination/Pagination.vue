<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage2"
    :page-sizes="[100, 200, 300, 400]"
    :page-size="pageSize"
    layout="total, prev, pager, next, jumper"
    :total="total"
  >
  </el-pagination>
</template>

<script>

export default {
  data() {
    return {
      currentPage2: 1,
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$emit('currentChange',val)
    },
   
  },
  props: {
    pageSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 100,
    },
  },
};
</script>

<style></style>
