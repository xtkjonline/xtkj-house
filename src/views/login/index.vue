<template>
  <div class="loginmain">
    <div class="loginform">
      <h3>系统登录</h3>
      <div class="box">
        <el-input v-model="account">
          <i slot="prefix" class="iconfont">&#xe614;</i>
        </el-input>
      </div>
      <div class="box">
        <el-input
          v-model="password"
          :type="flag ? 'text' : 'password'"
          @keyup.native.enter="check"
        >
          <i slot="prefix" class="iconfont">&#xe638;</i>
          <i
            slot="suffix"
            class="iconfont"
            :class="flag ? 'icon-yanjing' : 'icon-biyanjing'"
            @click="changepass"
            v-show="password != '' ? true : false"
          ></i>
        </el-input>
      </div>
      <div>
        <el-button type="primary" @click="check" :loading="loading"
          >登录</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { postloginReq } from "@/api/axios";
import { filterroute } from "@/router/index";

export default {
  name: "xtkj",
  data() {
    return {
      account: "",
      password: "",
      flag: false,
      loading: false,
    };
  },
  methods: {
    check() {
      if (this.account == "" || this.password == "") {
        return;
      }
      if (/^1[3-9]\d{9}$/.test(this.account)) {
        console.log("succese");
      }
      if (/^[A-z]$/.test(this.password)) {
        console.log("succese");
      }
      this.loading = true;
      postloginReq({
        account: this.account,
        password: this.password,
      }).then((res) => {
        if (res.data.code == 0) {
          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem("role", res.data.role);
          filterroute();
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          this.$router.push("/layout/home");
          this.loading = false;
        } else {
          this.$message({
            message: res.data.msg,
            type: "warning",
          });
          this.loading = false;
        }
      });
    },
    changepass() {
      this.flag = !this.flag;
    },
  },
};
</script>

<style scoped lang='scss'>
.loginmain {
  text-align: center;
  color: white;
  width: 100vw;
  height: 100vh;
  background: #2d3a4b;
  position: relative;
  .loginform {
    width: 460px;
    height: 300px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    ::v-deep .el-input__inner {
      padding: 0 30px;
      margin: 15px 0;
      background-color: transparent;
    }
    button {
      width: 100%;
      height: 40px;
      margin: 15px 0;
    }
    .iconfont {
      line-height: 70px;
    }
    // .box {
    //   position: relative;
    //   .iconfont {
    //     position: absolute;
    //     top: 25px;
    //     left: 10px;
    //   }
    // }
  }
}
</style>