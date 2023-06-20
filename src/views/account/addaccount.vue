<template>
  <div class="box">
    <el-card>
      <div slot="header" class="clearfix">
        <span>添加账号</span>
      </div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="account" class="title">
          <el-input
            type="text"
            v-model="ruleForm.account"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass" class="title">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="用户组" prop="usergroup" class="title">
          <el-input v-model="ruleForm.usergroup"></el-input>
        </el-form-item> -->
        <el-form-item label="用户组" prop="usergroup" class="title">
          <el-select v-model="ruleForm.usergroup" placeholder="请选择用户组">
            <el-option label="" value=""></el-option>
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="普通管理员" value="普通管理员"></el-option>
          </el-select>
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
import { postadduserReq, postuserrepeatReq } from "@/api/axios";
export default {
  name: "xtkj",
  data() {
    var checkusergroup = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户组不能为空"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      if (/^\w{1,9}/.test(value)) {
        callback();
      } else {
        callback(new Error("请输入6位字符"));
      }
    };
    var validateaccount = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入账号"));
      }
      if (/^\w{1,9}/.test(value)) {
        callback();
      } else {
        callback(new Error("1-10位账号"));
      }
    };
    return {
      ruleForm: {
        pass: "",
        account: "",
        usergroup: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        account: [{ validator: validateaccount, trigger: "blur" }],
        usergroup: [{ validator: checkusergroup, trigger: "change" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let repeat = await postuserrepeatReq({
            account: this.ruleForm.account,
          });
          if (repeat.data.code == 200) {
            let res = await postadduserReq({
              account: this.ruleForm.account,
              password: this.ruleForm.pass,
              userGroup: this.ruleForm.usergroup,
            });
            if (res.data.code == 0) {
              alert(res.data.msg);
            }
          } else {
            alert(repeat.data.msg);
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