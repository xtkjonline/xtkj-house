export default {

    namespaced: true,
    state: {
        Bname: 'xtkjjtsecond'
    },
    mutations: {
        chengeBname(state, payload) {
            state.Bname = payload
        }
    },
    getters: {
        getxtkjB(state) {
            return state.Bname.substr(0, 4)
        }
    },
    actions: {
        changeBgetxtkj(context, payload) {
            setTimeout(() => {
                context.commit('chengeAname', payload)
            }, 2000);
        }
    }

}