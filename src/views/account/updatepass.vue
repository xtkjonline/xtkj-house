<template>
  <div class="box">
    <el-card>
      <div slot="header" class="clearfix">
        <span>修改密码</span>
      </div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="原密码" prop="oldpass" class="title">
          <el-input
            type="password"
            v-model="ruleForm.oldpass"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newpass" class="title">
          <el-input
            type="password"
            v-model="ruleForm.newpass"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkpass" class="title">
          <el-input
            v-model="ruleForm.checkpass"
            type="password"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getcheckoldpass, postchangepass } from "@/api/axios";
export default {
  name: "xtkj",
  data() {
    var valioldpass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入原密码"));
      }
      if (/^\w{1,9}/.test(value)) {
        callback();
      } else {
        callback(new Error("请输入1-9位字符"));
      }
    };
    var valinewpass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else if (!/^\w{1,9}/.test(value)) {
        callback(new Error("请输入1-9位字符"));
      } else {
        // 当新密码和再次输入的新密码一致后，提交前，修改新密码，就可以通过下面这段代码完成密码重复验证
        if (this.ruleForm.checkpass !== "") {
          this.$refs.ruleForm.validateField("checkpass");
        }
        callback();
      }
    };
    var valicheckpass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      }
      if (value != this.ruleForm.newpass) {
        callback(new Error("再次输入新密码错误"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        oldpass: "",
        newpass: "",
        checkpass: "",
      },
      rules: {
        oldpass: [{ validator: valioldpass, trigger: "blur" }],
        newpass: [{ validator: valinewpass, trigger: "blur" }],
        checkpass: [{ validator: valicheckpass, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = await getcheckoldpass({
            oldPwd: this.ruleForm.oldpass,
          });
          console.log(res);
          if (res.data.code == 200) {
            let resnew = await postchangepass({
              newPwd: this.ruleForm.newpass,
            });
            if (resnew.data.code == 0) {
              alert(resnew.data.msg);
              sessionStorage.setItem("token", "");
              this.$router.push("/login");
            }
          }
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped lang='scss'>
.box {
  margin: 20px;
  height: 300px;
  background: white;
  // padding: 20px 0;
  color: #4f5052;
  h3 {
    margin: 0;
    padding-bottom: 20px;
    padding-left: 20px;
    font-size: 16px;
    border-bottom: 1px solid #ccc;
  }
  .demo-ruleForm {
    margin: 20px 0;
    width: 360px;
    .el-form-item__label {
      text-align: start;
    }
  }
}
</style>