<template>
  <div class="box">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>店铺管理</span>
        <!-- 保存 -->
        <div class="addBtn">
          <el-button size="mini" @click="changeflag" v-if="!flag"
            >编辑</el-button
          >
          <el-button
            type="primary"
            size="mini"
            @click="submitForm('ruleForm')"
            v-else
            >保存</el-button
          >
        </div>
      </div>

      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        :disabled="!flag"
      >
        <!--店铺名称  -->
        <el-form-item label="商品名称" prop="name">
          <el-input
            class="goodsNameInp"
            v-model="ruleForm.name"
            placeholder="店铺名称"
            size="mini"
          ></el-input>
        </el-form-item>

        <!--商品描述 -->
        <el-form-item label="店铺公告" prop="bulletin">
          <el-input
            class="textareaInp"
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="ruleForm.bulletin"
            size="mini"
          >
          </el-input>
        </el-form-item>
        <!--店铺头像 -->
        <el-form-item label="店铺头像">
          <el-upload
            class="avatar-uploader"
            action="http://sell.h5.itsource.cn:8087/goods/goods_img_upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="ruleForm.avatar" :src="ruleForm.avatar" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <!--店铺图片 -->
        <el-form-item label="店铺图片">
          <el-upload
            class="upload-demo"
            action="http://sell.h5.itsource.cn:8087/shop/upload"
            :on-remove="handleRemove"
            :on-success="onsuccess"
            :file-list="ruleForm.pics"
            list-type="picture-card"
          >
            <i class="el-icon-plus uploadbox-icon"></i>
          </el-upload>
        </el-form-item>

        <!--配送费  -->
        <el-form-item label="配送费" prop="deliveryPrice">
          <el-input
            class="shoppingFee"
            v-model="ruleForm.deliveryPrice"
            placeholder=""
            size="mini"
          ></el-input>
        </el-form-item>

        <!--配送时间  -->
        <el-form-item label="配送时间" prop="deliveryTime">
          <el-input
            class="shoppingTime"
            v-model="ruleForm.deliveryTime"
            placeholder=""
            size="mini"
          ></el-input>
        </el-form-item>

        <!--配送描述  -->
        <el-form-item label="配送描述">
          <el-input
            class="shoppingDesc"
            v-model="ruleForm.description"
            placeholder=""
            size="mini"
          ></el-input>
        </el-form-item>

        <!--店铺评分  -->
        <el-form-item label="店铺评分">
          <el-input
            class="storeScore"
            v-model="ruleForm.score"
            placeholder=""
            size="mini"
          ></el-input>
        </el-form-item>

        <!--销量  -->
        <el-form-item label="销量" prop="sellCount">
          <el-input
            class="Sales"
            v-model="ruleForm.sellCount"
            placeholder=""
            size="mini"
          ></el-input>
        </el-form-item>

        <!--多选框  -->
        <el-form-item label="活动" class="checkbox">
          <el-checkbox-group v-model="ruleForm.supports">
            <el-checkbox
              v-for="suport in suports"
              :label="suport"
              :key="suport"
              >{{ suport }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>

        <!--营业时间  -->
        <el-form-item label="营业时间">
          <el-time-picker
            is-range
            v-model="ruleForm.date"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          >
          </el-time-picker>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getshopinforeq, postshopeditreq } from "@/api/axios";
export default {
  data() {
    return {
      //图片上传
      dialogVisible: false,
      suports: [
        "在线支付满28减5",
        "VC无限橙果汁全场8折",
        "单人精彩套餐",
        "特饮8折抢购",
        "单人特色套餐",
      ],
      flag: false,
      //店铺名称及配送费
      ruleForm: {
        avatar: "",
        bulletin: "",
        date: [],
        deliveryPrice: 0,
        deliveryTime: 0,
        description: "",
        id: 0,
        name: "",
        pics: [],
        score: 0,
        sellCount: 0,
        supports: [],
      },
      pics: [],
      //校验规则
      rules: {
        // 店铺名称
        name: [
          { required: true, message: "请输入店铺名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        // 店铺公告
        bulletin: [
          { required: true, message: "请输入店铺公告", trigger: "blur" },
          {
            min: 2,
            max: 300,
            message: "长度在 2 到 300 个字符",
            trigger: "blur",
          },
        ],
        // 起送价格
        deliveryPrice: [
          { required: true, message: "请输入起送价格", trigger: "blur" },
        ],
        // 店铺销量
        sellCount: [
          { required: true, message: "请输入店铺销量", trigger: "blur" },
          {
            type: "number",
            message: "长度在 2 到 8 个字符",
            trigger: "blur",
          },
        ],
        // 送达时间
        deliveryTime: [
          { required: true, message: "请输入起送时间", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    changeflag() {
      this.flag = !this.flag;
    },
    //店铺图片上传
    handleRemove(file, fileList) {
      let temp = this.ruleForm.pics.findIndex((v) => {
        return v.uid == file.uid;
      });
      this.ruleForm.pics.splice(temp, 1);
    },
    handleAvatarSuccess(res, file) {
      this.ruleForm.avatar = res.imgUrl;
    },
    onsuccess(response, file, fileList) {
      this.ruleForm.pics.push({ url: response.imgUrl });
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let datanew = {};
          Object.keys(this.ruleForm).forEach((v, i) => {
            if (v != "minPrice" || v != "userid") {
              datanew[v] = Object.values(this.ruleForm)[i];
            }
          });
          let temp = datanew.pics.map((v) => {
            return v.url;
          });
          let res = await postshopeditreq(
            Object.assign(datanew, { pics: temp })
          );
          if (res.status == 200) {
            this.flag = !this.flag;
            this.$message({
              message: res.data.msg,
              type: "success",
            });
            this.getshopinfo();
          } else {
            this.$message({
              message: res.data.msg,
              type: "warning",
            });
          }
        }
      });
    },
    async getshopinfo() {
      let res = await getshopinforeq();
      if (res.status == 200) {
        let temp = res.data.data.pics.map((v, i) => {
          return (v = { url: v });
        });
        res.data.data.pics = temp;
        this.ruleForm = res.data.data;
      }
    },
  },
  created() {
    this.getshopinfo();
  },
};
</script>
<style scoped lang='scss'>
.box {
  margin: 20px;
}
.clearfix {
  display: flex;
  justify-content: space-between;
}
.el-input,
.textareaInp {
  width: 280px;
}
.checkbox {
  width: 500px;
}
.el-date-editor .el-range-separator {
  width: 10%;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.uploadbox {
  margin-left: 10px;
  width: 150px;
  height: 150px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.uploadbox-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.upload-demo {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
}
</style>
