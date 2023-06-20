import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "normalize.css"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/icon/iconfont.css"
import * as echarts from 'echarts';
import dayjs from 'dayjs';
import * as permission from "@/directive/btnpermission"

Vue.prototype.$dayjs = dayjs;
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(ElementUI);
// console.log(App);

// 注册按钮权限
Object.keys(permission).forEach((v) => {
  Vue.directive(v, {
    inserted: permission[v]
  })
})

Vue.filter('getnyrsfm', (val) => {
  let t = new Date(val)
  let Y = t.getFullYear()
  let M = t.getMonth() + 1
  let D = t.getDate()
  let h = t.getHours()
  let m = t.getMinutes()
  let s = t.getSeconds()
  return [Y, M, D].map((v) => v < 10 ? '0' + v : v).join('/') + ' ' + [h, m, s].map((v) => v < 10 ? '0' + v : v).join(':')
})

let vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 不知道如何访问属性时，在浏览器控制台打印这个vm,鼠标放在需要被访问的属性上面，会出现对应的提示，但是仅限于直接访问方式
window.vm = vm
// console.log(vm);

