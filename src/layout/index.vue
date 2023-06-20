<template>
  <div class="main">
    <navbar></navbar>
    <sidebar></sidebar>
  </div>
</template>

<script>
import navbar from "./components/navbar/index";
import sidebar from "./components/sidebar/index";
export default {
  components: {
    navbar,
    sidebar,
  },
  name: "xtkj",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang='scss'>
.main {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>