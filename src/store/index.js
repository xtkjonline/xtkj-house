import Vue from 'vue'
import Vuex from 'vuex'
import { getuserinfo } from "@/api/axios"


Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    collapse: false,
    userinfo: {}
  },

  getters: {

  },

  mutations: {
    CHENGE_COLLAPSE(state) {
      state.collapse = !state.collapse
    },
    SET_USERINFO(state, payload) {
      state.userinfo = payload
    }
  },
  actions: {
    async GET_USERINFO(context) {
      let res = await getuserinfo()
      if (res.status == 200 && res.statusText == 'OK') {
        context.commit('SET_USERINFO', res.data)
      }
    }
  },

  modules: {

  }
})
