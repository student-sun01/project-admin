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
            <el-input v-model="ruleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="price">
            <el-input v-model="ruleForm.price"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="num">
            <el-input v-model="ruleForm.num"></el-input>
          </el-form-item>
          <el-form-item label="商品卖点" prop="sellPoint">
            <el-input v-model="ruleForm.sellPoint"></el-input>
          </el-form-item>
          <el-form-item label="上传图片" prop="image">
            <UpLoading @sendUrl="sendUrl"></UpLoading>
          </el-form-item>
          <el-form-item label="商品描述" prop="descs"> </el-form-item>

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
export default {
  components: {
    TreeProduct,
    UpLoading,
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
  height: 900px;
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
