<template>
  <el-tree @node-click="clickHandle" :props="props" :load="loadNode" lazy>
  </el-tree>
</template>

<script>
export default {
  data() {
    return {
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf",
      },
    };
  },
  methods: {
    clickHandle(data, node) {
      console.log("data", data, "node", node);
      this.$emit('sendTreeData',data)
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.$api.selectItemCategoryByParentId().then((res) => {
          if (res.data.status === 200) {
            return resolve(res.data.result);
          } else {
            return resolve([]);
          }
        });
      }
      if (node.level >= 1) {
        console.log("ttt", node);
        this.$api
          .selectItemCategoryByParentId({ type: node.data.cid })
          .then((res) => {
            if (res.data.status === 200) {
              return resolve(res.data.result);
            } else {
              return resolve([]);
            }
          });
      }
    },
  },
};
</script>

<style></style>
