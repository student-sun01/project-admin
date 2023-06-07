<template>
<!-- file-list	上传的文件列表, 例如: 
[{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]	array	—	[] -->
  <div>
    <el-upload
      :on-success="handleSuccess"
      :action="uploadUrl"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      ref="upload"
      multiple
    >
      <i class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>

<script>
import { uploadUrl, host } from "@/api/base";
export default {
  data() {
    return {
      uploadUrl,
      fileList:[]     
    };
  },
  methods: {
    /* 上传照片成功 */
    handleSuccess(response, file, fileList) {
      console.log("上传图片成功", response, file, fileList);
      // 获取上传成功后图片内的地址
      let url = response.url.slice(7);
      // console.log("url", "http://localhost:7788/" + url);
      let imgUrl = host + "/" + url;
      // console.log('url',imgUrl);
      this.$emit("sendUrl", imgUrl);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    /* 清空图片 */
    clear(){
      this.$refs.upload.clearFiles()
    }
  },
};
</script>

<style>
</style>