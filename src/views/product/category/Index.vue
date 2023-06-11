<template>
  <div class="category">
     <!-- 面包屑导航-->
    <Breadcrumb></Breadcrumb>
    <div class="wrapper">
      <div class="title">产品类目管理</div>
      <div class="tree">
        <!-- 一级按钮 -->
        <el-button type="warning" style="margin-bottom: 20px" @click="addCategory"
          >新增一级导航类目</el-button
        >
        <!-- tree内容结构 -->
        <el-tree
          :props="defaultProps"
          :data="data"
          show-checkbox
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          :render-content="renderContent"
        >
        </el-tree>
      </div>
    </div>
    <!-- 对话框 -->
    <Dialog
      :info="info"
      ref="child"
      :type="type"
      @updateView="itemCategory"
    ></Dialog>
  </div>
</template>

<script>
import Dialog from "./Dialog.vue";
export default {
  components: {
    Dialog,
  },
  data() {
    return {
      type: 1,
      info: {},
      data: [
        {
          id: 1,
          name: "一级 1",
          children: [
            {
              id: 4,
              name: "二级 1-1",
            },
          ],
        },
        {
          id: 2,
          name: "一级 2",
        },
      ],
      defaultProps: {
        label: "name",
      },
    };
  },
  created() {
    this.itemCategory();
  },
  methods: {
    /* 新增一级分类 */
    addCategory(){
      console.log("新增一级分类----------");
      this.$refs.child.dialogVisible = true;
      this.info = {
        title: `新增一级分类`,
      };
      this.type = 3;
      this.$refs.child.input = "";
    },
    /* 新增 */
    /* 1.显示弹窗 2.动态显示title  3.给个唯一标识type判断是新增还是修改*/
    append(data) {
      console.log("新增----------", data);
      this.$refs.child.dialogVisible = true;
      this.info = {
        title: `新增【${data.name}】子级分类`,
        cid: data.cid,
      };
      this.type = 1;
      this.$refs.child.input = "";
    },
    /* 删除  1. 弹框提示信息  2. 确定删除--请求接口  3. 更新视图  */
    remove(node, data) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //执行删除接口-------------------------
          this.$api.deleteContentCategoryById({ id: data.id }).then((res) => {
            console.log("删除---", res.data);
            if (res.data.status===200) {
              this.$message({
                type: "success",
                message: "恭喜你删除成功",
              });
              this.itemCategory()
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    /* 修改 */
    /*  1.显示弹窗 2.动态显示title * */
    update(node, data) {
      console.log("修改-----------");
      this.$refs.child.dialogVisible = true;
      this.info = {
        title: `修改【${data.name}】子级分类`,
        id: data.id,
      };
      this.type = 2;
      this.$refs.child.input = data.name;
    },
    /* 请求tree的数据 */
    async itemCategory() {
      let res = await this.$api.itemCategory();
      console.log("产品分类列表----", res.data);
      let data = res.data.result;
      /* 获取一级目录 */
      let oneArr = [];
      let twoArr = [];
      data.forEach((ele) => {
        if (ele.type == 1) {
          // let obj = {}
          // obj.id = ele.id
          // obj.label = ele.name
          ele.children = [];
          oneArr.push(ele);
        } else {
          twoArr.push(ele);
        }
      });
      console.log(oneArr, twoArr);
      /* 遍历children */
      oneArr.forEach((item) => {
        twoArr.forEach((ele) => {
          if (ele.type === item.cid) {
            item.children.push(ele);
          }
        });
      });
      this.data = oneArr;
    },

    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span class="name">{node.label}</span>
          {node.level == 1 ? (
            <span>
              <el-button
                class="mini"
                on-click={() => this.append(data)}
                icon="el-icon-plus"
              >
                新增
              </el-button>
              <el-button
                class="mini"
                on-click={() => this.update(node, data)}
                icon="el-icon-edit"
              >
                修改
              </el-button>
              <el-button
                class="mini"
                type="danger"
                on-click={() => this.remove(node, data)}
                icon="el-icon-delete"
              >
                删除
              </el-button>
            </span>
          ) : (
            <span>
              <el-button
                class="mini"
                on-click={() => this.update(node, data)}
                icon="el-icon-edit"
              >
                修改
              </el-button>
              <el-button
                class="mini"
                type="danger"
                on-click={() => this.remove(node, data)}
                icon="el-icon-delete"
              >
                删除
              </el-button>
            </span>
          )}
        </span>
      );
    },
  },
};
</script>
<style lang="less" scoped>
.bread{
  margin-top: -12px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.category {
  margin: 10px;
}

.wrapper {
  padding: 10px;
  margin-top: 10px;
  background: #fff;

  .title {
    background: #f6f6f6;
    height: 50px;
    line-height: 50px;
    font-weight: bold;
    padding-left: 10px;
  }

  .tree {
    margin: 10px;

    /deep/ .mini {
      padding: 4px 10px;
      font-size: 14px;
    }

    /deep/ .el-tree-node__content {
      margin-bottom: 10px;
    }
  }

  /deep/ .name {
    width: 300px;
    display: inline-block;
  }
}
</style>