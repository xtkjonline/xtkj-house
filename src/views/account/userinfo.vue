<template>
  <div class="userinfobox">
    <el-card class="box-card">
      <div class="text item">管理员信息</div>
      <div class="text item">管理员ID：{{ userinfo.id }}</div>
      <div class="text item">账号：{{ userinfo.account }}</div>
      <div class="text item">用户组：{{ userinfo.userGroup }}</div>
      <div class="text item">创建时间：{{ userinfo.ctime }}</div>
      <div class="touxiang">
        <span>管理员头像：</span>
        <el-upload
          class="avatar-uploader"
          action="http://sell.h5.itsource.cn:8087/users/avatar_upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getavataredit } from "@/api/axios";
import { mapState } from "vuex";
export default {
  name: "xtkj",
  data() {
    return {
      imgUrl: "",
    };
  },
  methods: {
    async handleAvatarSuccess(res, file) {
      this.imgUrl = file.response.imgUrl;
      this.$store.commit(
        "SET_USERINFO",
        Object.assign(this.userinfo, { imgUrl: this.imgUrl })
      );
      let picres = await getavataredit({ imgUrl: this.imgUrl });
      if (picres.data.code == 0) {
        this.$message({
          message: picres.data.msg,
          type: "success",
        });
      } else {
        this.$message({
          message: picres.data.msg,
          type: "warning",
        });
      }
    },
    beforeAvatarUpload(file) {
      //   const isJPG = file.type === "image/jpeg";
      //   const isLt2M = file.size / 1024 / 1024 < 2;
      //   if (!isJPG) {
      //     this.$message.error("上传头像图片只能是 JPG 格式!");
      //   }
      //   if (!isLt2M) {
      //     this.$message.error("上传头像图片大小不能超过 2MB!");
      //   }
      //   return isJPG && isLt2M;
    },
  },
  computed: {
    ...mapState(["userinfo"]),
  },
};
</script>

<style scoped lang='scss'>
.userinfobox {
  margin: 20px;
  .text {
    margin-bottom: 0;
    margin-top: 18px;
    font-size: 14px;
    height: 40px;
    border-bottom: 1px solid #ccc;
  }

  .touxiang {
    display: flex;
    align-items: center;
  }
  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }
  ::v-deep .el-card__body {
    padding: 0 20px;
  }
  ::v-deep .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  //   ::v-deep .el-card__header {
  //     margin-bottom: 0;
  //   }
}
</style>