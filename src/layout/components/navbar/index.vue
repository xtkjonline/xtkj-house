<template>
  <div class="nav">
    <p class="title">
      <span class="iconfont">&#xe82e;</span>
      <span v-show="!collapse">外卖商家中心</span>
    </p>
    <el-menu
      :collapse-transition="false"
      :collapse="collapse"
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#0083d0"
      router
    >
      <template v-for="item in routemsg">
        <el-menu-item
          :index="item.path"
          :key="item.path"
          v-if="item.children.length === 1"
        >
          <i class="iconfont" :class="item.meta.icon"></i>
          <span slot="title">{{ item.meta.title }}</span>
        </el-menu-item>

        <el-submenu :index="item.path" v-else :key="item.path">
          <template slot="title">
            <i class="iconfont" :class="item.meta.icon"></i>
            <span>{{ item.meta.title }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              :index="val.path"
              v-for="val in item.children"
              :key="val.path"
              >{{ val.meta.title }}</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "xtkj",
  data() {
    return {
      routemsg: [],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
  },
  computed: {
    ...mapState(["collapse"]),
  },
  created() {
    this.routemsg = JSON.parse(sessionStorage.getItem("routemsg"));
  },
};
</script>

<style scoped lang='scss'>
.nav {
  min-height: 100vh;
  background: #304156;

  .title {
    // width: 200px;
    color: white;
    margin-top: 15px;
    margin-bottom: 20px;
    text-align: center;
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    .iconfont {
      font-size: 28px;
      margin-right: 8px;
      color: #1296db;
    }
  }
}
.el-menu-vertical-demo {
  border: none;
  .iconfont {
    color: white;
    font-size: 18px;
    margin-right: 10px;
  }
  &:not(.el-menu--collapse) {
    width: 200px;
  }
}
</style>