<template>
  <div class="box">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品添加</span>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" prop="category">
          <el-select v-model="ruleForm.category" placeholder="请选择商品分类">
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <div class="price">
            <el-button
              type="info"
              size="mini"
              @click="ruleForm.price <= 0 ? 0 : ruleForm.price--"
              >-</el-button
            >
            <el-input v-model="ruleForm.price"></el-input>
            <el-button type="info" size="mini" @click="ruleForm.price++"
              >+</el-button
            >
          </div>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-upload
            action="http://sell.h5.itsource.cn:8087/goods/goods_img_upload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="picname"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品描述" prop="goodsDesc">
          <el-input type="textarea" v-model="ruleForm.goodsDesc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >修改商品</el-button
          >
          <el-button @click="tolistpage">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getcategoriesreq, postgoodseditreq } from "@/api/axios";
export default {
  name: "xtkj",
  data() {
    var validatename = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入商品名称"));
      }
      if (/^[\u4e00-\u9fa5_A-z0-9]+$/.test(value)) {
        callback();
      } else {
        callback(new Error("请输入2至10字商品名称"));
      }
    };
    var validateclassfy = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择商品分类"));
      } else {
        callback();
      }
    };
    var validatetips = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入商品描述"));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      ruleForm: {
        name: "",
        category: "",
        price: 0,
        imgUrl: "",
        goodsDesc: "",
      },
      options: [],
      rules: {
        name: [{ validator: validatename, trigger: "blur" }],
        category: [{ validator: validateclassfy, trigger: "blur" }],
        // type: [{ validator: validatePass, trigger: "blur" }],
        // resource: [{ validator: validatePass, trigger: "blur" }],
        goodsDesc: [{ validator: validatetips, trigger: "blur" }],
      },
    };
  },
  methods: {
    tolistpage() {
      this.$router.push("/layout/goods");
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          console.log(this.ruleForm);
          let res = await postgoodseditreq({
            name: this.ruleForm.name,
            category: this.ruleForm.category,
            price: this.ruleForm.price,
            imgUrl: this.ruleForm.imgUrl,
            goodsDesc: this.ruleForm.goodsDesc,
            id: this.ruleForm.id,
          });
          if (res.data.code == 0) {
            alert(res.data.msg);
            this.$router.push("/layout/goods");
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      // console.log(this.ruleForm.imgurl);
    },
    handlePictureCardPreview(file) {
      this.ruleForm.imgUrl = file.url;
      this.dialogVisible = true;
    },
    picname(response, file) {
      this.ruleForm.imgUrl = file.response.imgUrl;
    },
  },
  created() {
    this.ruleForm = this.$route.query.data;
    getcategoriesreq().then((res) => {
      if ((res.status == 200) & (res.statusText == "OK")) {
        // console.log(res.data);
        this.options = res.data;
      }
    });
  },
};
</script>

<style scoped lang='scss'>
.box {
  margin: 20px;
  .price {
    display: flex;
    ::v-deep .el-input__inner {
      width: 80px;
      text-align: center;
      border-radius: 0;
    }
    ::v-deep .el-input {
      width: 80px;
      // border-radius: 0;
    }
    ::v-deep .el-button {
      background: #f5f7fa;
      color: #96a1b2;
      border-radius: 0;
      border-color: #dcdfe6;
    }
  }
}
</style>