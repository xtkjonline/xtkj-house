<template>
  <div class="side">
    <nav>
      <div class="collapse">
        <i
          :class="collapse ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"
          @click="CHENGE_COLLAPSE"
        ></i>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/layout' }"
            >首页</el-breadcrumb-item
          >
          <el-breadcrumb-item
            v-for="(item, index) in titlearr"
            :key="index"
            :to="{ path: item.path }"
          >
            {{ item.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="userhead">
        <el-dropdown @command="goorexit">
          <span class="el-dropdown-link">
            欢迎你,{{ userinfo.account }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">个人中心</el-dropdown-item>
            <el-dropdown-item command="2">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <img :src="userinfo.imgUrl" alt="" />
      </div>
    </nav>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "xtkj",
  data() {
    return {
      titlearr: [],
    };
  },
  methods: {
    ...mapMutations(["CHENGE_COLLAPSE"]),
    changetitle() {
      this.titlearr = [];
      this.$route.matched.forEach((v, i) => {
        this.titlearr.push({ title: v.meta.title, path: v.path });
      });
    },
    goorexit(val) {
      if (val == "1") {
        this.$router.push("/layout/userinfo");
      } else {
        sessionStorage.clear();
        this.$router.push("/login");
        location.reload();
      }
    },
  },
  computed: {
    ...mapState(["collapse", "userinfo"]),
  },
  created() {
    this.changetitle();
    this.$store.dispatch("GET_USERINFO");
  },
  watch: {
    "$route.path": function () {
      this.changetitle();
    },
  },
};
</script>

<style scoped lang='scss'>
.side {
  flex: 1;
  display: flex;
  flex-direction: column;
  nav {
    padding: 0 20px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .userhead {
      display: flex;
      align-items: center;
      span {
        font-size: 14px;
        margin-right: 10px;
      }
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-left: 15px;
      }
    }
    .el-dropdown-link {
      cursor: pointer;
    }
    .collapse {
      display: flex;
      align-items: center;
      i {
        font-size: 20px;
        margin-right: 20px;
      }
    }
  }
  main {
    background: #f0f2f5;
    flex: 1;
  }
}
</style>