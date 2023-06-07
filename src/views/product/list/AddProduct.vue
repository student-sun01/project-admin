<template>
  <el-row :gutter="20">
    <el-col :span="4"
      ><div class="nav">
        <div class="title">产品类型列表</div>
        <div class="tree">
          <TreeProduct @sendTreeData="sendTreeData"></TreeProduct>
        </div></div
    ></el-col>
    <el-col :span="20"
      ><div class="wrapper">
        <div class="mytitle">商品添加</div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="所属分类" prop="category">
            <span>{{ ruleForm.category }}</span>
          </el-form-item>
          <el-form-item label="商品名称" prop="title">
            <el-input v-model="ruleForm.title" size="small"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="price">
            <el-input v-model="ruleForm.price" size="small"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="num">
            <el-input v-model="ruleForm.num" size="small"></el-input>
          </el-form-item>
          <el-form-item label="商品卖点" prop="sellPoint">
            <el-input v-model="ruleForm.sellPoint" size="small"></el-input>
          </el-form-item>
          <el-form-item label="上传图片" prop="image">
            <UpLoading @sendUrl="sendUrl" ref="uploadImg"></UpLoading>
          </el-form-item>
          <el-form-item label="商品描述" prop="descs">
            <WangEditor
              @sendWangEditer="sendWangEditer"
              ref="wangEditor"
            ></WangEditor>
          </el-form-item>
          <el-form-item label="首页轮播推进" prop="isShow">
            <el-switch
              v-model="ruleForm.isShow"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </el-form-item>
          <el-form-item label="是否推荐商品" prop="isShow">
            <el-switch
              v-model="ruleForm.isShow"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </el-form-item>
          <el-form-item label="是否上架商品" prop="isShow">
            <el-switch
              v-model="ruleForm.isShow"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >保存</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div></el-col
    >
  </el-row>
</template>

<script>
import TreeProduct from "./TreeProduct.vue";
import UpLoading from "./UpLoading.vue";
import WangEditor from "./WangEditor.vue";
export default {
  components: {
    TreeProduct,
    UpLoading,
    WangEditor,
  },
  data() {
    return {
      ruleForm: {
        //表单数据
        id: "",
        title: "",
        num: "",
        price: "",
        sellPoint: "",
        image: [],
        descs: "",
        category: "",
        cid: "",
        isShow: true,
      },
      rules: {
        title: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        num: [{ required: true, message: "请输入商品数量", trigger: "blur" }],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        category: [
          { required: false, message: "请输入商品类目", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    /* 获取tree点击的数据 */
    sendTreeData(val) {
      console.log("tree", val);
      this.ruleForm.category = val.name;
    },
    /* 获取上传照片的数据 */
    sendUrl(val) {
      console.log("val----", val);
      this.ruleForm.image.push(val);
    },
    /* 获取商品描述数据 */
    sendWangEditer(val) {
      console.log("富文本", val);
      this.ruleForm.descs = val;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          // console.log("添加商品", this.ruleForm);
          let {
            id,
            title,
            image,
            sellPoint,
            price,
            cid,
            category,
            num,
            descs,
          } = this.ruleForm;
          this.insertTbItem({
            title,
            image: JSON.stringify(image),
            sellPoint,
            price,
            cid,
            category,
            num,
            descs,
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /* 添加商品 */
    async insertTbItem(params) {
      let res = await this.$api.insertTbItem(params);
      console.log("添加商品", res.data);
      if (res.data.status === 200) {
        this.$message({
          message: "恭喜你，添加商品成功",
          type: "success",
        });
        //跳转路由
        this.$router.push("/product/list");
      }
    },
    /* 重置 */
    resetForm(formName) {
      this.$refs[formName].resetFields();
      /* 清除图片 */
      this.$refs.uploadImg.clear();
      /* 富文本清除 */
      this.$refs.wangEditor.editor.clear()
      // 第二种方法  this.$refs.wangEditor.html = "";
    },
  },
};
</script>

<style lang="less" scoped>
.nav {
  height: 600px;
  background-color: #fff;
  .title {
    background-color: skyblue;
    padding: 20px;
    color: #fff;
  }
  .tree {
    padding: 20px;
  }
}
.wrapper {
  // height: 900px;
  background-color: #fff;
  .mytitle {
    background-color: #eee;
    color: #fff;
    padding: 14px;
    color: #333;
    font-weight: 700;
  }
  .demo-ruleForm {
    padding: 20px;
  }
}
</style>
